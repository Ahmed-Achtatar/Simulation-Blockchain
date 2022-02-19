//---------------------------------------------------------------------------------------
// Copyright (c) 2001-2021 by PDFTron Systems Inc. All Rights Reserved.
// Consult legal.txt regarding legal and license information.
//---------------------------------------------------------------------------------------


const { PDFNet } = require('@pdftron/pdfnet-node');

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
        const certification_sig_field = await doc.createDigitalSignatureField('yourCertificate.pfx');
        // Ajouter les Permissions à la signature
        writer.beginOnPage(page1);
        let element = await builder.createTextBeginWithFont(await PDFNet.Font.create(doc, PDFNet.Font.StandardType1Font.e_times_roman), 20);
        writer.writeElement(element);

        element = await builder.createNewTextRun('Signes par: ');
        element.setTextMatrixEntries(0.5, 0, 0, 0.5, parseFloat((await page1.getPageWidth()).toString()) - 190, parseFloat((await page1.getPageHeight()).toString()) - 760);

        writer.writeElement(element);
        element = await builder.createNewTextRun('Date de Signature: ' + certification_sig_field.getSigningTime);
        // element.setPosAdjustment(15);
        element.setTextMatrixEntries(0.5, 0, 0, 0.5, parseFloat((await page1.getPageWidth()).toString()) - 190, parseFloat((await page1.getPageHeight()).toString()) - 775);

        // let gstate = await element.getGState();
        // Set the spacing between lines

        // gstate.setLeading(15);
        // gstate.setTransform(0.5, 0, 0, 0.5, 280, 0);
        writer.writeElement(element);

        // writer.writeElement(await builder.createTextNewLine());
        writer.writeElement(await builder.createTextEnd());

        writer.end(); // save changes to the current page
        doc.pageRemove(await doc.getPageIterator(1));
        doc.pagePushBack(page1);

        await certification_sig_field.setDocumentPermissions(PDFNet.DigitalSignatureField.DocumentPermissions.e_annotating_formfilling_signing_allowed);
        const widgetAnnot = await PDFNet.SignatureWidget.createWithDigitalSignatureField(doc, new PDFNet.Rect(parseFloat((await page1.getPageWidth()).toString()) - 200, parseFloat((await page1.getPageHeight()).toString()) - 750, parseFloat((await page1.getPageWidth()).toString()) - 30, parseFloat((await page1.getPageHeight()).toString()) - 800), certification_sig_field);
        await page1.annotPushBack(widgetAnnot);
        var fields_to_lock = ['asdf_test_field'];
        await certification_sig_field.setFieldPermissions(PDFNet.DigitalSignatureField.FieldPermissions.e_include, fields_to_lock);

        await certification_sig_field.certifyOnNextSave('yourCertificate.pfx', '19omaromar0');
        console.log("Signature's signer: " + await certification_sig_field.getSignatureName());
        await doc.save('mm.pdf', PDFNet.SDFDoc.SaveOptions.e_remove_unused);


        process.exit(1);


    } catch (err) {
        console.log('error', err)
    }


}

PDFNet.runWithCleanup(main, 'demo:omaralami230@gmail.com:7b01f4ab020000000092768e068e8737e8b8c939452e7892e0470df170');
