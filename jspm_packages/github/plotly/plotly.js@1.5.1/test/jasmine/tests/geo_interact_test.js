var d3 = require('d3');

var Plotly = require('@lib/index');

var createGraphDiv = require('../assets/create_graph_div');
var destroyGraphDiv = require('../assets/destroy_graph_div');
var mouseEvent = require('../assets/mouse_event');


describe('Test geo interactions', function() {
    'use strict';

    afterEach(destroyGraphDiv);

    describe('mock geo_first.json', function() {
        var mock = require('@mocks/geo_first.json');
        var gd;

        function mouseEventScatterGeo(type) {
            mouseEvent(type, 300, 235);
        }

        function mouseEventChoropleth(type) {
            mouseEvent(type, 400, 160);
        }

        beforeEach(function(done) {
            gd = createGraphDiv();
            Plotly.plot(gd, mock.data, mock.layout).then(done);
        });

        describe('scattergeo hover labels', function() {
            beforeEach(function() {
                mouseEventScatterGeo('mouseover');
            });

            it('should show one hover text group', function() {
                expect(d3.selectAll('g.hovertext').size()).toEqual(1);
            });

            it('should show longitude and latitude values', function() {
                var node = d3.selectAll('g.hovertext').selectAll('tspan')[0][0];

                expect(node.innerHTML).toEqual('(0°, 0°)');
            });

            it('should show the trace name', function() {
                var node = d3.selectAll('g.hovertext').selectAll('text')[0][0];

                expect(node.innerHTML).toEqual('trace 0');
            });
        });

        describe('scattergeo hover events', function() {
            var ptData;

            beforeEach(function() {
                gd.on('plotly_hover', function(eventData) {
                    ptData = eventData.points[0];
                });

                mouseEventScatterGeo('mouseover');
            });

            it('should contain the correct fields', function() {
                expect(Object.keys(ptData)).toEqual([
                    'data', 'fullData', 'curveNumber', 'pointNumber',
                    'lon', 'lat', 'location'
                ]);
            });

            it('should show the correct point data', function() {
                expect(ptData.lon).toEqual(0);
                expect(ptData.lat).toEqual(0);
                expect(ptData.location).toBe(null);
                expect(ptData.curveNumber).toEqual(0);
                expect(ptData.pointNumber).toEqual(0);
            });
        });

        describe('scattergeo click events', function() {
            var ptData;

            beforeEach(function() {
                gd.on('plotly_click', function(eventData) {
                    ptData = eventData.points[0];
                });

                mouseEventScatterGeo('click');
            });

            it('should contain the correct fields', function() {
                expect(Object.keys(ptData)).toEqual([
                    'data', 'fullData', 'curveNumber', 'pointNumber',
                    'lon', 'lat', 'location'
                ]);
            });

            it('should show the correct point data', function() {
                expect(ptData.lon).toEqual(0);
                expect(ptData.lat).toEqual(0);
                expect(ptData.location).toBe(null);
                expect(ptData.curveNumber).toEqual(0);
                expect(ptData.pointNumber).toEqual(0);
            });
        });

        describe('choropleth hover labels', function() {
            beforeEach(function() {
                mouseEventChoropleth('mouseover');
            });

            it('should show one hover text group', function() {
                expect(d3.selectAll('g.hovertext').size()).toEqual(1);
            });

            it('should show location and z values', function() {
                var node = d3.selectAll('g.hovertext').selectAll('tspan')[0];

                expect(node[0].innerHTML).toEqual('RUS');
                expect(node[1].innerHTML).toEqual('10');
            });

            it('should show the trace name', function() {
                var node = d3.selectAll('g.hovertext').selectAll('text')[0][0];

                expect(node.innerHTML).toEqual('trace 1');
            });
        });

        describe('choropleth hover events', function() {
            var ptData;

            beforeEach(function() {
                gd.on('plotly_hover', function(eventData) {
                    ptData = eventData.points[0];
                });

                mouseEventChoropleth('mouseover');
            });

            it('should contain the correct fields', function() {
                expect(Object.keys(ptData)).toEqual([
                    'data', 'fullData', 'curveNumber', 'pointNumber',
                    'location', 'z'
                ]);
            });

            it('should show the correct point data', function() {
                expect(ptData.location).toBe('RUS');
                expect(ptData.z).toEqual(10);
                expect(ptData.curveNumber).toEqual(1);
                expect(ptData.pointNumber).toEqual(2);
            });
        });

        describe('choropleth click events', function() {
            var ptData;

            beforeEach(function() {
                gd.on('plotly_click', function(eventData) {
                    ptData = eventData.points[0];
                });

                mouseEventChoropleth('click');
            });

            it('should contain the correct fields', function() {
                expect(Object.keys(ptData)).toEqual([
                    'data', 'fullData', 'curveNumber', 'pointNumber',
                    'location', 'z'
                ]);
            });

            it('should show the correct point data', function() {
                expect(ptData.location).toBe('RUS');
                expect(ptData.z).toEqual(10);
                expect(ptData.curveNumber).toEqual(1);
                expect(ptData.pointNumber).toEqual(2);
            });
        });

    });
});
