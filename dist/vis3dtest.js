System.register(['aurelia-framework', 'vis'], function (_export) {
  'use strict';

  var customElement, bindable, inject, vis, Vis3dEl;

  var _createDecoratedClass = (function () { function defineProperties(target, descriptors, initializers) { for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } if (descriptor.initializer !== undefined) { initializers[key] = descriptor; continue; } } Object.defineProperty(target, key, descriptor); } } return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) { if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers); if (staticProps) defineProperties(Constructor, staticProps, staticInitializers); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _defineDecoratedPropertyDescriptor(target, key, descriptors) { var _descriptor = descriptors[key]; if (!_descriptor) return; var descriptor = {}; for (var _key in _descriptor) descriptor[_key] = _descriptor[_key]; descriptor.value = descriptor.initializer ? descriptor.initializer.call(target) : undefined; Object.defineProperty(target, key, descriptor); }

  return {
    setters: [function (_aureliaFramework) {
      customElement = _aureliaFramework.customElement;
      bindable = _aureliaFramework.bindable;
      inject = _aureliaFramework.inject;
    }, function (_vis) {
      vis = _vis['default'];
    }],
    execute: function () {
      Vis3dEl = (function () {
        var _instanceInitializers = {};
        var _instanceInitializers = {};

        _createDecoratedClass(Vis3dEl, [{
          key: 'vis3dref',
          decorators: [bindable],
          initializer: null,
          enumerable: true
        }], null, _instanceInitializers);

        function Vis3dEl() {
          _classCallCheck(this, _Vis3dEl);

          _defineDecoratedPropertyDescriptor(this, 'vis3dref', _instanceInitializers);
        }

        _createDecoratedClass(Vis3dEl, [{
          key: 'attached',
          value: function attached() {
            var data = new vis.DataSet();

            var counter = 0;
            var steps = 50;
            var axisMax = 314;
            var axisStep = axisMax / steps;
            for (var x = 0; x < axisMax; x += axisStep) {
              for (var y = 0; y < axisMax; y += axisStep) {
                var value = Math.sin(x / 50) * Math.cos(y / 50) * 50 + 50;
                data.add({ id: counter++, x: x, y: y, z: value, style: value });
              }
            }

            var options = {
              width: '500px',
              height: '552px',
              style: 'surface+line',
              showPerspective: true,
              showGrid: true,
              showShadow: false,
              keepAspectRatio: true,
              verticalRatio: 0.5
            };

            var container = this.vis3dref;
            var graph3d = new vis.Graph3d(container, data, options);
          }
        }], null, _instanceInitializers);

        var _Vis3dEl = Vis3dEl;
        Vis3dEl = customElement('vis3del')(Vis3dEl) || Vis3dEl;
        return Vis3dEl;
      })();

      _export('Vis3dEl', Vis3dEl);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpczNkdGVzdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7NENBTWEsT0FBTzs7Ozs7Ozs7Ozt3Q0FKWixhQUFhO21DQUFFLFFBQVE7aUNBQUUsTUFBTTs7Ozs7QUFJMUIsYUFBTzs7Ozs4QkFBUCxPQUFPOzt1QkFDbEIsUUFBUTs7Ozs7QUFFRSxpQkFIQyxPQUFPLEdBR047Ozs7U0FFWjs7OEJBTFcsT0FBTzs7aUJBT1gsb0JBQUU7QUFnQ1QsZ0JBQUksSUFBSSxHQUFHLElBQUksR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDOztBQUcxQixnQkFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDO0FBQ2hCLGdCQUFJLEtBQUssR0FBRyxFQUFFLENBQUM7QUFDZixnQkFBSSxPQUFPLEdBQUcsR0FBRyxDQUFDO0FBQ2xCLGdCQUFJLFFBQVEsR0FBRyxPQUFPLEdBQUcsS0FBSyxDQUFDO0FBQy9CLGlCQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxFQUFFLENBQUMsSUFBRSxRQUFRLEVBQUU7QUFDdEMsbUJBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLEVBQUUsQ0FBQyxJQUFFLFFBQVEsRUFBRTtBQUN0QyxvQkFBSSxLQUFLLEdBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsQUFBQyxDQUFDO0FBQ3hELG9CQUFJLENBQUMsR0FBRyxDQUFDLEVBQUMsRUFBRSxFQUFDLE9BQU8sRUFBRSxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsQ0FBQyxDQUFDO2VBQ3hEO2FBQ0o7O0FBR0QsZ0JBQUksT0FBTyxHQUFHO0FBQ1YsbUJBQUssRUFBRyxPQUFPO0FBQ2Ysb0JBQU0sRUFBRSxPQUFPO0FBQ2YsbUJBQUssRUFBRSxjQUFjO0FBQ3JCLDZCQUFlLEVBQUUsSUFBSTtBQUNyQixzQkFBUSxFQUFFLElBQUk7QUFDZCx3QkFBVSxFQUFFLEtBQUs7QUFDakIsNkJBQWUsRUFBRSxJQUFJO0FBQ3JCLDJCQUFhLEVBQUUsR0FBRzthQUNyQixDQUFDOztBQUlGLGdCQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO0FBQzlCLGdCQUFJLE9BQU8sR0FBRyxJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztXQTBGNUQ7Ozt1QkE5SlksT0FBTztBQUFQLGVBQU8sR0FGbkIsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUVaLE9BQU8sS0FBUCxPQUFPO2VBQVAsT0FBTyIsImZpbGUiOiJ2aXMzZHRlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcblxuaW1wb3J0IHtjdXN0b21FbGVtZW50LCBiaW5kYWJsZSwgaW5qZWN0fSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XG5pbXBvcnQgdmlzIGZyb20gJ3ZpcydcbkBjdXN0b21FbGVtZW50KCd2aXMzZGVsJylcbi8vIEBpbmplY3QoVml6KVxuZXhwb3J0IGNsYXNzIFZpczNkRWx7XG5cdEBiaW5kYWJsZSB2aXMzZHJlZjtcblx0Ly8gQGJpbmRhYmxlIHN0cmF0YXJlZjtcblx0Y29uc3RydWN0b3IoKXtcblx0XHQvLyB0aGlzLnZpeiA9IHZpejtcblx0fVxuXG5cdGF0dGFjaGVkKCl7XG5cdFx0Ly8gdmFyIGl0ZW1zID0gW1xuXHQgLy8gICAge3g6ICcyMDE0LTA2LTExJywgeTogMTB9LFxuXHQgLy8gICAge3g6ICcyMDE0LTA2LTEyJywgeTogMjV9LFxuXHQgLy8gICAge3g6ICcyMDE0LTA2LTEzJywgeTogMzB9LFxuXHQgLy8gICAge3g6ICcyMDE0LTA2LTE0JywgeTogMTB9LFxuXHQgLy8gICAge3g6ICcyMDE0LTA2LTE1JywgeTogMTV9LFxuXHQgLy8gICAge3g6ICcyMDE0LTA2LTE2JywgeTogMzB9XG5cdCAvLyAgXTtcblxuXHQgLy8gIHZhciBkYXRhc2V0ID0gbmV3IHZpcy5EYXRhU2V0KGl0ZW1zKTtcblx0IC8vICB2YXIgb3B0aW9ucyA9IHtcblx0IC8vICAgIHN0YXJ0OiAnMjAxNC0wNi0xMCcsXG5cdCAvLyAgICBlbmQ6ICcyMDE0LTA2LTE4J1xuXHQgLy8gIH07XG5cdCAvLyAgdmFyIGdyYXBoMmQgPSBuZXcgdmlzLkdyYXBoMmQodGhpcy52aXNyZWYsIGRhdGFzZXQsIG9wdGlvbnMpO1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHQgLy8gXHR2YXIgZGF0YSA9IFtcbiAgLy8gICB7aWQ6IDEsIGNvbnRlbnQ6ICdpdGVtIDEnLCBzdGFydDogJzIwMTMtMDQtMjAnfSxcbiAgLy8gICB7aWQ6IDIsIGNvbnRlbnQ6ICdpdGVtIDInLCBzdGFydDogJzIwMTMtMDQtMTQnfSxcbiAgLy8gICB7aWQ6IDMsIGNvbnRlbnQ6ICdpdGVtIDMnLCBzdGFydDogJzIwMTMtMDQtMTgnfSxcbiAgLy8gICB7aWQ6IDQsIGNvbnRlbnQ6ICdpdGVtIDQnLCBzdGFydDogJzIwMTMtMDQtMTYnLCBlbmQ6ICcyMDEzLTA0LTE5J30sXG4gIC8vICAge2lkOiA1LCBjb250ZW50OiAnaXRlbSA1Jywgc3RhcnQ6ICcyMDEzLTA0LTI1J30sXG4gIC8vICAge2lkOiA2LCBjb250ZW50OiAnaXRlbSA2Jywgc3RhcnQ6ICcyMDEzLTA0LTI3J31cbiAgLy8gXTtcbiAgLy8gdmFyIG9wdGlvbnMgPSB7fTtcbiAgLy8gdmFyIHRpbWVsaW5lID0gbmV3IHZpcy5UaW1lbGluZSh0aGlzLnZpc3JlZiwgZGF0YSwgb3B0aW9ucyk7XG5cdFx0XG5cblx0XHQvLyBcdGNvbnNvbGUubG9nKHZpcylcblxuLy8gLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdHZhciBkYXRhID0gbmV3IHZpcy5EYXRhU2V0KCk7XG5cdFx0Ly8gY29uc29sZS5sb2coZGF0YSlcblx0ICAgIC8vIGNyZWF0ZSBzb21lIG5pY2UgbG9va2luZyBkYXRhIHdpdGggc2luL2Nvc1xuXHQgICAgdmFyIGNvdW50ZXIgPSAwO1xuXHQgICAgdmFyIHN0ZXBzID0gNTA7ICAvLyBudW1iZXIgb2YgZGF0YXBvaW50cyB3aWxsIGJlIHN0ZXBzKnN0ZXBzXG5cdCAgICB2YXIgYXhpc01heCA9IDMxNDtcblx0ICAgIHZhciBheGlzU3RlcCA9IGF4aXNNYXggLyBzdGVwcztcblx0ICAgIGZvciAodmFyIHggPSAwOyB4IDwgYXhpc01heDsgeCs9YXhpc1N0ZXApIHtcblx0ICAgICAgICBmb3IgKHZhciB5ID0gMDsgeSA8IGF4aXNNYXg7IHkrPWF4aXNTdGVwKSB7XG5cdCAgICAgICAgICAgIHZhciB2YWx1ZSA9IChNYXRoLnNpbih4LzUwKSAqIE1hdGguY29zKHkvNTApICogNTAgKyA1MCk7XG5cdCAgICAgICAgICAgIGRhdGEuYWRkKHtpZDpjb3VudGVyKysseDp4LHk6eSx6OnZhbHVlLHN0eWxlOnZhbHVlfSk7XG5cdCAgICAgICAgfVxuXHQgICAgfVxuXG5cdCAgICAvLyBzcGVjaWZ5IG9wdGlvbnNcblx0ICAgIHZhciBvcHRpb25zID0ge1xuXHQgICAgICAgIHdpZHRoOiAgJzUwMHB4Jyxcblx0ICAgICAgICBoZWlnaHQ6ICc1NTJweCcsXG5cdCAgICAgICAgc3R5bGU6ICdzdXJmYWNlK2xpbmUnLFxuXHQgICAgICAgIHNob3dQZXJzcGVjdGl2ZTogdHJ1ZSxcblx0ICAgICAgICBzaG93R3JpZDogdHJ1ZSxcblx0ICAgICAgICBzaG93U2hhZG93OiBmYWxzZSxcblx0ICAgICAgICBrZWVwQXNwZWN0UmF0aW86IHRydWUsXG5cdCAgICAgICAgdmVydGljYWxSYXRpbzogMC41XG5cdCAgICB9O1xuXG5cdCAgICAvLyBJbnN0YW50aWF0ZSBvdXIgZ3JhcGggb2JqZWN0LlxuXHQgICAgLy8gdmFyIGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aXN1YWxpemF0aW9uJyk7XG5cdCAgICB2YXIgY29udGFpbmVyID0gdGhpcy52aXMzZHJlZjtcblx0ICAgIHZhciBncmFwaDNkID0gbmV3IHZpcy5HcmFwaDNkKGNvbnRhaW5lciwgZGF0YSwgb3B0aW9ucyk7XG5cblx0ICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cdC8vICAgICB2YXIgREVMQVkgPSAxMDAwOyAvLyBkZWxheSBpbiBtcyB0byBhZGQgbmV3IGRhdGEgcG9pbnRzXG5cbiAvLyAgLy8gdmFyIHN0cmF0ZWd5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0cmF0ZWd5Jyk7XG4gLy8gIHZhciBzdHJhdGVneSA9IHRoaXMuc3RyYXRhcmVmO1xuIC8vICAvLyBjcmVhdGUgYSBncmFwaDJkIHdpdGggYW4gKGN1cnJlbnRseSBlbXB0eSkgZGF0YXNldFxuIC8vICB2YXIgY29udGFpbmVyID0gdGhpcy52aXNyZWY7XG4gLy8gIHZhciBkYXRhc2V0ID0gbmV3IHZpcy5EYXRhU2V0KCk7XG5cbiAvLyAgdmFyIG9wdGlvbnMgPSB7XG4gLy8gICAgc3RhcnQ6IHZpcy5tb21lbnQoKS5hZGQoLTMwLCAnc2Vjb25kcycpLCAvLyBjaGFuZ2VkIHNvIGl0cyBmYXN0ZXJcbiAvLyAgICBlbmQ6IHZpcy5tb21lbnQoKSxcbiAvLyAgICBkYXRhQXhpczoge1xuIC8vICAgICAgbGVmdDoge1xuIC8vICAgICAgICByYW5nZToge1xuIC8vICAgICAgICAgIG1pbjotMTAsIG1heDogMTBcbiAvLyAgICAgICAgfVxuIC8vICAgICAgfVxuIC8vICAgIH0sXG4gLy8gICAgZHJhd1BvaW50czoge1xuIC8vICAgICAgc3R5bGU6ICdjaXJjbGUnIC8vIHNxdWFyZSwgY2lyY2xlXG4gLy8gICAgfSxcbiAvLyAgICBzaGFkZWQ6IHtcbiAvLyAgICAgIG9yaWVudGF0aW9uOiAnYm90dG9tJyAvLyB0b3AsIGJvdHRvbVxuIC8vICAgIH1cbiAvLyAgfTtcbiAvLyAgdmFyIGdyYXBoMmQgPSBuZXcgdmlzLkdyYXBoMmQoY29udGFpbmVyLCBkYXRhc2V0LCBvcHRpb25zKTtcblxuIC8vICAvLyBhIGZ1bmN0aW9uIHRvIGdlbmVyYXRlIGRhdGEgcG9pbnRzXG4gLy8gIGZ1bmN0aW9uIHkoeCkge1xuIC8vICAgIHJldHVybiAoTWF0aC5zaW4oeCAvIDIpICsgTWF0aC5jb3MoeCAvIDQpKSAqIDU7XG4gLy8gIH1cblxuIC8vICBmdW5jdGlvbiByZW5kZXJTdGVwKCkge1xuIC8vICAgIC8vIG1vdmUgdGhlIHdpbmRvdyAoeW91IGNhbiB0aGluayBvZiBkaWZmZXJlbnQgc3RyYXRlZ2llcykuXG4gLy8gICAgdmFyIG5vdyA9IHZpcy5tb21lbnQoKTtcbiAvLyAgICB2YXIgcmFuZ2UgPSBncmFwaDJkLmdldFdpbmRvdygpO1xuIC8vICAgIHZhciBpbnRlcnZhbCA9IHJhbmdlLmVuZCAtIHJhbmdlLnN0YXJ0O1xuIC8vICAgIHN3aXRjaCAoc3RyYXRlZ3kudmFsdWUpIHtcbiAvLyAgICAgIGNhc2UgJ2NvbnRpbnVvdXMnOlxuIC8vICAgICAgICAvLyBjb250aW51b3VzbHkgbW92ZSB0aGUgd2luZG93XG4gLy8gICAgICAgIGdyYXBoMmQuc2V0V2luZG93KG5vdyAtIGludGVydmFsLCBub3csIHthbmltYXRpb246IGZhbHNlfSk7XG4gLy8gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShyZW5kZXJTdGVwKTtcbiAvLyAgICAgICAgYnJlYWs7XG5cbiAvLyAgICAgIGNhc2UgJ2Rpc2NyZXRlJzpcbiAvLyAgICAgICAgZ3JhcGgyZC5zZXRXaW5kb3cobm93IC0gaW50ZXJ2YWwsIG5vdywge2FuaW1hdGlvbjogZmFsc2V9KTtcbiAvLyAgICAgICAgc2V0VGltZW91dChyZW5kZXJTdGVwLCBERUxBWSk7XG4gLy8gICAgICAgIGJyZWFrO1xuXG4gLy8gICAgICBkZWZhdWx0OiAvLyAnc3RhdGljJ1xuIC8vICAgICAgICAvLyBtb3ZlIHRoZSB3aW5kb3cgOTAlIHRvIHRoZSBsZWZ0IHdoZW4gbm93IGlzIGxhcmdlciB0aGFuIHRoZSBlbmQgb2YgdGhlIHdpbmRvd1xuIC8vICAgICAgICBpZiAobm93ID4gcmFuZ2UuZW5kKSB7XG4gLy8gICAgICAgICAgZ3JhcGgyZC5zZXRXaW5kb3cobm93IC0gMC4xICogaW50ZXJ2YWwsIG5vdyArIDAuOSAqIGludGVydmFsKTtcbiAvLyAgICAgICAgfVxuIC8vICAgICAgICBzZXRUaW1lb3V0KHJlbmRlclN0ZXAsIERFTEFZKTtcbiAvLyAgICAgICAgYnJlYWs7XG4gLy8gICAgfVxuIC8vICB9XG4gLy8gIHJlbmRlclN0ZXAoKTtcblxuIC8vICAvKipcbiAvLyAgICogQWRkIGEgbmV3IGRhdGFwb2ludCB0byB0aGUgZ3JhcGhcbiAvLyAgICovXG4gLy8gIGZ1bmN0aW9uIGFkZERhdGFQb2ludCgpIHtcbiAvLyAgICAvLyBhZGQgYSBuZXcgZGF0YSBwb2ludCB0byB0aGUgZGF0YXNldFxuIC8vICAgIHZhciBub3cgPSB2aXMubW9tZW50KCk7XG4gLy8gICAgZGF0YXNldC5hZGQoe1xuIC8vICAgICAgeDogbm93LFxuIC8vICAgICAgeTogeShub3cgLyAxMDAwKVxuIC8vICAgIH0pO1xuXG4gLy8gICAgLy8gcmVtb3ZlIGFsbCBkYXRhIHBvaW50cyB3aGljaCBhcmUgbm8gbG9uZ2VyIHZpc2libGVcbiAvLyAgICB2YXIgcmFuZ2UgPSBncmFwaDJkLmdldFdpbmRvdygpO1xuIC8vICAgIHZhciBpbnRlcnZhbCA9IHJhbmdlLmVuZCAtIHJhbmdlLnN0YXJ0O1xuIC8vICAgIHZhciBvbGRJZHMgPSBkYXRhc2V0LmdldElkcyh7XG4gLy8gICAgICBmaWx0ZXI6IGZ1bmN0aW9uIChpdGVtKSB7XG4gLy8gICAgICAgIHJldHVybiBpdGVtLnggPCByYW5nZS5zdGFydCAtIGludGVydmFsO1xuIC8vICAgICAgfVxuIC8vICAgIH0pO1xuIC8vICAgIGRhdGFzZXQucmVtb3ZlKG9sZElkcyk7XG5cbiAvLyAgICBzZXRUaW1lb3V0KGFkZERhdGFQb2ludCwgREVMQVkpO1xuIC8vICB9XG4gLy8gIGFkZERhdGFQb2ludCgpO1xuXG5cdC8vIH1cbn1cbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
