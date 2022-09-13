function tinkerCadSVGtoRDWorksSVG() {
  var file = DriveApp.getFileById("12Y1xYCwUtsfIofyRylg1QCk8ASoO96jg");
  var svgFile = XmlService.parse(file.getBlob().getDataAsString());
  var svg = svgFile.getRootElement();
  var elements = svg.getChildren();

  for(var i=0; i< elements.length;i++){
    if(elements[i].getName() == "path"){
      var pathAttr = elements[i].getAttributes();
      elements[i].setName("g");

      var newPath = XmlService.createElement("path",svg.getNamespace());

      for(var j=0;j< pathAttr.length;j++){
         elements[i].removeAttribute(pathAttr[j].getName());
         newPath.setAttribute(pathAttr[j].getName(), pathAttr[j].getValue());
      }

      newPath.removeAttribute("xmlns");

      elements[i].addContent(0,newPath);
    }
  }
  
  var newFile = file.makeCopy();
  newFile.setContent(XmlService.getPrettyFormat().format(svgFile))
  newFile.setTrashed(true)
  console.log(newFile.getDownloadUrl())
}

function onOpen(e){
  var builder =  CardService.newCardBuilder();
  var cardSection = CardService.newCardSection()
          .setHeader("Converter")

  var convertAction = CardService.newAction().setFunctionName('onDriveItemsSelected');
        
  cardSection.addWidget(
        CardService.newTextButton()
          .setText("Convert and Download Selected SVGs")
          .setOnClickAction(convertAction));

        builder.addSection(cardSection);
  return builder.build();

}

function onDriveItemsSelected(e) {
  var builder =  CardService.newCardBuilder();
// For each item the user has selected in Drive, display either its
  // quota information or a button that allows the user to provide
  // permission to access that file to retrieve its quota details.
  e['drive']['selectedItems'].forEach(
    function(item){
      var cardSection = CardService.newCardSection()
          .setHeader(item['title']);

      cardSection.addWidget(
          CardService.newTextParagraph().setText(
              "This files id; " + item['id']));

      builder.addSection(cardSection);
    });

  return builder.build();
}
