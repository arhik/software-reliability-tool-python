System.register(['aurelia-framework', 'aurelia-event-aggregator'], function (_export) {
	'use strict';

	var inject, EventAggregator, PlotData;

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	return {
		setters: [function (_aureliaFramework) {
			inject = _aureliaFramework.inject;
		}, function (_aureliaEventAggregator) {
			EventAggregator = _aureliaEventAggregator.EventAggregator;
		}],
		execute: function () {
			PlotData = (function () {
				function PlotData(eventAggregator) {
					var _this = this;

					_classCallCheck(this, _PlotData);

					this.eventAggregator = eventAggregator;
					this.plotData = {};

					this.eventAggregator.subscribe('plotData', function (plotData) {
						_this.plotData = originData;
						console.log(_this);
					});
				}

				_createClass(PlotData, [{
					key: 'getData',
					value: function getData() {
						return JSON.stringify(this.plotData);
					}
				}]);

				var _PlotData = PlotData;
				PlotData = inject(EventAggregator)(PlotData) || PlotData;
				return PlotData;
			})();

			_export('PlotData', PlotData);
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBsb3REYXRhLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs4QkFJYSxRQUFROzs7Ozs7Ozs4QkFKYixNQUFNOzs2Q0FDTixlQUFlOzs7QUFHVixXQUFRO0FBQ1QsYUFEQyxRQUFRLENBQ1IsZUFBZSxFQUFDOzs7OztBQUUzQixTQUFJLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQztBQUN2QyxTQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQzs7QUFFbkIsU0FBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLFVBQUEsUUFBUSxFQUFJO0FBQzVDLFlBQUssUUFBUSxHQUFFLFVBQVUsQ0FBQztBQUMxQixhQUFPLENBQUMsR0FBRyxPQUFNLENBQUM7TUFDbEIsQ0FBQyxDQUFDO0tBRWI7O2lCQVhXLFFBQVE7O1lBYWIsbUJBQUU7QUFDUixhQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO01BQ3JDOzs7b0JBZlcsUUFBUTtBQUFSLFlBQVEsR0FEcEIsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUNYLFFBQVEsS0FBUixRQUFRO1dBQVIsUUFBUSIsImZpbGUiOiJwbG90RGF0YS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aW5qZWN0fSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XG5pbXBvcnQge0V2ZW50QWdncmVnYXRvcn0gZnJvbSBcImF1cmVsaWEtZXZlbnQtYWdncmVnYXRvclwiO1xuXG5AaW5qZWN0KEV2ZW50QWdncmVnYXRvcilcbmV4cG9ydCBjbGFzcyBQbG90RGF0YXtcblx0Y29uc3RydWN0b3IoZXZlbnRBZ2dyZWdhdG9yKXtcblx0XHQvLyB0aGlzLnBsdGx5ID0gcGx0bHk7XG5cdFx0dGhpcy5ldmVudEFnZ3JlZ2F0b3IgPSBldmVudEFnZ3JlZ2F0b3I7XG5cdFx0dGhpcy5wbG90RGF0YSA9IHt9O1xuXHRcdFxuXHRcdHRoaXMuZXZlbnRBZ2dyZWdhdG9yLnN1YnNjcmliZSgncGxvdERhdGEnLCBwbG90RGF0YSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRoaXMucGxvdERhdGE9IG9yaWdpbkRhdGE7IFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjb25zb2xlLmxvZyh0aGlzKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdC8vIGNvbnNvbGUubG9nKHRoaXMub3JpZ2luRGF0YSk7XG5cdH1cblx0Ly9TdHJpbmdpZnkgZGF0YVxuXHRnZXREYXRhKCl7XG5cdFx0cmV0dXJuIEpTT04uc3RyaW5naWZ5KHRoaXMucGxvdERhdGEpO1xuXHR9XG59ICJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
