System.register(["aurelia-framework", "aurelia-fetch-client", "aurelia-event-aggregator", "./original_data", "./plotData.js"], function (_export) {
	"use strict";

	var inject, Element, customElement, bindable, TaskQueue, HttpClient, json, EventAggregator, OriginData, PlotData, Upload;

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	return {
		setters: [function (_aureliaFramework) {
			inject = _aureliaFramework.inject;
			Element = _aureliaFramework.Element;
			customElement = _aureliaFramework.customElement;
			bindable = _aureliaFramework.bindable;
			TaskQueue = _aureliaFramework.TaskQueue;
		}, function (_aureliaFetchClient) {
			HttpClient = _aureliaFetchClient.HttpClient;
			json = _aureliaFetchClient.json;
		}, function (_aureliaEventAggregator) {
			EventAggregator = _aureliaEventAggregator.EventAggregator;
		}, function (_original_data) {
			OriginData = _original_data.OriginData;
		}, function (_plotDataJs) {
			PlotData = _plotDataJs.PlotData;
		}],
		execute: function () {
			Upload = (function () {
				function Upload(http, eventAggregator, originData, taskQueue) {
					_classCallCheck(this, _Upload);

					this.msg = "Please upload a csv file";
					this.http = http;
					this.eventAggregator = eventAggregator;
					this.originaldata = originData;
					this.taskQueue = taskQueue;
				}

				_createClass(Upload, [{
					key: "csv_data",
					value: function csv_data() {
						var _this = this;

						console.log("Hello i am being triggered");

						var data = new FormData();
						data.append('file', this.datafile[0]);
						this.http.fetch("http://localhost:3300/upload", { method: "post", body: data }).then(function (response) {
							return response.json();
						}).then(function (formatted_data) {
							return _this.eventAggregator.publish('rawdata', JSON.parse(formatted_data));
						});
						this.msg = "Hello hi. CSV is sucessfully sent";
					}
				}, {
					key: "computedata",
					value: function computedata() {
						var _this2 = this;

						console.log("Compute is triggered");
						console.log(this.originaldata.getRawData());

						this.http.fetch("http://localhost:3300/compute", { method: "post", body: this.originaldata.getRawData() }).then(function (response) {
							return response.json();
						}).then(function (formattedplot_data) {
							return _this2.eventAggregator.publish('plotData', formattedplot_data);
						});
						this.msg = "Plot data is here";
					}
				}]);

				var _Upload = Upload;
				Upload = inject(HttpClient, EventAggregator, OriginData, TaskQueue)(Upload) || Upload;
				Upload = customElement('upload')(Upload) || Upload;
				return Upload;
			})();

			_export("Upload", Upload);
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNzdl91cGxvYWQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O21IQVVhLE1BQU07Ozs7Ozs7OzhCQVRYLE1BQU07K0JBQUUsT0FBTztxQ0FBQyxhQUFhO2dDQUFFLFFBQVE7aUNBQUUsU0FBUzs7b0NBQ2xELFVBQVU7OEJBQUUsSUFBSTs7NkNBQ2hCLGVBQWU7OytCQUVmLFVBQVU7OzBCQUNWLFFBQVE7OztBQUlILFNBQU07QUFJUCxhQUpDLE1BQU0sQ0FJTixJQUFJLEVBQUUsZUFBZSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUM7OztBQUN4RCxTQUFJLENBQUMsR0FBRyxHQUFHLDBCQUEwQixDQUFDO0FBQ3RDLFNBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ2pCLFNBQUksQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDO0FBQ3ZDLFNBQUksQ0FBQyxZQUFZLEdBQUcsVUFBVSxDQUFDO0FBQy9CLFNBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0tBQzNCOztpQkFWVyxNQUFNOztZQVlWLG9CQUFFOzs7QUFDVCxhQUFPLENBQUMsR0FBRyxDQUFDLDRCQUE0QixDQUFDLENBQUM7O0FBRTFDLFVBQUksSUFBSSxHQUFHLElBQUksUUFBUSxFQUFFLENBQUM7QUFDMUIsVUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3RDLFVBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLDhCQUE4QixFQUFDLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxRQUFRO2NBQUksUUFBUSxDQUFDLElBQUksRUFBRTtPQUFBLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxjQUFjO2NBQUksTUFBSyxlQUFlLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDO09BQUEsQ0FBQyxDQUFDO0FBQ3pNLFVBQUksQ0FBQyxHQUFHLEdBQUcsbUNBQW1DLENBQUM7TUFDL0M7OztZQUVVLHVCQUFFOzs7QUFDWixhQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLENBQUM7QUFDcEMsYUFBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7O0FBRTVDLFVBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLCtCQUErQixFQUFDLEVBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsRUFBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsUUFBUTtjQUFJLFFBQVEsQ0FBQyxJQUFJLEVBQUU7T0FBQSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsa0JBQWtCO2NBQUksT0FBSyxlQUFlLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBQyxrQkFBa0IsQ0FBQztPQUFBLENBQUMsQ0FBQztBQUNsTyxVQUFJLENBQUMsR0FBRyxHQUFHLG1CQUFtQixDQUFBO01BQzlCOzs7a0JBM0JXLE1BQU07QUFBTixVQUFNLEdBRGxCLE1BQU0sQ0FBQyxVQUFVLEVBQUUsZUFBZSxFQUFFLFVBQVUsRUFBRSxTQUFTLENBQUMsQ0FDOUMsTUFBTSxLQUFOLE1BQU07QUFBTixVQUFNLEdBRmxCLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FFWCxNQUFNLEtBQU4sTUFBTTtXQUFOLE1BQU0iLCJmaWxlIjoiY3N2X3VwbG9hZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHtpbmplY3QsIEVsZW1lbnQsY3VzdG9tRWxlbWVudCwgYmluZGFibGUsIFRhc2tRdWV1ZX0gZnJvbSBcImF1cmVsaWEtZnJhbWV3b3JrXCI7XG5pbXBvcnQge0h0dHBDbGllbnQsIGpzb259IGZyb20gXCJhdXJlbGlhLWZldGNoLWNsaWVudFwiO1xuaW1wb3J0IHtFdmVudEFnZ3JlZ2F0b3J9IGZyb20gJ2F1cmVsaWEtZXZlbnQtYWdncmVnYXRvcic7XG4vLyBpbXBvcnQge1BhcGF9IGZyb20gXCJtaG9sdC9QYXBhUGFyc2VcIjtcbmltcG9ydCB7T3JpZ2luRGF0YX0gZnJvbSBcIi4vb3JpZ2luYWxfZGF0YVwiO1xuaW1wb3J0IHtQbG90RGF0YX0gZnJvbSBcIi4vcGxvdERhdGEuanNcIjtcblxuQGN1c3RvbUVsZW1lbnQoJ3VwbG9hZCcpXG5AaW5qZWN0KEh0dHBDbGllbnQsIEV2ZW50QWdncmVnYXRvciwgT3JpZ2luRGF0YSwgVGFza1F1ZXVlKVxuZXhwb3J0IGNsYXNzIFVwbG9hZHtcblx0Ly8gQGJpbmRhYmxlIGZpbGVmb3JtO1xuXHQvLyBAYmluZGFibGUgaW5wdXRkYXRhO1xuXHRcblx0Y29uc3RydWN0b3IoaHR0cCwgZXZlbnRBZ2dyZWdhdG9yLCBvcmlnaW5EYXRhLCB0YXNrUXVldWUpe1xuXHRcdHRoaXMubXNnID0gXCJQbGVhc2UgdXBsb2FkIGEgY3N2IGZpbGVcIjtcblx0XHR0aGlzLmh0dHAgPSBodHRwO1xuXHRcdHRoaXMuZXZlbnRBZ2dyZWdhdG9yID0gZXZlbnRBZ2dyZWdhdG9yO1xuXHRcdHRoaXMub3JpZ2luYWxkYXRhID0gb3JpZ2luRGF0YTtcblx0XHR0aGlzLnRhc2tRdWV1ZSA9IHRhc2tRdWV1ZTtcblx0fVxuXG5cdGNzdl9kYXRhKCl7XG5cdFx0Y29uc29sZS5sb2coXCJIZWxsbyBpIGFtIGJlaW5nIHRyaWdnZXJlZFwiKTtcblx0XHRcblx0XHRsZXQgZGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuXHRcdGRhdGEuYXBwZW5kKCdmaWxlJywgdGhpcy5kYXRhZmlsZVswXSk7XG5cdFx0dGhpcy5odHRwLmZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDozMzAwL3VwbG9hZFwiLHttZXRob2Q6XCJwb3N0XCIsYm9keTogZGF0YX0pLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKS50aGVuKGZvcm1hdHRlZF9kYXRhID0+IHRoaXMuZXZlbnRBZ2dyZWdhdG9yLnB1Ymxpc2goJ3Jhd2RhdGEnLCBKU09OLnBhcnNlKGZvcm1hdHRlZF9kYXRhKSkpO1xuXHRcdHRoaXMubXNnID0gXCJIZWxsbyBoaS4gQ1NWIGlzIHN1Y2Vzc2Z1bGx5IHNlbnRcIjtcblx0fVxuXG5cdGNvbXB1dGVkYXRhKCl7XG5cdFx0Y29uc29sZS5sb2coXCJDb21wdXRlIGlzIHRyaWdnZXJlZFwiKTtcblx0XHRjb25zb2xlLmxvZyh0aGlzLm9yaWdpbmFsZGF0YS5nZXRSYXdEYXRhKCkpO1xuXHRcdC8vIHRoaXMudGFza1F1ZXVlLlxuXHRcdHRoaXMuaHR0cC5mZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6MzMwMC9jb21wdXRlXCIse21ldGhvZDogXCJwb3N0XCIsIGJvZHk6IHRoaXMub3JpZ2luYWxkYXRhLmdldFJhd0RhdGEoKX0pLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKS50aGVuKGZvcm1hdHRlZHBsb3RfZGF0YSA9PiB0aGlzLmV2ZW50QWdncmVnYXRvci5wdWJsaXNoKCdwbG90RGF0YScsZm9ybWF0dGVkcGxvdF9kYXRhKSk7XG5cdFx0dGhpcy5tc2cgPSBcIlBsb3QgZGF0YSBpcyBoZXJlXCJcblx0fVxuXHRcdFxuXG5cbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
