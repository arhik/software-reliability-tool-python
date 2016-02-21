/* */ 
define(['exports', 'aurelia-framework', 'encapsulated-mdl', 'aurelia-event-aggregator'], function (exports, _aureliaFramework, _encapsulatedMdl, _aureliaEventAggregator) {
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  var mdlTypes = {
    button: {
      html: ['mdl-button', 'mdl-js-button'],
      js: ['MaterialButton'],
      fct: [manageRipple]
    },
    textfield: {
      js: ['MaterialTextfield'],
      html: ['mdl-textfield', 'mdl-js-textfield'],
      fct: []
    },
    layout: {
      js: ['MaterialLayout'],
      html: ['mdl-layout', 'mdl-js-layout'],
      fct: [manageRipple]
    },
    menu: {
      js: ['MaterialMenu'],
      html: ['mdl-menu', 'mdl-js-menu'],
      fct: [manageRipple]
    },
    'data-table': {
      js: ['MaterialDataTable'],
      html: ['mdl-data-table', 'mdl-js-data-table'],
      fct: [manageRipple]
    },
    tabs: {
      js: ['MaterialTabs'],
      html: ['mdl-tabs', 'mdl-js-tabs'],
      fct: [manageRipple]
    },
    slider: {
      js: ['MaterialSlider'],
      html: ['mdl-slider', 'mdl-js-slider'],
      fct: []
    },
    tooltip: {
      js: ['MaterialTooltip'],
      html: ['mdl-tooltip'],
      fct: []
    },
    progress: {
      js: ['MaterialProgress'],
      html: ['mdl-progress', 'mdl-js-progress'],
      fct: []
    },
    spinner: {
      js: ['MaterialSpinner'],
      html: ['mdl-spinner', 'mdl-js-spinner'],
      fct: []
    },
    badge: {
      js: [],
      html: ['mdl-badge'],
      fct: []
    },
    'switch': {
      js: ['MaterialSwitch'],
      html: ['mdl-switch', 'mdl-js-switch'],
      fct: [manageRipple]
    },
    radio: {
      js: ['MaterialRadio'],
      html: ['mdl-radio', 'mdl-js-radio'],
      fct: [manageRipple]
    },
    'icon-toggle': {
      js: ['MaterialIconToggle'],
      html: ['mdl-icon-toggle', 'mdl-js-icon-toggle'],
      fct: [manageRipple]
    },
    checkbox: {
      js: ['MaterialCheckbox'],
      html: ['mdl-checkbox', 'mdl-js-checkbox'],
      fct: [manageRipple]
    },
    dialog: {
      js: ['MaterialDialog'],
      html: ['mdl-dialog', 'mdl-js-dialog'],
      fct: []
    },
    'mega-footer': {
      js: [],
      html: ['mdl-mega-footer'],
      fct: []
    },
    'mini-footer': {
      js: [],
      html: ['mdl-mini-footer'],
      fct: []
    },
    grid: {
      js: [],
      html: ['mdl-grid'],
      fct: []
    },
    snackbar: {
      js: ['MaterialSnackbar'],
      html: ['mdl-snackbar'],
      fct: []
    }

  };

  function manageRipple(element) {
    if (element.classList.contains('mdl-js-ripple-effect')) {
      _encapsulatedMdl.componentHandler.upgradeElement(element, 'MaterialRipple');
    }

    if (element.MaterialIconToggle) {
      var children = element.children;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var child = _step.value;

          if (child.classList.contains('mdl-js-ripple-effect')) {
            _encapsulatedMdl.componentHandler.upgradeElement(child, 'MaterialRipple');
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator['return']) {
            _iterator['return']();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }

  function upgradeElement(element, type) {
    var _ref = mdlTypes[type] || {};

    var html = _ref.html;
    var fct = _ref.fct;
    var js = _ref.js;

    if (html) {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = html[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var h = _step2.value;

          element.classList.add(h);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2['return']) {
            _iterator2['return']();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = js[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var t = _step3.value;
        _encapsulatedMdl.componentHandler.upgradeElement(element, t);
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3['return']) {
          _iterator3['return']();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }

    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
      for (var _iterator4 = fct[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
        var f = _step4.value;
        f(element);
      }
    } catch (err) {
      _didIteratorError4 = true;
      _iteratorError4 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion4 && _iterator4['return']) {
          _iterator4['return']();
        }
      } finally {
        if (_didIteratorError4) {
          throw _iteratorError4;
        }
      }
    }
  }

  var MDLCustomAttribute = (function () {
    function MDLCustomAttribute(element, eventAggregator) {
      _classCallCheck(this, _MDLCustomAttribute);

      this.element = element;
      this.eventAggregator = eventAggregator;
    }

    _createClass(MDLCustomAttribute, [{
      key: 'attached',
      value: function attached() {
        upgradeElement(this.element, this.value);
        var payload = { publisher: this, data: this.element };
        this.eventAggregator.publish('mdl:component:upgrade', payload);
      }
    }]);

    var _MDLCustomAttribute = MDLCustomAttribute;
    MDLCustomAttribute = (0, _aureliaFramework.customAttribute)('mdl')(MDLCustomAttribute) || MDLCustomAttribute;
    MDLCustomAttribute = (0, _aureliaFramework.inject)(Element, _aureliaEventAggregator.EventAggregator)(MDLCustomAttribute) || MDLCustomAttribute;
    return MDLCustomAttribute;
  })();

  exports.MDLCustomAttribute = MDLCustomAttribute;
});
//# sourceMappingURL=mdl.js.map
