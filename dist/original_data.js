System.register(['aurelia-framework', 'aurelia-event-aggregator'], function (_export) {
	'use strict';

	var inject, EventAggregator, OriginData;

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	return {
		setters: [function (_aureliaFramework) {
			inject = _aureliaFramework.inject;
		}, function (_aureliaEventAggregator) {
			EventAggregator = _aureliaEventAggregator.EventAggregator;
		}],
		execute: function () {
			OriginData = (function () {
				function OriginData(eventAggregator) {
					var _this = this;

					_classCallCheck(this, _OriginData);

					this.eventAggregator = eventAggregator;
					this.originData = {};
					this.plotData = {};
					this.eventAggregator.subscribe('rawdata', function (originData) {
						_this.originData = originData;
					});
					this.eventAggregator.subscribe('plotData', function (plotData) {
						_this.plotData = plotData;
						console.log(_this.plotData);
					});
				}

				_createClass(OriginData, [{
					key: 'activate',
					value: function activate() {}
				}, {
					key: 'getRawData',
					value: function getRawData() {
						return JSON.stringify(this.originData);
					}
				}, {
					key: 'getPlotData',
					value: function getPlotData() {
						return JSON.stringify(this.plotData);
					}
				}]);

				var _OriginData = OriginData;
				OriginData = inject(EventAggregator)(OriginData) || OriginData;
				return OriginData;
			})();

			_export('OriginData', OriginData);
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yaWdpbmFsX2RhdGEuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OzhCQUlhLFVBQVU7Ozs7Ozs7OzhCQUpmLE1BQU07OzZDQUNOLGVBQWU7OztBQUdWLGFBQVU7QUFDWCxhQURDLFVBQVUsQ0FDVixlQUFlLEVBQUM7Ozs7O0FBRTNCLFNBQUksQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDO0FBQ3ZDLFNBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO0FBQ3JCLFNBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO0FBQ25CLFNBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxVQUFBLFVBQVUsRUFBSTtBQUM3QyxZQUFLLFVBQVUsR0FBRSxVQUFVLENBQUM7TUFFNUIsQ0FBQyxDQUFDO0FBQ2IsU0FBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLFVBQUEsUUFBUSxFQUFJO0FBQzVDLFlBQUssUUFBUSxHQUFFLFFBQVEsQ0FBQztBQUN4QixhQUFPLENBQUMsR0FBRyxDQUFDLE1BQUssUUFBUSxDQUFDLENBQUM7TUFDM0IsQ0FBQyxDQUFDO0tBRWI7O2lCQWZXLFVBQVU7O1lBaUJkLG9CQUFFLEVBRVQ7OztZQUVTLHNCQUFFO0FBQ1gsYUFBTyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztNQUN2Qzs7O1lBRVUsdUJBQUU7QUFDWixhQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBO01BQ3BDOzs7c0JBM0JXLFVBQVU7QUFBVixjQUFVLEdBRHRCLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FDWCxVQUFVLEtBQVYsVUFBVTtXQUFWLFVBQVUiLCJmaWxlIjoib3JpZ2luYWxfZGF0YS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aW5qZWN0fSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XG5pbXBvcnQge0V2ZW50QWdncmVnYXRvcn0gZnJvbSBcImF1cmVsaWEtZXZlbnQtYWdncmVnYXRvclwiO1xuXG5AaW5qZWN0KEV2ZW50QWdncmVnYXRvcilcbmV4cG9ydCBjbGFzcyBPcmlnaW5EYXRhe1xuXHRjb25zdHJ1Y3RvcihldmVudEFnZ3JlZ2F0b3Ipe1xuXHRcdC8vIHRoaXMucGx0bHkgPSBwbHRseTtcblx0XHR0aGlzLmV2ZW50QWdncmVnYXRvciA9IGV2ZW50QWdncmVnYXRvcjtcblx0XHR0aGlzLm9yaWdpbkRhdGEgPSB7fTtcblx0XHR0aGlzLnBsb3REYXRhID0ge307XG5cdFx0dGhpcy5ldmVudEFnZ3JlZ2F0b3Iuc3Vic2NyaWJlKCdyYXdkYXRhJywgb3JpZ2luRGF0YSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRoaXMub3JpZ2luRGF0YT0gb3JpZ2luRGF0YTsgXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vIGNvbnNvbGUubG9nKHRoaXMpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0dGhpcy5ldmVudEFnZ3JlZ2F0b3Iuc3Vic2NyaWJlKCdwbG90RGF0YScsIHBsb3REYXRhID0+IHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0dGhpcy5wbG90RGF0YT0gcGxvdERhdGE7IFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjb25zb2xlLmxvZyh0aGlzLnBsb3REYXRhKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdC8vIGNvbnNvbGUubG9nKHRoaXMub3JpZ2luRGF0YSk7XG5cdH1cblx0Ly9TdHJpbmdpZnkgZGF0YVxuXHRhY3RpdmF0ZSgpe1xuXHRcblx0fVxuXG5cdGdldFJhd0RhdGEoKXtcblx0XHRyZXR1cm4gSlNPTi5zdHJpbmdpZnkodGhpcy5vcmlnaW5EYXRhKTtcblx0fVxuXG5cdGdldFBsb3REYXRhKCl7XG5cdFx0cmV0dXJuIEpTT04uc3RyaW5naWZ5KHRoaXMucGxvdERhdGEpXG5cdH1cbn0gIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
