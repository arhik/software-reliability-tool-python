System.register(['aurelia-framework', 'gridstack'], function (_export) {
	'use strict';

	var bindable, customElement, gridstack, gridtest;

	var _createDecoratedClass = (function () { function defineProperties(target, descriptors, initializers) { for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } if (descriptor.initializer !== undefined) { initializers[key] = descriptor; continue; } } Object.defineProperty(target, key, descriptor); } } return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) { if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers); if (staticProps) defineProperties(Constructor, staticProps, staticInitializers); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _defineDecoratedPropertyDescriptor(target, key, descriptors) { var _descriptor = descriptors[key]; if (!_descriptor) return; var descriptor = {}; for (var _key in _descriptor) descriptor[_key] = _descriptor[_key]; descriptor.value = descriptor.initializer ? descriptor.initializer.call(target) : undefined; Object.defineProperty(target, key, descriptor); }

	return {
		setters: [function (_aureliaFramework) {
			bindable = _aureliaFramework.bindable;
			customElement = _aureliaFramework.customElement;
		}, function (_gridstack) {
			gridstack = _gridstack['default'];
		}],
		execute: function () {
			gridtest = (function () {
				var _instanceInitializers = {};
				var _instanceInitializers = {};

				_createDecoratedClass(gridtest, [{
					key: 'gridstackdiv',
					decorators: [bindable],
					initializer: null,
					enumerable: true
				}], null, _instanceInitializers);

				function gridtest() {
					_classCallCheck(this, _gridtest);

					_defineDecoratedPropertyDescriptor(this, 'gridstackdiv', _instanceInitializers);
				}

				_createDecoratedClass(gridtest, [{
					key: 'attached',
					value: function attached() {
						var options = {
							cell_height: 80,
							vertical_margin: 10
						};
						$('grid-stack').gridstack(options);
					}
				}], null, _instanceInitializers);

				var _gridtest = gridtest;
				gridtest = customElement('gridtest')(gridtest) || gridtest;
				return gridtest;
			})();

			_export('gridtest', gridtest);
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdyaWRzdGFja3Rlc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O3lDQUlhLFFBQVE7Ozs7Ozs7Ozs7Z0NBSmIsUUFBUTtxQ0FBRSxhQUFhOzs7OztBQUlsQixXQUFROzs7OzBCQUFSLFFBQVE7O2tCQUNuQixRQUFROzs7OztBQUNFLGFBRkMsUUFBUSxHQUVQOzs7O0tBRVo7OzBCQUpXLFFBQVE7O1lBTVosb0JBQUU7QUFDVCxVQUFJLE9BQU8sR0FBRztBQUNQLGtCQUFXLEVBQUUsRUFBRTtBQUNmLHNCQUFlLEVBQUUsRUFBRTtPQUN0QixDQUFDO0FBQ0wsT0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztNQUNuQzs7O29CQVpXLFFBQVE7QUFBUixZQUFRLEdBRHBCLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FDYixRQUFRLEtBQVIsUUFBUTtXQUFSLFFBQVEiLCJmaWxlIjoiZ3JpZHN0YWNrdGVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7YmluZGFibGUsIGN1c3RvbUVsZW1lbnR9IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJ1xuaW1wb3J0IGdyaWRzdGFjayBmcm9tICdncmlkc3RhY2snXG5cbkBjdXN0b21FbGVtZW50KCdncmlkdGVzdCcpXG5leHBvcnQgY2xhc3MgZ3JpZHRlc3R7XG5cdEBiaW5kYWJsZSBncmlkc3RhY2tkaXY7XG5cdGNvbnN0cnVjdG9yKCl7XG5cblx0fVxuXG5cdGF0dGFjaGVkKCl7XG5cdFx0dmFyIG9wdGlvbnMgPSB7XG5cdCAgICAgICAgY2VsbF9oZWlnaHQ6IDgwLFxuXHQgICAgICAgIHZlcnRpY2FsX21hcmdpbjogMTBcbiAgICBcdH07XG5cdFx0JCgnZ3JpZC1zdGFjaycpLmdyaWRzdGFjayhvcHRpb25zKTtcblx0fVxufVxuXG4vLyA8c2NyaXB0IHR5cGU9XCJ0ZXh0L2phdmFzY3JpcHRcIj5cbi8vICQoZnVuY3Rpb24gKCkge1xuLy8gICAgIHZhciBvcHRpb25zID0ge1xuLy8gICAgICAgICBjZWxsX2hlaWdodDogODAsXG4vLyAgICAgICAgIHZlcnRpY2FsX21hcmdpbjogMTBcbi8vICAgICB9O1xuLy8gICAgICQoJy5ncmlkLXN0YWNrJykuZ3JpZHN0YWNrKG9wdGlvbnMpO1xuLy8gfSk7XG4vLyA8L3NjcmlwdD4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
