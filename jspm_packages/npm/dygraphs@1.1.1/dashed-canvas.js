/* */ 
(function(process) {
  (function() {
    'use strict';
    CanvasRenderingContext2D.prototype.installPattern = function(pattern) {
      if (typeof(this.isPatternInstalled) !== 'undefined') {
        throw "Must un-install old line pattern before installing a new one.";
      }
      this.isPatternInstalled = true;
      var dashedLineToHistory = [0, 0];
      var segments = [];
      var realBeginPath = this.beginPath;
      var realLineTo = this.lineTo;
      var realMoveTo = this.moveTo;
      var realStroke = this.stroke;
      this.uninstallPattern = function() {
        this.beginPath = realBeginPath;
        this.lineTo = realLineTo;
        this.moveTo = realMoveTo;
        this.stroke = realStroke;
        this.uninstallPattern = undefined;
        this.isPatternInstalled = undefined;
      };
      this.beginPath = function() {
        segments = [];
        realBeginPath.call(this);
      };
      this.moveTo = function(x, y) {
        segments.push([[x, y]]);
        realMoveTo.call(this, x, y);
      };
      this.lineTo = function(x, y) {
        var last = segments[segments.length - 1];
        last.push([x, y]);
      };
      this.stroke = function() {
        if (segments.length === 0) {
          realStroke.call(this);
          return;
        }
        for (var i = 0; i < segments.length; i++) {
          var seg = segments[i];
          var x1 = seg[0][0],
              y1 = seg[0][1];
          for (var j = 1; j < seg.length; j++) {
            var x2 = seg[j][0],
                y2 = seg[j][1];
            this.save();
            var dx = (x2 - x1);
            var dy = (y2 - y1);
            var len = Math.sqrt(dx * dx + dy * dy);
            var rot = Math.atan2(dy, dx);
            this.translate(x1, y1);
            realMoveTo.call(this, 0, 0);
            this.rotate(rot);
            var patternIndex = dashedLineToHistory[0];
            var x = 0;
            while (len > x) {
              var segment = pattern[patternIndex];
              if (dashedLineToHistory[1]) {
                x += dashedLineToHistory[1];
              } else {
                x += segment;
              }
              if (x > len) {
                dashedLineToHistory = [patternIndex, x - len];
                x = len;
              } else {
                dashedLineToHistory = [(patternIndex + 1) % pattern.length, 0];
              }
              if (patternIndex % 2 === 0) {
                realLineTo.call(this, x, 0);
              } else {
                realMoveTo.call(this, x, 0);
              }
              patternIndex = (patternIndex + 1) % pattern.length;
            }
            this.restore();
            x1 = x2;
            y1 = y2;
          }
        }
        realStroke.call(this);
        segments = [];
      };
    };
    CanvasRenderingContext2D.prototype.uninstallPattern = function() {
      throw "Must install a line pattern before uninstalling it.";
    };
  })();
})(require('process'));
