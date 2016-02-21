System.register(['aurelia-framework', 'viz'], function (_export) {
	'use strict';

	var customElement, bindable, inject, Viz, VizEl;

	var _createDecoratedClass = (function () { function defineProperties(target, descriptors, initializers) { for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } if (descriptor.initializer !== undefined) { initializers[key] = descriptor; continue; } } Object.defineProperty(target, key, descriptor); } } return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) { if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers); if (staticProps) defineProperties(Constructor, staticProps, staticInitializers); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _defineDecoratedPropertyDescriptor(target, key, descriptors) { var _descriptor = descriptors[key]; if (!_descriptor) return; var descriptor = {}; for (var _key in _descriptor) descriptor[_key] = _descriptor[_key]; descriptor.value = descriptor.initializer ? descriptor.initializer.call(target) : undefined; Object.defineProperty(target, key, descriptor); }

	return {
		setters: [function (_aureliaFramework) {
			customElement = _aureliaFramework.customElement;
			bindable = _aureliaFramework.bindable;
			inject = _aureliaFramework.inject;
		}, function (_viz) {
			Viz = _viz['default'];
		}],
		execute: function () {
			VizEl = (function () {
				var _instanceInitializers = {};
				var _instanceInitializers = {};

				_createDecoratedClass(VizEl, [{
					key: 'vizref',
					decorators: [bindable],
					initializer: null,
					enumerable: true
				}], null, _instanceInitializers);

				function VizEl() {
					_classCallCheck(this, _VizEl);

					_defineDecoratedPropertyDescriptor(this, 'vizref', _instanceInitializers);
				}

				_createDecoratedClass(VizEl, [{
					key: 'attached',
					value: function attached() {
						var image = Viz("digraph g { a -> b; }", { format: "png-image-element" });
						this.vizref.appendChild(image);

						console.log(Viz);
					}
				}], null, _instanceInitializers);

				var _VizEl = VizEl;
				VizEl = customElement('vizel')(VizEl) || VizEl;
				return VizEl;
			})();

			_export('VizEl', VizEl);
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpenRlc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OzJDQUlhLEtBQUs7Ozs7Ozs7Ozs7cUNBSlYsYUFBYTtnQ0FBRSxRQUFROzhCQUFFLE1BQU07Ozs7O0FBSTFCLFFBQUs7Ozs7MEJBQUwsS0FBSzs7a0JBQ2hCLFFBQVE7Ozs7O0FBQ0UsYUFGQyxLQUFLLEdBRUo7Ozs7S0FFWjs7MEJBSlcsS0FBSzs7WUFNVCxvQkFBRTtBQWdCVCxVQUFJLEtBQUssR0FBRyxHQUFHLENBQUMsdUJBQXVCLEVBQUUsRUFBRSxNQUFNLEVBQUUsbUJBQW1CLEVBQUUsQ0FBQyxDQUFDO0FBQzFFLFVBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDOztBQUU5QixhQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO01BK0JqQjs7O2lCQXhEVyxLQUFLO0FBQUwsU0FBSyxHQUZqQixhQUFhLENBQUMsT0FBTyxDQUFDLENBRVYsS0FBSyxLQUFMLEtBQUs7V0FBTCxLQUFLIiwiZmlsZSI6InZpenRlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2N1c3RvbUVsZW1lbnQsIGJpbmRhYmxlLCBpbmplY3R9IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcbmltcG9ydCBWaXogZnJvbSAndml6J1xuQGN1c3RvbUVsZW1lbnQoJ3ZpemVsJylcbi8vIEBpbmplY3QoVml6KVxuZXhwb3J0IGNsYXNzIFZpekVse1xuXHRAYmluZGFibGUgdml6cmVmO1xuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdC8vIHRoaXMudml6ID0gdml6O1xuXHR9XG5cblx0YXR0YWNoZWQoKXtcblx0Ly8gXHR2YXIgaXRlbXMgPSBbXG5cdC8vICAgICB7eDogJzIwMTQtMDYtMTEnLCB5OiAxMH0sXG5cdC8vICAgICB7eDogJzIwMTQtMDYtMTInLCB5OiAyNX0sXG5cdC8vICAgICB7eDogJzIwMTQtMDYtMTMnLCB5OiAzMH0sXG5cdC8vICAgICB7eDogJzIwMTQtMDYtMTQnLCB5OiAxMH0sXG5cdC8vICAgICB7eDogJzIwMTQtMDYtMTUnLCB5OiAxNX0sXG5cdC8vICAgICB7eDogJzIwMTQtMDYtMTYnLCB5OiAzMH1cblx0Ly8gICBdO1xuXG5cdC8vICAgdmFyIGRhdGFzZXQgPSBuZXcgVmlzLkRhdGFTZXQoaXRlbXMpO1xuXHQvLyAgIHZhciBvcHRpb25zID0ge1xuXHQvLyAgICAgc3RhcnQ6ICcyMDE0LTA2LTEwJyxcblx0Ly8gICAgIGVuZDogJzIwMTQtMDYtMTgnXG5cdC8vICAgfTtcblx0Ly8gICB2YXIgZ3JhcGgyZCA9IG5ldyBWaXMuR3JhcGgyZCh0aGlzLnZpenJlZiwgZGF0YXNldCwgb3B0aW9ucyk7XG5cdFx0bGV0IGltYWdlID0gVml6KFwiZGlncmFwaCBnIHsgYSAtPiBiOyB9XCIsIHsgZm9ybWF0OiBcInBuZy1pbWFnZS1lbGVtZW50XCIgfSk7XG5cdFx0dGhpcy52aXpyZWYuYXBwZW5kQ2hpbGQoaW1hZ2UpO1xuXG5cdFx0XHRjb25zb2xlLmxvZyhWaXopXG5cdFx0Ly8gdmFyIGRhdGEgPSBuZXcgdmlzLkRhdGFTZXQoKTtcblx0XHQvLyAvLyBjb25zb2xlLmxvZyhkYXRhKVxuXHQgLy8gICAgLy8gY3JlYXRlIHNvbWUgbmljZSBsb29raW5nIGRhdGEgd2l0aCBzaW4vY29zXG5cdCAvLyAgICB2YXIgY291bnRlciA9IDA7XG5cdCAvLyAgICB2YXIgc3RlcHMgPSA1MDsgIC8vIG51bWJlciBvZiBkYXRhcG9pbnRzIHdpbGwgYmUgc3RlcHMqc3RlcHNcblx0IC8vICAgIHZhciBheGlzTWF4ID0gMzE0O1xuXHQgLy8gICAgdmFyIGF4aXNTdGVwID0gYXhpc01heCAvIHN0ZXBzO1xuXHQgLy8gICAgZm9yICh2YXIgeCA9IDA7IHggPCBheGlzTWF4OyB4Kz1heGlzU3RlcCkge1xuXHQgLy8gICAgICAgIGZvciAodmFyIHkgPSAwOyB5IDwgYXhpc01heDsgeSs9YXhpc1N0ZXApIHtcblx0IC8vICAgICAgICAgICAgdmFyIHZhbHVlID0gKE1hdGguc2luKHgvNTApICogTWF0aC5jb3MoeS81MCkgKiA1MCArIDUwKTtcblx0IC8vICAgICAgICAgICAgZGF0YS5hZGQoe2lkOmNvdW50ZXIrKyx4OngseTp5LHo6dmFsdWUsc3R5bGU6dmFsdWV9KTtcblx0IC8vICAgICAgICB9XG5cdCAvLyAgICB9XG5cblx0IC8vICAgIC8vIHNwZWNpZnkgb3B0aW9uc1xuXHQgLy8gICAgdmFyIG9wdGlvbnMgPSB7XG5cdCAvLyAgICAgICAgd2lkdGg6ICAnNTAwcHgnLFxuXHQgLy8gICAgICAgIGhlaWdodDogJzU1MnB4Jyxcblx0IC8vICAgICAgICBzdHlsZTogJ3N1cmZhY2UnLFxuXHQgLy8gICAgICAgIHNob3dQZXJzcGVjdGl2ZTogdHJ1ZSxcblx0IC8vICAgICAgICBzaG93R3JpZDogdHJ1ZSxcblx0IC8vICAgICAgICBzaG93U2hhZG93OiBmYWxzZSxcblx0IC8vICAgICAgICBrZWVwQXNwZWN0UmF0aW86IHRydWUsXG5cdCAvLyAgICAgICAgdmVydGljYWxSYXRpbzogMC41XG5cdCAvLyAgICB9O1xuXG5cdCAgICAvLyBJbnN0YW50aWF0ZSBvdXIgZ3JhcGggb2JqZWN0LlxuXHQgICAgLy8gdmFyIGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aXN1YWxpemF0aW9uJyk7XG5cdCAgICAvLyB2YXIgZ3JhcGgzZCA9IG5ldyB2aXMuR3JhcGgzZCh0aGlzLnZpenJlZiwgZGF0YSwgb3B0aW9ucyk7XG5cblx0fVxufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
