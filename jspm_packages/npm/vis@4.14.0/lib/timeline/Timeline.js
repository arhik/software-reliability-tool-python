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
var ItemSet = require('./component/ItemSet');
var Configurator = require('../shared/Configurator');
var Validator = require('../shared/Validator').default;
var printStyle = require('../shared/Validator').printStyle;
var allOptions = require('./optionsTimeline').allOptions;
var configureOptions = require('./optionsTimeline').configureOptions;
function Timeline(container, items, groups, options) {
  if (!(this instanceof Timeline)) {
    throw new SyntaxError('Constructor must be called with the new operator');
  }
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
    throttleRedraw: 0,
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
      getScale: function() {
        return me.timeAxis.step.scale;
      },
      getStep: function() {
        return me.timeAxis.step.step;
      },
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
  this.timeAxis2 = null;
  this.components.push(this.timeAxis);
  this.currentTime = new CurrentTime(this.body);
  this.components.push(this.currentTime);
  this.itemSet = new ItemSet(this.body);
  this.components.push(this.itemSet);
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
  this.fitDone = false;
  this.on('changed', function() {
    if (this.itemsData == null)
      return;
    if (!me.fitDone) {
      me.fitDone = true;
      if (me.options.start != undefined || me.options.end != undefined) {
        if (me.options.start == undefined || me.options.end == undefined) {
          var range = me.getItemRange();
        }
        var start = me.options.start != undefined ? me.options.start : range.min;
        var end = me.options.end != undefined ? me.options.end : range.max;
        me.setWindow(start, end, {animation: false});
      } else {
        me.fit({animation: false});
      }
    }
  });
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
Timeline.prototype = new Core();
Timeline.prototype._createConfigurator = function() {
  return new Configurator(this, this.dom.container, configureOptions);
};
Timeline.prototype.redraw = function() {
  this.itemSet && this.itemSet.markDirty({refreshItems: true});
  this._redraw();
};
Timeline.prototype.setOptions = function(options) {
  let errorFound = Validator.validate(options, allOptions);
  if (errorFound === true) {
    console.log('%cErrors have been found in the supplied options object.', printStyle);
  }
  Core.prototype.setOptions.call(this, options);
  if ('type' in options) {
    if (options.type !== this.options.type) {
      this.options.type = options.type;
      var itemsData = this.itemsData;
      if (itemsData) {
        var selection = this.getSelection();
        this.setItems(null);
        this.setItems(itemsData);
        this.setSelection(selection);
      }
    }
  }
};
Timeline.prototype.setItems = function(items) {
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
  this.itemSet && this.itemSet.setItems(newDataSet);
};
Timeline.prototype.setGroups = function(groups) {
  var newDataSet;
  if (!groups) {
    newDataSet = null;
  } else if (groups instanceof DataSet || groups instanceof DataView) {
    newDataSet = groups;
  } else {
    newDataSet = new DataSet(groups);
  }
  this.groupsData = newDataSet;
  this.itemSet.setGroups(newDataSet);
};
Timeline.prototype.setData = function(data) {
  if (data && data.groups) {
    this.setGroups(data.groups);
  }
  if (data && data.items) {
    this.setItems(data.items);
  }
};
Timeline.prototype.setSelection = function(ids, options) {
  this.itemSet && this.itemSet.setSelection(ids);
  if (options && options.focus) {
    this.focus(ids, options);
  }
};
Timeline.prototype.getSelection = function() {
  return this.itemSet && this.itemSet.getSelection() || [];
};
Timeline.prototype.focus = function(id, options) {
  if (!this.itemsData || id == undefined)
    return;
  var ids = Array.isArray(id) ? id : [id];
  var itemsData = this.itemsData.getDataSet().get(ids, {type: {
      start: 'Date',
      end: 'Date'
    }});
  var start = null;
  var end = null;
  itemsData.forEach(function(itemData) {
    var s = itemData.start.valueOf();
    var e = 'end' in itemData ? itemData.end.valueOf() : itemData.start.valueOf();
    if (start === null || s < start) {
      start = s;
    }
    if (end === null || e > end) {
      end = e;
    }
  });
  if (start !== null && end !== null) {
    var middle = (start + end) / 2;
    var interval = Math.max((this.range.end - this.range.start), (end - start) * 1.1);
    var animation = (options && options.animation !== undefined) ? options.animation : true;
    this.range.setRange(middle - interval / 2, middle + interval / 2, animation);
  }
};
Timeline.prototype.fit = function(options) {
  var animation = (options && options.animation !== undefined) ? options.animation : true;
  var range = this.getItemRange();
  this.range.setRange(range.min, range.max, animation);
};
Timeline.prototype.getItemRange = function() {
  var range = this.getDataRange();
  var min = range.min !== null ? range.min.valueOf() : null;
  var max = range.max !== null ? range.max.valueOf() : null;
  var minItem = null;
  var maxItem = null;
  if (min != null && max != null) {
    var interval = (max - min);
    if (interval <= 0) {
      interval = 10;
    }
    var factor = interval / this.props.center.width;
    function getStart(item) {
      return util.convert(item.data.start, 'Date').valueOf();
    }
    function getEnd(item) {
      var end = item.data.end != undefined ? item.data.end : item.data.start;
      return util.convert(end, 'Date').valueOf();
    }
    util.forEach(this.itemSet.items, function(item) {
      item.show();
      item.repositionX();
      var start = getStart(item);
      var end = getEnd(item);
      var left = start - (item.getWidthLeft() + 10) * factor;
      var right = end + (item.getWidthRight() + 10) * factor;
      if (left < min) {
        min = left;
        minItem = item;
      }
      if (right > max) {
        max = right;
        maxItem = item;
      }
    }.bind(this));
    if (minItem && maxItem) {
      var lhs = minItem.getWidthLeft() + 10;
      var rhs = maxItem.getWidthRight() + 10;
      var delta = this.props.center.width - lhs - rhs;
      if (delta > 0) {
        min = getStart(minItem) - lhs * interval / delta;
        max = getEnd(maxItem) + rhs * interval / delta;
      }
    }
  }
  return {
    min: min != null ? new Date(min) : null,
    max: max != null ? new Date(max) : null
  };
};
Timeline.prototype.getDataRange = function() {
  var min = null;
  var max = null;
  var dataset = this.itemsData && this.itemsData.getDataSet();
  if (dataset) {
    dataset.forEach(function(item) {
      var start = util.convert(item.start, 'Date').valueOf();
      var end = util.convert(item.end != undefined ? item.end : item.start, 'Date').valueOf();
      if (min === null || start < min) {
        min = start;
      }
      if (max === null || end > max) {
        max = end;
      }
    });
  }
  return {
    min: min != null ? new Date(min) : null,
    max: max != null ? new Date(max) : null
  };
};
Timeline.prototype.getEventProperties = function(event) {
  var clientX = event.center ? event.center.x : event.clientX;
  var clientY = event.center ? event.center.y : event.clientY;
  var x = clientX - util.getAbsoluteLeft(this.dom.centerContainer);
  var y = clientY - util.getAbsoluteTop(this.dom.centerContainer);
  var item = this.itemSet.itemFromTarget(event);
  var group = this.itemSet.groupFromTarget(event);
  var customTime = CustomTime.customTimeFromTarget(event);
  var snap = this.itemSet.options.snap || null;
  var scale = this.body.util.getScale();
  var step = this.body.util.getStep();
  var time = this._toTime(x);
  var snappedTime = snap ? snap(time, scale, step) : time;
  var element = util.getTarget(event);
  var what = null;
  if (item != null) {
    what = 'item';
  } else if (customTime != null) {
    what = 'custom-time';
  } else if (util.hasParent(element, this.timeAxis.dom.foreground)) {
    what = 'axis';
  } else if (this.timeAxis2 && util.hasParent(element, this.timeAxis2.dom.foreground)) {
    what = 'axis';
  } else if (util.hasParent(element, this.itemSet.dom.labelSet)) {
    what = 'group-label';
  } else if (util.hasParent(element, this.currentTime.bar)) {
    what = 'current-time';
  } else if (util.hasParent(element, this.dom.center)) {
    what = 'background';
  }
  return {
    event: event,
    item: item ? item.id : null,
    group: group ? group.groupId : null,
    what: what,
    pageX: event.srcEvent ? event.srcEvent.pageX : event.pageX,
    pageY: event.srcEvent ? event.srcEvent.pageY : event.pageY,
    x: x,
    y: y,
    time: time,
    snappedTime: snappedTime
  };
};
module.exports = Timeline;
