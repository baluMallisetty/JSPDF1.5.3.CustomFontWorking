//https://github.com/aaronlidman/Toner-for-Tilemill/tree/master/toner4tilemill/fonts
import { IInputs, IOutputs } from "./generated/ManifestTypes";
//import * as jsPDF from 'jspdf'
import * as jsPDF from 'jspdf/dist/jspdf.debug.js'
import 'jspdf-autotable';
import { fontbase64 } from "./fontBase64";

export class pcf implements ComponentFramework.StandardControl<IInputs, IOutputs> {
	private _value: number;
	private _notifyOutputChanged: () => void;
	// private labelElement: HTMLLabelElement;
	// private inputElement: HTMLInputElement;
	private container: HTMLDivElement;
	private _context: ComponentFramework.Context<IInputs>;
	private _refreshData: EventListenerOrEventListenerObject;
	private _edtorplaceholder: HTMLDivElement;
	//private editor : editorJS;


	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement): void {
		this._context = context;
		this.container = container;
		this._notifyOutputChanged = notifyOutputChanged;
		this._refreshData = this.refreshData.bind(this);
		//this._value = context.parameters.controlValue.raw!;


		const gridHTML = `
<div id="dashboard">

 <button id="save-button">Download</button>
 `
		let ele = document.createElement("div");
		this.container = document.createElement("div");
		this.container.id = 'GridContainer';
		this.container.innerHTML = gridHTML;

		//ReactDOM.render(React.createElement(new editorJS(), null), this.container);



		container.appendChild(this.container);
	}

	public refreshData(evt: Event): void {
		//	this._value = (this.inputElement.value as any) as number;
		//	this.labelElement.innerHTML = this.inputElement.value;
		this._notifyOutputChanged();
	}

	public updateView(context: ComponentFramework.Context<IInputs>): void {
		// storing the latest context from the control.
		//this._value = context.parameters.controlValue.raw!;
		this._context = context;
		var params = context.parameters;


		if (params.fileName.raw?.startsWith('yes')) {
			params.fileName.raw = 'no'
			console.log("pcf fired");
			try {
				const doc = new jsPDF({ filters: ["ASCIIHexEncode"] });//{ filters: ["ASCIIHexEncode"] }
				// doc.addFileToVFS("amiri-Regular.ttf", fontbase64.AmiriRegular);
				// doc.addFont("amiri-Regular.ttf", "amiri", "normal");

				doc.addFileToVFS('msmincho-normal.ttf', fontbase64.msmincho);
				doc.addFont('msmincho-normal.ttf', 'msmincho', 'normal');
				doc.addFont('msmincho-normal.ttf', 'msmincho', 'bold');


				doc.addFileToVFS('arialuni-normal.ttf', fontbase64.arialuni);
				doc.addFont('arialuni-normal.ttf', 'arialuni', 'normal');
				doc.addFont('arialuni-normal.ttf', 'arialuni', 'bold');


				//doc.setFont("amiri");
				//doc.setFont("msmincho");doc.setFontType("normal");
				doc.setFont("arialuni");doc.setFontType("normal");
				//doc.setFont("helvetica");doc.setFontType("normal");
				doc.getFontList();
				//doc.getFont();

				// doc.addFileToVFS("Arial.ttf", fontbase64.arial);
				// doc.addFont("Arial.ttf", "Arial", "normal");
				// doc.setFont("Arial");
				console.log(doc.getFontList());
				var width = doc.internal.pageSize.getWidth();
				var height = doc.internal.pageSize.getHeight();

				doc.setFontSize(20);
				//doc.text("Test",100,100)
				//doc.save();
				var options = {
					pagesplit: true,
					html2canvas: {}
				};
				console.log("calling HTML");
				//doc.addJS(html2canvas);
				//doc.text("إذا لم تستح فاصنع ما شئت", 10, 10);
				doc.text(" &iexcl; Sample Header ♠•♦♣■☆✔❥ /n", 10, 50);
				doc.line(width / 4, height / 4, width, height / 4);
				let ele = document.createElement("div");
				ele.id = "image_ren";
				ele.innerHTML = `<html style="font-family:'arialuni'">
			<style>
			font-family:'arialuni;'
			table, th, td {
			  border:1px solid black;
			}
			</style>
			<body>
			
			<h4 style="font-family:arialuni">&iexcl; Html Header ♠•♦♣■☆✔❥</h4><br>
			<p> &iexcl; Analysis by Country ♠•♦♣■☆✔❥</p>
			<table id='test_jspdf_auto'>
			  <tr>
				<th>&iexcl;ß ♠•♦♣■☆✔❥ test</th>
				<th>location</th>
				<th>Country</th>
			  </tr>
			  <tr>
				<td>Alfreds Futterkiste</td>
				<td>Sample</td>
				<td>Germany</td>
			  </tr>
			  <tr>
				<td>Centro comercial Moctezumaµ</td>
				<td>Francisco Chang</td>
				<td>Mexico</td>
			  </tr>
			</table>
			<br>
			<img src=`+ "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVEiJtZZPbBtFFMZ/M7ubXdtdb1xSFyeilBapySVU8h8OoFaooFSqiihIVIpQBKci6KEg9Q6H9kovIHoCIVQJJCKE1ENFjnAgcaSGC6rEnxBwA04Tx43t2FnvDAfjkNibxgHxnWb2e/u992bee7tCa00YFsffekFY+nUzFtjW0LrvjRXrCDIAaPLlW0nHL0SsZtVoaF98mLrx3pdhOqLtYPHChahZcYYO7KvPFxvRl5XPp1sN3adWiD1ZAqD6XYK1b/dvE5IWryTt2udLFedwc1+9kLp+vbbpoDh+6TklxBeAi9TL0taeWpdmZzQDry0AcO+jQ12RyohqqoYoo8RDwJrU+qXkjWtfi8Xxt58BdQuwQs9qC/afLwCw8tnQbqYAPsgxE1S6F3EAIXux2oQFKm0ihMsOF71dHYx+f3NND68ghCu1YIoePPQN1pGRABkJ6Bus96CutRZMydTl+TvuiRW1m3n0eDl0vRPcEysqdXn+jsQPsrHMquGeXEaY4Yk4wxWcY5V/9scqOMOVUFthatyTy8QyqwZ+kDURKoMWxNKr2EeqVKcTNOajqKoBgOE28U4tdQl5p5bwCw7BWquaZSzAPlwjlithJtp3pTImSqQRrb2Z8PHGigD4RZuNX6JYj6wj7O4TFLbCO/Mn/m8R+h6rYSUb3ekokRY6f/YukArN979jcW+V/S8g0eT/N3VN3kTqWbQ428m9/8k0P/1aIhF36PccEl6EhOcAUCrXKZXXWS3XKd2vc/TRBG9O5ELC17MmWubD2nKhUKZa26Ba2+D3P+4/MNCFwg59oWVeYhkzgN/JDR8deKBoD7Y+ljEjGZ0sosXVTvbc6RHirr2reNy1OXd6pJsQ+gqjk8VWFYmHrwBzW/n+uMPFiRwHB2I7ih8ciHFxIkd/3Omk5tCDV1t+2nNu5sxxpDFNx+huNhVT3/zMDz8usXC3ddaHBj1GHj/As08fwTS7Kt1HBTmyN29vdwAw+/wbwLVOJ3uAD1wi/dUH7Qei66PfyuRj4Ik9is+hglfbkbfR3cnZm7chlUWLdwmprtCohX4HUtlOcQjLYCu+fzGJH2QRKvP3UNz8bWk1qMxjGTOMThZ3kvgLI5AzFfo379UAAAAASUVORK5CYII=" + ` >
			<br>
          	  ■ Coffee</br> 
				</br>
  			 ■ Tea</br> 
			   </br>
  	 		 ■ Milk </br> 
				</br>
 
			</body>
			</html>
			 `;
				ele.style.overflow = 'visible';
				ele.style.fontFamily = 'arialuni';
				ele.style.fontStyle = 'normal';
				ele.style.fontSize = '10';
				document.getElementsByTagName('BODY')[0].append(ele);
				try {
					// doc.fromHTML( ele,0,50,{ 'width': 500},function(dispose){
					// 	doc.save();
					//  });
					var opt = {
						'font-family':'arialuni',
						'fontfamily':'arialuni',
						'fontstyle':'normal',
						'font-style':'normal',
						margin: 1,
						filename: 'myfile.pdf',
						image: { type: 'jpeg', quality: 0.98 },
						html2canvas: { scale: 2 },
						jsPDF: doc,
						outputPdf: doc
					};
					doc.setFont("arialuni");
					doc.fromHTML(ele, 10, 75, opt, function () {
						var columns = ["ID", "Name", "Country"];
var rows = [
    [1, "Shaw", "Tanzania"],
    [2, "Nelson", "Kazakhstan"],
    [3, "Garcia", "Madagascar"]
];

//doc.autoTable(columns, rows);

						doc.save();
					});

					// setTimeout(
					// function(){
					// 	autoTable(doc, { html: '#test_jspdf_auto' });
					// 	//doc.save();
					// },
					// 5000)
				} catch (error) {
					console.error(error)
				}



			} catch (e) {

			}

		}
	}

	public getOutputs(): IOutputs {
		return {
			//controlValue: this._value
		};
	}
	public pdfReady(doc: any): void {

	}
	public destroy(): void {
		//	this.inputElement.removeEventListener("input", this._refreshData);
	}

	public delay(ms: number) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	public removeCharcters(text: string): string {
		let output = "";
		for (let i = 0; i < text.length; i++) {
			if (text.charCodeAt(i) <= 127) {
				output += text.charAt(i);
			}
		}
		text = output
		return text;
	}
}