/* */ 
var Emitter = require('emitter-component');
var Hammer = require('../module/hammer');
var moment = require('../module/moment');
var util = require('../util');
var DataSet = require('../DataSet');
var DataView = require('../DataView');
var Range = require('./Range');
var Core = require('./Core');
var TimeAxis = require('./component/TimeAxis');
var CurrentTime = require('./component/CurrentTime');
var CustomTime = require('./component/CustomTime');
var LineGraph = require('./component/LineGraph');
var Configurator = require('../shared/Configurator');
var Validator = require('../shared/Validator').default;
var printStyle = require('../shared/Validator').printStyle;
var allOptions = require('./optionsGraph2d').allOptions;
var configureOptions = require('./optionsGraph2d').configureOptions;
function Graph2d(container, items, groups, options) {
  if (!(Array.isArray(groups) || groups instanceof DataSet || groups instanceof DataView) && groups instanceof Object) {
    var forthArgument = options;
    options = groups;
    groups = forthArgument;
  }
  var me = this;
  this.defaultOptions = {
    start: null,
    end: null,
    autoResize: true,
    orientation: {
      axis: 'bottom',
      item: 'bottom'
    },
    moment: moment,
    width: null,
    height: null,
    maxHeight: null,
    minHeight: null
  };
  this.options = util.deepExtend({}, this.defaultOptions);
  this._create(container);
  this.components = [];
  this.body = {
    dom: this.dom,
    domProps: this.props,
    emitter: {
      on: this.on.bind(this),
      off: this.off.bind(this),
      emit: this.emit.bind(this)
    },
    hiddenDates: [],
    util: {
      toScreen: me._toScreen.bind(me),
      toGlobalScreen: me._toGlobalScreen.bind(me),
      toTime: me._toTime.bind(me),
      toGlobalTime: me._toGlobalTime.bind(me)
    }
  };
  this.range = new Range(this.body);
  this.components.push(this.range);
  this.body.range = this.range;
  this.timeAxis = new TimeAxis(this.body);
  this.components.push(this.timeAxis);
  this.currentTime = new CurrentTime(this.body);
  this.components.push(this.currentTime);
  this.linegraph = new LineGraph(this.body);
  this.components.push(this.linegraph);
  this.itemsData = null;
  this.groupsData = null;
  this.on('tap', function(event) {
    me.emit('click', me.getEventProperties(event));
  });
  this.on('doubletap', function(event) {
    me.emit('doubleClick', me.getEventProperties(event));
  });
  this.dom.root.oncontextmenu = function(event) {
    me.emit('contextmenu', me.getEventProperties(event));
  };
  if (options) {
    this.setOptions(options);
  }
  if (groups) {
    this.setGroups(groups);
  }
  if (items) {
    this.setItems(items);
  }
  this._redraw();
}
Graph2d.prototype = new Core();
Graph2d.prototype.setOptions = function(options) {
  let errorFound = Validator.validate(options, allOptions);
  if (errorFound === true) {
    console.log('%cErrors have been found in the supplied options object.', printStyle);
  }
  Core.prototype.setOptions.call(this, options);
};
Graph2d.prototype.setItems = function(items) {
  var initialLoad = (this.itemsData == null);
  var newDataSet;
  if (!items) {
    newDataSet = null;
  } else if (items instanceof DataSet || items instanceof DataView) {
    newDataSet = items;
  } else {
    newDataSet = new DataSet(items, {type: {
        start: 'Date',
        end: 'Date'
      }});
  }
  this.itemsData = newDataSet;
  this.linegraph && this.linegraph.setItems(newDataSet);
  if (initialLoad) {
    if (this.options.start != undefined || this.options.end != undefined) {
      var start = this.options.start != undefined ? this.options.start : null;
      var end = this.options.end != undefined ? this.options.end : null;
      this.setWindow(start, end, {animation: false});
    } else {
      this.fit({animation: false});
    }
  }
};
Graph2d.prototype.setGroups = function(groups) {
  var newDataSet;
  if (!groups) {
    newDataSet = null;
  } else if (groups instanceof DataSet || groups instanceof DataView) {
    newDataSet = groups;
  } else {
    newDataSet = new DataSet(groups);
  }
  this.groupsData = newDataSet;
  this.linegraph.setGroups(newDataSet);
};
Graph2d.prototype.getLegend = function(groupId, width, height) {
  if (width === undefined) {
    width = 15;
  }
  if (height === undefined) {
    height = 15;
  }
  if (this.linegraph.groups[groupId] !== undefined) {
    return this.linegraph.groups[groupId].getLegend(width, height);
  } else {
    return "cannot find group:'" + groupId + "'";
  }
};
Graph2d.prototype.isGroupVisible = function(groupId) {
  if (this.linegraph.groups[groupId] !== undefined) {
    return (this.linegraph.groups[groupId].visible && (this.linegraph.options.groups.visibility[groupId] === undefined || this.linegraph.options.groups.visibility[groupId] == true));
  } else {
    return false;
  }
};
Graph2d.prototype.getDataRange = function() {
  var min = null;
  var max = null;
  for (var groupId in this.linegraph.groups) {
    if (this.linegraph.groups.hasOwnProperty(groupId)) {
      if (this.linegraph.groups[groupId].visible == true) {
        for (var i = 0; i < this.linegraph.groups[groupId].itemsData.length; i++) {
          var item = this.linegraph.groups[groupId].itemsData[i];
          var value = util.convert(item.x, 'Date').valueOf();
          min = min == null ? value : min > value ? value : min;
          max = max == null ? value : max < value ? value : max;
        }
      }
    }
  }
  return {
    min: (min != null) ? new Date(min) : null,
    max: (max != null) ? new Date(max) : null
  };
};
Graph2d.prototype.getEventProperties = function(event) {
  var clientX = event.center ? event.center.x : event.clientX;
  var clientY = event.center ? event.center.y : event.clientY;
  var x = clientX - util.getAbsoluteLeft(this.dom.centerContainer);
  var y = clientY - util.getAbsoluteTop(this.dom.centerContainer);
  var time = this._toTime(x);
  var customTime = CustomTime.customTimeFromTarget(event);
  var element = util.getTarget(event);
  var what = null;
  if (util.hasParent(element, this.timeAxis.dom.foreground)) {
    what = 'axis';
  } else if (this.timeAxis2 && util.hasParent(element, this.timeAxis2.dom.foreground)) {
    what = 'axis';
  } else if (util.hasParent(element, this.linegraph.yAxisLeft.dom.frame)) {
    what = 'data-axis';
  } else if (util.hasParent(element, this.linegraph.yAxisRight.dom.frame)) {
    what = 'data-axis';
  } else if (util.hasParent(element, this.linegraph.legendLeft.dom.frame)) {
    what = 'legend';
  } else if (util.hasParent(element, this.linegraph.legendRight.dom.frame)) {
    what = 'legend';
  } else if (customTime != null) {
    what = 'custom-time';
  } else if (util.hasParent(element, this.currentTime.bar)) {
    what = 'current-time';
  } else if (util.hasParent(element, this.dom.center)) {
    what = 'background';
  }
  var value = [];
  var yAxisLeft = this.linegraph.yAxisLeft;
  var yAxisRight = this.linegraph.yAxisRight;
  if (!yAxisLeft.hidden) {
    value.push(yAxisLeft.screenToValue(y));
  }
  if (!yAxisRight.hidden) {
    value.push(yAxisRight.screenToValue(y));
  }
  return {
    event: event,
    what: what,
    pageX: event.srcEvent ? event.srcEvent.pageX : event.pageX,
    pageY: event.srcEvent ? event.srcEvent.pageY : event.pageY,
    x: x,
    y: y,
    time: time,
    value: value
  };
};
Graph2d.prototype._createConfigurator = function() {
  return new Configurator(this, this.dom.container, configureOptions);
};
module.exports = Graph2d;
