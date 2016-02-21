

import {customElement, bindable, inject} from 'aurelia-framework';
import vis from 'vis'
@customElement('visel')
// @inject(Viz)
export class VisEl{
	@bindable visref;
	@bindable strataref;
	constructor(){
		// this.viz = viz;
	}

	attached(){
		// var items = [
	 //    {x: '2014-06-11', y: 10},
	 //    {x: '2014-06-12', y: 25},
	 //    {x: '2014-06-13', y: 30},
	 //    {x: '2014-06-14', y: 10},
	 //    {x: '2014-06-15', y: 15},
	 //    {x: '2014-06-16', y: 30}
	 //  ];

	 //  var dataset = new vis.DataSet(items);
	 //  var options = {
	 //    start: '2014-06-10',
	 //    end: '2014-06-18'
	 //  };
	 //  var graph2d = new vis.Graph2d(this.visref, dataset, options);
// -------------------------------------------------------------------------
	 // 	var data = [
  //   {id: 1, content: 'item 1', start: '2013-04-20'},
  //   {id: 2, content: 'item 2', start: '2013-04-14'},
  //   {id: 3, content: 'item 3', start: '2013-04-18'},
  //   {id: 4, content: 'item 4', start: '2013-04-16', end: '2013-04-19'},
  //   {id: 5, content: 'item 5', start: '2013-04-25'},
  //   {id: 6, content: 'item 6', start: '2013-04-27'}
  // ];
  // var options = {};
  // var timeline = new vis.Timeline(this.visref, data, options);
		

		// 	console.log(vis)

// //--------------------------------------------------------------------
// 		var data = new vis.DataSet();
// 		// console.log(data)
// 	    // create some nice looking data with sin/cos
// 	    var counter = 0;
// 	    var steps = 50;  // number of datapoints will be steps*steps
// 	    var axisMax = 314;
// 	    var axisStep = axisMax / steps;
// 	    for (var x = 0; x < axisMax; x+=axisStep) {
// 	        for (var y = 0; y < axisMax; y+=axisStep) {
// 	            var value = (Math.sin(x/50) * Math.cos(y/50) * 50 + 50);
// 	            data.add({id:counter++,x:x,y:y,z:value,style:value});
// 	        }
// 	    }

// 	    // specify options
// 	    var options = {
// 	        width:  '500px',
// 	        height: '552px',
// 	        style: 'surface',
// 	        showPerspective: true,
// 	        showGrid: true,
// 	        showShadow: false,
// 	        keepAspectRatio: true,
// 	        verticalRatio: 0.5
// 	    };

// 	    // Instantiate our graph object.
// 	    // var container = document.getElementById('visualization');
// 	    var container = this.visref;
// 	    var graph3d = new vis.Graph3d(container, data, options);

	    // ---------------------------------------------------------------------

	    var DELAY = 1000; // delay in ms to add new data points

  // var strategy = document.getElementById('strategy');
  var strategy = this.strataref;
  // create a graph2d with an (currently empty) dataset
  var container = this.visref;
  var dataset = new vis.DataSet();

  var options = {
    start: vis.moment().add(-30, 'seconds'), // changed so its faster
    end: vis.moment(),
    dataAxis: {
      left: {
        range: {
          min:-10, max: 10
        }
      }
    },
    drawPoints: {
      style: 'circle' // square, circle
    },
    shaded: {
      orientation: 'bottom' // top, bottom
    }
  };
  var graph2d = new vis.Graph2d(container, dataset, options);

  // a function to generate data points
  function y(x) {
    return (Math.sin(x / 2) + Math.cos(x / 4)) * 5;
  }

  function renderStep() {
    // move the window (you can think of different strategies).
    var now = vis.moment();
    var range = graph2d.getWindow();
    var interval = range.end - range.start;
    switch (strategy.value) {
      case 'continuous':
        // continuously move the window
        graph2d.setWindow(now - interval, now, {animation: false});
        requestAnimationFrame(renderStep);
        break;

      case 'discrete':
        graph2d.setWindow(now - interval, now, {animation: false});
        setTimeout(renderStep, DELAY);
        break;

      default: // 'static'
        // move the window 90% to the left when now is larger than the end of the window
        if (now > range.end) {
          graph2d.setWindow(now - 0.1 * interval, now + 0.9 * interval);
        }
        setTimeout(renderStep, DELAY);
        break;
    }
  }
  renderStep();

  /**
   * Add a new datapoint to the graph
   */
  function addDataPoint() {
    // add a new data point to the dataset
    var now = vis.moment();
    dataset.add({
      x: now,
      y: y(now / 1000)
    });

    // remove all data points which are no longer visible
    var range = graph2d.getWindow();
    var interval = range.end - range.start;
    var oldIds = dataset.getIds({
      filter: function (item) {
        return item.x < range.start - interval;
      }
    });
    dataset.remove(oldIds);

    setTimeout(addDataPoint, DELAY);
  }
  addDataPoint();

	}
}