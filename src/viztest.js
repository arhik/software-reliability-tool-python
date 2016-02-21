import {customElement, bindable, inject} from 'aurelia-framework';
import Viz from 'viz'
@customElement('vizel')
// @inject(Viz)
export class VizEl{
	@bindable vizref;
	constructor(){
		// this.viz = viz;
	}

	attached(){
	// 	var items = [
	//     {x: '2014-06-11', y: 10},
	//     {x: '2014-06-12', y: 25},
	//     {x: '2014-06-13', y: 30},
	//     {x: '2014-06-14', y: 10},
	//     {x: '2014-06-15', y: 15},
	//     {x: '2014-06-16', y: 30}
	//   ];

	//   var dataset = new Vis.DataSet(items);
	//   var options = {
	//     start: '2014-06-10',
	//     end: '2014-06-18'
	//   };
	//   var graph2d = new Vis.Graph2d(this.vizref, dataset, options);
		let image = Viz("digraph g { a -> b; }", { format: "png-image-element" });
		this.vizref.appendChild(image);

			console.log(Viz)
		// var data = new vis.DataSet();
		// // console.log(data)
	 //    // create some nice looking data with sin/cos
	 //    var counter = 0;
	 //    var steps = 50;  // number of datapoints will be steps*steps
	 //    var axisMax = 314;
	 //    var axisStep = axisMax / steps;
	 //    for (var x = 0; x < axisMax; x+=axisStep) {
	 //        for (var y = 0; y < axisMax; y+=axisStep) {
	 //            var value = (Math.sin(x/50) * Math.cos(y/50) * 50 + 50);
	 //            data.add({id:counter++,x:x,y:y,z:value,style:value});
	 //        }
	 //    }

	 //    // specify options
	 //    var options = {
	 //        width:  '500px',
	 //        height: '552px',
	 //        style: 'surface',
	 //        showPerspective: true,
	 //        showGrid: true,
	 //        showShadow: false,
	 //        keepAspectRatio: true,
	 //        verticalRatio: 0.5
	 //    };

	    // Instantiate our graph object.
	    // var container = document.getElementById('visualization');
	    // var graph3d = new vis.Graph3d(this.vizref, data, options);

	}
}