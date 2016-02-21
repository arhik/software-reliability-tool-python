
import {inject, Element,customElement, bindable, TaskQueue} from "aurelia-framework";
import {HttpClient, json} from "aurelia-fetch-client";
import {EventAggregator} from 'aurelia-event-aggregator';
// import {Papa} from "mholt/PapaParse";
import {OriginData} from "./original_data";
import {PlotData} from "./plotData.js";

@customElement('upload')
@inject(HttpClient, EventAggregator, OriginData, TaskQueue)
export class Upload{
	// @bindable fileform;
	// @bindable inputdata;
	
	constructor(http, eventAggregator, originData, taskQueue){
		this.msg = "Please upload a csv file";
		this.http = http;
		this.eventAggregator = eventAggregator;
		this.originaldata = originData;
		this.taskQueue = taskQueue;
	}

	csv_data(){
		console.log("Hello i am being triggered");
		
		let data = new FormData();
		data.append('file', this.datafile[0]);
		this.http.fetch("http://localhost:3300/upload",{method:"post",body: data}).then(response => response.json()).then(formatted_data => this.eventAggregator.publish('rawdata', JSON.parse(formatted_data)));
		this.msg = "Hello hi. CSV is sucessfully sent";
	}

	computedata(){
		console.log("Compute is triggered");
		console.log(this.originaldata.getRawData());
		// this.taskQueue.
		this.http.fetch("http://localhost:3300/compute",{method: "post", body: this.originaldata.getRawData()}).then(response => response.json()).then(formattedplot_data => this.eventAggregator.publish('plotData',formattedplot_data));
		this.msg = "Plot data is here"
	}
		


}