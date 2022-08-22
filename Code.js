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
