const { PDFNet } = require('@pdftron/pdfnet-node');
const fs = require("fs");
var qr = require('qr-image');
async function main() {
    try {
        // ---------------- Preparation --------------------
        // Récuperer le document dont on veut signer
        const doc = await PDFNet.PDFDoc.createFromFilePath('CV.pdf');
        // Récuperer la page dont on veut signer
        const page1 = await doc.getPage(1);
        // creer le builder qui va ajouter des blocks à la page
        const builder = await PDFNet.ElementBuilder.create();
        // Writer est le responsable d'ajouter du texte,d'image,... à un block de builder
        const writer = await PDFNet.ElementWriter.create();

        /*---------------- Ajout d'une E-Signature --------------------*/

        // Creation du signature digital par un certificat et nommer son champ
        let cert = await PDFNet.X509Certificate.createFromFile('certificate.crt');
        let subject = await (await (await cert.getSubjectField()).getAllAttributesAndValues()).at(0).getAttributeTypeOID();
        let subject1 = (await (await cert.getSubjectField()).getStringValuesForAttribute(subject)).at(0);

        const certification_sig_field = await doc.createDigitalSignatureField('Certificate');
        await certification_sig_field.setDocumentPermissions(PDFNet.DigitalSignatureField.DocumentPermissions.e_annotating_formfilling_signing_allowed);
        const widgetAnnot = await PDFNet.SignatureWidget.createWithDigitalSignatureField(doc, new PDFNet.Rect(parseFloat((await page1.getPageWidth()).toString()) - 200, parseFloat((await page1.getPageHeight()).toString()) - 750, parseFloat((await page1.getPageWidth()).toString()) - 30, parseFloat((await page1.getPageHeight()).toString()) - 800), certification_sig_field);
        await page1.annotPushBack(widgetAnnot);
        var fields_to_lock = ['asdf_test_field'];
        await certification_sig_field.setFieldPermissions(PDFNet.DigitalSignatureField.FieldPermissions.e_include, fields_to_lock);
        await certification_sig_field.certifyOnNextSave('certificatea.pfx', 'ahmedahmed');
        // Ajouter les Permissions à la signature
        writer.beginOnPage(page1);
        let element = await builder.createTextBeginWithFont(await PDFNet.Font.create(doc, PDFNet.Font.StandardType1Font.e_times_roman), 20);
        writer.writeElement(element);
        element = await builder.createNewTextRun('Signes par: ' + (subject1));
        element.setTextMatrixEntries(0.5, 0, 0, 0.5, parseFloat((await page1.getPageWidth()).toString()) - 190, parseFloat((await page1.getPageHeight()).toString()) - 760);
        writer.writeElement(element);

        var opts = {
            errorCorrectionLevel: 'H',
            type: 'png',
            quality: 0.9,
            margin: 0,
            color: {
                dark: "#010599FF",
                light: "#FFBF60FF"
            }
        }
        const qr_svg = qr.imageSync("omar", opts);

        const signatureDate = await certification_sig_field.getSigningTime();
        element = await builder.createNewTextRun('Date: ' + signatureDate.year + '/' + signatureDate.month + '/' + signatureDate.day + ' at ' + signatureDate.hour + ':' + signatureDate.minute + ':' + signatureDate.second);
        // element.setPosAdjustment(15);
        element.setTextMatrixEntries(0.5, 0, 0, 0.5, parseFloat((await page1.getPageWidth()).toString()) - 190, parseFloat((await page1.getPageHeight()).toString()) - 775);

        builder.createImage
        writer.writeElement(element);

        fs.writeFileSync('./my-qr-code.png', qr_svg);
        const img = await PDFNet.Image.createFromFile(doc, './my-qr-code.png');

        element = await builder.createImageScaled(img, 300, 600, 200, -150);
        writer.writeElement(element);
        writer.writeElement(await builder.createTextEnd());

        writer.end(); // save changes to the current page
        doc.pageRemove(await doc.getPageIterator(1));
        doc.pagePushBack(page1);



        await doc.save('mm.pdf', PDFNet.SDFDoc.SaveOptions.e_remove_unused);
        const doc2 = await PDFNet.PDFDoc.createFromFilePath('mm.pdf');
        const page = await doc.getPage(1);
   
        

            /////////////////////////////////////////
        const doc1= await PDFNet.PDFDoc.createFromFilePath('jj.pdf');
        doc1.initSecurityHandler();
       console.log('==========');
  const optss = await PDFNet.VerificationOptions.create(PDFNet.VerificationOptions.SecurityLevel.e_compatibility_and_archiving);

  // Add trust root to store of trusted certificates contained in VerificationOptions.
  await optss.addTrustedCertificateUString('certificatea.pfx');

  const result = await doc1.verifySignedDigitalSignatures(optss);
  console.log(result);
////////////////////////////////////////////////////////////////

        process.exit(1);


    } catch (err) {
        console.log('error', err)
    }
}

PDFNet.runWithCleanup(main, 'demo:omaralami230@gmail.com:7b01f4ab020000000092768e068e8737e8b8c939452e7892e0470df170');






