//---------------------------------------------------------------------------------------
// Copyright (c) 2001-2021 by PDFTron Systems Inc. All Rights Reserved.
// Consult legal.txt regarding legal and license information.
//---------------------------------------------------------------------------------------


const { PDFNet } = require('@pdftron/pdfnet-node');



























const PrintSignaturesInfo = async (in_docpath) => {
   try{
  console.log('================================================================================');
  console.log('Reading and printing digital signature information');

  const doc = await PDFNet.PDFDoc.createFromFilePath(in_docpath);
  doc.initSecurityHandler();
  if (!(await doc.hasSignatures())) {
    console.log('Doc has no signatures.');
    console.log('================================================================================');
    return;
  } else {
    console.log('Doc has signatures.');
  }


  for (const fitr = await doc.getFieldIteratorBegin(); await fitr.hasNext(); await fitr.next()) {
    const field = await fitr.current();
    (await field.isLockedByDigitalSignature()) ? console.log('==========\nField locked by a digital signature') :
      console.log('==========\nField not locked by a digital signature');

    console.log('Field name: ' + await field.getName());
    console.log('==========');
  }

  console.log('====================\nNow iterating over digital signatures only.\n====================');

  const digsig_fitr = await doc.getDigitalSignatureFieldIteratorBegin();
  for (; await digsig_fitr.hasNext(); await digsig_fitr.next()) {
    console.log('==========');
    const digsigfield = await digsig_fitr.current();
    console.log('Field name of digital signature: ' + await (await PDFNet.Field.create(await digsigfield.getSDFObj())).getName());

    if (!(await digsigfield.hasCryptographicSignature())) {
      console.log('Either digital signature field lacks a digital signature dictionary, ' +
        'or digital signature dictionary lacks a cryptographic Contents entry. ' +
        'Digital signature field is not presently considered signed.\n' +
        '==========');
      continue;
    }

    const cert_count = await digsigfield.getCertCount();
    console.log('Cert count: ' + cert_count);
    for (var i = 0; i < cert_count; i++) {
      const cert = await digsigfield.getCert(i);
      console.log('Cert #' + i + ' size: ' + cert.byteLength);
    }

    const subfilter = await digsigfield.getSubFilter();

    console.log('Subfilter type: ' + subfilter);

    if (subfilter != PDFNet.DigitalSignatureField.SubFilterType.e_ETSI_RFC3161) {
      console.log("Signature's signer: " + await digsigfield.getSignatureName());

      const signing_time = await digsigfield.getSigningTime();
      if (await signing_time.isValid()) {
        console.log('Signing time is valid.');
      }

      console.log('Location: ' + await digsigfield.getLocation());
      console.log('Reason: ' + await digsigfield.getReason());
      console.log('Contact info: ' + await digsigfield.getContactInfo());
    } else {
      console.log('SubFilter == e_ETSI_RFC3161 (DocTimeStamp; no signing info)');
    }

    console.log((await digsigfield.hasVisibleAppearance()) ? 'Visible' : 'Not visible');

    const digsig_doc_perms = await digsigfield.getDocumentPermissions();
    const locked_fields = await digsigfield.getLockedFields();
    for (var i = 0; i < locked_fields.length; i++) {
      console.log('This digital signature locks a field named: ' + locked_fields[i]);
    }

    switch (digsig_doc_perms) {
      case PDFNet.DigitalSignatureField.DocumentPermissions.e_no_changes_allowed:
        console.log('No changes to the document can be made without invalidating this digital signature.');
        break;
      case PDFNet.DigitalSignatureField.DocumentPermissions.e_formfilling_signing_allowed:
        console.log('Page template instantiation, form filling, and signing digital signatures are allowed without invalidating this digital signature.');
        break;
      case PDFNet.DigitalSignatureField.DocumentPermissions.e_annotating_formfilling_signing_allowed:
        console.log('Annotating, page template instantiation, form filling, and signing digital signatures are allowed without invalidating this digital signature.');
        break;
      case PDFNet.DigitalSignatureField.DocumentPermissions.e_unrestricted:
        console.log('Document not restricted by this digital signature.');
        break;
    }
    console.log('==========');
  }

  console.log('================================================================================');
  process.exit(1);

}
catch(err){}
}
















async function main() { try {
  const doc = await PDFNet.PDFDoc.createFromFilePath('CV.pdf');
  const page1 = await doc.getPage(1);

  // Create a text field that we can lock using the field permissions feature.
//   const builder = await PDFNet.ElementBuilder.create();
//   const fnt = new PDFNet.Font(PDFNet.Font.StandardType1Font.e_Indices,PDFNet.Font.StandardType1Font.e_courier,PDFNet.Font.StandardType1Font.e_Type1);

 
//   builder.createTextRun("Ahmed",fnt,10);
//   // ElementWriter is used to write Elements to the page
//   const writer = await PDFNet.ElementWriter.create();

//   writer.beginOnPage(page1);
// writer.writeString("ahmed");

  /* Create a new signature form field in the PDFDoc. The name argument is optional;
  leaving it empty causes it to be auto-generated. However, you may need the name for later.
  Acrobat doesn't show digsigfield in side panel if it's without a widget. Using a
  Rect with 0 width and 0 height, or setting the NoPrint/Invisible flags makes it invisible. */
  const certification_sig_field = await doc.createDigitalSignatureField('yourCertificate.pfx');
  console.log(parseFloat((await page1.getPageHeight()).toString())+'    '+(await page1.getPageHeight()).toString());
  const widgetAnnot = await PDFNet.SignatureWidget.createWithDigitalSignatureField(doc, new PDFNet.Rect(parseFloat((await page1.getPageWidth()).toString()) -200, parseFloat((await page1.getPageHeight()).toString()) - 750, parseFloat((await page1.getPageWidth()).toString()) -30, parseFloat((await page1.getPageHeight()).toString())-780), certification_sig_field);
  widgetAnnot.setBackgroundColor(PDFNet.ColorPt(200,100,50,1),5);
  
  await page1.annotPushBack(widgetAnnot);
 
  // (OPTIONAL) Add an appearance to the signature field.
  // const img = await PDFNet.Image.createFromFile(doc, in_appearance_image_path);
  // await widgetAnnot.createSignatureAppearance(img);

  // Prepare the document locking permission level. It will be applied upon document certification.
  await certification_sig_field.setDocumentPermissions(PDFNet.DigitalSignatureField.DocumentPermissions.e_annotating_formfilling_signing_allowed);

  // Prepare to lock the text field that we created earlier.
  var fields_to_lock = ['asdf_test_field'];
  await certification_sig_field.setFieldPermissions(PDFNet.DigitalSignatureField.FieldPermissions.e_include, fields_to_lock);
 
  await certification_sig_field.certifyOnNextSave('yourCertificate.pfx', '19omaromar0');

  // (OPTIONAL) Add more information to the signature dictionary.






  









  

  // Save the PDFDoc. Once the method below is called, PDFNet will also sign the document using the information provided.
  

  await doc.save('mm.pdf', 0);

 
  process.exit(1);

  
}
catch (err) {
  console.log('error', err) }

  
}

PDFNet.runWithCleanup(main,'demo:omaralami230@gmail.com:7b01f4ab020000000092768e068e8737e8b8c939452e7892e0470df170');