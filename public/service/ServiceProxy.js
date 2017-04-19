jQuery.sap.declare("xsoft.service.ServiceProxy");
jQuery.sap.require("xsoft.service.Services");

(function () {

    // var serviceDefinitions = [
    //     {
    //         service: "xsoft.service.getAllProducts",
    //         url: "/api/products",
    //         action: "GET",
    //         expect: "json"
    //     }
    // ];
    var serviceDefinitions = xsoft.service.Services;
    var _contentTypes = {
        xml: "application/xml",
        json: "application/json",
        text: "text/plain",
        html: "text/html",
        any: "*/*"
    };
    var _aServiceMap = {};

    xsoft.service.ServiceProxy = function (serviceName, sync, oSettings) {
        if (!_aServiceMap[serviceName]) {
            throw new Error("Unknown service: " + serviceName);
        }

        this.serviceName = serviceName;
        this.sync = !!sync;

        this.oSettings = jQuery.extend({
            param: {},					//expect key-value pairs; timeout, appset, etc context parameters can be overwritten here
            data: null,					//expect string or request object, or a function to return string or request object
            reqTransformation: false,	//expect transformation file or transformation function
            rspTransformation: false,	//expect transformation file or transformation function
            succeeded: false,			//expect callback function
            failed: false,				//expect callback function
            showDefaultBusyCursor: true,//expect true/false
            offlinePath: false			//expect local cached data file
        }, oSettings);
    }

    xsoft.service.ServiceProxy.prototype.execute = function (oSettings) {
        jQuery.extend(this.oSettings, oSettings);
        _runSecuredService.call(this);
    };

    function _runSecuredService() {
        var that = this;

        if (that.oSettings.showDefaultBusyCursor) {
            // sap.epm.ui.common.BusyCursor.show();
        }

        var queryParam = _buildQueryParam.call(that);
        var bodyRaw = _normalizeRequestData.call(that);

        var url = queryParam.url,
            action = queryParam.action,
            // langu = sap.epm.ui.common.getContext().getLanguage(),
            body = bodyRaw ? bodyRaw.replace(/[\x00-\x08\x0E-\x1F\x7F]+/g, '') : bodyRaw;

        if (that.oSettings.offlinePath && action == "GET") {
            url = that.oSettings.offlinePath;
        }

        jQuery.ajax({
            type: action,
            url: url,
            async: !that.sync,
            timeout: queryParam.timeout,
            dataType: queryParam.expect,
            converters: { "* text": true, "text html": true, "text json": true, "text xml": true }, //suppress automatic data conversion
            data: body,
            cache: false, //!requireCsrfToken, //browser cache should never be used for backend service call 
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", queryParam.accept);
                // if (_csrfToken) {
                //     xhr.setRequestHeader(CSRF_TOKEN_HEADER, _csrfToken);
                // }
                // xhr.setRequestHeader("X-Requested-With", "BPCHttpRequest");
                // xhr.setRequestHeader("Accept-Language", langu);
                xhr.setRequestHeader("Content-Type", queryParam.accept); //typically request has the same format as response. if has exception, we'll update then.
                // if (queryParam.modulename != null) {
                //     xhr.setRequestHeader("SAP-ModuleName", queryParam.modulename);
                // } else {
                //     xhr.setRequestHeader("SAP-ModuleName", "PC Web Client");
                // }
            }
        }).success(function (data, status, xhr) {
            var result = xhr.responseText.trim();
            var contentType = xhr.getResponseHeader("Content-Type") || ""; //avoid content-type is null
            contentType = contentType.split(";")[0]; //in case of "application/json; charset=utf-8
            if (result) {
                switch (contentType) {
                    case _contentTypes.xml:
                        try {
                            data = jQuery.parseXML(xhr.responseText);
                        } catch (e) {
                            jQuery.sap.log.error(e);
                            data = xhr.responseText;
                        }

                        break;
                    case _contentTypes.json:
                        data = jQuery.parseJSON(xhr.responseText);
                        break;
                    case _contentTypes.text:
                    default:
                        data = xhr.responseText;
                        break;
                }

                result = _buildResult.call(that, data, status, xhr);
            }

            try {
                if (that.oSettings.succeeded && typeof (that.oSettings.succeeded) === "function") {
                    //Changed by Glen, because some special XML we have to analyze it by ourself
                    that.oSettings.succeeded(result, xhr);
                }
            } finally {
                if (that.oSettings.showDefaultBusyCursor) {
                    // sap.epm.ui.common.BusyCursor.hide();
                }
            }
        }).error(function (xhr, status, err) {
            jQuery.sap.log.error(status + " - " + xhr.status + " - " + xhr.statusText, null, "xsoft.service.ServiceProxy");

            var exception = _buildException.call(that, xhr, status, err);
            //todo: exception need to be handled
        });

    }

    xsoft.service.ServiceProxy.registerServices = function () {
        var that = this;
        jQuery.sap.log.info("Register services", null, "xsoft.service.ServiceProxy");

        jQuery.each(serviceDefinitions, function (index, svc) {
            svc.action = svc.action.toUpperCase(); //GET/POST/PUT/DELETE
            svc.expect = svc.expect.toLowerCase(); //xml/json/text

            jQuery.sap.log.debug("    - service:" + svc.service + "; action:" + svc.action, null, "xsoft.service.ServiceProxy");

            if (!_contentTypes[svc.expect])
                throw new Error("unknown expected type: " + svc.expect);

            _aServiceMap[svc.service] = svc;
        });
    };

    function _buildQueryParam() {
        var queryParam = {};

        var oService = _aServiceMap[this.serviceName];
        var params = {
            protocol: "http",
            server: "localhost",
            port: 8088,
            timeout: 3600,
        };

        queryParam.action = oService.action;
        queryParam.url = oService.url;
        queryParam.expect = oService.expect;
        queryParam.accept = _contentTypes[oService.expect];
        // queryParam.modulename = oService.modulename;

        var placeholders = jQuery.extend({}, params, this.oSettings.param);
        var positionOfQuestionMark = queryParam.url.indexOf("?");
        if (positionOfQuestionMark < 0) {
            positionOfQuestionMark = queryParam.url.length;
        }
        jQuery.each(placeholders, function (key, val) {
            while (typeof (val) === "function") {
                val = val();
            }
            var search = "{" + key + "}";
            var pos = queryParam.url.indexOf(search);
            if (pos > positionOfQuestionMark) {
                queryParam.url = queryParam.url.replace(search, window.encodeURIComponent(val)); //encoding for search parameters only			
            } else if (pos >= 0) {
                //				var encodedVal = window.encodeURI(val);
                var encodedVal = "";
                if (key === "protocol") {
                    encodedVal = window.encodeURI(val);
                }
                else {
                    encodedVal = window.encodeURIComponent(val);
                }
                queryParam.url = queryParam.url.replace(search, encodedVal);
                positionOfQuestionMark += encodedVal.length - search.length;
            }
        });

        queryParam.timeout = placeholders.timeout;
        while (typeof (queryParam.timeout) === "function") {
            queryParam.timeout = queryParam.timeout();
        }
        queryParam.timeout = queryParam.timeout * 1000;
        if (queryParam.timeout < 0)
            queryParam.timeout = 0;

        return queryParam;
    }

    function _normalizeRequestData() {
        var normalizedData = this.oSettings.data;
        if (normalizedData) {
            while (typeof (normalizedData) === "function") {
                normalizedData = normalizedData();
            }
            switch (typeof (normalizedData)) {
                case "object":
                    normalizedData = JSON.stringify(normalizedData);
                    break;
                case "string":
                    break;
                default:
                    normalizedData = normalizedData.toString();
                    break;
            }
        }
        return normalizedData;
    }

    function _buildResult(data, status, xhr) {
        var result = "";
        // var oService = _aServiceMap[this.serviceName];        
        // var serviceObject = jQuery.sap.getObject(oService.rspObject);
        // if (xhr.responseText) {
        //     if (jQuery.isXMLDoc(data)) {
        //         result = serviceObject.deserialize(data.documentElement);
        //     } else if (typeof (data) === "object") {
        //         result = serviceObject.deserialize(data);
        //     } else {
        //         result = serviceObject.deserialize(xhr.responseText);
        //     }
        // }
        result = xhr.responseText;
        return result;
    }

    function _buildException(xhr, status, err) {
        var exception;

        if (status === "timeout") {
            //timeout
            exception = new Error("request timeout");
        } else if (xhr.status) {
            //convert to exception object
            switch (xhr.status) {
                case 401:
                    //user session timeout and didn't provide valid authentication when was prompted by the browser
                    //reload the whole page to force re-logon
                    window.location.reload();
                    break;
                case 403:
                case 400:
                case 404:
                case 405:
                case 409:
                case 500:
                default:
                    exception = new Error("internal error");
                    break;
            }
        } else {
            //others - unknown or unexpected exception
            exception = new Error("unknow issue");
        }

        return exception;
    }
})();