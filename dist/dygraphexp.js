System.register(['aurelia-framework', 'aurelia-event-aggregator', 'dygraphs'], function (_export) {
	'use strict';

	var inject, Element, ObserverLocator, bindable, customElement, TaskQueue, EventAggregator, Dygraph, PlotDygraph;

	var _createDecoratedClass = (function () { function defineProperties(target, descriptors, initializers) { for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } if (descriptor.initializer !== undefined) { initializers[key] = descriptor; continue; } } Object.defineProperty(target, key, descriptor); } } return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) { if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers); if (staticProps) defineProperties(Constructor, staticProps, staticInitializers); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _defineDecoratedPropertyDescriptor(target, key, descriptors) { var _descriptor = descriptors[key]; if (!_descriptor) return; var descriptor = {}; for (var _key in _descriptor) descriptor[_key] = _descriptor[_key]; descriptor.value = descriptor.initializer ? descriptor.initializer.call(target) : undefined; Object.defineProperty(target, key, descriptor); }

	return {
		setters: [function (_aureliaFramework) {
			inject = _aureliaFramework.inject;
			Element = _aureliaFramework.Element;
			ObserverLocator = _aureliaFramework.ObserverLocator;
			bindable = _aureliaFramework.bindable;
			customElement = _aureliaFramework.customElement;
			TaskQueue = _aureliaFramework.TaskQueue;
		}, function (_aureliaEventAggregator) {
			EventAggregator = _aureliaEventAggregator.EventAggregator;
		}, function (_dygraphs) {
			Dygraph = _dygraphs['default'];
		}],
		execute: function () {
			PlotDygraph = (function () {
				var _instanceInitializers = {};
				var _instanceInitializers = {};

				_createDecoratedClass(PlotDygraph, [{
					key: 'dygraphdiv',
					decorators: [bindable],
					initializer: null,
					enumerable: true
				}], null, _instanceInitializers);

				function PlotDygraph(eventAggregator) {
					_classCallCheck(this, _PlotDygraph);

					_defineDecoratedPropertyDescriptor(this, 'dygraphdiv', _instanceInitializers);

					this.eventAggregator = eventAggregator;

					this.data = [[1, null, 3], [2, 2, null], [3, null, 7], [4, 5, null], [5, null, 5], [6, 3, null]];
				}

				_createDecoratedClass(PlotDygraph, [{
					key: 'activate',
					value: function activate() {}
				}, {
					key: 'attached',
					value: function attached() {
						var _this = this;

						this.eventAggregator.subscribe('rawdata', function (plotdata) {
							_this.data = plotdata;
							console.log(_this);
							_this.dygraph = new Dygraph(_this.dygraphdiv, _this.data, {
								legend: 'always',
								animatedZooms: true,
								title: 'dygraphs chart template'
							});
						});
					}
				}, {
					key: 'rawPlotDataChanged',
					value: function rawPlotDataChanged() {
						console.log(this);
					}
				}], null, _instanceInitializers);

				var _PlotDygraph = PlotDygraph;
				PlotDygraph = inject(EventAggregator)(PlotDygraph) || PlotDygraph;
				PlotDygraph = customElement('plotdygraph')(PlotDygraph) || PlotDygraph;
				return PlotDygraph;
			})();

			_export('PlotDygraph', PlotDygraph);
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImR5Z3JhcGhleHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O3FHQU1hLFdBQVc7Ozs7Ozs7Ozs7OEJBTmhCLE1BQU07K0JBQUUsT0FBTzt1Q0FBQyxlQUFlO2dDQUFDLFFBQVE7cUNBQUMsYUFBYTtpQ0FBRSxTQUFTOzs2Q0FDakUsZUFBZTs7Ozs7QUFLVixjQUFXOzs7OzBCQUFYLFdBQVc7O2tCQUN0QixRQUFROzs7OztBQUNFLGFBRkMsV0FBVyxDQUVYLGVBQWUsRUFBQzs7Ozs7QUFFM0IsU0FBSSxDQUFDLGVBQWUsR0FBRyxlQUFlLENBQUM7O0FBU3ZDLFNBQUksQ0FBQyxJQUFJLEdBQUcsQ0FDSixDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQ1osQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUNaLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsRUFDWixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLEVBQ1osQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUNaLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FDYixDQUFDO0tBUVI7OzBCQTVCVyxXQUFXOztZQWtDZixvQkFBRyxFQVFWOzs7WUFFTyxvQkFBRTs7O0FBR1QsVUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLFVBQUEsUUFBUSxFQUFJO0FBQzNDLGFBQUssSUFBSSxHQUFHLFFBQVEsQ0FBQztBQUNyQixjQUFPLENBQUMsR0FBRyxPQUFNLENBQUM7QUFDbEIsYUFBSyxPQUFPLEdBQUcsSUFBSSxPQUFPLENBQUMsTUFBSyxVQUFVLEVBQUUsTUFBSyxJQUFJLEVBQUU7QUFJdkMsY0FBTSxFQUFFLFFBQVE7QUFDaEIscUJBQWEsRUFBRSxJQUFJO0FBQ25CLGFBQUssRUFBRSx5QkFBeUI7UUFDbkMsQ0FBQyxDQUFDO09BSXpCLENBQUMsQ0FBQztNQUlIOzs7WUFFaUIsOEJBQUU7QUFFbkIsYUFBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztNQWFqQjs7O3VCQWxGVSxXQUFXO0FBQVgsZUFBVyxHQUR2QixNQUFNLENBQUMsZUFBZSxDQUFDLENBQ1gsV0FBVyxLQUFYLFdBQVc7QUFBWCxlQUFXLEdBRnZCLGFBQWEsQ0FBQyxhQUFhLENBQUMsQ0FFaEIsV0FBVyxLQUFYLFdBQVc7V0FBWCxXQUFXIiwiZmlsZSI6ImR5Z3JhcGhleHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2luamVjdCwgRWxlbWVudCxPYnNlcnZlckxvY2F0b3IsYmluZGFibGUsY3VzdG9tRWxlbWVudCwgVGFza1F1ZXVlfSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XG5pbXBvcnQge0V2ZW50QWdncmVnYXRvcn0gZnJvbSAnYXVyZWxpYS1ldmVudC1hZ2dyZWdhdG9yJztcbmltcG9ydCBEeWdyYXBoIGZyb20gJ2R5Z3JhcGhzJztcblxuQGN1c3RvbUVsZW1lbnQoJ3Bsb3RkeWdyYXBoJylcbkBpbmplY3QoRXZlbnRBZ2dyZWdhdG9yKVxuZXhwb3J0IGNsYXNzIFBsb3REeWdyYXBoe1xuXHRAYmluZGFibGUgZHlncmFwaGRpdjtcblx0Y29uc3RydWN0b3IoZXZlbnRBZ2dyZWdhdG9yKXtcblx0XHQvLyB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuXHRcdHRoaXMuZXZlbnRBZ2dyZWdhdG9yID0gZXZlbnRBZ2dyZWdhdG9yO1xuXHRcdC8vIHRoaXMudGFza1F1ZXVlID0gdGFza1F1ZXVlO1xuXHRcdC8vIHRoaXMucmF3UGxvdERhdGEgPSB7fTtcblx0XHQvLyB0aGlzLmR5Z3JhcGggPSBkeWdyYXBoO1xuXHRcdC8vIHRoaXMuZHlncmFwaGRpdiA9IGR5Z3JhcGhkaXY7XG5cdFx0Ly8gdGhpcy5vYnNlcnZlckxvY2F0b3IgPSBvYnNlcnZlckxvY2F0b3I7XG5cdFx0Ly8gdmFyIHN1YnNjcmlwdGlvbiA9IHRoaXMub2JzZXJ2ZXJMb2NhdG9yXG5cdFx0Ly8gXHRcdFx0XHQgICAgICAuZ2V0T2JzZXJ2ZXIodGhpcywgJ3Jhd1Bsb3REYXRhJylcblx0XHQvLyBcdFx0XHRcdCAgICAgIC5zdWJzY3JpYmUodGhpcy5yYXdQbG90RGF0YUNoYW5nZWQpO1xuXHRcdHRoaXMuZGF0YSA9IFtcbiAgICAgICAgICBbMSwgbnVsbCwgM10sXG4gICAgICAgICAgWzIsIDIsIG51bGxdLFxuICAgICAgICAgIFszLCBudWxsLCA3XSxcbiAgICAgICAgICBbNCwgNSwgbnVsbF0sXG4gICAgICAgICAgWzUsIG51bGwsIDVdLFxuICAgICAgICAgIFs2LCAzLCBudWxsXVxuICAgICAgICBdO1xuICAgICAgICAvLyB0aGlzLmdyYXBoID0gbmV3IER5Z3JhcGgodGhpcy5keWdyYXBoZGl2LCB0aGlzLmRhdGEsIHtcblx0ICAgICAgIC8vICAgICBcdFx0XHRcdFx0XHRcdC8vIGxhYmVsczpbXCJYXCIsIFwiWVwiLCBcIlpcIl0sXG5cdCAgICAgICAvLyAgICAgXHRcdFx0XHRcdFx0XHQvLyBoZWFkZXJzOnRydWUsIFx0XHRcdFx0XHRcdFx0ICAgICAgICAgICAgICAgICAgICAgLy8gb3B0aW9ucyBnbyBoZXJlLiBTZWUgaHR0cDovL2R5Z3JhcGhzLmNvbS9vcHRpb25zLmh0bWxcbiAgICAgICAgLy8gICAgICAgICAgICAgIGxlZ2VuZDogJ2Fsd2F5cycsXG4gICAgICAgIC8vICAgICAgICAgICAgICBhbmltYXRlZFpvb21zOiB0cnVlLFxuICAgICAgICAvLyAgICAgICAgICAgICAgdGl0bGU6ICdkeWdyYXBocyBjaGFydCB0ZW1wbGF0ZSdcbiAgICAgICAgLy8gICAgICAgICAgfSk7XG5cdH1cblxuXHQvLyBnZXQoKXtcblx0Ly8gXHR0aGlzLmV2ZW50QWdncmVnYXRvci5zdWJzY3JpYmUoJ3Jhd2RhdGEnLCBwbG90ZGF0YSA9PiB7IHJldHVybiBwbG90ZGF0YX0pXG5cdC8vIH1cblxuXHRhY3RpdmF0ZSgpIHtcblx0XHQvLyB2YXIgcmF3UGxvdERhdGE7XG5cdFx0Ly8gdGhpcy5ldmVudEFnZ3JlZ2F0b3Iuc3Vic2NyaWJlKCdyYXdkYXRhJywgcGxvdGRhdGEgPT4ge1xuXHRcdC8vIFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0aGlzLnJhd1Bsb3REYXRhID0gcGxvdGRhdGE7IFxuXHRcdC8vIFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjb25zb2xlLmxvZyh0aGlzKTtcblx0XHQvLyBcdFx0XHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdC8vIHJldHVybiB0aGlzLmV2ZW50QWdncmVnYXRvci5zdWJzY3JpYmUoJ3Jhd2RhdGEnLCBkYXRhdGFibGUgPT4gdGhpcy5yYXdEYXRhID0gcGxvdGRhdGEpO1xuXG5cdH1cblxuXHRhdHRhY2hlZCgpe1xuXHRcdC8vIHZhciBkaXYgPSB0aGlzLmR5Z3JhcGhkaXZcblx0XHQvLyB0aGlzLnRhc2tRdWV1ZS5xdWV1ZU1pY3JvVGFzaygoKSA9PiB7XG5cdFx0dGhpcy5ldmVudEFnZ3JlZ2F0b3Iuc3Vic2NyaWJlKCdyYXdkYXRhJywgcGxvdGRhdGEgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0aGlzLmRhdGEgPSBwbG90ZGF0YTsgXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKHRoaXMpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0aGlzLmR5Z3JhcGggPSBuZXcgRHlncmFwaCh0aGlzLmR5Z3JhcGhkaXYsIHRoaXMuZGF0YSwge1xuXHQgICAgICAgICAgIFx0XHRcdFx0XHRcdFx0Ly8gbGFiZWxzOltcIlhcIiwgXCJZXCIsIFwiWlwiXSxcblx0ICAgICAgICAgICBcdFx0XHRcdFx0XHRcdC8vIGhlYWRlcnM6dHJ1ZSwgXHRcdFx0XHRcdFx0XHQgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICBcdFx0XHRcdFx0XHRcdC8vIG9wdGlvbnMgZ28gaGVyZS4gU2VlIGh0dHA6Ly9keWdyYXBocy5jb20vb3B0aW9ucy5odG1sXG5cdFx0XHRcdFx0XHRcdFx0ICAgICAgICAgICAgICAgICAgICAgbGVnZW5kOiAnYWx3YXlzJyxcblx0XHRcdFx0XHRcdFx0XHQgICAgICAgICAgICAgICAgICAgICBhbmltYXRlZFpvb21zOiB0cnVlLFxuXHRcdFx0XHRcdFx0XHRcdCAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAnZHlncmFwaHMgY2hhcnQgdGVtcGxhdGUnXG5cdFx0XHRcdFx0XHRcdFx0ICAgICAgICAgICAgICAgICB9KTtcblx0XHQvLyB0aGlzLnJhd0RhdGEgPSB0aGlzLnJhd1Bsb3REYXRhO1xuXHRcdC8vIHRoaXMucmF3RGF0YSA9IHt9O1xuXHRcdC8vIGNvbnNvbGUubG9nKHRoaXMucmF3UGxvdERhdGEpXG5cdFx0fSk7XG5cdFx0Ly8gY29uc29sZS5sb2cobmV3IER5Z3JhcGgodGhpcy5keWdyYXBoZGl2LCB0aGlzLmRhdGEpKTtcblx0XHRcblxuXHR9XG5cdFxuXHRyYXdQbG90RGF0YUNoYW5nZWQoKXtcblx0XHQvLyBhdHRhY2hlZCgpXG5cdFx0Y29uc29sZS5sb2codGhpcyk7XG5cdFx0Ly8gY29uc29sZS5sb2coXCJWYWx1ZSBjaGFuZ2VkXCIpO1xuXG5cdFx0Ly8gbmV3IER5Z3JhcGgoZGl2LCBkYXRhLCB7XG5cdCAvLyAgICAgICAgICAgXHRcdFx0XHRcdFx0XHQvLyBsYWJlbHM6W1wiWFwiLCBcIllcIiwgXCJaXCJdLFxuXHQgLy8gICAgICAgICAgIFx0XHRcdFx0XHRcdFx0Ly8gaGVhZGVyczp0cnVlLCBcdFx0XHRcdFx0XHRcdCAgICAgICAgICAgICAgICAgICAgIC8vIG9wdGlvbnMgZ28gaGVyZS4gU2VlIGh0dHA6Ly9keWdyYXBocy5jb20vb3B0aW9ucy5odG1sXG4gIC8vICAgICAgICAgICAgICAgICAgICBsZWdlbmQ6ICdhbHdheXMnLFxuICAvLyAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZWRab29tczogdHJ1ZSxcbiAgLy8gICAgICAgICAgICAgICAgICAgIHRpdGxlOiAnZHlncmFwaHMgY2hhcnQgdGVtcGxhdGUnXG4gIC8vICAgICAgICAgICAgICAgIH0pO1xuXHRcdC8vIHRoaXMuZ3JhcGgudXBkYXRlT3B0aW9ucyh7J2ZpbGUnOnRoaXMucmF3UGxvdERhdGF9KTtcblx0XHQvLyBjb25zb2xlLmxvZyhQbG90bHkpO1xuXHRcdC8vIGNvbnNvbGUubG9nKHRoaXMucGx0bHlqcylcblx0XHR9XG5cblxufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
