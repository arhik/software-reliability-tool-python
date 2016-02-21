/* */ 
(function(process) {
  var DygraphCanvasRenderer = (function() {
    "use strict";
    var DygraphCanvasRenderer = function(dygraph, element, elementContext, layout) {
      this.dygraph_ = dygraph;
      this.layout = layout;
      this.element = element;
      this.elementContext = elementContext;
      this.height = dygraph.height_;
      this.width = dygraph.width_;
      if (!this.isIE && !(Dygraph.isCanvasSupported(this.element)))
        throw "Canvas is not supported.";
      this.area = layout.getPlotArea();
      if (this.dygraph_.isUsingExcanvas_) {
        this._createIEClipArea();
      } else {
        if (!Dygraph.isAndroid()) {
          var ctx = this.dygraph_.canvas_ctx_;
          ctx.beginPath();
          ctx.rect(this.area.x, this.area.y, this.area.w, this.area.h);
          ctx.clip();
          ctx = this.dygraph_.hidden_ctx_;
          ctx.beginPath();
          ctx.rect(this.area.x, this.area.y, this.area.w, this.area.h);
          ctx.clip();
        }
      }
    };
    DygraphCanvasRenderer.prototype.clear = function() {
      var context;
      if (this.isIE) {
        try {
          if (this.clearDelay) {
            this.clearDelay.cancel();
            this.clearDelay = null;
          }
          context = this.elementContext;
        } catch (e) {
          return;
        }
      }
      context = this.elementContext;
      context.clearRect(0, 0, this.width, this.height);
    };
    DygraphCanvasRenderer.prototype.render = function() {
      this._updatePoints();
      this._renderLineChart();
    };
    DygraphCanvasRenderer.prototype._createIEClipArea = function() {
      var className = 'dygraph-clip-div';
      var graphDiv = this.dygraph_.graphDiv;
      for (var i = graphDiv.childNodes.length - 1; i >= 0; i--) {
        if (graphDiv.childNodes[i].className == className) {
          graphDiv.removeChild(graphDiv.childNodes[i]);
        }
      }
      var backgroundColor = document.bgColor;
      var element = this.dygraph_.graphDiv;
      while (element != document) {
        var bgcolor = element.currentStyle.backgroundColor;
        if (bgcolor && bgcolor != 'transparent') {
          backgroundColor = bgcolor;
          break;
        }
        element = element.parentNode;
      }
      function createClipDiv(area) {
        if (area.w === 0 || area.h === 0) {
          return;
        }
        var elem = document.createElement('div');
        elem.className = className;
        elem.style.backgroundColor = backgroundColor;
        elem.style.position = 'absolute';
        elem.style.left = area.x + 'px';
        elem.style.top = area.y + 'px';
        elem.style.width = area.w + 'px';
        elem.style.height = area.h + 'px';
        graphDiv.appendChild(elem);
      }
      var plotArea = this.area;
      createClipDiv({
        x: 0,
        y: 0,
        w: plotArea.x,
        h: this.height
      });
      createClipDiv({
        x: plotArea.x,
        y: 0,
        w: this.width - plotArea.x,
        h: plotArea.y
      });
      createClipDiv({
        x: plotArea.x + plotArea.w,
        y: 0,
        w: this.width - plotArea.x - plotArea.w,
        h: this.height
      });
      createClipDiv({
        x: plotArea.x,
        y: plotArea.y + plotArea.h,
        w: this.width - plotArea.x,
        h: this.height - plotArea.h - plotArea.y
      });
    };
    DygraphCanvasRenderer._getIteratorPredicate = function(connectSeparatedPoints) {
      return connectSeparatedPoints ? DygraphCanvasRenderer._predicateThatSkipsEmptyPoints : null;
    };
    DygraphCanvasRenderer._predicateThatSkipsEmptyPoints = function(array, idx) {
      return array[idx].yval !== null;
    };
    DygraphCanvasRenderer._drawStyledLine = function(e, color, strokeWidth, strokePattern, drawPoints, drawPointCallback, pointSize) {
      var g = e.dygraph;
      var stepPlot = g.getBooleanOption("stepPlot", e.setName);
      if (!Dygraph.isArrayLike(strokePattern)) {
        strokePattern = null;
      }
      var drawGapPoints = g.getBooleanOption('drawGapEdgePoints', e.setName);
      var points = e.points;
      var setName = e.setName;
      var iter = Dygraph.createIterator(points, 0, points.length, DygraphCanvasRenderer._getIteratorPredicate(g.getBooleanOption("connectSeparatedPoints", setName)));
      var stroking = strokePattern && (strokePattern.length >= 2);
      var ctx = e.drawingContext;
      ctx.save();
      if (stroking) {
        ctx.installPattern(strokePattern);
      }
      var pointsOnLine = DygraphCanvasRenderer._drawSeries(e, iter, strokeWidth, pointSize, drawPoints, drawGapPoints, stepPlot, color);
      DygraphCanvasRenderer._drawPointsOnLine(e, pointsOnLine, drawPointCallback, color, pointSize);
      if (stroking) {
        ctx.uninstallPattern();
      }
      ctx.restore();
    };
    DygraphCanvasRenderer._drawSeries = function(e, iter, strokeWidth, pointSize, drawPoints, drawGapPoints, stepPlot, color) {
      var prevCanvasX = null;
      var prevCanvasY = null;
      var nextCanvasY = null;
      var isIsolated;
      var point;
      var pointsOnLine = [];
      var first = true;
      var ctx = e.drawingContext;
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = strokeWidth;
      var arr = iter.array_;
      var limit = iter.end_;
      var predicate = iter.predicate_;
      for (var i = iter.start_; i < limit; i++) {
        point = arr[i];
        if (predicate) {
          while (i < limit && !predicate(arr, i)) {
            i++;
          }
          if (i == limit)
            break;
          point = arr[i];
        }
        if (point.canvasy === null || point.canvasy != point.canvasy) {
          if (stepPlot && prevCanvasX !== null) {
            ctx.moveTo(prevCanvasX, prevCanvasY);
            ctx.lineTo(point.canvasx, prevCanvasY);
          }
          prevCanvasX = prevCanvasY = null;
        } else {
          isIsolated = false;
          if (drawGapPoints || !prevCanvasX) {
            iter.nextIdx_ = i;
            iter.next();
            nextCanvasY = iter.hasNext ? iter.peek.canvasy : null;
            var isNextCanvasYNullOrNaN = nextCanvasY === null || nextCanvasY != nextCanvasY;
            isIsolated = (!prevCanvasX && isNextCanvasYNullOrNaN);
            if (drawGapPoints) {
              if ((!first && !prevCanvasX) || (iter.hasNext && isNextCanvasYNullOrNaN)) {
                isIsolated = true;
              }
            }
          }
          if (prevCanvasX !== null) {
            if (strokeWidth) {
              if (stepPlot) {
                ctx.moveTo(prevCanvasX, prevCanvasY);
                ctx.lineTo(point.canvasx, prevCanvasY);
              }
              ctx.lineTo(point.canvasx, point.canvasy);
            }
          } else {
            ctx.moveTo(point.canvasx, point.canvasy);
          }
          if (drawPoints || isIsolated) {
            pointsOnLine.push([point.canvasx, point.canvasy, point.idx]);
          }
          prevCanvasX = point.canvasx;
          prevCanvasY = point.canvasy;
        }
        first = false;
      }
      ctx.stroke();
      return pointsOnLine;
    };
    DygraphCanvasRenderer._drawPointsOnLine = function(e, pointsOnLine, drawPointCallback, color, pointSize) {
      var ctx = e.drawingContext;
      for (var idx = 0; idx < pointsOnLine.length; idx++) {
        var cb = pointsOnLine[idx];
        ctx.save();
        drawPointCallback.call(e.dygraph, e.dygraph, e.setName, ctx, cb[0], cb[1], color, pointSize, cb[2]);
        ctx.restore();
      }
    };
    DygraphCanvasRenderer.prototype._updatePoints = function() {
      var sets = this.layout.points;
      for (var i = sets.length; i--; ) {
        var points = sets[i];
        for (var j = points.length; j--; ) {
          var point = points[j];
          point.canvasx = this.area.w * point.x + this.area.x;
          point.canvasy = this.area.h * point.y + this.area.y;
        }
      }
    };
    DygraphCanvasRenderer.prototype._renderLineChart = function(opt_seriesName, opt_ctx) {
      var ctx = opt_ctx || this.elementContext;
      var i;
      var sets = this.layout.points;
      var setNames = this.layout.setNames;
      var setName;
      this.colors = this.dygraph_.colorsMap_;
      var plotter_attr = this.dygraph_.getOption("plotter");
      var plotters = plotter_attr;
      if (!Dygraph.isArrayLike(plotters)) {
        plotters = [plotters];
      }
      var setPlotters = {};
      for (i = 0; i < setNames.length; i++) {
        setName = setNames[i];
        var setPlotter = this.dygraph_.getOption("plotter", setName);
        if (setPlotter == plotter_attr)
          continue;
        setPlotters[setName] = setPlotter;
      }
      for (i = 0; i < plotters.length; i++) {
        var plotter = plotters[i];
        var is_last = (i == plotters.length - 1);
        for (var j = 0; j < sets.length; j++) {
          setName = setNames[j];
          if (opt_seriesName && setName != opt_seriesName)
            continue;
          var points = sets[j];
          var p = plotter;
          if (setName in setPlotters) {
            if (is_last) {
              p = setPlotters[setName];
            } else {
              continue;
            }
          }
          var color = this.colors[setName];
          var strokeWidth = this.dygraph_.getOption("strokeWidth", setName);
          ctx.save();
          ctx.strokeStyle = color;
          ctx.lineWidth = strokeWidth;
          p({
            points: points,
            setName: setName,
            drawingContext: ctx,
            color: color,
            strokeWidth: strokeWidth,
            dygraph: this.dygraph_,
            axis: this.dygraph_.axisPropertiesForSeries(setName),
            plotArea: this.area,
            seriesIndex: j,
            seriesCount: sets.length,
            singleSeriesName: opt_seriesName,
            allSeriesPoints: sets
          });
          ctx.restore();
        }
      }
    };
    DygraphCanvasRenderer._Plotters = {
      linePlotter: function(e) {
        DygraphCanvasRenderer._linePlotter(e);
      },
      fillPlotter: function(e) {
        DygraphCanvasRenderer._fillPlotter(e);
      },
      errorPlotter: function(e) {
        DygraphCanvasRenderer._errorPlotter(e);
      }
    };
    DygraphCanvasRenderer._linePlotter = function(e) {
      var g = e.dygraph;
      var setName = e.setName;
      var strokeWidth = e.strokeWidth;
      var borderWidth = g.getNumericOption("strokeBorderWidth", setName);
      var drawPointCallback = g.getOption("drawPointCallback", setName) || Dygraph.Circles.DEFAULT;
      var strokePattern = g.getOption("strokePattern", setName);
      var drawPoints = g.getBooleanOption("drawPoints", setName);
      var pointSize = g.getNumericOption("pointSize", setName);
      if (borderWidth && strokeWidth) {
        DygraphCanvasRenderer._drawStyledLine(e, g.getOption("strokeBorderColor", setName), strokeWidth + 2 * borderWidth, strokePattern, drawPoints, drawPointCallback, pointSize);
      }
      DygraphCanvasRenderer._drawStyledLine(e, e.color, strokeWidth, strokePattern, drawPoints, drawPointCallback, pointSize);
    };
    DygraphCanvasRenderer._errorPlotter = function(e) {
      var g = e.dygraph;
      var setName = e.setName;
      var errorBars = g.getBooleanOption("errorBars") || g.getBooleanOption("customBars");
      if (!errorBars)
        return;
      var fillGraph = g.getBooleanOption("fillGraph", setName);
      if (fillGraph) {
        console.warn("Can't use fillGraph option with error bars");
      }
      var ctx = e.drawingContext;
      var color = e.color;
      var fillAlpha = g.getNumericOption('fillAlpha', setName);
      var stepPlot = g.getBooleanOption("stepPlot", setName);
      var points = e.points;
      var iter = Dygraph.createIterator(points, 0, points.length, DygraphCanvasRenderer._getIteratorPredicate(g.getBooleanOption("connectSeparatedPoints", setName)));
      var newYs;
      var prevX = NaN;
      var prevY = NaN;
      var prevYs = [-1, -1];
      var rgb = Dygraph.toRGB_(color);
      var err_color = 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + fillAlpha + ')';
      ctx.fillStyle = err_color;
      ctx.beginPath();
      var isNullUndefinedOrNaN = function(x) {
        return (x === null || x === undefined || isNaN(x));
      };
      while (iter.hasNext) {
        var point = iter.next();
        if ((!stepPlot && isNullUndefinedOrNaN(point.y)) || (stepPlot && !isNaN(prevY) && isNullUndefinedOrNaN(prevY))) {
          prevX = NaN;
          continue;
        }
        newYs = [point.y_bottom, point.y_top];
        if (stepPlot) {
          prevY = point.y;
        }
        if (isNaN(newYs[0]))
          newYs[0] = point.y;
        if (isNaN(newYs[1]))
          newYs[1] = point.y;
        newYs[0] = e.plotArea.h * newYs[0] + e.plotArea.y;
        newYs[1] = e.plotArea.h * newYs[1] + e.plotArea.y;
        if (!isNaN(prevX)) {
          if (stepPlot) {
            ctx.moveTo(prevX, prevYs[0]);
            ctx.lineTo(point.canvasx, prevYs[0]);
            ctx.lineTo(point.canvasx, prevYs[1]);
          } else {
            ctx.moveTo(prevX, prevYs[0]);
            ctx.lineTo(point.canvasx, newYs[0]);
            ctx.lineTo(point.canvasx, newYs[1]);
          }
          ctx.lineTo(prevX, prevYs[1]);
          ctx.closePath();
        }
        prevYs = newYs;
        prevX = point.canvasx;
      }
      ctx.fill();
    };
    DygraphCanvasRenderer._fastCanvasProxy = function(context) {
      var pendingActions = [];
      var lastRoundedX = null;
      var lastFlushedX = null;
      var LINE_TO = 1,
          MOVE_TO = 2;
      var actionCount = 0;
      var compressActions = function(opt_losslessOnly) {
        if (pendingActions.length <= 1)
          return;
        for (var i = pendingActions.length - 1; i > 0; i--) {
          var action = pendingActions[i];
          if (action[0] == MOVE_TO) {
            var prevAction = pendingActions[i - 1];
            if (prevAction[1] == action[1] && prevAction[2] == action[2]) {
              pendingActions.splice(i, 1);
            }
          }
        }
        for (var i = 0; i < pendingActions.length - 1; ) {
          var action = pendingActions[i];
          if (action[0] == MOVE_TO && pendingActions[i + 1][0] == MOVE_TO) {
            pendingActions.splice(i, 1);
          } else {
            i++;
          }
        }
        if (pendingActions.length > 2 && !opt_losslessOnly) {
          var startIdx = 0;
          if (pendingActions[0][0] == MOVE_TO)
            startIdx++;
          var minIdx = null,
              maxIdx = null;
          for (var i = startIdx; i < pendingActions.length; i++) {
            var action = pendingActions[i];
            if (action[0] != LINE_TO)
              continue;
            if (minIdx === null && maxIdx === null) {
              minIdx = i;
              maxIdx = i;
            } else {
              var y = action[2];
              if (y < pendingActions[minIdx][2]) {
                minIdx = i;
              } else if (y > pendingActions[maxIdx][2]) {
                maxIdx = i;
              }
            }
          }
          var minAction = pendingActions[minIdx],
              maxAction = pendingActions[maxIdx];
          pendingActions.splice(startIdx, pendingActions.length - startIdx);
          if (minIdx < maxIdx) {
            pendingActions.push(minAction);
            pendingActions.push(maxAction);
          } else if (minIdx > maxIdx) {
            pendingActions.push(maxAction);
            pendingActions.push(minAction);
          } else {
            pendingActions.push(minAction);
          }
        }
      };
      var flushActions = function(opt_noLossyCompression) {
        compressActions(opt_noLossyCompression);
        for (var i = 0,
            len = pendingActions.length; i < len; i++) {
          var action = pendingActions[i];
          if (action[0] == LINE_TO) {
            context.lineTo(action[1], action[2]);
          } else if (action[0] == MOVE_TO) {
            context.moveTo(action[1], action[2]);
          }
        }
        if (pendingActions.length) {
          lastFlushedX = pendingActions[pendingActions.length - 1][1];
        }
        actionCount += pendingActions.length;
        pendingActions = [];
      };
      var addAction = function(action, x, y) {
        var rx = Math.round(x);
        if (lastRoundedX === null || rx != lastRoundedX) {
          var hasGapOnLeft = (lastRoundedX - lastFlushedX > 1),
              hasGapOnRight = (rx - lastRoundedX > 1),
              hasGap = hasGapOnLeft || hasGapOnRight;
          flushActions(hasGap);
          lastRoundedX = rx;
        }
        pendingActions.push([action, x, y]);
      };
      return {
        moveTo: function(x, y) {
          addAction(MOVE_TO, x, y);
        },
        lineTo: function(x, y) {
          addAction(LINE_TO, x, y);
        },
        stroke: function() {
          flushActions(true);
          context.stroke();
        },
        fill: function() {
          flushActions(true);
          context.fill();
        },
        beginPath: function() {
          flushActions(true);
          context.beginPath();
        },
        closePath: function() {
          flushActions(true);
          context.closePath();
        },
        _count: function() {
          return actionCount;
        }
      };
    };
    DygraphCanvasRenderer._fillPlotter = function(e) {
      if (e.singleSeriesName)
        return;
      if (e.seriesIndex !== 0)
        return;
      var g = e.dygraph;
      var setNames = g.getLabels().slice(1);
      for (var i = setNames.length; i >= 0; i--) {
        if (!g.visibility()[i])
          setNames.splice(i, 1);
      }
      var anySeriesFilled = (function() {
        for (var i = 0; i < setNames.length; i++) {
          if (g.getBooleanOption("fillGraph", setNames[i]))
            return true;
        }
        return false;
      })();
      if (!anySeriesFilled)
        return;
      var area = e.plotArea;
      var sets = e.allSeriesPoints;
      var setCount = sets.length;
      var fillAlpha = g.getNumericOption('fillAlpha');
      var stackedGraph = g.getBooleanOption("stackedGraph");
      var colors = g.getColors();
      var baseline = {};
      var currBaseline;
      var prevStepPlot;
      var traceBackPath = function(ctx, baselineX, baselineY, pathBack) {
        ctx.lineTo(baselineX, baselineY);
        if (stackedGraph) {
          for (var i = pathBack.length - 1; i >= 0; i--) {
            var pt = pathBack[i];
            ctx.lineTo(pt[0], pt[1]);
          }
        }
      };
      for (var setIdx = setCount - 1; setIdx >= 0; setIdx--) {
        var ctx = e.drawingContext;
        var setName = setNames[setIdx];
        if (!g.getBooleanOption('fillGraph', setName))
          continue;
        var stepPlot = g.getBooleanOption('stepPlot', setName);
        var color = colors[setIdx];
        var axis = g.axisPropertiesForSeries(setName);
        var axisY = 1.0 + axis.minyval * axis.yscale;
        if (axisY < 0.0)
          axisY = 0.0;
        else if (axisY > 1.0)
          axisY = 1.0;
        axisY = area.h * axisY + area.y;
        var points = sets[setIdx];
        var iter = Dygraph.createIterator(points, 0, points.length, DygraphCanvasRenderer._getIteratorPredicate(g.getBooleanOption("connectSeparatedPoints", setName)));
        var prevX = NaN;
        var prevYs = [-1, -1];
        var newYs;
        var rgb = Dygraph.toRGB_(color);
        var err_color = 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + fillAlpha + ')';
        ctx.fillStyle = err_color;
        ctx.beginPath();
        var last_x,
            is_first = true;
        if (points.length > 2 * g.width_ || Dygraph.FORCE_FAST_PROXY) {
          ctx = DygraphCanvasRenderer._fastCanvasProxy(ctx);
        }
        var pathBack = [];
        var point;
        while (iter.hasNext) {
          point = iter.next();
          if (!Dygraph.isOK(point.y) && !stepPlot) {
            traceBackPath(ctx, prevX, prevYs[1], pathBack);
            pathBack = [];
            prevX = NaN;
            if (point.y_stacked !== null && !isNaN(point.y_stacked)) {
              baseline[point.canvasx] = area.h * point.y_stacked + area.y;
            }
            continue;
          }
          if (stackedGraph) {
            if (!is_first && last_x == point.xval) {
              continue;
            } else {
              is_first = false;
              last_x = point.xval;
            }
            currBaseline = baseline[point.canvasx];
            var lastY;
            if (currBaseline === undefined) {
              lastY = axisY;
            } else {
              if (prevStepPlot) {
                lastY = currBaseline[0];
              } else {
                lastY = currBaseline;
              }
            }
            newYs = [point.canvasy, lastY];
            if (stepPlot) {
              if (prevYs[0] === -1) {
                baseline[point.canvasx] = [point.canvasy, axisY];
              } else {
                baseline[point.canvasx] = [point.canvasy, prevYs[0]];
              }
            } else {
              baseline[point.canvasx] = point.canvasy;
            }
          } else {
            if (isNaN(point.canvasy) && stepPlot) {
              newYs = [area.y + area.h, axisY];
            } else {
              newYs = [point.canvasy, axisY];
            }
          }
          if (!isNaN(prevX)) {
            if (stepPlot) {
              ctx.lineTo(point.canvasx, prevYs[0]);
              ctx.lineTo(point.canvasx, newYs[0]);
            } else {
              ctx.lineTo(point.canvasx, newYs[0]);
            }
            if (stackedGraph) {
              pathBack.push([prevX, prevYs[1]]);
              if (prevStepPlot && currBaseline) {
                pathBack.push([point.canvasx, currBaseline[1]]);
              } else {
                pathBack.push([point.canvasx, newYs[1]]);
              }
            }
          } else {
            ctx.moveTo(point.canvasx, newYs[1]);
            ctx.lineTo(point.canvasx, newYs[0]);
          }
          prevYs = newYs;
          prevX = point.canvasx;
        }
        prevStepPlot = stepPlot;
        if (newYs && point) {
          traceBackPath(ctx, point.canvasx, newYs[1], pathBack);
          pathBack = [];
        }
        ctx.fill();
      }
    };
    return DygraphCanvasRenderer;
  })();
})(require('process'));
