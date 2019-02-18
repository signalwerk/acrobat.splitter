//   splits double page spreads in pdfs into single pages

function splitterInfo() {
  this.name = "splitter";
  this.version = 0.8;
  this.mainMenu = this.name + " " + this.version;
  this.info = this.name + " " + this.version + " || Signalwerk GmbH";
}

var splitter = new splitterInfo();

app.addSubMenu({ cName: splitter.mainMenu, cParent: "File" });

app.addMenuItem({
  cName: "Spreads to single pages",
  cParent: splitter.mainMenu,
  cExec: "app.alert(split(), 3);"
});

app.addMenuItem({
  cName: "Info",
  cParent: splitter.mainMenu,
  cExec: "app.alert(splitter.info, 3);"
});

function split() {
  // Specify cDefault only;
  var firstStart = app.response("From which page on should we split?", "", 1);
  var randpt = 42.52; //42.52 pt (15 mm)

  var firstStart = firstStart - 1;
  var aPath = this.path;

  //dupplicate page
  var numP = this.numPages;
  for (i = numP; i > 0 + firstStart; i = i - 1) {
    this.insertPages(i - 1, aPath, i - 1, i - 1);
  }

  //crop page
  var numP = this.numPages;
  var left = true;

  for (i = 0 + firstStart; i < numP; i++) {
    if (left == true) {
      var left = false;
      var aRect = this.getPageBox("Trim", i);
      var hoehe = aRect[2] - aRect[0];
      var breite = aRect[1] - aRect[3];

      this.setPageBoxes("Trim", i, i, [aRect[0], aRect[1], aRect[2] - breite / 2, aRect[3]]);

      var aRect = this.getPageBox("Trim", i);
      this.setPageBoxes("Media", i, i, [aRect[0] - randpt, aRect[1] + randpt, aRect[2] + randpt, aRect[3] - randpt]);
    } else {
      var left = true;
      var aRect = this.getPageBox("Trim", i);
      var hoehe = aRect[2] - aRect[0];
      var breite = aRect[1] - aRect[3];

      this.setPageBoxes("Trim", i, i, [aRect[0] + breite / 2, aRect[1], aRect[2], aRect[3]]);

      var aRect = this.getPageBox("Trim", i);
      this.setPageBoxes("Media", i, i, [aRect[0] - randpt, aRect[1] + randpt, aRect[2] + randpt, aRect[3] - randpt]);
    }
  }

  return "Seiten wurden gesplittet.";
}
