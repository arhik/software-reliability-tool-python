import {inject, Element,ObserverLocator,bindable,customElement, TaskQueue} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import Dygraph from 'dygraphs';

@customElement('plotdygraph')
@inject(EventAggregator)
export class PlotDygraph{
	@bindable dygraphdiv;
	constructor(eventAggregator){
		// this.element = element;
		this.eventAggregator = eventAggregator;
		// this.taskQueue = taskQueue;
		// this.rawPlotData = {};
		// this.dygraph = dygraph;
		// this.dygraphdiv = dygraphdiv;
		// this.observerLocator = observerLocator;
		// var subscription = this.observerLocator
		// 				      .getObserver(this, 'rawPlotData')
		// 				      .subscribe(this.rawPlotDataChanged);
		this.data = [
          [1, null, 3],
          [2, 2, null],
          [3, null, 7],
          [4, 5, null],
          [5, null, 5],
          [6, 3, null]
        ];
        // this.graph = new Dygraph(this.dygraphdiv, this.data, {
	       //     							// labels:["X", "Y", "Z"],
	       //     							// headers:true, 							                     // options go here. See http://dygraphs.com/options.html
        //              legend: 'always',
        //              animatedZooms: true,
        //              title: 'dygraphs chart template'
        //          });
	}

	// get(){
	// 	this.eventAggregator.subscribe('rawdata', plotdata => { return plotdata})
	// }

	activate() {
		// var rawPlotData;
		// this.eventAggregator.subscribe('rawdata', plotdata => {
		// 											this.rawPlotData = plotdata; 
		// 											console.log(this);
		// 										});
		// return this.eventAggregator.subscribe('rawdata', datatable => this.rawData = plotdata);

	}

	attached(){
		// var div = this.dygraphdiv
		// this.taskQueue.queueMicroTask(() => {
		this.eventAggregator.subscribe('rawdata', plotdata => {
													this.data = plotdata; 
													console.log(this);
													this.dygraph = new Dygraph(this.dygraphdiv, this.data, {
	           							// labels:["X", "Y", "Z"],
	           							// headers:true, 							                     
	           							// options go here. See http://dygraphs.com/options.html
								                     legend: 'always',
								                     animatedZooms: true,
								                     title: 'dygraphs chart template'
								                 });
		// this.rawData = this.rawPlotData;
		// this.rawData = {};
		// console.log(this.rawPlotData)
		});
		// console.log(new Dygraph(this.dygraphdiv, this.data));
		

	}
	
	rawPlotDataChanged(){
		// attached()
		console.log(this);
		// console.log("Value changed");

		// new Dygraph(div, data, {
	 //           							// labels:["X", "Y", "Z"],
	 //           							// headers:true, 							                     // options go here. See http://dygraphs.com/options.html
  //                    legend: 'always',
  //                    animatedZooms: true,
  //                    title: 'dygraphs chart template'
  //                });
		// this.graph.updateOptions({'file':this.rawPlotData});
		// console.log(Plotly);
		// console.log(this.pltlyjs)
		}


}