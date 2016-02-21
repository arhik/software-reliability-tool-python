System.register(['aurelia-framework', 'aurelia-event-aggregator', 'plotly/dist/plotly', 'jquery'], function (_export) {
	'use strict';

	var customElement, inject, bindable, TaskQueue, EventAggregator, Plotly, $, Plotest;

	var _createDecoratedClass = (function () { function defineProperties(target, descriptors, initializers) { for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } if (descriptor.initializer !== undefined) { initializers[key] = descriptor; continue; } } Object.defineProperty(target, key, descriptor); } } return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) { if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers); if (staticProps) defineProperties(Constructor, staticProps, staticInitializers); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _defineDecoratedPropertyDescriptor(target, key, descriptors) { var _descriptor = descriptors[key]; if (!_descriptor) return; var descriptor = {}; for (var _key in _descriptor) descriptor[_key] = _descriptor[_key]; descriptor.value = descriptor.initializer ? descriptor.initializer.call(target) : undefined; Object.defineProperty(target, key, descriptor); }

	return {
		setters: [function (_aureliaFramework) {
			customElement = _aureliaFramework.customElement;
			inject = _aureliaFramework.inject;
			bindable = _aureliaFramework.bindable;
			TaskQueue = _aureliaFramework.TaskQueue;
		}, function (_aureliaEventAggregator) {
			EventAggregator = _aureliaEventAggregator.EventAggregator;
		}, function (_plotlyDistPlotly) {
			Plotly = _plotlyDistPlotly['default'];
		}, function (_jquery) {
			$ = _jquery['default'];
		}],
		execute: function () {
			Plotest = (function () {
				var _instanceInitializers = {};
				var _instanceInitializers = {};

				_createDecoratedClass(Plotest, [{
					key: 'plotlydiv',
					decorators: [bindable],
					initializer: null,
					enumerable: true
				}], null, _instanceInitializers);

				function Plotest(eventAggregator, taskQueue) {
					_classCallCheck(this, _Plotest);

					_defineDecoratedPropertyDescriptor(this, 'plotlydiv', _instanceInitializers);

					this.eventAggregator = eventAggregator;
					this.taskQueue = taskQueue;
					this.plotData = {};
				}

				_createDecoratedClass(Plotest, [{
					key: 'attached',
					value: function attached() {
						var _this = this;

						var layout = {
							autosize: false,
							width: 800,
							height: 800,
							margin: {
								l: 50,
								r: 50,
								b: 100,
								t: 100,
								pad: 4
							}
						};
						var TESTER = this.plotlydiv;
						console.log(TESTER);
						this.taskQueue.queueMicroTask(function () {
							_this.eventAggregator.subscribe('plotData', function (plotdata) {
								_this.plotData = plotdata;
								console.log(_this);
								console.log("plotlyData is triggered");
								console.log(_this.plotData.plotlyPlot);
								_this.plotlydiv.data.push(_this.plotData.plotlyPlot);

								Plotly.redraw(_this.plotlydiv);
								_this.plotlydiv.on('plotly_selected', function (eventData) {
									if (eventData !== undefined) {
										console.log(eventData.points);
									} else {}
								});
							});
						});
						this.taskQueue.queueMicroTask(function () {
							_this.eventAggregator.subscribe('rawdata', function (rawdata) {
								_this.rawData = rawdata;
								console.log(_this);

								Plotly.plot(_this.plotlydiv, _this.rawData, layout);
								_this.plotlydiv.on('plotly_selected', function (eventData) {
									if (eventData !== undefined) {
										console.log(eventData.points);
									} else {}
								});
							});
						});
					}
				}], null, _instanceInitializers);

				var _Plotest = Plotest;
				Plotest = inject(EventAggregator, TaskQueue)(Plotest) || Plotest;
				Plotest = customElement('plotest')(Plotest) || Plotest;
				return Plotest;
			})();

			_export('Plotest', Plotest);
		}
	};
});
//# sourceMappingURL=data:application/json;base64,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LE9BQU8sS0FBUCxPQUFPO1dBQVAsT0FBTyIsImZpbGUiOiJwbG90ZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtjdXN0b21FbGVtZW50LCBpbmplY3QsIGJpbmRhYmxlLCBUYXNrUXVldWV9IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcbmltcG9ydCB7RXZlbnRBZ2dyZWdhdG9yfSBmcm9tIFwiYXVyZWxpYS1ldmVudC1hZ2dyZWdhdG9yXCI7XG5pbXBvcnQgUGxvdGx5IGZyb20gJ3Bsb3RseS9kaXN0L3Bsb3RseScgLy9JdCBpcyBhbiBpc3N1ZSBmb3Igbm93OiBodHRwczovL2dpdGh1Yi5jb20vcGxvdGx5L3Bsb3RseS5qcy9pc3N1ZXMvMjIgXG4vLyBpbXBvcnQgT3JpZ2luRGF0YSBmcm9tICcuL29yaWdpbmFsX2RhdGEnO1xuaW1wb3J0ICQgZnJvbSBcImpxdWVyeVwiO1xuQGN1c3RvbUVsZW1lbnQoJ3Bsb3Rlc3QnKVxuQGluamVjdChFdmVudEFnZ3JlZ2F0b3IsIFRhc2tRdWV1ZSlcbmV4cG9ydCBjbGFzcyBQbG90ZXN0e1xuXHRAYmluZGFibGUgcGxvdGx5ZGl2O1xuXHRjb25zdHJ1Y3RvcihldmVudEFnZ3JlZ2F0b3IsIHRhc2tRdWV1ZSl7XG5cdFx0dGhpcy5ldmVudEFnZ3JlZ2F0b3IgPSBldmVudEFnZ3JlZ2F0b3I7XG5cdFx0dGhpcy50YXNrUXVldWUgPSB0YXNrUXVldWU7XG5cdFx0dGhpcy5wbG90RGF0YSA9IHt9O1xuXHR9XG5cblx0YXR0YWNoZWQoKXtcblx0XHR2YXIgbGF5b3V0ID0ge1xuXHRcdFx0ICBhdXRvc2l6ZTogZmFsc2UsXG5cdFx0XHQgIHdpZHRoOiA4MDAsXG5cdFx0XHQgIGhlaWdodDogODAwLFxuXHRcdFx0ICBtYXJnaW46IHtcblx0XHRcdCAgICBsOiA1MCxcblx0XHRcdCAgICByOiA1MCxcblx0XHRcdCAgICBiOiAxMDAsXG5cdFx0XHQgICAgdDogMTAwLFxuXHRcdFx0ICAgIHBhZDogNFxuXHRcdFx0ICB9XG5cdFx0XHR9O1xuXHRcdHZhciBURVNURVIgPSB0aGlzLnBsb3RseWRpdjtcblx0XHRjb25zb2xlLmxvZyhURVNURVIpO1xuXHRcdHRoaXMudGFza1F1ZXVlLnF1ZXVlTWljcm9UYXNrKCgpID0+IHtcblx0XHRcdHRoaXMuZXZlbnRBZ2dyZWdhdG9yLnN1YnNjcmliZSgncGxvdERhdGEnLCBwbG90ZGF0YSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0dGhpcy5wbG90RGF0YT0gcGxvdGRhdGE7IFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKHRoaXMpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKFwicGxvdGx5RGF0YSBpcyB0cmlnZ2VyZWRcIik7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc29sZS5sb2codGhpcy5wbG90RGF0YS5wbG90bHlQbG90KTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0aGlzLnBsb3RseWRpdi5kYXRhLnB1c2godGhpcy5wbG90RGF0YS5wbG90bHlQbG90KTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvLyB0aGlzLnBsb3RseWRpdi5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvLyBQbG90bHkucGxvdCh0aGlzLnBsb3RseWRpdiwgdGhpcy5wbG90RGF0YS5wbG90bHlQbG90LGxheW91dCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0UGxvdGx5LnJlZHJhdyh0aGlzLnBsb3RseWRpdilcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0aGlzLnBsb3RseWRpdi5vbigncGxvdGx5X3NlbGVjdGVkJyxmdW5jdGlvbihldmVudERhdGEpe1xuXHRcdFx0XHQvLyBjb25zb2xlLmxvZyhldmVudERhdGEucG9pbnRzKTtcblx0XHRcdFx0XHRpZihldmVudERhdGEhPT11bmRlZmluZWQpe1xuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coZXZlbnREYXRhLnBvaW50cylcblx0XHRcdFx0XHRcdC8vIHJldHVybiBldmVudERhdGEucG9pbnRzO1xuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2V7XG5cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pXG5cdFx0XHR9KTtcdFxuXHRcdFx0XG5cdFx0fSk7XG5cdFx0dGhpcy50YXNrUXVldWUucXVldWVNaWNyb1Rhc2soKCkgPT4ge1xuXHRcdFx0dGhpcy5ldmVudEFnZ3JlZ2F0b3Iuc3Vic2NyaWJlKCdyYXdkYXRhJywgcmF3ZGF0YSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0dGhpcy5yYXdEYXRhPSByYXdkYXRhOyBcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjb25zb2xlLmxvZyh0aGlzKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvLyBjb25zb2xlLmxvZyhQbG90bHkpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vIGNvbnNvbGUubG9nKHRoaXMucGxvdERhdGEpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFBsb3RseS5wbG90KHRoaXMucGxvdGx5ZGl2LCB0aGlzLnJhd0RhdGEsbGF5b3V0KTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0aGlzLnBsb3RseWRpdi5vbigncGxvdGx5X3NlbGVjdGVkJyxmdW5jdGlvbihldmVudERhdGEpe1xuXHRcdFx0XHQvLyBjb25zb2xlLmxvZyhldmVudERhdGEucG9pbnRzKTtcblx0XHRcdFx0XHRpZihldmVudERhdGEhPT11bmRlZmluZWQpe1xuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coZXZlbnREYXRhLnBvaW50cylcblx0XHRcdFx0XHRcdC8vIHJldHVybiBldmVudERhdGEucG9pbnRzO1xuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2V7XG5cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pXG5cdFx0XHR9KTtcdFxuXHRcdFx0XG5cdFx0fSk7XG5cblx0XHQvLyB0aGlzLnRhc2tRdWV1ZS5xdWV1ZU1pY3JvVGFzaygoKSA9PiB7XG5cdFx0Ly8gXHR0aGlzLmV2ZW50QWdncmVnYXRvci5zdWJzY3JpYmUoJ3Bsb3REYXRhJywgcGxvdHRkYXRhID0+IHtcblx0XHQvLyBcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0aGlzLnBsb3R0aW5nRGF0YT0gcGxvdHRkYXRhOyBcblx0XHQvLyBcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcInBsb3Rlc3QgcGxvdERhdGEgaXMgdHJpZ2dlcmVkIGhlcmUgaXMgdGhlIHByb29mXCJcblx0XHQvLyBcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjb25zb2xlLmxvZyh0aGlzKTtcblx0XHQvLyBcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvLyBjb25zb2xlLmxvZyhQbG90bHkpO1xuXHRcdC8vIFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vIGNvbnNvbGUubG9nKHRoaXMucGxvdERhdGEpO1xuXHRcdC8vIFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFBsb3RseS5wbG90KHRoaXMucGxvdGx5ZGl2LCB0aGlzLnBsb3R0aW5nRGF0YS5wbG90bHlQbG90LGxheW91dCk7XG5cdFx0Ly8gXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0dGhpcy5wbG90bHlkaXYub24oJ3Bsb3RseV9zZWxlY3RlZCcsZnVuY3Rpb24oZXZlbnREYXRhKXtcblx0XHQvLyBcdFx0XHQvLyBjb25zb2xlLmxvZyhldmVudERhdGEucG9pbnRzKTtcblx0XHQvLyBcdFx0XHRpZihldmVudERhdGEhPT11bmRlZmluZWQpe1xuXHRcdC8vIFx0XHRcdFx0Y29uc29sZS5sb2coZXZlbnREYXRhLnBvaW50cylcblx0XHQvLyBcdFx0XHRcdC8vIHJldHVybiBldmVudERhdGEucG9pbnRzO1xuXHRcdFx0XHRcdFx0XG5cdFx0Ly8gXHRcdFx0fVxuXHRcdC8vIFx0XHRcdGVsc2V7XG5cblx0XHQvLyBcdFx0XHR9XG5cdFx0Ly8gXHRcdH0pXG5cdFx0Ly8gXHR9KTtcblx0XHQvLyB9KTtcblx0XHRcblx0fVxufSAiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
