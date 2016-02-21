/* */ 
(function(process) {
  if (typeof(DEBUG) === 'undefined')
    DEBUG = true;
  var Dygraph = (function() {
    "use strict";
    var Dygraph = function(div, data, opts, opt_fourth_param) {
      this.is_initial_draw_ = true;
      this.readyFns_ = [];
      if (opt_fourth_param !== undefined) {
        console.warn("Using deprecated four-argument dygraph constructor");
        this.__old_init__(div, data, opts, opt_fourth_param);
      } else {
        this.__init__(div, data, opts);
      }
    };
    Dygraph.NAME = "Dygraph";
    Dygraph.VERSION = "1.1.1";
    Dygraph.__repr__ = function() {
      return "[" + Dygraph.NAME + " " + Dygraph.VERSION + "]";
    };
    Dygraph.toString = function() {
      return Dygraph.__repr__();
    };
    Dygraph.DEFAULT_ROLL_PERIOD = 1;
    Dygraph.DEFAULT_WIDTH = 480;
    Dygraph.DEFAULT_HEIGHT = 320;
    Dygraph.ANIMATION_STEPS = 12;
    Dygraph.ANIMATION_DURATION = 200;
    Dygraph.KMB_LABELS = ['K', 'M', 'B', 'T', 'Q'];
    Dygraph.KMG2_BIG_LABELS = ['k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];
    Dygraph.KMG2_SMALL_LABELS = ['m', 'u', 'n', 'p', 'f', 'a', 'z', 'y'];
    Dygraph.numberValueFormatter = function(x, opts) {
      var sigFigs = opts('sigFigs');
      if (sigFigs !== null) {
        return Dygraph.floatFormat(x, sigFigs);
      }
      var digits = opts('digitsAfterDecimal');
      var maxNumberWidth = opts('maxNumberWidth');
      var kmb = opts('labelsKMB');
      var kmg2 = opts('labelsKMG2');
      var label;
      if (x !== 0.0 && (Math.abs(x) >= Math.pow(10, maxNumberWidth) || Math.abs(x) < Math.pow(10, -digits))) {
        label = x.toExponential(digits);
      } else {
        label = '' + Dygraph.round_(x, digits);
      }
      if (kmb || kmg2) {
        var k;
        var k_labels = [];
        var m_labels = [];
        if (kmb) {
          k = 1000;
          k_labels = Dygraph.KMB_LABELS;
        }
        if (kmg2) {
          if (kmb)
            console.warn("Setting both labelsKMB and labelsKMG2. Pick one!");
          k = 1024;
          k_labels = Dygraph.KMG2_BIG_LABELS;
          m_labels = Dygraph.KMG2_SMALL_LABELS;
        }
        var absx = Math.abs(x);
        var n = Dygraph.pow(k, k_labels.length);
        for (var j = k_labels.length - 1; j >= 0; j--, n /= k) {
          if (absx >= n) {
            label = Dygraph.round_(x / n, digits) + k_labels[j];
            break;
          }
        }
        if (kmg2) {
          var x_parts = String(x.toExponential()).split('e-');
          if (x_parts.length === 2 && x_parts[1] >= 3 && x_parts[1] <= 24) {
            if (x_parts[1] % 3 > 0) {
              label = Dygraph.round_(x_parts[0] / Dygraph.pow(10, (x_parts[1] % 3)), digits);
            } else {
              label = Number(x_parts[0]).toFixed(2);
            }
            label += m_labels[Math.floor(x_parts[1] / 3) - 1];
          }
        }
      }
      return label;
    };
    Dygraph.numberAxisLabelFormatter = function(x, granularity, opts) {
      return Dygraph.numberValueFormatter.call(this, x, opts);
    };
    Dygraph.SHORT_MONTH_NAMES_ = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    Dygraph.dateAxisLabelFormatter = function(date, granularity, opts) {
      var utc = opts('labelsUTC');
      var accessors = utc ? Dygraph.DateAccessorsUTC : Dygraph.DateAccessorsLocal;
      var year = accessors.getFullYear(date),
          month = accessors.getMonth(date),
          day = accessors.getDate(date),
          hours = accessors.getHours(date),
          mins = accessors.getMinutes(date),
          secs = accessors.getSeconds(date),
          millis = accessors.getSeconds(date);
      if (granularity >= Dygraph.DECADAL) {
        return '' + year;
      } else if (granularity >= Dygraph.MONTHLY) {
        return Dygraph.SHORT_MONTH_NAMES_[month] + '&#160;' + year;
      } else {
        var frac = hours * 3600 + mins * 60 + secs + 1e-3 * millis;
        if (frac === 0 || granularity >= Dygraph.DAILY) {
          return Dygraph.zeropad(day) + '&#160;' + Dygraph.SHORT_MONTH_NAMES_[month];
        } else {
          return Dygraph.hmsString_(hours, mins, secs);
        }
      }
    };
    Dygraph.dateAxisFormatter = Dygraph.dateAxisLabelFormatter;
    Dygraph.dateValueFormatter = function(d, opts) {
      return Dygraph.dateString_(d, opts('labelsUTC'));
    };
    Dygraph.Plotters = DygraphCanvasRenderer._Plotters;
    Dygraph.DEFAULT_ATTRS = {
      highlightCircleSize: 3,
      highlightSeriesOpts: null,
      highlightSeriesBackgroundAlpha: 0.5,
      labelsDivWidth: 250,
      labelsDivStyles: {},
      labelsSeparateLines: false,
      labelsShowZeroValues: true,
      labelsKMB: false,
      labelsKMG2: false,
      showLabelsOnHighlight: true,
      digitsAfterDecimal: 2,
      maxNumberWidth: 6,
      sigFigs: null,
      strokeWidth: 1.0,
      strokeBorderWidth: 0,
      strokeBorderColor: "white",
      axisTickSize: 3,
      axisLabelFontSize: 14,
      rightGap: 5,
      showRoller: false,
      xValueParser: Dygraph.dateParser,
      delimiter: ',',
      sigma: 2.0,
      errorBars: false,
      fractions: false,
      wilsonInterval: true,
      customBars: false,
      fillGraph: false,
      fillAlpha: 0.15,
      connectSeparatedPoints: false,
      stackedGraph: false,
      stackedGraphNaNFill: 'all',
      hideOverlayOnMouseOut: true,
      legend: 'onmouseover',
      stepPlot: false,
      avoidMinZero: false,
      xRangePad: 0,
      yRangePad: null,
      drawAxesAtZero: false,
      titleHeight: 28,
      xLabelHeight: 18,
      yLabelWidth: 18,
      drawXAxis: true,
      drawYAxis: true,
      axisLineColor: "black",
      axisLineWidth: 0.3,
      gridLineWidth: 0.3,
      axisLabelColor: "black",
      axisLabelWidth: 50,
      drawYGrid: true,
      drawXGrid: true,
      gridLineColor: "rgb(128,128,128)",
      interactionModel: null,
      animatedZooms: false,
      showRangeSelector: false,
      rangeSelectorHeight: 40,
      rangeSelectorPlotStrokeColor: "#808FAB",
      rangeSelectorPlotFillColor: "#A7B1C4",
      showInRangeSelector: null,
      plotter: [Dygraph.Plotters.fillPlotter, Dygraph.Plotters.errorPlotter, Dygraph.Plotters.linePlotter],
      plugins: [],
      axes: {
        x: {
          pixelsPerLabel: 70,
          axisLabelWidth: 60,
          axisLabelFormatter: Dygraph.dateAxisLabelFormatter,
          valueFormatter: Dygraph.dateValueFormatter,
          drawGrid: true,
          drawAxis: true,
          independentTicks: true,
          ticker: null
        },
        y: {
          axisLabelWidth: 50,
          pixelsPerLabel: 30,
          valueFormatter: Dygraph.numberValueFormatter,
          axisLabelFormatter: Dygraph.numberAxisLabelFormatter,
          drawGrid: true,
          drawAxis: true,
          independentTicks: true,
          ticker: null
        },
        y2: {
          axisLabelWidth: 50,
          pixelsPerLabel: 30,
          valueFormatter: Dygraph.numberValueFormatter,
          axisLabelFormatter: Dygraph.numberAxisLabelFormatter,
          drawAxis: true,
          drawGrid: false,
          independentTicks: false,
          ticker: null
        }
      }
    };
    Dygraph.HORIZONTAL = 1;
    Dygraph.VERTICAL = 2;
    Dygraph.PLUGINS = [];
    Dygraph.addedAnnotationCSS = false;
    Dygraph.prototype.__old_init__ = function(div, file, labels, attrs) {
      if (labels !== null) {
        var new_labels = ["Date"];
        for (var i = 0; i < labels.length; i++)
          new_labels.push(labels[i]);
        Dygraph.update(attrs, {'labels': new_labels});
      }
      this.__init__(div, file, attrs);
    };
    Dygraph.prototype.__init__ = function(div, file, attrs) {
      if (/MSIE/.test(navigator.userAgent) && !window.opera && typeof(G_vmlCanvasManager) != 'undefined' && document.readyState != 'complete') {
        var self = this;
        setTimeout(function() {
          self.__init__(div, file, attrs);
        }, 100);
        return;
      }
      if (attrs === null || attrs === undefined) {
        attrs = {};
      }
      attrs = Dygraph.mapLegacyOptions_(attrs);
      if (typeof(div) == 'string') {
        div = document.getElementById(div);
      }
      if (!div) {
        console.error("Constructing dygraph with a non-existent div!");
        return;
      }
      this.isUsingExcanvas_ = typeof(G_vmlCanvasManager) != 'undefined';
      this.maindiv_ = div;
      this.file_ = file;
      this.rollPeriod_ = attrs.rollPeriod || Dygraph.DEFAULT_ROLL_PERIOD;
      this.previousVerticalX_ = -1;
      this.fractions_ = attrs.fractions || false;
      this.dateWindow_ = attrs.dateWindow || null;
      this.annotations_ = [];
      this.zoomed_x_ = false;
      this.zoomed_y_ = false;
      div.innerHTML = "";
      if (div.style.width === '' && attrs.width) {
        div.style.width = attrs.width + "px";
      }
      if (div.style.height === '' && attrs.height) {
        div.style.height = attrs.height + "px";
      }
      if (div.style.height === '' && div.clientHeight === 0) {
        div.style.height = Dygraph.DEFAULT_HEIGHT + "px";
        if (div.style.width === '') {
          div.style.width = Dygraph.DEFAULT_WIDTH + "px";
        }
      }
      this.width_ = div.clientWidth || attrs.width || 0;
      this.height_ = div.clientHeight || attrs.height || 0;
      if (attrs.stackedGraph) {
        attrs.fillGraph = true;
      }
      this.user_attrs_ = {};
      Dygraph.update(this.user_attrs_, attrs);
      this.attrs_ = {};
      Dygraph.updateDeep(this.attrs_, Dygraph.DEFAULT_ATTRS);
      this.boundaryIds_ = [];
      this.setIndexByName_ = {};
      this.datasetIndex_ = [];
      this.registeredEvents_ = [];
      this.eventListeners_ = {};
      this.attributes_ = new DygraphOptions(this);
      this.createInterface_();
      this.plugins_ = [];
      var plugins = Dygraph.PLUGINS.concat(this.getOption('plugins'));
      for (var i = 0; i < plugins.length; i++) {
        var Plugin = plugins[i];
        var pluginInstance;
        if (typeof(Plugin.activate) !== 'undefined') {
          pluginInstance = Plugin;
        } else {
          pluginInstance = new Plugin();
        }
        var pluginDict = {
          plugin: pluginInstance,
          events: {},
          options: {},
          pluginOptions: {}
        };
        var handlers = pluginInstance.activate(this);
        for (var eventName in handlers) {
          if (!handlers.hasOwnProperty(eventName))
            continue;
          pluginDict.events[eventName] = handlers[eventName];
        }
        this.plugins_.push(pluginDict);
      }
      for (var i = 0; i < this.plugins_.length; i++) {
        var plugin_dict = this.plugins_[i];
        for (var eventName in plugin_dict.events) {
          if (!plugin_dict.events.hasOwnProperty(eventName))
            continue;
          var callback = plugin_dict.events[eventName];
          var pair = [plugin_dict.plugin, callback];
          if (!(eventName in this.eventListeners_)) {
            this.eventListeners_[eventName] = [pair];
          } else {
            this.eventListeners_[eventName].push(pair);
          }
        }
      }
      this.createDragInterface_();
      this.start_();
    };
    Dygraph.prototype.cascadeEvents_ = function(name, extra_props) {
      if (!(name in this.eventListeners_))
        return false;
      var e = {
        dygraph: this,
        cancelable: false,
        defaultPrevented: false,
        preventDefault: function() {
          if (!e.cancelable)
            throw "Cannot call preventDefault on non-cancelable event.";
          e.defaultPrevented = true;
        },
        propagationStopped: false,
        stopPropagation: function() {
          e.propagationStopped = true;
        }
      };
      Dygraph.update(e, extra_props);
      var callback_plugin_pairs = this.eventListeners_[name];
      if (callback_plugin_pairs) {
        for (var i = callback_plugin_pairs.length - 1; i >= 0; i--) {
          var plugin = callback_plugin_pairs[i][0];
          var callback = callback_plugin_pairs[i][1];
          callback.call(plugin, e);
          if (e.propagationStopped)
            break;
        }
      }
      return e.defaultPrevented;
    };
    Dygraph.prototype.getPluginInstance_ = function(type) {
      for (var i = 0; i < this.plugins_.length; i++) {
        var p = this.plugins_[i];
        if (p.plugin instanceof type) {
          return p.plugin;
        }
      }
      return null;
    };
    Dygraph.prototype.isZoomed = function(axis) {
      if (axis === null || axis === undefined) {
        return this.zoomed_x_ || this.zoomed_y_;
      }
      if (axis === 'x')
        return this.zoomed_x_;
      if (axis === 'y')
        return this.zoomed_y_;
      throw "axis parameter is [" + axis + "] must be null, 'x' or 'y'.";
    };
    Dygraph.prototype.toString = function() {
      var maindiv = this.maindiv_;
      var id = (maindiv && maindiv.id) ? maindiv.id : maindiv;
      return "[Dygraph " + id + "]";
    };
    Dygraph.prototype.attr_ = function(name, seriesName) {
      if (DEBUG) {
        if (typeof(Dygraph.OPTIONS_REFERENCE) === 'undefined') {
          console.error('Must include options reference JS for testing');
        } else if (!Dygraph.OPTIONS_REFERENCE.hasOwnProperty(name)) {
          console.error('Dygraphs is using property ' + name + ', which has no ' + 'entry in the Dygraphs.OPTIONS_REFERENCE listing.');
          Dygraph.OPTIONS_REFERENCE[name] = true;
        }
      }
      return seriesName ? this.attributes_.getForSeries(name, seriesName) : this.attributes_.get(name);
    };
    Dygraph.prototype.getOption = function(name, opt_seriesName) {
      return this.attr_(name, opt_seriesName);
    };
    Dygraph.prototype.getNumericOption = function(name, opt_seriesName) {
      return (this.getOption(name, opt_seriesName));
    };
    Dygraph.prototype.getStringOption = function(name, opt_seriesName) {
      return (this.getOption(name, opt_seriesName));
    };
    Dygraph.prototype.getBooleanOption = function(name, opt_seriesName) {
      return (this.getOption(name, opt_seriesName));
    };
    Dygraph.prototype.getFunctionOption = function(name, opt_seriesName) {
      return (this.getOption(name, opt_seriesName));
    };
    Dygraph.prototype.getOptionForAxis = function(name, axis) {
      return this.attributes_.getForAxis(name, axis);
    };
    Dygraph.prototype.optionsViewForAxis_ = function(axis) {
      var self = this;
      return function(opt) {
        var axis_opts = self.user_attrs_.axes;
        if (axis_opts && axis_opts[axis] && axis_opts[axis].hasOwnProperty(opt)) {
          return axis_opts[axis][opt];
        }
        if (axis === 'x' && opt === 'logscale') {
          return false;
        }
        if (typeof(self.user_attrs_[opt]) != 'undefined') {
          return self.user_attrs_[opt];
        }
        axis_opts = self.attrs_.axes;
        if (axis_opts && axis_opts[axis] && axis_opts[axis].hasOwnProperty(opt)) {
          return axis_opts[axis][opt];
        }
        if (axis == 'y' && self.axes_[0].hasOwnProperty(opt)) {
          return self.axes_[0][opt];
        } else if (axis == 'y2' && self.axes_[1].hasOwnProperty(opt)) {
          return self.axes_[1][opt];
        }
        return self.attr_(opt);
      };
    };
    Dygraph.prototype.rollPeriod = function() {
      return this.rollPeriod_;
    };
    Dygraph.prototype.xAxisRange = function() {
      return this.dateWindow_ ? this.dateWindow_ : this.xAxisExtremes();
    };
    Dygraph.prototype.xAxisExtremes = function() {
      var pad = this.getNumericOption('xRangePad') / this.plotter_.area.w;
      if (this.numRows() === 0) {
        return [0 - pad, 1 + pad];
      }
      var left = this.rawData_[0][0];
      var right = this.rawData_[this.rawData_.length - 1][0];
      if (pad) {
        var range = right - left;
        left -= range * pad;
        right += range * pad;
      }
      return [left, right];
    };
    Dygraph.prototype.yAxisRange = function(idx) {
      if (typeof(idx) == "undefined")
        idx = 0;
      if (idx < 0 || idx >= this.axes_.length) {
        return null;
      }
      var axis = this.axes_[idx];
      return [axis.computedValueRange[0], axis.computedValueRange[1]];
    };
    Dygraph.prototype.yAxisRanges = function() {
      var ret = [];
      for (var i = 0; i < this.axes_.length; i++) {
        ret.push(this.yAxisRange(i));
      }
      return ret;
    };
    Dygraph.prototype.toDomCoords = function(x, y, axis) {
      return [this.toDomXCoord(x), this.toDomYCoord(y, axis)];
    };
    Dygraph.prototype.toDomXCoord = function(x) {
      if (x === null) {
        return null;
      }
      var area = this.plotter_.area;
      var xRange = this.xAxisRange();
      return area.x + (x - xRange[0]) / (xRange[1] - xRange[0]) * area.w;
    };
    Dygraph.prototype.toDomYCoord = function(y, axis) {
      var pct = this.toPercentYCoord(y, axis);
      if (pct === null) {
        return null;
      }
      var area = this.plotter_.area;
      return area.y + pct * area.h;
    };
    Dygraph.prototype.toDataCoords = function(x, y, axis) {
      return [this.toDataXCoord(x), this.toDataYCoord(y, axis)];
    };
    Dygraph.prototype.toDataXCoord = function(x) {
      if (x === null) {
        return null;
      }
      var area = this.plotter_.area;
      var xRange = this.xAxisRange();
      if (!this.attributes_.getForAxis("logscale", 'x')) {
        return xRange[0] + (x - area.x) / area.w * (xRange[1] - xRange[0]);
      } else {
        var pct = (x - area.x) / area.w;
        var logr0 = Dygraph.log10(xRange[0]);
        var logr1 = Dygraph.log10(xRange[1]);
        var exponent = logr0 + (pct * (logr1 - logr0));
        var value = Math.pow(Dygraph.LOG_SCALE, exponent);
        return value;
      }
    };
    Dygraph.prototype.toDataYCoord = function(y, axis) {
      if (y === null) {
        return null;
      }
      var area = this.plotter_.area;
      var yRange = this.yAxisRange(axis);
      if (typeof(axis) == "undefined")
        axis = 0;
      if (!this.attributes_.getForAxis("logscale", axis)) {
        return yRange[0] + (area.y + area.h - y) / area.h * (yRange[1] - yRange[0]);
      } else {
        var pct = (y - area.y) / area.h;
        var logr0 = Dygraph.log10(yRange[0]);
        var logr1 = Dygraph.log10(yRange[1]);
        var exponent = logr1 - (pct * (logr1 - logr0));
        var value = Math.pow(Dygraph.LOG_SCALE, exponent);
        return value;
      }
    };
    Dygraph.prototype.toPercentYCoord = function(y, axis) {
      if (y === null) {
        return null;
      }
      if (typeof(axis) == "undefined")
        axis = 0;
      var yRange = this.yAxisRange(axis);
      var pct;
      var logscale = this.attributes_.getForAxis("logscale", axis);
      if (logscale) {
        var logr0 = Dygraph.log10(yRange[0]);
        var logr1 = Dygraph.log10(yRange[1]);
        pct = (logr1 - Dygraph.log10(y)) / (logr1 - logr0);
      } else {
        pct = (yRange[1] - y) / (yRange[1] - yRange[0]);
      }
      return pct;
    };
    Dygraph.prototype.toPercentXCoord = function(x) {
      if (x === null) {
        return null;
      }
      var xRange = this.xAxisRange();
      var pct;
      var logscale = this.attributes_.getForAxis("logscale", 'x');
      if (logscale === true) {
        var logr0 = Dygraph.log10(xRange[0]);
        var logr1 = Dygraph.log10(xRange[1]);
        pct = (Dygraph.log10(x) - logr0) / (logr1 - logr0);
      } else {
        pct = (x - xRange[0]) / (xRange[1] - xRange[0]);
      }
      return pct;
    };
    Dygraph.prototype.numColumns = function() {
      if (!this.rawData_)
        return 0;
      return this.rawData_[0] ? this.rawData_[0].length : this.attr_("labels").length;
    };
    Dygraph.prototype.numRows = function() {
      if (!this.rawData_)
        return 0;
      return this.rawData_.length;
    };
    Dygraph.prototype.getValue = function(row, col) {
      if (row < 0 || row > this.rawData_.length)
        return null;
      if (col < 0 || col > this.rawData_[row].length)
        return null;
      return this.rawData_[row][col];
    };
    Dygraph.prototype.createInterface_ = function() {
      var enclosing = this.maindiv_;
      this.graphDiv = document.createElement("div");
      this.graphDiv.style.textAlign = 'left';
      this.graphDiv.style.position = 'relative';
      enclosing.appendChild(this.graphDiv);
      this.canvas_ = Dygraph.createCanvas();
      this.canvas_.style.position = "absolute";
      this.hidden_ = this.createPlotKitCanvas_(this.canvas_);
      this.canvas_ctx_ = Dygraph.getContext(this.canvas_);
      this.hidden_ctx_ = Dygraph.getContext(this.hidden_);
      this.resizeElements_();
      this.graphDiv.appendChild(this.hidden_);
      this.graphDiv.appendChild(this.canvas_);
      this.mouseEventElement_ = this.createMouseEventElement_();
      this.layout_ = new DygraphLayout(this);
      var dygraph = this;
      this.mouseMoveHandler_ = function(e) {
        dygraph.mouseMove_(e);
      };
      this.mouseOutHandler_ = function(e) {
        var target = e.target || e.fromElement;
        var relatedTarget = e.relatedTarget || e.toElement;
        if (Dygraph.isNodeContainedBy(target, dygraph.graphDiv) && !Dygraph.isNodeContainedBy(relatedTarget, dygraph.graphDiv)) {
          dygraph.mouseOut_(e);
        }
      };
      this.addAndTrackEvent(window, 'mouseout', this.mouseOutHandler_);
      this.addAndTrackEvent(this.mouseEventElement_, 'mousemove', this.mouseMoveHandler_);
      if (!this.resizeHandler_) {
        this.resizeHandler_ = function(e) {
          dygraph.resize();
        };
        this.addAndTrackEvent(window, 'resize', this.resizeHandler_);
      }
    };
    Dygraph.prototype.resizeElements_ = function() {
      this.graphDiv.style.width = this.width_ + "px";
      this.graphDiv.style.height = this.height_ + "px";
      var canvasScale = Dygraph.getContextPixelRatio(this.canvas_ctx_);
      this.canvas_.width = this.width_ * canvasScale;
      this.canvas_.height = this.height_ * canvasScale;
      this.canvas_.style.width = this.width_ + "px";
      this.canvas_.style.height = this.height_ + "px";
      if (canvasScale !== 1) {
        this.canvas_ctx_.scale(canvasScale, canvasScale);
      }
      var hiddenScale = Dygraph.getContextPixelRatio(this.hidden_ctx_);
      this.hidden_.width = this.width_ * hiddenScale;
      this.hidden_.height = this.height_ * hiddenScale;
      this.hidden_.style.width = this.width_ + "px";
      this.hidden_.style.height = this.height_ + "px";
      if (hiddenScale !== 1) {
        this.hidden_ctx_.scale(hiddenScale, hiddenScale);
      }
    };
    Dygraph.prototype.destroy = function() {
      this.canvas_ctx_.restore();
      this.hidden_ctx_.restore();
      for (var i = this.plugins_.length - 1; i >= 0; i--) {
        var p = this.plugins_.pop();
        if (p.plugin.destroy)
          p.plugin.destroy();
      }
      var removeRecursive = function(node) {
        while (node.hasChildNodes()) {
          removeRecursive(node.firstChild);
          node.removeChild(node.firstChild);
        }
      };
      this.removeTrackedEvents_();
      Dygraph.removeEvent(window, 'mouseout', this.mouseOutHandler_);
      Dygraph.removeEvent(this.mouseEventElement_, 'mousemove', this.mouseMoveHandler_);
      Dygraph.removeEvent(window, 'resize', this.resizeHandler_);
      this.resizeHandler_ = null;
      removeRecursive(this.maindiv_);
      var nullOut = function(obj) {
        for (var n in obj) {
          if (typeof(obj[n]) === 'object') {
            obj[n] = null;
          }
        }
      };
      nullOut(this.layout_);
      nullOut(this.plotter_);
      nullOut(this);
    };
    Dygraph.prototype.createPlotKitCanvas_ = function(canvas) {
      var h = Dygraph.createCanvas();
      h.style.position = "absolute";
      h.style.top = canvas.style.top;
      h.style.left = canvas.style.left;
      h.width = this.width_;
      h.height = this.height_;
      h.style.width = this.width_ + "px";
      h.style.height = this.height_ + "px";
      return h;
    };
    Dygraph.prototype.createMouseEventElement_ = function() {
      if (this.isUsingExcanvas_) {
        var elem = document.createElement("div");
        elem.style.position = 'absolute';
        elem.style.backgroundColor = 'white';
        elem.style.filter = 'alpha(opacity=0)';
        elem.style.width = this.width_ + "px";
        elem.style.height = this.height_ + "px";
        this.graphDiv.appendChild(elem);
        return elem;
      } else {
        return this.canvas_;
      }
    };
    Dygraph.prototype.setColors_ = function() {
      var labels = this.getLabels();
      var num = labels.length - 1;
      this.colors_ = [];
      this.colorsMap_ = {};
      var sat = this.getNumericOption('colorSaturation') || 1.0;
      var val = this.getNumericOption('colorValue') || 0.5;
      var half = Math.ceil(num / 2);
      var colors = this.getOption('colors');
      var visibility = this.visibility();
      for (var i = 0; i < num; i++) {
        if (!visibility[i]) {
          continue;
        }
        var label = labels[i + 1];
        var colorStr = this.attributes_.getForSeries('color', label);
        if (!colorStr) {
          if (colors) {
            colorStr = colors[i % colors.length];
          } else {
            var idx = i % 2 ? (half + (i + 1) / 2) : Math.ceil((i + 1) / 2);
            var hue = (1.0 * idx / (1 + num));
            colorStr = Dygraph.hsvToRGB(hue, sat, val);
          }
        }
        this.colors_.push(colorStr);
        this.colorsMap_[label] = colorStr;
      }
    };
    Dygraph.prototype.getColors = function() {
      return this.colors_;
    };
    Dygraph.prototype.getPropertiesForSeries = function(series_name) {
      var idx = -1;
      var labels = this.getLabels();
      for (var i = 1; i < labels.length; i++) {
        if (labels[i] == series_name) {
          idx = i;
          break;
        }
      }
      if (idx == -1)
        return null;
      return {
        name: series_name,
        column: idx,
        visible: this.visibility()[idx - 1],
        color: this.colorsMap_[series_name],
        axis: 1 + this.attributes_.axisForSeries(series_name)
      };
    };
    Dygraph.prototype.createRollInterface_ = function() {
      if (!this.roller_) {
        this.roller_ = document.createElement("input");
        this.roller_.type = "text";
        this.roller_.style.display = "none";
        this.graphDiv.appendChild(this.roller_);
      }
      var display = this.getBooleanOption('showRoller') ? 'block' : 'none';
      var area = this.plotter_.area;
      var textAttr = {
        "position": "absolute",
        "zIndex": 10,
        "top": (area.y + area.h - 25) + "px",
        "left": (area.x + 1) + "px",
        "display": display
      };
      this.roller_.size = "2";
      this.roller_.value = this.rollPeriod_;
      for (var name in textAttr) {
        if (textAttr.hasOwnProperty(name)) {
          this.roller_.style[name] = textAttr[name];
        }
      }
      var dygraph = this;
      this.roller_.onchange = function() {
        dygraph.adjustRoll(dygraph.roller_.value);
      };
    };
    Dygraph.prototype.createDragInterface_ = function() {
      var context = {
        isZooming: false,
        isPanning: false,
        is2DPan: false,
        dragStartX: null,
        dragStartY: null,
        dragEndX: null,
        dragEndY: null,
        dragDirection: null,
        prevEndX: null,
        prevEndY: null,
        prevDragDirection: null,
        cancelNextDblclick: false,
        initialLeftmostDate: null,
        xUnitsPerPixel: null,
        dateRange: null,
        px: 0,
        py: 0,
        boundedDates: null,
        boundedValues: null,
        tarp: new Dygraph.IFrameTarp(),
        initializeMouseDown: function(event, g, contextB) {
          if (event.preventDefault) {
            event.preventDefault();
          } else {
            event.returnValue = false;
            event.cancelBubble = true;
          }
          var canvasPos = Dygraph.findPos(g.canvas_);
          contextB.px = canvasPos.x;
          contextB.py = canvasPos.y;
          contextB.dragStartX = Dygraph.dragGetX_(event, contextB);
          contextB.dragStartY = Dygraph.dragGetY_(event, contextB);
          contextB.cancelNextDblclick = false;
          contextB.tarp.cover();
        },
        destroy: function() {
          var context = this;
          if (context.isZooming || context.isPanning) {
            context.isZooming = false;
            context.dragStartX = null;
            context.dragStartY = null;
          }
          if (context.isPanning) {
            context.isPanning = false;
            context.draggingDate = null;
            context.dateRange = null;
            for (var i = 0; i < self.axes_.length; i++) {
              delete self.axes_[i].draggingValue;
              delete self.axes_[i].dragValueRange;
            }
          }
          context.tarp.uncover();
        }
      };
      var interactionModel = this.getOption("interactionModel");
      var self = this;
      var bindHandler = function(handler) {
        return function(event) {
          handler(event, self, context);
        };
      };
      for (var eventName in interactionModel) {
        if (!interactionModel.hasOwnProperty(eventName))
          continue;
        this.addAndTrackEvent(this.mouseEventElement_, eventName, bindHandler(interactionModel[eventName]));
      }
      if (!interactionModel.willDestroyContextMyself) {
        var mouseUpHandler = function(event) {
          context.destroy();
        };
        this.addAndTrackEvent(document, 'mouseup', mouseUpHandler);
      }
    };
    Dygraph.prototype.drawZoomRect_ = function(direction, startX, endX, startY, endY, prevDirection, prevEndX, prevEndY) {
      var ctx = this.canvas_ctx_;
      if (prevDirection == Dygraph.HORIZONTAL) {
        ctx.clearRect(Math.min(startX, prevEndX), this.layout_.getPlotArea().y, Math.abs(startX - prevEndX), this.layout_.getPlotArea().h);
      } else if (prevDirection == Dygraph.VERTICAL) {
        ctx.clearRect(this.layout_.getPlotArea().x, Math.min(startY, prevEndY), this.layout_.getPlotArea().w, Math.abs(startY - prevEndY));
      }
      if (direction == Dygraph.HORIZONTAL) {
        if (endX && startX) {
          ctx.fillStyle = "rgba(128,128,128,0.33)";
          ctx.fillRect(Math.min(startX, endX), this.layout_.getPlotArea().y, Math.abs(endX - startX), this.layout_.getPlotArea().h);
        }
      } else if (direction == Dygraph.VERTICAL) {
        if (endY && startY) {
          ctx.fillStyle = "rgba(128,128,128,0.33)";
          ctx.fillRect(this.layout_.getPlotArea().x, Math.min(startY, endY), this.layout_.getPlotArea().w, Math.abs(endY - startY));
        }
      }
      if (this.isUsingExcanvas_) {
        this.currentZoomRectArgs_ = [direction, startX, endX, startY, endY, 0, 0, 0];
      }
    };
    Dygraph.prototype.clearZoomRect_ = function() {
      this.currentZoomRectArgs_ = null;
      this.canvas_ctx_.clearRect(0, 0, this.width_, this.height_);
    };
    Dygraph.prototype.doZoomX_ = function(lowX, highX) {
      this.currentZoomRectArgs_ = null;
      var minDate = this.toDataXCoord(lowX);
      var maxDate = this.toDataXCoord(highX);
      this.doZoomXDates_(minDate, maxDate);
    };
    Dygraph.prototype.doZoomXDates_ = function(minDate, maxDate) {
      var old_window = this.xAxisRange();
      var new_window = [minDate, maxDate];
      this.zoomed_x_ = true;
      var that = this;
      this.doAnimatedZoom(old_window, new_window, null, null, function() {
        if (that.getFunctionOption("zoomCallback")) {
          that.getFunctionOption("zoomCallback").call(that, minDate, maxDate, that.yAxisRanges());
        }
      });
    };
    Dygraph.prototype.doZoomY_ = function(lowY, highY) {
      this.currentZoomRectArgs_ = null;
      var oldValueRanges = this.yAxisRanges();
      var newValueRanges = [];
      for (var i = 0; i < this.axes_.length; i++) {
        var hi = this.toDataYCoord(lowY, i);
        var low = this.toDataYCoord(highY, i);
        newValueRanges.push([low, hi]);
      }
      this.zoomed_y_ = true;
      var that = this;
      this.doAnimatedZoom(null, null, oldValueRanges, newValueRanges, function() {
        if (that.getFunctionOption("zoomCallback")) {
          var xRange = that.xAxisRange();
          that.getFunctionOption("zoomCallback").call(that, xRange[0], xRange[1], that.yAxisRanges());
        }
      });
    };
    Dygraph.zoomAnimationFunction = function(frame, numFrames) {
      var k = 1.5;
      return (1.0 - Math.pow(k, -frame)) / (1.0 - Math.pow(k, -numFrames));
    };
    Dygraph.prototype.resetZoom = function() {
      var dirty = false,
          dirtyX = false,
          dirtyY = false;
      if (this.dateWindow_ !== null) {
        dirty = true;
        dirtyX = true;
      }
      for (var i = 0; i < this.axes_.length; i++) {
        if (typeof(this.axes_[i].valueWindow) !== 'undefined' && this.axes_[i].valueWindow !== null) {
          dirty = true;
          dirtyY = true;
        }
      }
      this.clearSelection();
      if (dirty) {
        this.zoomed_x_ = false;
        this.zoomed_y_ = false;
        var minDate = this.rawData_[0][0];
        var maxDate = this.rawData_[this.rawData_.length - 1][0];
        if (!this.getBooleanOption("animatedZooms")) {
          this.dateWindow_ = null;
          for (i = 0; i < this.axes_.length; i++) {
            if (this.axes_[i].valueWindow !== null) {
              delete this.axes_[i].valueWindow;
            }
          }
          this.drawGraph_();
          if (this.getFunctionOption("zoomCallback")) {
            this.getFunctionOption("zoomCallback").call(this, minDate, maxDate, this.yAxisRanges());
          }
          return;
        }
        var oldWindow = null,
            newWindow = null,
            oldValueRanges = null,
            newValueRanges = null;
        if (dirtyX) {
          oldWindow = this.xAxisRange();
          newWindow = [minDate, maxDate];
        }
        if (dirtyY) {
          oldValueRanges = this.yAxisRanges();
          var packed = this.gatherDatasets_(this.rolledSeries_, null);
          var extremes = packed.extremes;
          this.computeYAxisRanges_(extremes);
          newValueRanges = [];
          for (i = 0; i < this.axes_.length; i++) {
            var axis = this.axes_[i];
            newValueRanges.push((axis.valueRange !== null && axis.valueRange !== undefined) ? axis.valueRange : axis.extremeRange);
          }
        }
        var that = this;
        this.doAnimatedZoom(oldWindow, newWindow, oldValueRanges, newValueRanges, function() {
          that.dateWindow_ = null;
          for (var i = 0; i < that.axes_.length; i++) {
            if (that.axes_[i].valueWindow !== null) {
              delete that.axes_[i].valueWindow;
            }
          }
          if (that.getFunctionOption("zoomCallback")) {
            that.getFunctionOption("zoomCallback").call(that, minDate, maxDate, that.yAxisRanges());
          }
        });
      }
    };
    Dygraph.prototype.doAnimatedZoom = function(oldXRange, newXRange, oldYRanges, newYRanges, callback) {
      var steps = this.getBooleanOption("animatedZooms") ? Dygraph.ANIMATION_STEPS : 1;
      var windows = [];
      var valueRanges = [];
      var step,
          frac;
      if (oldXRange !== null && newXRange !== null) {
        for (step = 1; step <= steps; step++) {
          frac = Dygraph.zoomAnimationFunction(step, steps);
          windows[step - 1] = [oldXRange[0] * (1 - frac) + frac * newXRange[0], oldXRange[1] * (1 - frac) + frac * newXRange[1]];
        }
      }
      if (oldYRanges !== null && newYRanges !== null) {
        for (step = 1; step <= steps; step++) {
          frac = Dygraph.zoomAnimationFunction(step, steps);
          var thisRange = [];
          for (var j = 0; j < this.axes_.length; j++) {
            thisRange.push([oldYRanges[j][0] * (1 - frac) + frac * newYRanges[j][0], oldYRanges[j][1] * (1 - frac) + frac * newYRanges[j][1]]);
          }
          valueRanges[step - 1] = thisRange;
        }
      }
      var that = this;
      Dygraph.repeatAndCleanup(function(step) {
        if (valueRanges.length) {
          for (var i = 0; i < that.axes_.length; i++) {
            var w = valueRanges[step][i];
            that.axes_[i].valueWindow = [w[0], w[1]];
          }
        }
        if (windows.length) {
          that.dateWindow_ = windows[step];
        }
        that.drawGraph_();
      }, steps, Dygraph.ANIMATION_DURATION / steps, callback);
    };
    Dygraph.prototype.getArea = function() {
      return this.plotter_.area;
    };
    Dygraph.prototype.eventToDomCoords = function(event) {
      if (event.offsetX && event.offsetY) {
        return [event.offsetX, event.offsetY];
      } else {
        var eventElementPos = Dygraph.findPos(this.mouseEventElement_);
        var canvasx = Dygraph.pageX(event) - eventElementPos.x;
        var canvasy = Dygraph.pageY(event) - eventElementPos.y;
        return [canvasx, canvasy];
      }
    };
    Dygraph.prototype.findClosestRow = function(domX) {
      var minDistX = Infinity;
      var closestRow = -1;
      var sets = this.layout_.points;
      for (var i = 0; i < sets.length; i++) {
        var points = sets[i];
        var len = points.length;
        for (var j = 0; j < len; j++) {
          var point = points[j];
          if (!Dygraph.isValidPoint(point, true))
            continue;
          var dist = Math.abs(point.canvasx - domX);
          if (dist < minDistX) {
            minDistX = dist;
            closestRow = point.idx;
          }
        }
      }
      return closestRow;
    };
    Dygraph.prototype.findClosestPoint = function(domX, domY) {
      var minDist = Infinity;
      var dist,
          dx,
          dy,
          point,
          closestPoint,
          closestSeries,
          closestRow;
      for (var setIdx = this.layout_.points.length - 1; setIdx >= 0; --setIdx) {
        var points = this.layout_.points[setIdx];
        for (var i = 0; i < points.length; ++i) {
          point = points[i];
          if (!Dygraph.isValidPoint(point))
            continue;
          dx = point.canvasx - domX;
          dy = point.canvasy - domY;
          dist = dx * dx + dy * dy;
          if (dist < minDist) {
            minDist = dist;
            closestPoint = point;
            closestSeries = setIdx;
            closestRow = point.idx;
          }
        }
      }
      var name = this.layout_.setNames[closestSeries];
      return {
        row: closestRow,
        seriesName: name,
        point: closestPoint
      };
    };
    Dygraph.prototype.findStackedPoint = function(domX, domY) {
      var row = this.findClosestRow(domX);
      var closestPoint,
          closestSeries;
      for (var setIdx = 0; setIdx < this.layout_.points.length; ++setIdx) {
        var boundary = this.getLeftBoundary_(setIdx);
        var rowIdx = row - boundary;
        var points = this.layout_.points[setIdx];
        if (rowIdx >= points.length)
          continue;
        var p1 = points[rowIdx];
        if (!Dygraph.isValidPoint(p1))
          continue;
        var py = p1.canvasy;
        if (domX > p1.canvasx && rowIdx + 1 < points.length) {
          var p2 = points[rowIdx + 1];
          if (Dygraph.isValidPoint(p2)) {
            var dx = p2.canvasx - p1.canvasx;
            if (dx > 0) {
              var r = (domX - p1.canvasx) / dx;
              py += r * (p2.canvasy - p1.canvasy);
            }
          }
        } else if (domX < p1.canvasx && rowIdx > 0) {
          var p0 = points[rowIdx - 1];
          if (Dygraph.isValidPoint(p0)) {
            var dx = p1.canvasx - p0.canvasx;
            if (dx > 0) {
              var r = (p1.canvasx - domX) / dx;
              py += r * (p0.canvasy - p1.canvasy);
            }
          }
        }
        if (setIdx === 0 || py < domY) {
          closestPoint = p1;
          closestSeries = setIdx;
        }
      }
      var name = this.layout_.setNames[closestSeries];
      return {
        row: row,
        seriesName: name,
        point: closestPoint
      };
    };
    Dygraph.prototype.mouseMove_ = function(event) {
      var points = this.layout_.points;
      if (points === undefined || points === null)
        return;
      var canvasCoords = this.eventToDomCoords(event);
      var canvasx = canvasCoords[0];
      var canvasy = canvasCoords[1];
      var highlightSeriesOpts = this.getOption("highlightSeriesOpts");
      var selectionChanged = false;
      if (highlightSeriesOpts && !this.isSeriesLocked()) {
        var closest;
        if (this.getBooleanOption("stackedGraph")) {
          closest = this.findStackedPoint(canvasx, canvasy);
        } else {
          closest = this.findClosestPoint(canvasx, canvasy);
        }
        selectionChanged = this.setSelection(closest.row, closest.seriesName);
      } else {
        var idx = this.findClosestRow(canvasx);
        selectionChanged = this.setSelection(idx);
      }
      var callback = this.getFunctionOption("highlightCallback");
      if (callback && selectionChanged) {
        callback.call(this, event, this.lastx_, this.selPoints_, this.lastRow_, this.highlightSet_);
      }
    };
    Dygraph.prototype.getLeftBoundary_ = function(setIdx) {
      if (this.boundaryIds_[setIdx]) {
        return this.boundaryIds_[setIdx][0];
      } else {
        for (var i = 0; i < this.boundaryIds_.length; i++) {
          if (this.boundaryIds_[i] !== undefined) {
            return this.boundaryIds_[i][0];
          }
        }
        return 0;
      }
    };
    Dygraph.prototype.animateSelection_ = function(direction) {
      var totalSteps = 10;
      var millis = 30;
      if (this.fadeLevel === undefined)
        this.fadeLevel = 0;
      if (this.animateId === undefined)
        this.animateId = 0;
      var start = this.fadeLevel;
      var steps = direction < 0 ? start : totalSteps - start;
      if (steps <= 0) {
        if (this.fadeLevel) {
          this.updateSelection_(1.0);
        }
        return;
      }
      var thisId = ++this.animateId;
      var that = this;
      Dygraph.repeatAndCleanup(function(n) {
        if (that.animateId != thisId)
          return;
        that.fadeLevel += direction;
        if (that.fadeLevel === 0) {
          that.clearSelection();
        } else {
          that.updateSelection_(that.fadeLevel / totalSteps);
        }
      }, steps, millis, function() {});
    };
    Dygraph.prototype.updateSelection_ = function(opt_animFraction) {
      this.cascadeEvents_('select', {
        selectedRow: this.lastRow_,
        selectedX: this.lastx_,
        selectedPoints: this.selPoints_
      });
      var i;
      var ctx = this.canvas_ctx_;
      if (this.getOption('highlightSeriesOpts')) {
        ctx.clearRect(0, 0, this.width_, this.height_);
        var alpha = 1.0 - this.getNumericOption('highlightSeriesBackgroundAlpha');
        if (alpha) {
          var animateBackgroundFade = true;
          if (animateBackgroundFade) {
            if (opt_animFraction === undefined) {
              this.animateSelection_(1);
              return;
            }
            alpha *= opt_animFraction;
          }
          ctx.fillStyle = 'rgba(255,255,255,' + alpha + ')';
          ctx.fillRect(0, 0, this.width_, this.height_);
        }
        this.plotter_._renderLineChart(this.highlightSet_, ctx);
      } else if (this.previousVerticalX_ >= 0) {
        var maxCircleSize = 0;
        var labels = this.attr_('labels');
        for (i = 1; i < labels.length; i++) {
          var r = this.getNumericOption('highlightCircleSize', labels[i]);
          if (r > maxCircleSize)
            maxCircleSize = r;
        }
        var px = this.previousVerticalX_;
        ctx.clearRect(px - maxCircleSize - 1, 0, 2 * maxCircleSize + 2, this.height_);
      }
      if (this.isUsingExcanvas_ && this.currentZoomRectArgs_) {
        Dygraph.prototype.drawZoomRect_.apply(this, this.currentZoomRectArgs_);
      }
      if (this.selPoints_.length > 0) {
        var canvasx = this.selPoints_[0].canvasx;
        ctx.save();
        for (i = 0; i < this.selPoints_.length; i++) {
          var pt = this.selPoints_[i];
          if (!Dygraph.isOK(pt.canvasy))
            continue;
          var circleSize = this.getNumericOption('highlightCircleSize', pt.name);
          var callback = this.getFunctionOption("drawHighlightPointCallback", pt.name);
          var color = this.plotter_.colors[pt.name];
          if (!callback) {
            callback = Dygraph.Circles.DEFAULT;
          }
          ctx.lineWidth = this.getNumericOption('strokeWidth', pt.name);
          ctx.strokeStyle = color;
          ctx.fillStyle = color;
          callback.call(this, this, pt.name, ctx, canvasx, pt.canvasy, color, circleSize, pt.idx);
        }
        ctx.restore();
        this.previousVerticalX_ = canvasx;
      }
    };
    Dygraph.prototype.setSelection = function(row, opt_seriesName, opt_locked) {
      this.selPoints_ = [];
      var changed = false;
      if (row !== false && row >= 0) {
        if (row != this.lastRow_)
          changed = true;
        this.lastRow_ = row;
        for (var setIdx = 0; setIdx < this.layout_.points.length; ++setIdx) {
          var points = this.layout_.points[setIdx];
          var setRow = row - this.getLeftBoundary_(setIdx);
          if (setRow < points.length && points[setRow].idx == row) {
            var point = points[setRow];
            if (point.yval !== null)
              this.selPoints_.push(point);
          } else {
            for (var pointIdx = 0; pointIdx < points.length; ++pointIdx) {
              var point = points[pointIdx];
              if (point.idx == row) {
                if (point.yval !== null) {
                  this.selPoints_.push(point);
                }
                break;
              }
            }
          }
        }
      } else {
        if (this.lastRow_ >= 0)
          changed = true;
        this.lastRow_ = -1;
      }
      if (this.selPoints_.length) {
        this.lastx_ = this.selPoints_[0].xval;
      } else {
        this.lastx_ = -1;
      }
      if (opt_seriesName !== undefined) {
        if (this.highlightSet_ !== opt_seriesName)
          changed = true;
        this.highlightSet_ = opt_seriesName;
      }
      if (opt_locked !== undefined) {
        this.lockedSet_ = opt_locked;
      }
      if (changed) {
        this.updateSelection_(undefined);
      }
      return changed;
    };
    Dygraph.prototype.mouseOut_ = function(event) {
      if (this.getFunctionOption("unhighlightCallback")) {
        this.getFunctionOption("unhighlightCallback").call(this, event);
      }
      if (this.getBooleanOption("hideOverlayOnMouseOut") && !this.lockedSet_) {
        this.clearSelection();
      }
    };
    Dygraph.prototype.clearSelection = function() {
      this.cascadeEvents_('deselect', {});
      this.lockedSet_ = false;
      if (this.fadeLevel) {
        this.animateSelection_(-1);
        return;
      }
      this.canvas_ctx_.clearRect(0, 0, this.width_, this.height_);
      this.fadeLevel = 0;
      this.selPoints_ = [];
      this.lastx_ = -1;
      this.lastRow_ = -1;
      this.highlightSet_ = null;
    };
    Dygraph.prototype.getSelection = function() {
      if (!this.selPoints_ || this.selPoints_.length < 1) {
        return -1;
      }
      for (var setIdx = 0; setIdx < this.layout_.points.length; setIdx++) {
        var points = this.layout_.points[setIdx];
        for (var row = 0; row < points.length; row++) {
          if (points[row].x == this.selPoints_[0].x) {
            return points[row].idx;
          }
        }
      }
      return -1;
    };
    Dygraph.prototype.getHighlightSeries = function() {
      return this.highlightSet_;
    };
    Dygraph.prototype.isSeriesLocked = function() {
      return this.lockedSet_;
    };
    Dygraph.prototype.loadedEvent_ = function(data) {
      this.rawData_ = this.parseCSV_(data);
      this.cascadeDataDidUpdateEvent_();
      this.predraw_();
    };
    Dygraph.prototype.addXTicks_ = function() {
      var range;
      if (this.dateWindow_) {
        range = [this.dateWindow_[0], this.dateWindow_[1]];
      } else {
        range = this.xAxisExtremes();
      }
      var xAxisOptionsView = this.optionsViewForAxis_('x');
      var xTicks = xAxisOptionsView('ticker')(range[0], range[1], this.plotter_.area.w, xAxisOptionsView, this);
      this.layout_.setXTicks(xTicks);
    };
    Dygraph.prototype.getHandlerClass_ = function() {
      var handlerClass;
      if (this.attr_('dataHandler')) {
        handlerClass = this.attr_('dataHandler');
      } else if (this.fractions_) {
        if (this.getBooleanOption('errorBars')) {
          handlerClass = Dygraph.DataHandlers.FractionsBarsHandler;
        } else {
          handlerClass = Dygraph.DataHandlers.DefaultFractionHandler;
        }
      } else if (this.getBooleanOption('customBars')) {
        handlerClass = Dygraph.DataHandlers.CustomBarsHandler;
      } else if (this.getBooleanOption('errorBars')) {
        handlerClass = Dygraph.DataHandlers.ErrorBarsHandler;
      } else {
        handlerClass = Dygraph.DataHandlers.DefaultHandler;
      }
      return handlerClass;
    };
    Dygraph.prototype.predraw_ = function() {
      var start = new Date();
      this.dataHandler_ = new (this.getHandlerClass_())();
      this.layout_.computePlotArea();
      this.computeYAxes_();
      if (!this.is_initial_draw_) {
        this.canvas_ctx_.restore();
        this.hidden_ctx_.restore();
      }
      this.canvas_ctx_.save();
      this.hidden_ctx_.save();
      this.plotter_ = new DygraphCanvasRenderer(this, this.hidden_, this.hidden_ctx_, this.layout_);
      this.createRollInterface_();
      this.cascadeEvents_('predraw');
      this.rolledSeries_ = [null];
      for (var i = 1; i < this.numColumns(); i++) {
        var series = this.dataHandler_.extractSeries(this.rawData_, i, this.attributes_);
        if (this.rollPeriod_ > 1) {
          series = this.dataHandler_.rollingAverage(series, this.rollPeriod_, this.attributes_);
        }
        this.rolledSeries_.push(series);
      }
      this.drawGraph_();
      var end = new Date();
      this.drawingTimeMs_ = (end - start);
    };
    Dygraph.PointType = undefined;
    Dygraph.stackPoints_ = function(points, cumulativeYval, seriesExtremes, fillMethod) {
      var lastXval = null;
      var prevPoint = null;
      var nextPoint = null;
      var nextPointIdx = -1;
      var updateNextPoint = function(idx) {
        if (nextPointIdx >= idx)
          return;
        for (var j = idx; j < points.length; ++j) {
          nextPoint = null;
          if (!isNaN(points[j].yval) && points[j].yval !== null) {
            nextPointIdx = j;
            nextPoint = points[j];
            break;
          }
        }
      };
      for (var i = 0; i < points.length; ++i) {
        var point = points[i];
        var xval = point.xval;
        if (cumulativeYval[xval] === undefined) {
          cumulativeYval[xval] = 0;
        }
        var actualYval = point.yval;
        if (isNaN(actualYval) || actualYval === null) {
          if (fillMethod == 'none') {
            actualYval = 0;
          } else {
            updateNextPoint(i);
            if (prevPoint && nextPoint && fillMethod != 'none') {
              actualYval = prevPoint.yval + (nextPoint.yval - prevPoint.yval) * ((xval - prevPoint.xval) / (nextPoint.xval - prevPoint.xval));
            } else if (prevPoint && fillMethod == 'all') {
              actualYval = prevPoint.yval;
            } else if (nextPoint && fillMethod == 'all') {
              actualYval = nextPoint.yval;
            } else {
              actualYval = 0;
            }
          }
        } else {
          prevPoint = point;
        }
        var stackedYval = cumulativeYval[xval];
        if (lastXval != xval) {
          stackedYval += actualYval;
          cumulativeYval[xval] = stackedYval;
        }
        lastXval = xval;
        point.yval_stacked = stackedYval;
        if (stackedYval > seriesExtremes[1]) {
          seriesExtremes[1] = stackedYval;
        }
        if (stackedYval < seriesExtremes[0]) {
          seriesExtremes[0] = stackedYval;
        }
      }
    };
    Dygraph.prototype.gatherDatasets_ = function(rolledSeries, dateWindow) {
      var boundaryIds = [];
      var points = [];
      var cumulativeYval = [];
      var extremes = {};
      var seriesIdx,
          sampleIdx;
      var firstIdx,
          lastIdx;
      var axisIdx;
      var num_series = rolledSeries.length - 1;
      var series;
      for (seriesIdx = num_series; seriesIdx >= 1; seriesIdx--) {
        if (!this.visibility()[seriesIdx - 1])
          continue;
        if (dateWindow) {
          series = rolledSeries[seriesIdx];
          var low = dateWindow[0];
          var high = dateWindow[1];
          firstIdx = null;
          lastIdx = null;
          for (sampleIdx = 0; sampleIdx < series.length; sampleIdx++) {
            if (series[sampleIdx][0] >= low && firstIdx === null) {
              firstIdx = sampleIdx;
            }
            if (series[sampleIdx][0] <= high) {
              lastIdx = sampleIdx;
            }
          }
          if (firstIdx === null)
            firstIdx = 0;
          var correctedFirstIdx = firstIdx;
          var isInvalidValue = true;
          while (isInvalidValue && correctedFirstIdx > 0) {
            correctedFirstIdx--;
            isInvalidValue = series[correctedFirstIdx][1] === null;
          }
          if (lastIdx === null)
            lastIdx = series.length - 1;
          var correctedLastIdx = lastIdx;
          isInvalidValue = true;
          while (isInvalidValue && correctedLastIdx < series.length - 1) {
            correctedLastIdx++;
            isInvalidValue = series[correctedLastIdx][1] === null;
          }
          if (correctedFirstIdx !== firstIdx) {
            firstIdx = correctedFirstIdx;
          }
          if (correctedLastIdx !== lastIdx) {
            lastIdx = correctedLastIdx;
          }
          boundaryIds[seriesIdx - 1] = [firstIdx, lastIdx];
          series = series.slice(firstIdx, lastIdx + 1);
        } else {
          series = rolledSeries[seriesIdx];
          boundaryIds[seriesIdx - 1] = [0, series.length - 1];
        }
        var seriesName = this.attr_("labels")[seriesIdx];
        var seriesExtremes = this.dataHandler_.getExtremeYValues(series, dateWindow, this.getBooleanOption("stepPlot", seriesName));
        var seriesPoints = this.dataHandler_.seriesToPoints(series, seriesName, boundaryIds[seriesIdx - 1][0]);
        if (this.getBooleanOption("stackedGraph")) {
          axisIdx = this.attributes_.axisForSeries(seriesName);
          if (cumulativeYval[axisIdx] === undefined) {
            cumulativeYval[axisIdx] = [];
          }
          Dygraph.stackPoints_(seriesPoints, cumulativeYval[axisIdx], seriesExtremes, this.getBooleanOption("stackedGraphNaNFill"));
        }
        extremes[seriesName] = seriesExtremes;
        points[seriesIdx] = seriesPoints;
      }
      return {
        points: points,
        extremes: extremes,
        boundaryIds: boundaryIds
      };
    };
    Dygraph.prototype.drawGraph_ = function() {
      var start = new Date();
      var is_initial_draw = this.is_initial_draw_;
      this.is_initial_draw_ = false;
      this.layout_.removeAllDatasets();
      this.setColors_();
      this.attrs_.pointSize = 0.5 * this.getNumericOption('highlightCircleSize');
      var packed = this.gatherDatasets_(this.rolledSeries_, this.dateWindow_);
      var points = packed.points;
      var extremes = packed.extremes;
      this.boundaryIds_ = packed.boundaryIds;
      this.setIndexByName_ = {};
      var labels = this.attr_("labels");
      if (labels.length > 0) {
        this.setIndexByName_[labels[0]] = 0;
      }
      var dataIdx = 0;
      for (var i = 1; i < points.length; i++) {
        this.setIndexByName_[labels[i]] = i;
        if (!this.visibility()[i - 1])
          continue;
        this.layout_.addDataset(labels[i], points[i]);
        this.datasetIndex_[i] = dataIdx++;
      }
      this.computeYAxisRanges_(extremes);
      this.layout_.setYAxes(this.axes_);
      this.addXTicks_();
      var tmp_zoomed_x = this.zoomed_x_;
      this.zoomed_x_ = tmp_zoomed_x;
      this.layout_.evaluate();
      this.renderGraph_(is_initial_draw);
      if (this.getStringOption("timingName")) {
        var end = new Date();
        console.log(this.getStringOption("timingName") + " - drawGraph: " + (end - start) + "ms");
      }
    };
    Dygraph.prototype.renderGraph_ = function(is_initial_draw) {
      this.cascadeEvents_('clearChart');
      this.plotter_.clear();
      if (this.getFunctionOption('underlayCallback')) {
        this.getFunctionOption('underlayCallback').call(this, this.hidden_ctx_, this.layout_.getPlotArea(), this, this);
      }
      var e = {
        canvas: this.hidden_,
        drawingContext: this.hidden_ctx_
      };
      this.cascadeEvents_('willDrawChart', e);
      this.plotter_.render();
      this.cascadeEvents_('didDrawChart', e);
      this.lastRow_ = -1;
      this.canvas_.getContext('2d').clearRect(0, 0, this.width_, this.height_);
      if (this.getFunctionOption("drawCallback") !== null) {
        this.getFunctionOption("drawCallback").call(this, this, is_initial_draw);
      }
      if (is_initial_draw) {
        this.readyFired_ = true;
        while (this.readyFns_.length > 0) {
          var fn = this.readyFns_.pop();
          fn(this);
        }
      }
    };
    Dygraph.prototype.computeYAxes_ = function() {
      var valueWindows,
          axis,
          index,
          opts,
          v;
      if (this.axes_ !== undefined && this.user_attrs_.hasOwnProperty("valueRange") === false) {
        valueWindows = [];
        for (index = 0; index < this.axes_.length; index++) {
          valueWindows.push(this.axes_[index].valueWindow);
        }
      }
      this.axes_ = [];
      for (axis = 0; axis < this.attributes_.numAxes(); axis++) {
        opts = {g: this};
        Dygraph.update(opts, this.attributes_.axisOptions(axis));
        this.axes_[axis] = opts;
      }
      v = this.attr_('valueRange');
      if (v)
        this.axes_[0].valueRange = v;
      if (valueWindows !== undefined) {
        var idxCount = Math.min(valueWindows.length, this.axes_.length);
        for (index = 0; index < idxCount; index++) {
          this.axes_[index].valueWindow = valueWindows[index];
        }
      }
      for (axis = 0; axis < this.axes_.length; axis++) {
        if (axis === 0) {
          opts = this.optionsViewForAxis_('y' + (axis ? '2' : ''));
          v = opts("valueRange");
          if (v)
            this.axes_[axis].valueRange = v;
        } else {
          var axes = this.user_attrs_.axes;
          if (axes && axes.y2) {
            v = axes.y2.valueRange;
            if (v)
              this.axes_[axis].valueRange = v;
          }
        }
      }
    };
    Dygraph.prototype.numAxes = function() {
      return this.attributes_.numAxes();
    };
    Dygraph.prototype.axisPropertiesForSeries = function(series) {
      return this.axes_[this.attributes_.axisForSeries(series)];
    };
    Dygraph.prototype.computeYAxisRanges_ = function(extremes) {
      var isNullUndefinedOrNaN = function(num) {
        return isNaN(parseFloat(num));
      };
      var numAxes = this.attributes_.numAxes();
      var ypadCompat,
          span,
          series,
          ypad;
      var p_axis;
      for (var i = 0; i < numAxes; i++) {
        var axis = this.axes_[i];
        var logscale = this.attributes_.getForAxis("logscale", i);
        var includeZero = this.attributes_.getForAxis("includeZero", i);
        var independentTicks = this.attributes_.getForAxis("independentTicks", i);
        series = this.attributes_.seriesForAxis(i);
        ypadCompat = true;
        ypad = 0.1;
        if (this.getNumericOption('yRangePad') !== null) {
          ypadCompat = false;
          ypad = this.getNumericOption('yRangePad') / this.plotter_.area.h;
        }
        if (series.length === 0) {
          axis.extremeRange = [0, 1];
        } else {
          var minY = Infinity;
          var maxY = -Infinity;
          var extremeMinY,
              extremeMaxY;
          for (var j = 0; j < series.length; j++) {
            if (!extremes.hasOwnProperty(series[j]))
              continue;
            extremeMinY = extremes[series[j]][0];
            if (extremeMinY !== null) {
              minY = Math.min(extremeMinY, minY);
            }
            extremeMaxY = extremes[series[j]][1];
            if (extremeMaxY !== null) {
              maxY = Math.max(extremeMaxY, maxY);
            }
          }
          if (includeZero && !logscale) {
            if (minY > 0)
              minY = 0;
            if (maxY < 0)
              maxY = 0;
          }
          if (minY == Infinity)
            minY = 0;
          if (maxY == -Infinity)
            maxY = 1;
          span = maxY - minY;
          if (span === 0) {
            if (maxY !== 0) {
              span = Math.abs(maxY);
            } else {
              maxY = 1;
              span = 1;
            }
          }
          var maxAxisY,
              minAxisY;
          if (logscale) {
            if (ypadCompat) {
              maxAxisY = maxY + ypad * span;
              minAxisY = minY;
            } else {
              var logpad = Math.exp(Math.log(span) * ypad);
              maxAxisY = maxY * logpad;
              minAxisY = minY / logpad;
            }
          } else {
            maxAxisY = maxY + ypad * span;
            minAxisY = minY - ypad * span;
            if (ypadCompat && !this.getBooleanOption("avoidMinZero")) {
              if (minAxisY < 0 && minY >= 0)
                minAxisY = 0;
              if (maxAxisY > 0 && maxY <= 0)
                maxAxisY = 0;
            }
          }
          axis.extremeRange = [minAxisY, maxAxisY];
        }
        if (axis.valueWindow) {
          axis.computedValueRange = [axis.valueWindow[0], axis.valueWindow[1]];
        } else if (axis.valueRange) {
          var y0 = isNullUndefinedOrNaN(axis.valueRange[0]) ? axis.extremeRange[0] : axis.valueRange[0];
          var y1 = isNullUndefinedOrNaN(axis.valueRange[1]) ? axis.extremeRange[1] : axis.valueRange[1];
          if (!ypadCompat) {
            if (axis.logscale) {
              var logpad = Math.exp(Math.log(span) * ypad);
              y0 *= logpad;
              y1 /= logpad;
            } else {
              span = y1 - y0;
              y0 -= span * ypad;
              y1 += span * ypad;
            }
          }
          axis.computedValueRange = [y0, y1];
        } else {
          axis.computedValueRange = axis.extremeRange;
        }
        if (independentTicks) {
          axis.independentTicks = independentTicks;
          var opts = this.optionsViewForAxis_('y' + (i ? '2' : ''));
          var ticker = opts('ticker');
          axis.ticks = ticker(axis.computedValueRange[0], axis.computedValueRange[1], this.plotter_.area.h, opts, this);
          if (!p_axis)
            p_axis = axis;
        }
      }
      if (p_axis === undefined) {
        throw ("Configuration Error: At least one axis has to have the \"independentTicks\" option activated.");
      }
      for (var i = 0; i < numAxes; i++) {
        var axis = this.axes_[i];
        if (!axis.independentTicks) {
          var opts = this.optionsViewForAxis_('y' + (i ? '2' : ''));
          var ticker = opts('ticker');
          var p_ticks = p_axis.ticks;
          var p_scale = p_axis.computedValueRange[1] - p_axis.computedValueRange[0];
          var scale = axis.computedValueRange[1] - axis.computedValueRange[0];
          var tick_values = [];
          for (var k = 0; k < p_ticks.length; k++) {
            var y_frac = (p_ticks[k].v - p_axis.computedValueRange[0]) / p_scale;
            var y_val = axis.computedValueRange[0] + y_frac * scale;
            tick_values.push(y_val);
          }
          axis.ticks = ticker(axis.computedValueRange[0], axis.computedValueRange[1], this.plotter_.area.h, opts, this, tick_values);
        }
      }
    };
    Dygraph.prototype.detectTypeFromString_ = function(str) {
      var isDate = false;
      var dashPos = str.indexOf('-');
      if ((dashPos > 0 && (str[dashPos - 1] != 'e' && str[dashPos - 1] != 'E')) || str.indexOf('/') >= 0 || isNaN(parseFloat(str))) {
        isDate = true;
      } else if (str.length == 8 && str > '19700101' && str < '20371231') {
        isDate = true;
      }
      this.setXAxisOptions_(isDate);
    };
    Dygraph.prototype.setXAxisOptions_ = function(isDate) {
      if (isDate) {
        this.attrs_.xValueParser = Dygraph.dateParser;
        this.attrs_.axes.x.valueFormatter = Dygraph.dateValueFormatter;
        this.attrs_.axes.x.ticker = Dygraph.dateTicker;
        this.attrs_.axes.x.axisLabelFormatter = Dygraph.dateAxisLabelFormatter;
      } else {
        this.attrs_.xValueParser = function(x) {
          return parseFloat(x);
        };
        this.attrs_.axes.x.valueFormatter = function(x) {
          return x;
        };
        this.attrs_.axes.x.ticker = Dygraph.numericTicks;
        this.attrs_.axes.x.axisLabelFormatter = this.attrs_.axes.x.valueFormatter;
      }
    };
    Dygraph.prototype.parseCSV_ = function(data) {
      var ret = [];
      var line_delimiter = Dygraph.detectLineDelimiter(data);
      var lines = data.split(line_delimiter || "\n");
      var vals,
          j;
      var delim = this.getStringOption('delimiter');
      if (lines[0].indexOf(delim) == -1 && lines[0].indexOf('\t') >= 0) {
        delim = '\t';
      }
      var start = 0;
      if (!('labels' in this.user_attrs_)) {
        start = 1;
        this.attrs_.labels = lines[0].split(delim);
        this.attributes_.reparseSeries();
      }
      var line_no = 0;
      var xParser;
      var defaultParserSet = false;
      var expectedCols = this.attr_("labels").length;
      var outOfOrder = false;
      for (var i = start; i < lines.length; i++) {
        var line = lines[i];
        line_no = i;
        if (line.length === 0)
          continue;
        if (line[0] == '#')
          continue;
        var inFields = line.split(delim);
        if (inFields.length < 2)
          continue;
        var fields = [];
        if (!defaultParserSet) {
          this.detectTypeFromString_(inFields[0]);
          xParser = this.getFunctionOption("xValueParser");
          defaultParserSet = true;
        }
        fields[0] = xParser(inFields[0], this);
        if (this.fractions_) {
          for (j = 1; j < inFields.length; j++) {
            vals = inFields[j].split("/");
            if (vals.length != 2) {
              console.error('Expected fractional "num/den" values in CSV data ' + "but found a value '" + inFields[j] + "' on line " + (1 + i) + " ('" + line + "') which is not of this form.");
              fields[j] = [0, 0];
            } else {
              fields[j] = [Dygraph.parseFloat_(vals[0], i, line), Dygraph.parseFloat_(vals[1], i, line)];
            }
          }
        } else if (this.getBooleanOption("errorBars")) {
          if (inFields.length % 2 != 1) {
            console.error('Expected alternating (value, stdev.) pairs in CSV data ' + 'but line ' + (1 + i) + ' has an odd number of values (' + (inFields.length - 1) + "): '" + line + "'");
          }
          for (j = 1; j < inFields.length; j += 2) {
            fields[(j + 1) / 2] = [Dygraph.parseFloat_(inFields[j], i, line), Dygraph.parseFloat_(inFields[j + 1], i, line)];
          }
        } else if (this.getBooleanOption("customBars")) {
          for (j = 1; j < inFields.length; j++) {
            var val = inFields[j];
            if (/^ *$/.test(val)) {
              fields[j] = [null, null, null];
            } else {
              vals = val.split(";");
              if (vals.length == 3) {
                fields[j] = [Dygraph.parseFloat_(vals[0], i, line), Dygraph.parseFloat_(vals[1], i, line), Dygraph.parseFloat_(vals[2], i, line)];
              } else {
                console.warn('When using customBars, values must be either blank ' + 'or "low;center;high" tuples (got "' + val + '" on line ' + (1 + i));
              }
            }
          }
        } else {
          for (j = 1; j < inFields.length; j++) {
            fields[j] = Dygraph.parseFloat_(inFields[j], i, line);
          }
        }
        if (ret.length > 0 && fields[0] < ret[ret.length - 1][0]) {
          outOfOrder = true;
        }
        if (fields.length != expectedCols) {
          console.error("Number of columns in line " + i + " (" + fields.length + ") does not agree with number of labels (" + expectedCols + ") " + line);
        }
        if (i === 0 && this.attr_('labels')) {
          var all_null = true;
          for (j = 0; all_null && j < fields.length; j++) {
            if (fields[j])
              all_null = false;
          }
          if (all_null) {
            console.warn("The dygraphs 'labels' option is set, but the first row " + "of CSV data ('" + line + "') appears to also contain " + "labels. Will drop the CSV labels and use the option " + "labels.");
            continue;
          }
        }
        ret.push(fields);
      }
      if (outOfOrder) {
        console.warn("CSV is out of order; order it correctly to speed loading.");
        ret.sort(function(a, b) {
          return a[0] - b[0];
        });
      }
      return ret;
    };
    Dygraph.prototype.parseArray_ = function(data) {
      if (data.length === 0) {
        console.error("Can't plot empty data set");
        return null;
      }
      if (data[0].length === 0) {
        console.error("Data set cannot contain an empty row");
        return null;
      }
      var i;
      if (this.attr_("labels") === null) {
        console.warn("Using default labels. Set labels explicitly via 'labels' " + "in the options parameter");
        this.attrs_.labels = ["X"];
        for (i = 1; i < data[0].length; i++) {
          this.attrs_.labels.push("Y" + i);
        }
        this.attributes_.reparseSeries();
      } else {
        var num_labels = this.attr_("labels");
        if (num_labels.length != data[0].length) {
          console.error("Mismatch between number of labels (" + num_labels + ")" + " and number of columns in array (" + data[0].length + ")");
          return null;
        }
      }
      if (Dygraph.isDateLike(data[0][0])) {
        this.attrs_.axes.x.valueFormatter = Dygraph.dateValueFormatter;
        this.attrs_.axes.x.ticker = Dygraph.dateTicker;
        this.attrs_.axes.x.axisLabelFormatter = Dygraph.dateAxisLabelFormatter;
        var parsedData = Dygraph.clone(data);
        for (i = 0; i < data.length; i++) {
          if (parsedData[i].length === 0) {
            console.error("Row " + (1 + i) + " of data is empty");
            return null;
          }
          if (parsedData[i][0] === null || typeof(parsedData[i][0].getTime) != 'function' || isNaN(parsedData[i][0].getTime())) {
            console.error("x value in row " + (1 + i) + " is not a Date");
            return null;
          }
          parsedData[i][0] = parsedData[i][0].getTime();
        }
        return parsedData;
      } else {
        this.attrs_.axes.x.valueFormatter = function(x) {
          return x;
        };
        this.attrs_.axes.x.ticker = Dygraph.numericTicks;
        this.attrs_.axes.x.axisLabelFormatter = Dygraph.numberAxisLabelFormatter;
        return data;
      }
    };
    Dygraph.prototype.parseDataTable_ = function(data) {
      var shortTextForAnnotationNum = function(num) {
        var shortText = String.fromCharCode(65 + num % 26);
        num = Math.floor(num / 26);
        while (num > 0) {
          shortText = String.fromCharCode(65 + (num - 1) % 26) + shortText.toLowerCase();
          num = Math.floor((num - 1) / 26);
        }
        return shortText;
      };
      var cols = data.getNumberOfColumns();
      var rows = data.getNumberOfRows();
      var indepType = data.getColumnType(0);
      if (indepType == 'date' || indepType == 'datetime') {
        this.attrs_.xValueParser = Dygraph.dateParser;
        this.attrs_.axes.x.valueFormatter = Dygraph.dateValueFormatter;
        this.attrs_.axes.x.ticker = Dygraph.dateTicker;
        this.attrs_.axes.x.axisLabelFormatter = Dygraph.dateAxisLabelFormatter;
      } else if (indepType == 'number') {
        this.attrs_.xValueParser = function(x) {
          return parseFloat(x);
        };
        this.attrs_.axes.x.valueFormatter = function(x) {
          return x;
        };
        this.attrs_.axes.x.ticker = Dygraph.numericTicks;
        this.attrs_.axes.x.axisLabelFormatter = this.attrs_.axes.x.valueFormatter;
      } else {
        console.error("only 'date', 'datetime' and 'number' types are supported " + "for column 1 of DataTable input (Got '" + indepType + "')");
        return null;
      }
      var colIdx = [];
      var annotationCols = {};
      var hasAnnotations = false;
      var i,
          j;
      for (i = 1; i < cols; i++) {
        var type = data.getColumnType(i);
        if (type == 'number') {
          colIdx.push(i);
        } else if (type == 'string' && this.getBooleanOption('displayAnnotations')) {
          var dataIdx = colIdx[colIdx.length - 1];
          if (!annotationCols.hasOwnProperty(dataIdx)) {
            annotationCols[dataIdx] = [i];
          } else {
            annotationCols[dataIdx].push(i);
          }
          hasAnnotations = true;
        } else {
          console.error("Only 'number' is supported as a dependent type with Gviz." + " 'string' is only supported if displayAnnotations is true");
        }
      }
      var labels = [data.getColumnLabel(0)];
      for (i = 0; i < colIdx.length; i++) {
        labels.push(data.getColumnLabel(colIdx[i]));
        if (this.getBooleanOption("errorBars"))
          i += 1;
      }
      this.attrs_.labels = labels;
      cols = labels.length;
      var ret = [];
      var outOfOrder = false;
      var annotations = [];
      for (i = 0; i < rows; i++) {
        var row = [];
        if (typeof(data.getValue(i, 0)) === 'undefined' || data.getValue(i, 0) === null) {
          console.warn("Ignoring row " + i + " of DataTable because of undefined or null first column.");
          continue;
        }
        if (indepType == 'date' || indepType == 'datetime') {
          row.push(data.getValue(i, 0).getTime());
        } else {
          row.push(data.getValue(i, 0));
        }
        if (!this.getBooleanOption("errorBars")) {
          for (j = 0; j < colIdx.length; j++) {
            var col = colIdx[j];
            row.push(data.getValue(i, col));
            if (hasAnnotations && annotationCols.hasOwnProperty(col) && data.getValue(i, annotationCols[col][0]) !== null) {
              var ann = {};
              ann.series = data.getColumnLabel(col);
              ann.xval = row[0];
              ann.shortText = shortTextForAnnotationNum(annotations.length);
              ann.text = '';
              for (var k = 0; k < annotationCols[col].length; k++) {
                if (k)
                  ann.text += "\n";
                ann.text += data.getValue(i, annotationCols[col][k]);
              }
              annotations.push(ann);
            }
          }
          for (j = 0; j < row.length; j++) {
            if (!isFinite(row[j]))
              row[j] = null;
          }
        } else {
          for (j = 0; j < cols - 1; j++) {
            row.push([data.getValue(i, 1 + 2 * j), data.getValue(i, 2 + 2 * j)]);
          }
        }
        if (ret.length > 0 && row[0] < ret[ret.length - 1][0]) {
          outOfOrder = true;
        }
        ret.push(row);
      }
      if (outOfOrder) {
        console.warn("DataTable is out of order; order it correctly to speed loading.");
        ret.sort(function(a, b) {
          return a[0] - b[0];
        });
      }
      this.rawData_ = ret;
      if (annotations.length > 0) {
        this.setAnnotations(annotations, true);
      }
      this.attributes_.reparseSeries();
    };
    Dygraph.prototype.cascadeDataDidUpdateEvent_ = function() {
      this.cascadeEvents_('dataDidUpdate', {});
    };
    Dygraph.prototype.start_ = function() {
      var data = this.file_;
      if (typeof data == 'function') {
        data = data();
      }
      if (Dygraph.isArrayLike(data)) {
        this.rawData_ = this.parseArray_(data);
        this.cascadeDataDidUpdateEvent_();
        this.predraw_();
      } else if (typeof data == 'object' && typeof data.getColumnRange == 'function') {
        this.parseDataTable_(data);
        this.cascadeDataDidUpdateEvent_();
        this.predraw_();
      } else if (typeof data == 'string') {
        var line_delimiter = Dygraph.detectLineDelimiter(data);
        if (line_delimiter) {
          this.loadedEvent_(data);
        } else {
          var req;
          if (window.XMLHttpRequest) {
            req = new XMLHttpRequest();
          } else {
            req = new ActiveXObject("Microsoft.XMLHTTP");
          }
          var caller = this;
          req.onreadystatechange = function() {
            if (req.readyState == 4) {
              if (req.status === 200 || req.status === 0) {
                caller.loadedEvent_(req.responseText);
              }
            }
          };
          req.open("GET", data, true);
          req.send(null);
        }
      } else {
        console.error("Unknown data format: " + (typeof data));
      }
    };
    Dygraph.prototype.updateOptions = function(input_attrs, block_redraw) {
      if (typeof(block_redraw) == 'undefined')
        block_redraw = false;
      var file = input_attrs.file;
      var attrs = Dygraph.mapLegacyOptions_(input_attrs);
      if ('rollPeriod' in attrs) {
        this.rollPeriod_ = attrs.rollPeriod;
      }
      if ('dateWindow' in attrs) {
        this.dateWindow_ = attrs.dateWindow;
        if (!('isZoomedIgnoreProgrammaticZoom' in attrs)) {
          this.zoomed_x_ = (attrs.dateWindow !== null);
        }
      }
      if ('valueRange' in attrs && !('isZoomedIgnoreProgrammaticZoom' in attrs)) {
        this.zoomed_y_ = (attrs.valueRange !== null);
      }
      var requiresNewPoints = Dygraph.isPixelChangingOptionList(this.attr_("labels"), attrs);
      Dygraph.updateDeep(this.user_attrs_, attrs);
      this.attributes_.reparseSeries();
      if (file) {
        this.cascadeEvents_('dataWillUpdate', {});
        this.file_ = file;
        if (!block_redraw)
          this.start_();
      } else {
        if (!block_redraw) {
          if (requiresNewPoints) {
            this.predraw_();
          } else {
            this.renderGraph_(false);
          }
        }
      }
    };
    Dygraph.mapLegacyOptions_ = function(attrs) {
      var my_attrs = {};
      for (var k in attrs) {
        if (!attrs.hasOwnProperty(k))
          continue;
        if (k == 'file')
          continue;
        if (attrs.hasOwnProperty(k))
          my_attrs[k] = attrs[k];
      }
      var set = function(axis, opt, value) {
        if (!my_attrs.axes)
          my_attrs.axes = {};
        if (!my_attrs.axes[axis])
          my_attrs.axes[axis] = {};
        my_attrs.axes[axis][opt] = value;
      };
      var map = function(opt, axis, new_opt) {
        if (typeof(attrs[opt]) != 'undefined') {
          console.warn("Option " + opt + " is deprecated. Use the " + new_opt + " option for the " + axis + " axis instead. " + "(e.g. { axes : { " + axis + " : { " + new_opt + " : ... } } } " + "(see http://dygraphs.com/per-axis.html for more information.");
          set(axis, new_opt, attrs[opt]);
          delete my_attrs[opt];
        }
      };
      map('xValueFormatter', 'x', 'valueFormatter');
      map('pixelsPerXLabel', 'x', 'pixelsPerLabel');
      map('xAxisLabelFormatter', 'x', 'axisLabelFormatter');
      map('xTicker', 'x', 'ticker');
      map('yValueFormatter', 'y', 'valueFormatter');
      map('pixelsPerYLabel', 'y', 'pixelsPerLabel');
      map('yAxisLabelFormatter', 'y', 'axisLabelFormatter');
      map('yTicker', 'y', 'ticker');
      map('drawXGrid', 'x', 'drawGrid');
      map('drawXAxis', 'x', 'drawAxis');
      map('drawYGrid', 'y', 'drawGrid');
      map('drawYAxis', 'y', 'drawAxis');
      map('xAxisLabelWidth', 'x', 'axisLabelWidth');
      map('yAxisLabelWidth', 'y', 'axisLabelWidth');
      return my_attrs;
    };
    Dygraph.prototype.resize = function(width, height) {
      if (this.resize_lock) {
        return;
      }
      this.resize_lock = true;
      if ((width === null) != (height === null)) {
        console.warn("Dygraph.resize() should be called with zero parameters or " + "two non-NULL parameters. Pretending it was zero.");
        width = height = null;
      }
      var old_width = this.width_;
      var old_height = this.height_;
      if (width) {
        this.maindiv_.style.width = width + "px";
        this.maindiv_.style.height = height + "px";
        this.width_ = width;
        this.height_ = height;
      } else {
        this.width_ = this.maindiv_.clientWidth;
        this.height_ = this.maindiv_.clientHeight;
      }
      if (old_width != this.width_ || old_height != this.height_) {
        this.resizeElements_();
        this.predraw_();
      }
      this.resize_lock = false;
    };
    Dygraph.prototype.adjustRoll = function(length) {
      this.rollPeriod_ = length;
      this.predraw_();
    };
    Dygraph.prototype.visibility = function() {
      if (!this.getOption("visibility")) {
        this.attrs_.visibility = [];
      }
      while (this.getOption("visibility").length < this.numColumns() - 1) {
        this.attrs_.visibility.push(true);
      }
      return this.getOption("visibility");
    };
    Dygraph.prototype.setVisibility = function(num, value) {
      var x = this.visibility();
      if (num < 0 || num >= x.length) {
        console.warn("invalid series number in setVisibility: " + num);
      } else {
        x[num] = value;
        this.predraw_();
      }
    };
    Dygraph.prototype.size = function() {
      return {
        width: this.width_,
        height: this.height_
      };
    };
    Dygraph.prototype.setAnnotations = function(ann, suppressDraw) {
      Dygraph.addAnnotationRule();
      this.annotations_ = ann;
      if (!this.layout_) {
        console.warn("Tried to setAnnotations before dygraph was ready. " + "Try setting them in a ready() block. See " + "dygraphs.com/tests/annotation.html");
        return;
      }
      this.layout_.setAnnotations(this.annotations_);
      if (!suppressDraw) {
        this.predraw_();
      }
    };
    Dygraph.prototype.annotations = function() {
      return this.annotations_;
    };
    Dygraph.prototype.getLabels = function() {
      var labels = this.attr_("labels");
      return labels ? labels.slice() : null;
    };
    Dygraph.prototype.indexFromSetName = function(name) {
      return this.setIndexByName_[name];
    };
    Dygraph.prototype.ready = function(callback) {
      if (this.is_initial_draw_) {
        this.readyFns_.push(callback);
      } else {
        callback.call(this, this);
      }
    };
    Dygraph.addAnnotationRule = function() {
      if (Dygraph.addedAnnotationCSS)
        return;
      var rule = "border: 1px solid black; " + "background-color: white; " + "text-align: center;";
      var styleSheetElement = document.createElement("style");
      styleSheetElement.type = "text/css";
      document.getElementsByTagName("head")[0].appendChild(styleSheetElement);
      for (var i = 0; i < document.styleSheets.length; i++) {
        if (document.styleSheets[i].disabled)
          continue;
        var mysheet = document.styleSheets[i];
        try {
          if (mysheet.insertRule) {
            var idx = mysheet.cssRules ? mysheet.cssRules.length : 0;
            mysheet.insertRule(".dygraphDefaultAnnotation { " + rule + " }", idx);
          } else if (mysheet.addRule) {
            mysheet.addRule(".dygraphDefaultAnnotation", rule);
          }
          Dygraph.addedAnnotationCSS = true;
          return;
        } catch (err) {}
      }
      console.warn("Unable to add default annotation CSS rule; display may be off.");
    };
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = Dygraph;
    }
    return Dygraph;
  })();
})(require('process'));
