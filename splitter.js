//   splittet doppelseiten in einzelseiten


function splitterInfo() {
    this.name = "splitter";
    this.version = 0.5;
    this.hauptmenue = this.name + " " + this.version;
    this.info = this.name + " " + this.version + " || copyright by stefan huber || www.stefan-huber.ch";
 }

var splitter = new splitterInfo();


app.addSubMenu({ cName: splitter.hauptmenue, cParent: "Tools" });

app.addMenuItem({ cName: "Doppelseiten in Einzelseiten", cParent: splitter.hauptmenue,
cExec: "app.alert(split(), 3);"});

app.addMenuItem({ cName: "Info", cParent: splitter.hauptmenue,
cExec: "app.alert(splitter.info, 3);"});

function split() {

	var firstStart = app.response("Ab welcher Seite soll gesplittet werden?","", 1); // Specify cDefault only;
	var randpt = 42.52; //42.52 pt (15 mm)


	var firstStart = firstStart -1;
	var aPath = this.path;


	//duppliziert jede seite
    	var numP = this.numPages 
    	for (i=numP;i>0+firstStart;i=i-1) {
    	    this.insertPages (i-1, aPath, i-1,i-1);
    	}

	//cropt nun die seiten richtig
    	var numP = this.numPages 
    	var left = true

    	for (i=0 +firstStart;i<numP;i++) {
    	    if (left==true) {
				var left=false;
				var aRect = this.getPageBox("Trim", i);
				var hoehe = aRect[2] -aRect[0]
				var breite = aRect[1] - aRect[3]
				
				this.setPageBoxes("Trim", i, i, [aRect[0], aRect[1], aRect[2]-breite/2, aRect[3]]);
			
				var aRect = this.getPageBox("Trim", i);
				this.setPageBoxes("Media", i, i, [aRect[0]-randpt,aRect[1]+randpt,aRect[2]+randpt,aRect[3]-randpt]);
			
			} 
			else
			{
				var left=true;
				var aRect = this.getPageBox("Trim", i);
				var hoehe = aRect[2] -aRect[0]
				var breite = aRect[1] - aRect[3]
				
				this.setPageBoxes("Trim", i, i, [aRect[0]+breite/2,aRect[1],aRect[2],aRect[3]]);
				
				var aRect = this.getPageBox("Trim", i);
				this.setPageBoxes("Media", i, i, [aRect[0]-randpt,aRect[1]+randpt,aRect[2]+randpt,aRect[3]-randpt]);
			
    		};
   	 	}

	return ("Seiten wurden gesplittet.");
}
