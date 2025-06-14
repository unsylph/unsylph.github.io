<script type="text/javascript">

			var W = 0; //canvas width variable
			var H = 0; //canvas height variable

			//gridtest function
			function gridtest() {
				var point = {x: W / 2, y: H / 2 }; //center the point

				point.x = event.pageX - document.getElementById('swonmap').offsetLeft; //find point x in canvas based on page position
				point.y = event.pageY - document.getElementById('swonmap').offsetTop; //find point y in canvas based on page position

				alert("x: "+point.x+" , y: "+point.y); //alert showing coordinates of mouse clock
            }

			//function to draw base hexes onto canvas
			function drawhex() {
				var canvas = document.getElementById('swonmap');
				if (canvas.getContext) {
					var ctx = canvas.getContext('2d'); //set context to 2d

					var x_hex = document.forms["mapoptions"]["xvalue"].value; //set how many hexes on x axis
					var y_hex = document.forms["mapoptions"]["yvalue"].value; //set how many hexes on y axis

					ctx.resetTransform(); //reset all transformations

					ctx.clearRect(0, 0, canvas.width, canvas.height); //clear the draw area

					//resizing canvas width to x hexes
					canvas.width = 20 + (70 * x_hex) + 2; //the '+ 2' is to give a 1px 'border' to the canvas

					if (x_hex > 1){ //resizing canvas height to y hexes
						canvas.height = 40 + ( 80 * y_hex ) + 2; //the '+ 2' is to give a 1px 'border' to the canvas
					} else { //this changes by half of a hex's height if there is more than 1 column
						canvas.height = ( 80 * y_hex )  + 2; //the '+ 2' is to give a 1px 'border' to the canvas
					}

					W = canvas.width; //set canvas width
					H = canvas.height; //set canvas height

					var hexagon = new Path2D(); //drawing a hexagon as a 2d path
					hexagon.moveTo(20,0);
					hexagon.lineTo(20,0);
					hexagon.lineTo(70,0);
					hexagon.lineTo(90,40);
					hexagon.lineTo(70,80);
					hexagon.lineTo(20,80);
					hexagon.lineTo(0,40);
					hexagon.closePath();

					//set up hex stroke variable
					var hstroke = document.forms["mapoptions"]["hex_stroke"];
					//set up hex fill variable
					var hfill = document.forms["mapoptions"]["hex_fill"];
					//set up hex numbers variable
					var hnumbers = document.forms["mapoptions"]["hex_numbers"];

					//set hex stroke colour and opacity
					var HexStrokeStyle = document.forms["mapoptions"]["hs_colour"].value;
					//set hex fill colour and opacity
					var HexFillStyle = document.forms["mapoptions"]["hf_colour"].value;
					//set hex coordinate fill colour and opacity
					var CoordFillStyle = document.forms["mapoptions"]["hn_colour"].value;

					//text options
					ctx.font = '12px sans-serif'; //font size and style
					ctx.textAlign = 'center'; //center align text
					ctx.textBaseline = 'top'; //text will draw with the y pos at the top
					ctx.direction = 'ltr'; //text will draw left to right

					//function to draw base canvas
					function drawBase(cur_hex){
						for (var j = 0; j < ( y_hex ); j++){
							ctx.strokeStyle = HexStrokeStyle; //set hex stroke style
							ctx.fillStyle = HexFillStyle; //set hex fill style

							ctx.translate( 1 , 1 ); //translates from 0,0 to 1,1 in order to give a 1px border to canvas

							if (cur_hex == x_hex){
								ctx.translate( i * 70 , j * 80 ); //translates to next hex location
							} else {
								ctx.translate( i * 70 , j * 80 + 40 ); //translates to next hex location
							}

							ctx.lineWidth = 1; //width (in pixels) of stroked hex path
							ctx.lineJoin = 'miter'; //when hex paths join have sharp corners
							if (hstroke.checked){ //if stoke variable is checked
								ctx.stroke(hexagon); //stroke the hex path
							}
							if (hfill.checked){ //if fill variable is checked
								ctx.fill(hexagon); //fill the hex path
							}
							if (hnumbers.checked){ //if hex numbers variable is checked
								ctx.fillStyle = CoordFillStyle; //set coordinate fill style
								if ( i < 10 ) { //this is for the SWON numbering (00,00) to (99,99)
									if ( j < 10 ){
										ctx.fillText( '0' + i + '0' + j , 45 , 2 );
									} else {
										ctx.fillText( '0' + i + '' + j , 45 , 2 );
									}
								} else {
									if ( j < 10 ){
										ctx.fillText( i + '0' + j , 45 , 2 );
									} else {
										ctx.fillText( i + '' + j , 45 , 2 );
									}
								}
							}
							ctx.resetTransform(); //reset context transform to 0,0
						}
					}

					//this loop is where the magic happens
					for (var i = 0; i < ( x_hex ); i++){
						if ( i % 2 === 0 ) { //if the column is even
							drawBase(x_hex)
						} else { //if the column is odd
							drawBase(y_hex)
						}
					}
				}
			}

			//function to draw systems onto canvas
			function drawsys() {

			}

			//exporting options
			function savepng() { //function to export canvas as a png
				var link = document.getElementById('button_savepng');
				link.href = document.getElementById('swonmap').toDataURL('image/png', 1.0);
				link.download = 'swon_map.png';
			}
			function savejpeg() { //function to export canvas as a jpeg
				var link = document.getElementById('button_savejpeg');
				link.href = document.getElementById('swonmap').toDataURL('image/jpeg', 1.0);
				link.download = 'swon_map.jpeg';
			}

		</script>