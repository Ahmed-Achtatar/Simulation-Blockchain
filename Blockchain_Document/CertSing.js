//---------------------------------------------------------------------------------------
// Copyright (c) 2001-2021 by PDFTron Systems Inc. All Rights Reserved.
// Consult legal.txt regarding legal and license information.
//---------------------------------------------------------------------------------------


const { PDFNet } = require('@pdftron/pdfnet-node');
const { X509Certificate } = require('crypto');
var qr = require('qr-image');



let data = "google.com";
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
        // le rectangle qui positionne le block du builder
        // const pageRect = await PDFNet.Rect.init();

        // ---------------- Ajout d'une E-Signature --------------------
        // Creation du signature digital par un certificat et nommer son champ
        // let a = await PDFNet.X509Certificate.createFromFile('certificatea.pfx');
        // a.getSubjectField();
        const certification_sig_field = await doc.createDigitalSignatureField('certificate.crt');


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
        console.log('ss' + await certification_sig_field.getContactInfo());
        element = await builder.createNewTextRun('Signes par: ' + (await certification_sig_field.getCert.name));
        element.setTextMatrixEntries(0.5, 0, 0, 0.5, parseFloat((await page1.getPageWidth()).toString()) - 190, parseFloat((await page1.getPageHeight()).toString()) - 760);

        writer.writeElement(element);
        var qr_svg = await getqr.image('I love QR!', { type: 'svg' });

        element = await builder.createImage(qr_svg);
        // element.setTextMatrixEntries(0.5, 0, 0, 0.5, parseFloat((await page1.getPageWidth()).toString()) - 190, parseFloat((await page1.getPageHeight()).toString()) - 790);



        writer.writeElement(element);
        // writer.writeElement(await builder.createTextNewLine());
        writer.writeElement(await builder.createTextEnd());


        const signatureDate = await certification_sig_field.getSigningTime();
        console.log('ss' + await certification_sig_field.getSignatureName());
        element = await builder.createNewTextRun('Date: ' + signatureDate.year + '/' + signatureDate.month + '/' + signatureDate.day + ' at ' + signatureDate.hour + ':' + signatureDate.minute + ':' + signatureDate.second);
        // element.setPosAdjustment(15);
        element.setTextMatrixEntries(0.5, 0, 0, 0.5, parseFloat((await page1.getPageWidth()).toString()) - 190, parseFloat((await page1.getPageHeight()).toString()) - 775);

        writer.writeElement(element);
        writer.end(); // save changes to the current page
        doc.pageRemove(await doc.getPageIterator(1));
        doc.pagePushBack(page1);
        await doc.save('mm.pdf', PDFNet.SDFDoc.SaveOptions.e_remove_unused);


        process.exit(1);


    } catch (err) {
        console.log('error', err)
    }


}

PDFNet.runWithCleanup(main, 'demo:omaralami230@gmail.com:7b01f4ab020000000092768e068e8737e8b8c939452e7892e0470df170');
