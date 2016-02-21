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
					key: 'plotlydiv3d',
					decorators: [bindable],
					initializer: null,
					enumerable: true
				}], null, _instanceInitializers);

				function Plotest(eventAggregator, taskQueue) {
					_classCallCheck(this, _Plotest);

					_defineDecoratedPropertyDescriptor(this, 'plotlydiv3d', _instanceInitializers);

					this.eventAggregator = eventAggregator;
					this.taskQueue = taskQueue;
					this.plotData = {};
				}

				_createDecoratedClass(Plotest, [{
					key: 'attached',
					value: function attached() {
						var _this = this;

						var layout = {
							title: 'Log Likelihood Plot',

							width: 800,
							height: 600,
							margin: {
								l: 65,
								r: 50,
								b: 65,
								t: 90
							}
						};

						this.eventAggregator.subscribe('plotData', function (plotdata) {
							_this.plotData = plotdata;
							console.log(_this);

							console.log(_this.plotData);
							Plotly.newPlot(_this.plotlydiv3d, _this.plotData.plotlyContour, layout);
						});
					}
				}], null, _instanceInitializers);

				var _Plotest = Plotest;
				Plotest = inject(EventAggregator, TaskQueue)(Plotest) || Plotest;
				Plotest = customElement('plottest3d')(Plotest) || Plotest;
				return Plotest;
			})();

			_export('Plotest', Plotest);
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBsb3R0ZXN0M2QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OzZFQU9hLE9BQU87Ozs7Ozs7Ozs7cUNBUFosYUFBYTs4QkFBRSxNQUFNO2dDQUFFLFFBQVE7aUNBQUUsU0FBUzs7NkNBQzFDLGVBQWU7Ozs7Ozs7QUFNVixVQUFPOzs7OzBCQUFQLE9BQU87O2tCQUNsQixRQUFROzs7OztBQUNFLGFBRkMsT0FBTyxDQUVQLGVBQWUsRUFBRSxTQUFTLEVBQUM7Ozs7O0FBQ3RDLFNBQUksQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDO0FBQ3ZDLFNBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0FBQzNCLFNBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO0tBQ25COzswQkFOVyxPQUFPOztZQVFYLG9CQUFFOzs7QUFDVCxVQUFJLE1BQU0sR0FBRztBQUNYLFlBQUssRUFBRSxxQkFBcUI7O0FBRTVCLFlBQUssRUFBRSxHQUFHO0FBQ1YsYUFBTSxFQUFFLEdBQUc7QUFDWCxhQUFNLEVBQUU7QUFDTixTQUFDLEVBQUUsRUFBRTtBQUNMLFNBQUMsRUFBRSxFQUFFO0FBQ0wsU0FBQyxFQUFFLEVBQUU7QUFDTCxTQUFDLEVBQUUsRUFBRTtRQUNOO09BQ0YsQ0FBQzs7QUFHRixVQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsVUFBQSxRQUFRLEVBQUk7QUFDM0MsYUFBSyxRQUFRLEdBQUUsUUFBUSxDQUFDO0FBQ3hCLGNBQU8sQ0FBQyxHQUFHLE9BQU0sQ0FBQzs7QUFFbEIsY0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFLLFFBQVEsQ0FBQyxDQUFDO0FBQzNCLGFBQU0sQ0FBQyxPQUFPLENBQUMsTUFBSyxXQUFXLEVBQUUsTUFBSyxRQUFRLENBQUMsYUFBYSxFQUFFLE1BQU0sQ0FBQyxDQUFDO09BRXRFLENBQUMsQ0FBQztNQUdkOzs7bUJBakNXLE9BQU87QUFBUCxXQUFPLEdBRG5CLE1BQU0sQ0FBQyxlQUFlLEVBQUUsU0FBUyxDQUFDLENBQ3RCLE9BQU8sS0FBUCxPQUFPO0FBQVAsV0FBTyxHQUZuQixhQUFhLENBQUMsWUFBWSxDQUFDLENBRWYsT0FBTyxLQUFQLE9BQU87V0FBUCxPQUFPIiwiZmlsZSI6InBsb3R0ZXN0M2QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2N1c3RvbUVsZW1lbnQsIGluamVjdCwgYmluZGFibGUsIFRhc2tRdWV1ZX0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnO1xuaW1wb3J0IHtFdmVudEFnZ3JlZ2F0b3J9IGZyb20gXCJhdXJlbGlhLWV2ZW50LWFnZ3JlZ2F0b3JcIjtcbmltcG9ydCBQbG90bHkgZnJvbSAncGxvdGx5L2Rpc3QvcGxvdGx5JyAvL0l0IGlzIGFuIGlzc3VlIGZvciBub3c6IGh0dHBzOi8vZ2l0aHViLmNvbS9wbG90bHkvcGxvdGx5LmpzL2lzc3Vlcy8yMiBcbi8vIGltcG9ydCBPcmlnaW5EYXRhIGZyb20gJy4vb3JpZ2luYWxfZGF0YSc7XG5pbXBvcnQgJCBmcm9tIFwianF1ZXJ5XCI7XG5AY3VzdG9tRWxlbWVudCgncGxvdHRlc3QzZCcpXG5AaW5qZWN0KEV2ZW50QWdncmVnYXRvciwgVGFza1F1ZXVlKVxuZXhwb3J0IGNsYXNzIFBsb3Rlc3R7XG5cdEBiaW5kYWJsZSBwbG90bHlkaXYzZDtcblx0Y29uc3RydWN0b3IoZXZlbnRBZ2dyZWdhdG9yLCB0YXNrUXVldWUpe1xuXHRcdHRoaXMuZXZlbnRBZ2dyZWdhdG9yID0gZXZlbnRBZ2dyZWdhdG9yO1xuXHRcdHRoaXMudGFza1F1ZXVlID0gdGFza1F1ZXVlO1xuXHRcdHRoaXMucGxvdERhdGEgPSB7fTtcblx0fVxuXG5cdGF0dGFjaGVkKCl7XG5cdFx0dmFyIGxheW91dCA9IHtcblx0XHQgIHRpdGxlOiAnTG9nIExpa2VsaWhvb2QgUGxvdCcsXG5cdFx0ICAvLyBhdXRvc2l6ZTogdHJ1ZSxcblx0XHQgIHdpZHRoOiA4MDAsXG5cdFx0ICBoZWlnaHQ6IDYwMCxcblx0XHQgIG1hcmdpbjoge1xuXHRcdCAgICBsOiA2NSxcblx0XHQgICAgcjogNTAsXG5cdFx0ICAgIGI6IDY1LFxuXHRcdCAgICB0OiA5MFxuXHRcdCAgfVxuXHRcdH07XG5cdFx0Ly8gdmFyIGRhdGEgPSBbeyd5JzogWzQwMS4wODY1MDQwNjEwMTQ0LCA0MDEuMDc5OTc3NzMzMTIxMSwgNDAxLjA3MzQ1MTQwNTIyNzg0LCA0MDEuMDY2OTI1MDc3MzM0NTMsIDQwMS4wNjAzOTg3NDk0NDEzLCA0MDEuMDUzODcyNDIxNTQ3OTYsIDQwMS4wNDczNDYwOTM2NTQ3LCA0MDEuMDQwODE5NzY1NzYxNCwgNDAxLjAzNDI5MzQzNzg2ODE0LCA0MDEuMDI3NzY3MTA5OTc0ODNdLCAneCc6IFs0LjIxMjAzNzE2ODg0NTIyM2UtMDUsIDQuMjEzNDk0MTc5MDcwNzQzZS0wNSwgNC4yMTQ5NTExODkyOTYyNjM1ZS0wNSwgNC4yMTY0MDgxOTk1MjE3ODNlLTA1LCA0LjIxNzg2NTIwOTc0NzMwM2UtMDUsIDQuMjE5MzIyMjE5OTcyODIzNmUtMDUsIDQuMjIwNzc5MjMwMTk4MzQ0ZS0wNSwgNC4yMjIyMzYyNDA0MjM4NjM0ZS0wNSwgNC4yMjM2OTMyNTA2NDkzODRlLTA1LCA0LjIyNTE1MDI2MDg3NDkwNGUtMDVdLCAneic6IFtbLTE2MjAuMDc4NDA0ODg5NDUwMiwgLTE2MTkuOTQxMTAwMDc2MjUwNywgLTE2MTkuODAzODQyNzM0MzMwNCwgLTE2MTkuNjY2NjMyODMwODc1MiwgLTE2MTkuNTI5NDcwMzMzMTA2NSwgLTE2MTkuMzkyMzU1MjA4Mjc3OSwgLTE2MTkuMjU1Mjg3NDIzNjc2NywgLTE2MTkuMTE4MjY2OTQ2NjI2MSwgLTE2MTguOTgxMjkzNzQ0NDgxMywgLTE2MTguODQ0MzY3Nzg0NjMyMV0sIFstMTYyMC4wODQ4NjQ3NzU4NTEyLCAtMTYxOS45NDc1NTk5NjI2NTE3LCAtMTYxOS44MTAzMDI2MjA3MzE0LCAtMTYxOS42NzMwOTI3MTcyNzYyLCAtMTYxOS41MzU5MzAyMTk1MDc1LCAtMTYxOS4zOTg4MTUwOTQ2Nzg5LCAtMTYxOS4yNjE3NDczMTAwNzc3LCAtMTYxOS4xMjQ3MjY4MzMwMjcxLCAtMTYxOC45ODc3NTM2MzA4ODIzLCAtMTYxOC44NTA4Mjc2NzEwMzMxXSwgWy0xNjIwLjA5MTMyNDc2NzM2OCwgLTE2MTkuOTU0MDE5OTU0MTY4NCwgLTE2MTkuODE2NzYyNjEyMjQ4LCAtMTYxOS42Nzk1NTI3MDg3OTMsIC0xNjE5LjU0MjM5MDIxMTAyNDIsIC0xNjE5LjQwNTI3NTA4NjE5NTYsIC0xNjE5LjI2ODIwNzMwMTU5NDQsIC0xNjE5LjEzMTE4NjgyNDU0MzksIC0xNjE4Ljk5NDIxMzYyMjM5OSwgLTE2MTguODU3Mjg3NjYyNTQ5OV0sIFstMTYyMC4wOTc3ODQ4NjQwMDM2LCAtMTYxOS45NjA0ODAwNTA4MDQsIC0xNjE5LjgyMzIyMjcwODg4MzgsIC0xNjE5LjY4NjAxMjgwNTQyODYsIC0xNjE5LjU0ODg1MDMwNzY2LCAtMTYxOS40MTE3MzUxODI4MzEzLCAtMTYxOS4yNzQ2NjczOTgyMzAxLCAtMTYxOS4xMzc2NDY5MjExNzk2LCAtMTYxOS4wMDA2NzM3MTkwMzQ3LCAtMTYxOC44NjM3NDc3NTkxODU2XSwgWy0xNjIwLjEwNDI0NTA2NTc2MTUsIC0xNjE5Ljk2Njk0MDI1MjU2MiwgLTE2MTkuODI5NjgyOTEwNjQxNiwgLTE2MTkuNjkyNDczMDA3MTg2NCwgLTE2MTkuNTU1MzEwNTA5NDE3NywgLTE2MTkuNDE4MTk1Mzg0NTg5MSwgLTE2MTkuMjgxMTI3NTk5OTg4LCAtMTYxOS4xNDQxMDcxMjI5Mzc0LCAtMTYxOS4wMDcxMzM5MjA3OTI1LCAtMTYxOC44NzAyMDc5NjA5NDM0XSwgWy0xNjIwLjExMDcwNTM3MjY0NSwgLTE2MTkuOTczNDAwNTU5NDQ1NSwgLTE2MTkuODM2MTQzMjE3NTI1MiwgLTE2MTkuNjk4OTMzMzE0MDcsIC0xNjE5LjU2MTc3MDgxNjMwMTMsIC0xNjE5LjQyNDY1NTY5MTQ3MjcsIC0xNjE5LjI4NzU4NzkwNjg3MTUsIC0xNjE5LjE1MDU2NzQyOTgyMSwgLTE2MTkuMDEzNTk0MjI3Njc2LCAtMTYxOC44NzY2NjgyNjc4MjddLCBbLTE2MjAuMTE3MTY1Nzg0NjU3NiwgLTE2MTkuOTc5ODYwOTcxNDU4LCAtMTYxOS44NDI2MDM2Mjk1Mzc3LCAtMTYxOS43MDUzOTM3MjYwODI1LCAtMTYxOS41NjgyMzEyMjgzMTM4LCAtMTYxOS40MzExMTYxMDM0ODUyLCAtMTYxOS4yOTQwNDgzMTg4ODQsIC0xNjE5LjE1NzAyNzg0MTgzMzUsIC0xNjE5LjAyMDA1NDYzOTY4ODYsIC0xNjE4Ljg4MzEyODY3OTgzOTVdLCBbLTE2MjAuMTIzNjI2MzAxODAyNywgLTE2MTkuOTg2MzIxNDg4NjAzMiwgLTE2MTkuODQ5MDY0MTQ2NjgyOCwgLTE2MTkuNzExODU0MjQzMjI3NywgLTE2MTkuNTc0NjkxNzQ1NDU5LCAtMTYxOS40Mzc1NzY2MjA2MzA0LCAtMTYxOS4zMDA1MDg4MzYwMjkyLCAtMTYxOS4xNjM0ODgzNTg5Nzg2LCAtMTYxOS4wMjY1MTUxNTY4MzM3LCAtMTYxOC44ODk1ODkxOTY5ODQ2XSwgWy0xNjIwLjEzMDA4NjkyNDA4MzYsIC0xNjE5Ljk5Mjc4MjExMDg4NCwgLTE2MTkuODU1NTI0NzY4OTYzNywgLTE2MTkuNzE4MzE0ODY1NTA4NSwgLTE2MTkuNTgxMTUyMzY3NzM5OCwgLTE2MTkuNDQ0MDM3MjQyOTExMiwgLTE2MTkuMzA2OTY5NDU4MzEsIC0xNjE5LjE2OTk0ODk4MTI1OTUsIC0xNjE5LjAzMjk3NTc3OTExNDYsIC0xNjE4Ljg5NjA0OTgxOTI2NTVdLCBbLTE2MjAuMTM2NTQ3NjUxNTAzOSwgLTE2MTkuOTk5MjQyODM4MzA0MywgLTE2MTkuODYxOTg1NDk2Mzg0LCAtMTYxOS43MjQ3NzU1OTI5Mjg4LCAtMTYxOS41ODc2MTMwOTUxNjAxLCAtMTYxOS40NTA0OTc5NzAzMzE1LCAtMTYxOS4zMTM0MzAxODU3MzAzLCAtMTYxOS4xNzY0MDk3MDg2Nzk4LCAtMTYxOS4wMzk0MzY1MDY1MzUsIC0xNjE4LjkwMjUxMDU0NjY4NThdXSwgJ3R5cGUnOiAnY29udG91cid9XVxuXHRcdC8vIFBsb3RseS5uZXdQbG90KHRoaXMucGxvdGx5ZGl2M2QsZGF0YSlcblx0XHR0aGlzLmV2ZW50QWdncmVnYXRvci5zdWJzY3JpYmUoJ3Bsb3REYXRhJywgcGxvdGRhdGEgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRoaXMucGxvdERhdGE9IHBsb3RkYXRhOyBcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjb25zb2xlLmxvZyh0aGlzKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvLyBjb25zb2xlLmxvZyhQbG90bHkpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKHRoaXMucGxvdERhdGEpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFBsb3RseS5uZXdQbG90KHRoaXMucGxvdGx5ZGl2M2QsIHRoaXMucGxvdERhdGEucGxvdGx5Q29udG91ciwgbGF5b3V0KTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0fSk7XG5cblx0XHQvLyBQbG90bHkubmV3UGxvdCh0aGlzLnBsb3RseWRpdjNkLCBbbmV3VHJhY2VdKTtcblx0fVxuXG5cdFxufSAiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
