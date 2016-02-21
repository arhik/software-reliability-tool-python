import {bindable, customElement} from 'aurelia-framework'
import gridstack from 'gridstack'

@customElement('gridtest')
export class gridtest{
	@bindable gridstackdiv;
	constructor(){

	}

	attached(){
		var options = {
	        cell_height: 80,
	        vertical_margin: 10
    	};
		$('grid-stack').gridstack(options);
	}
}

// <script type="text/javascript">
// $(function () {
//     var options = {
//         cell_height: 80,
//         vertical_margin: 10
//     };
//     $('.grid-stack').gridstack(options);
// });
// </script>