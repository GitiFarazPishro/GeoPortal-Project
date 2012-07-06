
// usage: log('inside coolFunc', this, arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function(){
  log.history = log.history || [];   // store logs to an array for reference
  log.history.push(arguments);
  arguments.callee = arguments.callee.caller;
  if(this.console) console.log( Array.prototype.slice.call(arguments) );
};
// make it safe to use console.log always
(function(b){function c(){}for(var d="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","),a;a=d.pop();)b[a]=b[a]||c})(window.console=window.console||{});


/*
    tableGenerator
    @author Tobin Bradley
*/
(function($) {
    $.fn.tableGenerator = function(options) {

        // plugin's default options
        var settings = {
            'rowClass': '',
            'colClass': 'ui-widget-content',
            'fields': [],
            'nodataString': 'No records found.',
            'data': {}
        };

        return this.each(function() {
            if (options) {
                $.extend(settings, options);
            }
            writebuffer = "";
            // Write Title
            if (settings.data.total_rows > 0) {

                // Process JSON
                $.each(settings.data.rows, function(j, item) {
                    writebuffer += '<tr>';
                    //Check to see if it's a table that includes locate/routing functions
                    if (item.row.lon) {
                        routeurl = googleRoute(selectedAddress.address + ' NC', item.row.lat + ',' + item.row.lon);
                        writebuffer += "<td class='table-icon " + settings.colClass + "'><a href='javascript:void(0);' title='Locate on the map.' data-coords='" + item.row.lon + "," + item.row.lat + "' data-label='<h5>" + item.row.name.escapeQuotes() + "</h5>" + item.row.address.escapeQuotes() + "' class='locate'><img src='img/locate.gif' style='margin: 0px' /></a></td>";
                        writebuffer += "<td class='table-icon " + settings.colClass + "'><a href='" + routeurl + "' target='_blank' title='Get driving directions.'><img src='img/route.png' style='margin: 0px' /></a></td>";
                    }
                    for (i = 0; i < settings.fields.length; i++) {
                        writebuffer += '<td class="' + settings.colClass + '">' + eval(settings.fields[i]) + '</td>';
                    }
                    writebuffer += '</tr>';
                });

                // Populate table
                $(this).append(writebuffer);

            } else {
                // No records found
                $(this).append('<tr><td class="' + settings.colClass + '" colspan="' + settings.fields.length + '>' + settings.nodataString + '</td></tr>');
            }

        });
    };

})(jQuery);


/*
 * jQuery hashchange event - v1.3 - 7/21/2010
 * http://benalman.com/projects/jquery-hashchange-plugin/
 *
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function($,e,b){var c="hashchange",h=document,f,g=$.event.special,i=h.documentMode,d="on"+c in e&&(i===b||i>7);function a(j){j=j||location.href;return"#"+j.replace(/^[^#]*#?(.*)$/,"$1")}$.fn[c]=function(j){return j?this.bind(c,j):this.trigger(c)};$.fn[c].delay=50;g[c]=$.extend(g[c],{setup:function(){if(d){return false}$(f.start)},teardown:function(){if(d){return false}$(f.stop)}});f=(function(){var j={},p,m=a(),k=function(q){return q},l=k,o=k;j.start=function(){p||n()};j.stop=function(){p&&clearTimeout(p);p=b};function n(){var r=a(),q=o(m);if(r!==m){l(m=r,q);$(e).trigger(c)}else{if(q!==m){location.href=location.href.replace(/#.*/,"")+q}}p=setTimeout(n,$.fn[c].delay)}$.browser.msie&&!d&&(function(){var q,r;j.start=function(){if(!q){r=$.fn[c].src;r=r&&r+a();q=$('<iframe tabindex="-1" title="empty"/>').hide().one("load",function(){r||l(a());n()}).attr("src",r||"javascript:0").insertAfter("body")[0].contentWindow;h.onpropertychange=function(){try{if(event.propertyName==="title"){q.document.title=h.title}}catch(s){}}}};j.stop=k;o=function(){return a(q.location.href)};l=function(v,s){var u=q.document,t=$.fn[c].domain;if(v!==s){u.title=h.title;u.open();t&&u.write('<script>document.domain="'+t+'"<\/script>');u.close();q.location.hash=v}}})();return j})()})(jQuery,this);


/*
    jQuery pub/sub plugin by Peter Higgins
    https://github.com/phiggins42/bloody-jquery-plugins/blob/master/pubsub.js
    Modified by Tobin Bradley
    AFL/BSD Licensed
*/
;
(function(d) {
    // the topic/subscription hash
    var cache = {};
    // Publish some data on a named topic.
    d.publish = function( /* String */ topic, /* Array? */ args) {
        cache[topic] && d.each(cache[topic], function() {
            try {
                this.apply(d, args || []);
            } catch (err) {
                console.log(err);
            }
        });
    };
    // Register a callback on a named topic.
    d.subscribe = function( /* String */ topic, /* Function */ callback) {
        if (!cache[topic]) {
            cache[topic] = [];
        }
        cache[topic].push(callback);
        return [topic, callback]; // Array
    };
    // Disconnect a subscribed function for a topic.
    d.unsubscribe = function( /* String */ topic, /* Function */ callback) {
        cache[topic] && d.each(cache[topic], function(idx) {
            if (this == callback) {
                cache[topic].splice(idx, 1);
            }
        });
    };
    // List Subscribers
    d.subscribers = function( /* String */ topic) {
        l = [];
        cache[topic] && d.each(cache[topic], function(idx) {
            l.push(this.name);
        });
        return l;
    };
})(jQuery);


/*
    Add left and right labels to a jQuery UI Slider
*/
$.fn.extend({
    sliderLabels: function(left, right) {
        var $this = $(this);
        var $sliderdiv = $this;
        $sliderdiv.css({
            'font-weight': 'normal'
        });
        $sliderdiv.prepend('<span class="ui-slider-inner-label"  style="position: absolute; left:0px; top:15px;">' + left + '</span>').append('<span class="ui-slider-inner-label" style="position: absolute; right:0px; top:15px;">' + right + '</span>');
    }
});

/*
    Properly URL encode or decode
*/
function urlencode(str) {
    str = escape(str);
    str = str.replace('+', '%2B');
    str = str.replace('%20', '+');
    str = str.replace('*', '%2A');
    str = str.replace('/', '%2F');
    str = str.replace('@', '%40');
    return str;
}

function urldecode(str) {
    str = str.replace('+', ' ');
    str = unescape(str);
    return str;
}


/*  Prototype for string trimming  */
String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, "");
};
/*
    Prototype for formatting numbers
    c: number of decimal points, default 2
    h: leading character (i.e. '$'), default none
    t: comma character, default is ","
    d: decimal character, default '.'
*/
Number.prototype.formatNumber = function(c, h, t, d) {
    var n = this,
        c = isNaN(c = Math.abs(c)) ? 2 : c,
        h = h === undefined ? "" : h,
        d = d === undefined ? "." : d,
        t = t === undefined ? "," : t,
        s = n < 0 ? "-" : "",
        i = parseInt(n = Math.abs(+n || 0).toFixed(c), 10) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;
    return h + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
}; /*  Escape special characters in strings  */
String.prototype.escapeQuotes = function() {
    if (this === null) return null;
    return this.replace(/'/g, "&#39;").replace(/"/g, "&quot;");
};


/*  Create URL to Google Maps for routing  */

function googleRoute(fromAddress, toAddress) {
    url = "http://maps.google.com/maps?hl=en";
    url += "&saddr=" + urlencode(fromAddress);
    url += "&daddr=" + urlencode(toAddress);
    return url;
}


/**
 * Web service handler for point buffer operation
 * @param {float} x
 * @param {float} y
 * @param {integer} srid
 * @param {string} geotable
 * @param {string} fields
 * @param {string} parameters
 * @param {float} distance
 * @param {string} format
 * @param {string} jsonp_callback
 */

function pointBuffer(x, y, srid, geotable, fields, parameters, distance, order, limit, format, jsonp_callback) {
    url = config.web_service_base;
    url += "v2/ws_geo_bufferpoint.php";
    url += "?x=" + x;
    url += "&y=" + y;
    url += "&srid=" + srid;
    url += "&geotable=" + geotable;
    url += "&fields=" + urlencode(fields);
    url += "&parameters=" + urlencode(parameters);
    url += "&distance=" + distance;
    url += "&order=" + urlencode(order);
    url += "&limit=" + urlencode(limit);
    url += "&format=" + format;
    url += "&callback=" + jsonp_callback;
    return url;
}

/**
 * Web sevrice handler for point overlay operation
 * @param {float} x
 * @param {float} y
 * @param {integer} srid
 * @param {string} geotable
 * @param {string} fields
 * @param {string} parameters
 * @param {string} format
 * @param {string} jsonp_callback
 */

function pointOverlay(x, y, srid, geotable, fields, parameters, format, jsonp_callback) {
    url = config.web_service_base;
    url += "v1/ws_geo_pointoverlay.php";
    url += "?x=" + x;
    url += "&y=" + y;
    url += "&srid=" + srid;
    url += "&geotable=" + geotable;
    url += "&fields=" + urlencode(fields);
    url += "&parameters=" + urlencode(parameters);
    url += "&format=" + format;
    url += "&callback=" + jsonp_callback;
    return url;
}
