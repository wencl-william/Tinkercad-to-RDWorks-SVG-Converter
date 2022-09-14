
function onOpen(e){
  var builder =  CardService.newCardBuilder();
  var cardSection = CardService.newCardSection()

  var convertAction = CardService.newAction().setFunctionName('onConvert');

  cardSection.addWidget(
    CardService.newTextParagraph().setText(
      "Patch SVG files generated by Tinkercad for import into RDworks. \n\nSelect the files in your google drive, set your download location, and convert."
    )
  );    

  cardSection.addWidget(
    CardService.newSelectionInput()
      .setType(CardService.SelectionInputType.DROPDOWN)
      .setTitle("File destination: ")
      .setFieldName("file_destination")
      .addItem("Download", "download", true)
      .addItem("Drive Folder", "folder", false)
      .addItem("Both", "both", false)
  );

  cardSection.addWidget(
        CardService.newTextButton()
          .setText("Convert Selected SVGs")
          .setOnClickAction(convertAction));

        builder.addSection(cardSection);
  return builder.build();

}

function onConvert(e) {
  var builder =  CardService.newCardBuilder();

  var selectedItems = e.drive.selectedItems;
  console.log(e.commonEventObject.formInputs.file_destination.stringInputs.value[0])
  for (var i=0; i< selectedItems.length; i++){
     var item = selectedItems[i];
      
      var cardSection = CardService.newCardSection()
              .setHeader(item['title']);

      cardSection.addWidget(
        CardService.newTextParagraph()
                .setText("This files id; " + item['id']));

      builder.addSection(cardSection);
  }
  return builder.build();
}