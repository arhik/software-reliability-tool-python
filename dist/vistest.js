System.register(['aurelia-framework', 'vis'], function (_export) {
  'use strict';

  var customElement, bindable, inject, vis, VisEl;

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
      VisEl = (function () {
        var _instanceInitializers = {};
        var _instanceInitializers = {};

        _createDecoratedClass(VisEl, [{
          key: 'visref',
          decorators: [bindable],
          initializer: null,
          enumerable: true
        }, {
          key: 'strataref',
          decorators: [bindable],
          initializer: null,
          enumerable: true
        }], null, _instanceInitializers);

        function VisEl() {
          _classCallCheck(this, _VisEl);

          _defineDecoratedPropertyDescriptor(this, 'visref', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'strataref', _instanceInitializers);
        }

        _createDecoratedClass(VisEl, [{
          key: 'attached',
          value: function attached() {

            var DELAY = 1000;
            var strategy = this.strataref;

            var container = this.visref;
            var dataset = new vis.DataSet();

            var options = {
              start: vis.moment().add(-30, 'seconds'),
              end: vis.moment(),
              dataAxis: {
                left: {
                  range: {
                    min: -10, max: 10
                  }
                }
              },
              drawPoints: {
                style: 'circle' },
              shaded: {
                orientation: 'bottom' }
            };
            var graph2d = new vis.Graph2d(container, dataset, options);

            function y(x) {
              return (Math.sin(x / 2) + Math.cos(x / 4)) * 5;
            }

            function renderStep() {
              var now = vis.moment();
              var range = graph2d.getWindow();
              var interval = range.end - range.start;
              switch (strategy.value) {
                case 'continuous':
                  graph2d.setWindow(now - interval, now, { animation: false });
                  requestAnimationFrame(renderStep);
                  break;

                case 'discrete':
                  graph2d.setWindow(now - interval, now, { animation: false });
                  setTimeout(renderStep, DELAY);
                  break;

                default:
                  if (now > range.end) {
                    graph2d.setWindow(now - 0.1 * interval, now + 0.9 * interval);
                  }
                  setTimeout(renderStep, DELAY);
                  break;
              }
            }
            renderStep();

            function addDataPoint() {
              var now = vis.moment();
              dataset.add({
                x: now,
                y: y(now / 1000)
              });

              var range = graph2d.getWindow();
              var interval = range.end - range.start;
              var oldIds = dataset.getIds({
                filter: function filter(item) {
                  return item.x < range.start - interval;
                }
              });
              dataset.remove(oldIds);

              setTimeout(addDataPoint, DELAY);
            }
            addDataPoint();
          }
        }], null, _instanceInitializers);

        var _VisEl = VisEl;
        VisEl = customElement('visel')(VisEl) || VisEl;
        return VisEl;
      })();

      _export('VisEl', VisEl);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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QUFHLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDdkIscUJBQU8sQ0FBQyxHQUFHLENBQUM7QUFDVixpQkFBQyxFQUFFLEdBQUc7QUFDTixpQkFBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDO2VBQ2pCLENBQUMsQ0FBQzs7QUFHSCxrQkFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDO0FBQ2hDLGtCQUFJLFFBQVEsR0FBRyxLQUFLLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7QUFDdkMsa0JBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7QUFDMUIsc0JBQU0sRUFBRSxnQkFBVSxJQUFJLEVBQUU7QUFDdEIseUJBQU8sSUFBSSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQztpQkFDeEM7ZUFDRixDQUFDLENBQUM7QUFDSCxxQkFBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQzs7QUFFdkIsd0JBQVUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxDQUFDLENBQUM7YUFDakM7QUFDRCx3QkFBWSxFQUFFLENBQUM7V0FFZjs7O3FCQTdKVyxLQUFLO0FBQUwsYUFBSyxHQUZqQixhQUFhLENBQUMsT0FBTyxDQUFDLENBRVYsS0FBSyxLQUFMLEtBQUs7ZUFBTCxLQUFLIiwiZmlsZSI6InZpc3Rlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcblxuaW1wb3J0IHtjdXN0b21FbGVtZW50LCBiaW5kYWJsZSwgaW5qZWN0fSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XG5pbXBvcnQgdmlzIGZyb20gJ3ZpcydcbkBjdXN0b21FbGVtZW50KCd2aXNlbCcpXG4vLyBAaW5qZWN0KFZpeilcbmV4cG9ydCBjbGFzcyBWaXNFbHtcblx0QGJpbmRhYmxlIHZpc3JlZjtcblx0QGJpbmRhYmxlIHN0cmF0YXJlZjtcblx0Y29uc3RydWN0b3IoKXtcblx0XHQvLyB0aGlzLnZpeiA9IHZpejtcblx0fVxuXG5cdGF0dGFjaGVkKCl7XG5cdFx0Ly8gdmFyIGl0ZW1zID0gW1xuXHQgLy8gICAge3g6ICcyMDE0LTA2LTExJywgeTogMTB9LFxuXHQgLy8gICAge3g6ICcyMDE0LTA2LTEyJywgeTogMjV9LFxuXHQgLy8gICAge3g6ICcyMDE0LTA2LTEzJywgeTogMzB9LFxuXHQgLy8gICAge3g6ICcyMDE0LTA2LTE0JywgeTogMTB9LFxuXHQgLy8gICAge3g6ICcyMDE0LTA2LTE1JywgeTogMTV9LFxuXHQgLy8gICAge3g6ICcyMDE0LTA2LTE2JywgeTogMzB9XG5cdCAvLyAgXTtcblxuXHQgLy8gIHZhciBkYXRhc2V0ID0gbmV3IHZpcy5EYXRhU2V0KGl0ZW1zKTtcblx0IC8vICB2YXIgb3B0aW9ucyA9IHtcblx0IC8vICAgIHN0YXJ0OiAnMjAxNC0wNi0xMCcsXG5cdCAvLyAgICBlbmQ6ICcyMDE0LTA2LTE4J1xuXHQgLy8gIH07XG5cdCAvLyAgdmFyIGdyYXBoMmQgPSBuZXcgdmlzLkdyYXBoMmQodGhpcy52aXNyZWYsIGRhdGFzZXQsIG9wdGlvbnMpO1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHQgLy8gXHR2YXIgZGF0YSA9IFtcbiAgLy8gICB7aWQ6IDEsIGNvbnRlbnQ6ICdpdGVtIDEnLCBzdGFydDogJzIwMTMtMDQtMjAnfSxcbiAgLy8gICB7aWQ6IDIsIGNvbnRlbnQ6ICdpdGVtIDInLCBzdGFydDogJzIwMTMtMDQtMTQnfSxcbiAgLy8gICB7aWQ6IDMsIGNvbnRlbnQ6ICdpdGVtIDMnLCBzdGFydDogJzIwMTMtMDQtMTgnfSxcbiAgLy8gICB7aWQ6IDQsIGNvbnRlbnQ6ICdpdGVtIDQnLCBzdGFydDogJzIwMTMtMDQtMTYnLCBlbmQ6ICcyMDEzLTA0LTE5J30sXG4gIC8vICAge2lkOiA1LCBjb250ZW50OiAnaXRlbSA1Jywgc3RhcnQ6ICcyMDEzLTA0LTI1J30sXG4gIC8vICAge2lkOiA2LCBjb250ZW50OiAnaXRlbSA2Jywgc3RhcnQ6ICcyMDEzLTA0LTI3J31cbiAgLy8gXTtcbiAgLy8gdmFyIG9wdGlvbnMgPSB7fTtcbiAgLy8gdmFyIHRpbWVsaW5lID0gbmV3IHZpcy5UaW1lbGluZSh0aGlzLnZpc3JlZiwgZGF0YSwgb3B0aW9ucyk7XG5cdFx0XG5cblx0XHQvLyBcdGNvbnNvbGUubG9nKHZpcylcblxuLy8gLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gXHRcdHZhciBkYXRhID0gbmV3IHZpcy5EYXRhU2V0KCk7XG4vLyBcdFx0Ly8gY29uc29sZS5sb2coZGF0YSlcbi8vIFx0ICAgIC8vIGNyZWF0ZSBzb21lIG5pY2UgbG9va2luZyBkYXRhIHdpdGggc2luL2Nvc1xuLy8gXHQgICAgdmFyIGNvdW50ZXIgPSAwO1xuLy8gXHQgICAgdmFyIHN0ZXBzID0gNTA7ICAvLyBudW1iZXIgb2YgZGF0YXBvaW50cyB3aWxsIGJlIHN0ZXBzKnN0ZXBzXG4vLyBcdCAgICB2YXIgYXhpc01heCA9IDMxNDtcbi8vIFx0ICAgIHZhciBheGlzU3RlcCA9IGF4aXNNYXggLyBzdGVwcztcbi8vIFx0ICAgIGZvciAodmFyIHggPSAwOyB4IDwgYXhpc01heDsgeCs9YXhpc1N0ZXApIHtcbi8vIFx0ICAgICAgICBmb3IgKHZhciB5ID0gMDsgeSA8IGF4aXNNYXg7IHkrPWF4aXNTdGVwKSB7XG4vLyBcdCAgICAgICAgICAgIHZhciB2YWx1ZSA9IChNYXRoLnNpbih4LzUwKSAqIE1hdGguY29zKHkvNTApICogNTAgKyA1MCk7XG4vLyBcdCAgICAgICAgICAgIGRhdGEuYWRkKHtpZDpjb3VudGVyKysseDp4LHk6eSx6OnZhbHVlLHN0eWxlOnZhbHVlfSk7XG4vLyBcdCAgICAgICAgfVxuLy8gXHQgICAgfVxuXG4vLyBcdCAgICAvLyBzcGVjaWZ5IG9wdGlvbnNcbi8vIFx0ICAgIHZhciBvcHRpb25zID0ge1xuLy8gXHQgICAgICAgIHdpZHRoOiAgJzUwMHB4Jyxcbi8vIFx0ICAgICAgICBoZWlnaHQ6ICc1NTJweCcsXG4vLyBcdCAgICAgICAgc3R5bGU6ICdzdXJmYWNlJyxcbi8vIFx0ICAgICAgICBzaG93UGVyc3BlY3RpdmU6IHRydWUsXG4vLyBcdCAgICAgICAgc2hvd0dyaWQ6IHRydWUsXG4vLyBcdCAgICAgICAgc2hvd1NoYWRvdzogZmFsc2UsXG4vLyBcdCAgICAgICAga2VlcEFzcGVjdFJhdGlvOiB0cnVlLFxuLy8gXHQgICAgICAgIHZlcnRpY2FsUmF0aW86IDAuNVxuLy8gXHQgICAgfTtcblxuLy8gXHQgICAgLy8gSW5zdGFudGlhdGUgb3VyIGdyYXBoIG9iamVjdC5cbi8vIFx0ICAgIC8vIHZhciBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmlzdWFsaXphdGlvbicpO1xuLy8gXHQgICAgdmFyIGNvbnRhaW5lciA9IHRoaXMudmlzcmVmO1xuLy8gXHQgICAgdmFyIGdyYXBoM2QgPSBuZXcgdmlzLkdyYXBoM2QoY29udGFpbmVyLCBkYXRhLCBvcHRpb25zKTtcblxuXHQgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblx0ICAgIHZhciBERUxBWSA9IDEwMDA7IC8vIGRlbGF5IGluIG1zIHRvIGFkZCBuZXcgZGF0YSBwb2ludHNcblxuICAvLyB2YXIgc3RyYXRlZ3kgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RyYXRlZ3knKTtcbiAgdmFyIHN0cmF0ZWd5ID0gdGhpcy5zdHJhdGFyZWY7XG4gIC8vIGNyZWF0ZSBhIGdyYXBoMmQgd2l0aCBhbiAoY3VycmVudGx5IGVtcHR5KSBkYXRhc2V0XG4gIHZhciBjb250YWluZXIgPSB0aGlzLnZpc3JlZjtcbiAgdmFyIGRhdGFzZXQgPSBuZXcgdmlzLkRhdGFTZXQoKTtcblxuICB2YXIgb3B0aW9ucyA9IHtcbiAgICBzdGFydDogdmlzLm1vbWVudCgpLmFkZCgtMzAsICdzZWNvbmRzJyksIC8vIGNoYW5nZWQgc28gaXRzIGZhc3RlclxuICAgIGVuZDogdmlzLm1vbWVudCgpLFxuICAgIGRhdGFBeGlzOiB7XG4gICAgICBsZWZ0OiB7XG4gICAgICAgIHJhbmdlOiB7XG4gICAgICAgICAgbWluOi0xMCwgbWF4OiAxMFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBkcmF3UG9pbnRzOiB7XG4gICAgICBzdHlsZTogJ2NpcmNsZScgLy8gc3F1YXJlLCBjaXJjbGVcbiAgICB9LFxuICAgIHNoYWRlZDoge1xuICAgICAgb3JpZW50YXRpb246ICdib3R0b20nIC8vIHRvcCwgYm90dG9tXG4gICAgfVxuICB9O1xuICB2YXIgZ3JhcGgyZCA9IG5ldyB2aXMuR3JhcGgyZChjb250YWluZXIsIGRhdGFzZXQsIG9wdGlvbnMpO1xuXG4gIC8vIGEgZnVuY3Rpb24gdG8gZ2VuZXJhdGUgZGF0YSBwb2ludHNcbiAgZnVuY3Rpb24geSh4KSB7XG4gICAgcmV0dXJuIChNYXRoLnNpbih4IC8gMikgKyBNYXRoLmNvcyh4IC8gNCkpICogNTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbmRlclN0ZXAoKSB7XG4gICAgLy8gbW92ZSB0aGUgd2luZG93ICh5b3UgY2FuIHRoaW5rIG9mIGRpZmZlcmVudCBzdHJhdGVnaWVzKS5cbiAgICB2YXIgbm93ID0gdmlzLm1vbWVudCgpO1xuICAgIHZhciByYW5nZSA9IGdyYXBoMmQuZ2V0V2luZG93KCk7XG4gICAgdmFyIGludGVydmFsID0gcmFuZ2UuZW5kIC0gcmFuZ2Uuc3RhcnQ7XG4gICAgc3dpdGNoIChzdHJhdGVneS52YWx1ZSkge1xuICAgICAgY2FzZSAnY29udGludW91cyc6XG4gICAgICAgIC8vIGNvbnRpbnVvdXNseSBtb3ZlIHRoZSB3aW5kb3dcbiAgICAgICAgZ3JhcGgyZC5zZXRXaW5kb3cobm93IC0gaW50ZXJ2YWwsIG5vdywge2FuaW1hdGlvbjogZmFsc2V9KTtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJlbmRlclN0ZXApO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnZGlzY3JldGUnOlxuICAgICAgICBncmFwaDJkLnNldFdpbmRvdyhub3cgLSBpbnRlcnZhbCwgbm93LCB7YW5pbWF0aW9uOiBmYWxzZX0pO1xuICAgICAgICBzZXRUaW1lb3V0KHJlbmRlclN0ZXAsIERFTEFZKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGRlZmF1bHQ6IC8vICdzdGF0aWMnXG4gICAgICAgIC8vIG1vdmUgdGhlIHdpbmRvdyA5MCUgdG8gdGhlIGxlZnQgd2hlbiBub3cgaXMgbGFyZ2VyIHRoYW4gdGhlIGVuZCBvZiB0aGUgd2luZG93XG4gICAgICAgIGlmIChub3cgPiByYW5nZS5lbmQpIHtcbiAgICAgICAgICBncmFwaDJkLnNldFdpbmRvdyhub3cgLSAwLjEgKiBpbnRlcnZhbCwgbm93ICsgMC45ICogaW50ZXJ2YWwpO1xuICAgICAgICB9XG4gICAgICAgIHNldFRpbWVvdXQocmVuZGVyU3RlcCwgREVMQVkpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmVuZGVyU3RlcCgpO1xuXG4gIC8qKlxuICAgKiBBZGQgYSBuZXcgZGF0YXBvaW50IHRvIHRoZSBncmFwaFxuICAgKi9cbiAgZnVuY3Rpb24gYWRkRGF0YVBvaW50KCkge1xuICAgIC8vIGFkZCBhIG5ldyBkYXRhIHBvaW50IHRvIHRoZSBkYXRhc2V0XG4gICAgdmFyIG5vdyA9IHZpcy5tb21lbnQoKTtcbiAgICBkYXRhc2V0LmFkZCh7XG4gICAgICB4OiBub3csXG4gICAgICB5OiB5KG5vdyAvIDEwMDApXG4gICAgfSk7XG5cbiAgICAvLyByZW1vdmUgYWxsIGRhdGEgcG9pbnRzIHdoaWNoIGFyZSBubyBsb25nZXIgdmlzaWJsZVxuICAgIHZhciByYW5nZSA9IGdyYXBoMmQuZ2V0V2luZG93KCk7XG4gICAgdmFyIGludGVydmFsID0gcmFuZ2UuZW5kIC0gcmFuZ2Uuc3RhcnQ7XG4gICAgdmFyIG9sZElkcyA9IGRhdGFzZXQuZ2V0SWRzKHtcbiAgICAgIGZpbHRlcjogZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgcmV0dXJuIGl0ZW0ueCA8IHJhbmdlLnN0YXJ0IC0gaW50ZXJ2YWw7XG4gICAgICB9XG4gICAgfSk7XG4gICAgZGF0YXNldC5yZW1vdmUob2xkSWRzKTtcblxuICAgIHNldFRpbWVvdXQoYWRkRGF0YVBvaW50LCBERUxBWSk7XG4gIH1cbiAgYWRkRGF0YVBvaW50KCk7XG5cblx0fVxufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
