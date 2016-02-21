/* */ 
(function(process) {
  (function() {
    "use strict";
    Dygraph.LOG_SCALE = 10;
    Dygraph.LN_TEN = Math.log(Dygraph.LOG_SCALE);
    Dygraph.log10 = function(x) {
      return Math.log(x) / Dygraph.LN_TEN;
    };
    Dygraph.DOTTED_LINE = [2, 2];
    Dygraph.DASHED_LINE = [7, 3];
    Dygraph.DOT_DASH_LINE = [7, 2, 2, 2];
    Dygraph.getContext = function(canvas) {
      return (canvas.getContext("2d"));
    };
    Dygraph.addEvent = function addEvent(elem, type, fn) {
      if (elem.addEventListener) {
        elem.addEventListener(type, fn, false);
      } else {
        elem[type + fn] = function() {
          fn(window.event);
        };
        elem.attachEvent('on' + type, elem[type + fn]);
      }
    };
    Dygraph.prototype.addAndTrackEvent = function(elem, type, fn) {
      Dygraph.addEvent(elem, type, fn);
      this.registeredEvents_.push({
        elem: elem,
        type: type,
        fn: fn
      });
    };
    Dygraph.removeEvent = function(elem, type, fn) {
      if (elem.removeEventListener) {
        elem.removeEventListener(type, fn, false);
      } else {
        try {
          elem.detachEvent('on' + type, elem[type + fn]);
        } catch (e) {}
        elem[type + fn] = null;
      }
    };
    Dygraph.prototype.removeTrackedEvents_ = function() {
      if (this.registeredEvents_) {
        for (var idx = 0; idx < this.registeredEvents_.length; idx++) {
          var reg = this.registeredEvents_[idx];
          Dygraph.removeEvent(reg.elem, reg.type, reg.fn);
        }
      }
      this.registeredEvents_ = [];
    };
    Dygraph.cancelEvent = function(e) {
      e = e ? e : window.event;
      if (e.stopPropagation) {
        e.stopPropagation();
      }
      if (e.preventDefault) {
        e.preventDefault();
      }
      e.cancelBubble = true;
      e.cancel = true;
      e.returnValue = false;
      return false;
    };
    Dygraph.hsvToRGB = function(hue, saturation, value) {
      var red;
      var green;
      var blue;
      if (saturation === 0) {
        red = value;
        green = value;
        blue = value;
      } else {
        var i = Math.floor(hue * 6);
        var f = (hue * 6) - i;
        var p = value * (1 - saturation);
        var q = value * (1 - (saturation * f));
        var t = value * (1 - (saturation * (1 - f)));
        switch (i) {
          case 1:
            red = q;
            green = value;
            blue = p;
            break;
          case 2:
            red = p;
            green = value;
            blue = t;
            break;
          case 3:
            red = p;
            green = q;
            blue = value;
            break;
          case 4:
            red = t;
            green = p;
            blue = value;
            break;
          case 5:
            red = value;
            green = p;
            blue = q;
            break;
          case 6:
          case 0:
            red = value;
            green = t;
            blue = p;
            break;
        }
      }
      red = Math.floor(255 * red + 0.5);
      green = Math.floor(255 * green + 0.5);
      blue = Math.floor(255 * blue + 0.5);
      return 'rgb(' + red + ',' + green + ',' + blue + ')';
    };
    Dygraph.findPos = function(obj) {
      var curleft = 0,
          curtop = 0;
      if (obj.offsetParent) {
        var copyObj = obj;
        while (1) {
          var borderLeft = "0",
              borderTop = "0";
          if (window.getComputedStyle) {
            var computedStyle = window.getComputedStyle(copyObj, null);
            borderLeft = computedStyle.borderLeft || "0";
            borderTop = computedStyle.borderTop || "0";
          }
          curleft += parseInt(borderLeft, 10);
          curtop += parseInt(borderTop, 10);
          curleft += copyObj.offsetLeft;
          curtop += copyObj.offsetTop;
          if (!copyObj.offsetParent) {
            break;
          }
          copyObj = copyObj.offsetParent;
        }
      } else {
        if (obj.x)
          curleft += obj.x;
        if (obj.y)
          curtop += obj.y;
      }
      while (obj && obj != document.body) {
        curleft -= obj.scrollLeft;
        curtop -= obj.scrollTop;
        obj = obj.parentNode;
      }
      return {
        x: curleft,
        y: curtop
      };
    };
    Dygraph.pageX = function(e) {
      if (e.pageX) {
        return (!e.pageX || e.pageX < 0) ? 0 : e.pageX;
      } else {
        var de = document.documentElement;
        var b = document.body;
        return e.clientX + (de.scrollLeft || b.scrollLeft) - (de.clientLeft || 0);
      }
    };
    Dygraph.pageY = function(e) {
      if (e.pageY) {
        return (!e.pageY || e.pageY < 0) ? 0 : e.pageY;
      } else {
        var de = document.documentElement;
        var b = document.body;
        return e.clientY + (de.scrollTop || b.scrollTop) - (de.clientTop || 0);
      }
    };
    Dygraph.dragGetX_ = function(e, context) {
      return Dygraph.pageX(e) - context.px;
    };
    Dygraph.dragGetY_ = function(e, context) {
      return Dygraph.pageY(e) - context.py;
    };
    Dygraph.isOK = function(x) {
      return !!x && !isNaN(x);
    };
    Dygraph.isValidPoint = function(p, opt_allowNaNY) {
      if (!p)
        return false;
      if (p.yval === null)
        return false;
      if (p.x === null || p.x === undefined)
        return false;
      if (p.y === null || p.y === undefined)
        return false;
      if (isNaN(p.x) || (!opt_allowNaNY && isNaN(p.y)))
        return false;
      return true;
    };
    Dygraph.floatFormat = function(x, opt_precision) {
      var p = Math.min(Math.max(1, opt_precision || 2), 21);
      return (Math.abs(x) < 1.0e-3 && x !== 0.0) ? x.toExponential(p - 1) : x.toPrecision(p);
    };
    Dygraph.zeropad = function(x) {
      if (x < 10)
        return "0" + x;
      else
        return "" + x;
    };
    Dygraph.DateAccessorsLocal = {
      getFullYear: function(d) {
        return d.getFullYear();
      },
      getMonth: function(d) {
        return d.getMonth();
      },
      getDate: function(d) {
        return d.getDate();
      },
      getHours: function(d) {
        return d.getHours();
      },
      getMinutes: function(d) {
        return d.getMinutes();
      },
      getSeconds: function(d) {
        return d.getSeconds();
      },
      getMilliseconds: function(d) {
        return d.getMilliseconds();
      },
      getDay: function(d) {
        return d.getDay();
      },
      makeDate: function(y, m, d, hh, mm, ss, ms) {
        return new Date(y, m, d, hh, mm, ss, ms);
      }
    };
    Dygraph.DateAccessorsUTC = {
      getFullYear: function(d) {
        return d.getUTCFullYear();
      },
      getMonth: function(d) {
        return d.getUTCMonth();
      },
      getDate: function(d) {
        return d.getUTCDate();
      },
      getHours: function(d) {
        return d.getUTCHours();
      },
      getMinutes: function(d) {
        return d.getUTCMinutes();
      },
      getSeconds: function(d) {
        return d.getUTCSeconds();
      },
      getMilliseconds: function(d) {
        return d.getUTCMilliseconds();
      },
      getDay: function(d) {
        return d.getUTCDay();
      },
      makeDate: function(y, m, d, hh, mm, ss, ms) {
        return new Date(Date.UTC(y, m, d, hh, mm, ss, ms));
      }
    };
    Dygraph.hmsString_ = function(hh, mm, ss) {
      var zeropad = Dygraph.zeropad;
      var ret = zeropad(hh) + ":" + zeropad(mm);
      if (ss) {
        ret += ":" + zeropad(ss);
      }
      return ret;
    };
    Dygraph.dateString_ = function(time, utc) {
      var zeropad = Dygraph.zeropad;
      var accessors = utc ? Dygraph.DateAccessorsUTC : Dygraph.DateAccessorsLocal;
      var date = new Date(time);
      var y = accessors.getFullYear(date);
      var m = accessors.getMonth(date);
      var d = accessors.getDate(date);
      var hh = accessors.getHours(date);
      var mm = accessors.getMinutes(date);
      var ss = accessors.getSeconds(date);
      var year = "" + y;
      var month = zeropad(m + 1);
      var day = zeropad(d);
      var frac = hh * 3600 + mm * 60 + ss;
      var ret = year + "/" + month + "/" + day;
      if (frac) {
        ret += " " + Dygraph.hmsString_(hh, mm, ss);
      }
      return ret;
    };
    Dygraph.round_ = function(num, places) {
      var shift = Math.pow(10, places);
      return Math.round(num * shift) / shift;
    };
    Dygraph.binarySearch = function(val, arry, abs, low, high) {
      if (low === null || low === undefined || high === null || high === undefined) {
        low = 0;
        high = arry.length - 1;
      }
      if (low > high) {
        return -1;
      }
      if (abs === null || abs === undefined) {
        abs = 0;
      }
      var validIndex = function(idx) {
        return idx >= 0 && idx < arry.length;
      };
      var mid = parseInt((low + high) / 2, 10);
      var element = arry[mid];
      var idx;
      if (element == val) {
        return mid;
      } else if (element > val) {
        if (abs > 0) {
          idx = mid - 1;
          if (validIndex(idx) && arry[idx] < val) {
            return mid;
          }
        }
        return Dygraph.binarySearch(val, arry, abs, low, mid - 1);
      } else if (element < val) {
        if (abs < 0) {
          idx = mid + 1;
          if (validIndex(idx) && arry[idx] > val) {
            return mid;
          }
        }
        return Dygraph.binarySearch(val, arry, abs, mid + 1, high);
      }
      return -1;
    };
    Dygraph.dateParser = function(dateStr) {
      var dateStrSlashed;
      var d;
      if (dateStr.search("-") == -1 || dateStr.search("T") != -1 || dateStr.search("Z") != -1) {
        d = Dygraph.dateStrToMillis(dateStr);
        if (d && !isNaN(d))
          return d;
      }
      if (dateStr.search("-") != -1) {
        dateStrSlashed = dateStr.replace("-", "/", "g");
        while (dateStrSlashed.search("-") != -1) {
          dateStrSlashed = dateStrSlashed.replace("-", "/");
        }
        d = Dygraph.dateStrToMillis(dateStrSlashed);
      } else if (dateStr.length == 8) {
        dateStrSlashed = dateStr.substr(0, 4) + "/" + dateStr.substr(4, 2) + "/" + dateStr.substr(6, 2);
        d = Dygraph.dateStrToMillis(dateStrSlashed);
      } else {
        d = Dygraph.dateStrToMillis(dateStr);
      }
      if (!d || isNaN(d)) {
        console.error("Couldn't parse " + dateStr + " as a date");
      }
      return d;
    };
    Dygraph.dateStrToMillis = function(str) {
      return new Date(str).getTime();
    };
    Dygraph.update = function(self, o) {
      if (typeof(o) != 'undefined' && o !== null) {
        for (var k in o) {
          if (o.hasOwnProperty(k)) {
            self[k] = o[k];
          }
        }
      }
      return self;
    };
    Dygraph.updateDeep = function(self, o) {
      function isNode(o) {
        return (typeof Node === "object" ? o instanceof Node : typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName === "string");
      }
      if (typeof(o) != 'undefined' && o !== null) {
        for (var k in o) {
          if (o.hasOwnProperty(k)) {
            if (o[k] === null) {
              self[k] = null;
            } else if (Dygraph.isArrayLike(o[k])) {
              self[k] = o[k].slice();
            } else if (isNode(o[k])) {
              self[k] = o[k];
            } else if (typeof(o[k]) == 'object') {
              if (typeof(self[k]) != 'object' || self[k] === null) {
                self[k] = {};
              }
              Dygraph.updateDeep(self[k], o[k]);
            } else {
              self[k] = o[k];
            }
          }
        }
      }
      return self;
    };
    Dygraph.isArrayLike = function(o) {
      var typ = typeof(o);
      if ((typ != 'object' && !(typ == 'function' && typeof(o.item) == 'function')) || o === null || typeof(o.length) != 'number' || o.nodeType === 3) {
        return false;
      }
      return true;
    };
    Dygraph.isDateLike = function(o) {
      if (typeof(o) != "object" || o === null || typeof(o.getTime) != 'function') {
        return false;
      }
      return true;
    };
    Dygraph.clone = function(o) {
      var r = [];
      for (var i = 0; i < o.length; i++) {
        if (Dygraph.isArrayLike(o[i])) {
          r.push(Dygraph.clone(o[i]));
        } else {
          r.push(o[i]);
        }
      }
      return r;
    };
    Dygraph.createCanvas = function() {
      var canvas = document.createElement("canvas");
      var isIE = (/MSIE/.test(navigator.userAgent) && !window.opera);
      if (isIE && (typeof(G_vmlCanvasManager) != 'undefined')) {
        canvas = G_vmlCanvasManager.initElement((canvas));
      }
      return canvas;
    };
    Dygraph.getContextPixelRatio = function(context) {
      try {
        var devicePixelRatio = window.devicePixelRatio;
        var backingStoreRatio = context.webkitBackingStorePixelRatio || context.mozBackingStorePixelRatio || context.msBackingStorePixelRatio || context.oBackingStorePixelRatio || context.backingStorePixelRatio || 1;
        if (devicePixelRatio !== undefined) {
          return devicePixelRatio / backingStoreRatio;
        } else {
          return 1;
        }
      } catch (e) {
        return 1;
      }
    };
    Dygraph.isAndroid = function() {
      return (/Android/).test(navigator.userAgent);
    };
    Dygraph.Iterator = function(array, start, length, predicate) {
      start = start || 0;
      length = length || array.length;
      this.hasNext = true;
      this.peek = null;
      this.start_ = start;
      this.array_ = array;
      this.predicate_ = predicate;
      this.end_ = Math.min(array.length, start + length);
      this.nextIdx_ = start - 1;
      this.next();
    };
    Dygraph.Iterator.prototype.next = function() {
      if (!this.hasNext) {
        return null;
      }
      var obj = this.peek;
      var nextIdx = this.nextIdx_ + 1;
      var found = false;
      while (nextIdx < this.end_) {
        if (!this.predicate_ || this.predicate_(this.array_, nextIdx)) {
          this.peek = this.array_[nextIdx];
          found = true;
          break;
        }
        nextIdx++;
      }
      this.nextIdx_ = nextIdx;
      if (!found) {
        this.hasNext = false;
        this.peek = null;
      }
      return obj;
    };
    Dygraph.createIterator = function(array, start, length, opt_predicate) {
      return new Dygraph.Iterator(array, start, length, opt_predicate);
    };
    Dygraph.requestAnimFrame = (function() {
      return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
        window.setTimeout(callback, 1000 / 60);
      };
    })();
    Dygraph.repeatAndCleanup = function(repeatFn, maxFrames, framePeriodInMillis, cleanupFn) {
      var frameNumber = 0;
      var previousFrameNumber;
      var startTime = new Date().getTime();
      repeatFn(frameNumber);
      if (maxFrames == 1) {
        cleanupFn();
        return;
      }
      var maxFrameArg = maxFrames - 1;
      (function loop() {
        if (frameNumber >= maxFrames)
          return;
        Dygraph.requestAnimFrame.call(window, function() {
          var currentTime = new Date().getTime();
          var delayInMillis = currentTime - startTime;
          previousFrameNumber = frameNumber;
          frameNumber = Math.floor(delayInMillis / framePeriodInMillis);
          var frameDelta = frameNumber - previousFrameNumber;
          var predictOvershootStutter = (frameNumber + frameDelta) > maxFrameArg;
          if (predictOvershootStutter || (frameNumber >= maxFrameArg)) {
            repeatFn(maxFrameArg);
            cleanupFn();
          } else {
            if (frameDelta !== 0) {
              repeatFn(frameNumber);
            }
            loop();
          }
        });
      })();
    };
    var pixelSafeOptions = {
      'annotationClickHandler': true,
      'annotationDblClickHandler': true,
      'annotationMouseOutHandler': true,
      'annotationMouseOverHandler': true,
      'axisLabelColor': true,
      'axisLineColor': true,
      'axisLineWidth': true,
      'clickCallback': true,
      'drawCallback': true,
      'drawHighlightPointCallback': true,
      'drawPoints': true,
      'drawPointCallback': true,
      'drawXGrid': true,
      'drawYGrid': true,
      'fillAlpha': true,
      'gridLineColor': true,
      'gridLineWidth': true,
      'hideOverlayOnMouseOut': true,
      'highlightCallback': true,
      'highlightCircleSize': true,
      'interactionModel': true,
      'isZoomedIgnoreProgrammaticZoom': true,
      'labelsDiv': true,
      'labelsDivStyles': true,
      'labelsDivWidth': true,
      'labelsKMB': true,
      'labelsKMG2': true,
      'labelsSeparateLines': true,
      'labelsShowZeroValues': true,
      'legend': true,
      'panEdgeFraction': true,
      'pixelsPerYLabel': true,
      'pointClickCallback': true,
      'pointSize': true,
      'rangeSelectorPlotFillColor': true,
      'rangeSelectorPlotStrokeColor': true,
      'showLabelsOnHighlight': true,
      'showRoller': true,
      'strokeWidth': true,
      'underlayCallback': true,
      'unhighlightCallback': true,
      'zoomCallback': true
    };
    Dygraph.isPixelChangingOptionList = function(labels, attrs) {
      var seriesNamesDictionary = {};
      if (labels) {
        for (var i = 1; i < labels.length; i++) {
          seriesNamesDictionary[labels[i]] = true;
        }
      }
      var scanFlatOptions = function(options) {
        for (var property in options) {
          if (options.hasOwnProperty(property) && !pixelSafeOptions[property]) {
            return true;
          }
        }
        return false;
      };
      for (var property in attrs) {
        if (!attrs.hasOwnProperty(property))
          continue;
        if (property == 'highlightSeriesOpts' || (seriesNamesDictionary[property] && !attrs.series)) {
          if (scanFlatOptions(attrs[property]))
            return true;
        } else if (property == 'series' || property == 'axes') {
          var perSeries = attrs[property];
          for (var series in perSeries) {
            if (perSeries.hasOwnProperty(series) && scanFlatOptions(perSeries[series])) {
              return true;
            }
          }
        } else {
          if (!pixelSafeOptions[property])
            return true;
        }
      }
      return false;
    };
    Dygraph.Circles = {DEFAULT: function(g, name, ctx, canvasx, canvasy, color, radius) {
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(canvasx, canvasy, radius, 0, 2 * Math.PI, false);
        ctx.fill();
      }};
    Dygraph.IFrameTarp = function() {
      this.tarps = [];
    };
    Dygraph.IFrameTarp.prototype.cover = function() {
      var iframes = document.getElementsByTagName("iframe");
      for (var i = 0; i < iframes.length; i++) {
        var iframe = iframes[i];
        var pos = Dygraph.findPos(iframe),
            x = pos.x,
            y = pos.y,
            width = iframe.offsetWidth,
            height = iframe.offsetHeight;
        var div = document.createElement("div");
        div.style.position = "absolute";
        div.style.left = x + 'px';
        div.style.top = y + 'px';
        div.style.width = width + 'px';
        div.style.height = height + 'px';
        div.style.zIndex = 999;
        document.body.appendChild(div);
        this.tarps.push(div);
      }
    };
    Dygraph.IFrameTarp.prototype.uncover = function() {
      for (var i = 0; i < this.tarps.length; i++) {
        this.tarps[i].parentNode.removeChild(this.tarps[i]);
      }
      this.tarps = [];
    };
    Dygraph.detectLineDelimiter = function(data) {
      for (var i = 0; i < data.length; i++) {
        var code = data.charAt(i);
        if (code === '\r') {
          if (((i + 1) < data.length) && (data.charAt(i + 1) === '\n')) {
            return '\r\n';
          }
          return code;
        }
        if (code === '\n') {
          if (((i + 1) < data.length) && (data.charAt(i + 1) === '\r')) {
            return '\n\r';
          }
          return code;
        }
      }
      return null;
    };
    Dygraph.isNodeContainedBy = function(containee, container) {
      if (container === null || containee === null) {
        return false;
      }
      var containeeNode = (containee);
      while (containeeNode && containeeNode !== container) {
        containeeNode = containeeNode.parentNode;
      }
      return (containeeNode === container);
    };
    Dygraph.pow = function(base, exp) {
      if (exp < 0) {
        return 1.0 / Math.pow(base, -exp);
      }
      return Math.pow(base, exp);
    };
    var RGBA_RE = /^rgba?\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})(?:,\s*([01](?:\.\d+)?))?\)$/;
    function parseRGBA(rgbStr) {
      var bits = RGBA_RE.exec(rgbStr);
      if (!bits)
        return null;
      var r = parseInt(bits[1], 10),
          g = parseInt(bits[2], 10),
          b = parseInt(bits[3], 10);
      if (bits[4]) {
        return {
          r: r,
          g: g,
          b: b,
          a: parseFloat(bits[4])
        };
      } else {
        return {
          r: r,
          g: g,
          b: b
        };
      }
    }
    Dygraph.toRGB_ = function(colorStr) {
      var rgb = parseRGBA(colorStr);
      if (rgb)
        return rgb;
      var div = document.createElement('div');
      div.style.backgroundColor = colorStr;
      div.style.visibility = 'hidden';
      document.body.appendChild(div);
      var rgbStr;
      if (window.getComputedStyle) {
        rgbStr = window.getComputedStyle(div, null).backgroundColor;
      } else {
        rgbStr = div.currentStyle.backgroundColor;
      }
      document.body.removeChild(div);
      return parseRGBA(rgbStr);
    };
    Dygraph.isCanvasSupported = function(opt_canvasElement) {
      var canvas;
      try {
        canvas = opt_canvasElement || document.createElement("canvas");
        canvas.getContext("2d");
      } catch (e) {
        var ie = navigator.appVersion.match(/MSIE (\d\.\d)/);
        var opera = (navigator.userAgent.toLowerCase().indexOf("opera") != -1);
        if ((!ie) || (ie[1] < 6) || (opera))
          return false;
        return true;
      }
      return true;
    };
    Dygraph.parseFloat_ = function(x, opt_line_no, opt_line) {
      var val = parseFloat(x);
      if (!isNaN(val))
        return val;
      if (/^ *$/.test(x))
        return null;
      if (/^ *nan *$/i.test(x))
        return NaN;
      var msg = "Unable to parse '" + x + "' as a number";
      if (opt_line !== undefined && opt_line_no !== undefined) {
        msg += " on line " + (1 + (opt_line_no || 0)) + " ('" + opt_line + "') of CSV.";
      }
      console.error(msg);
      return null;
    };
  })();
})(require('process'));
