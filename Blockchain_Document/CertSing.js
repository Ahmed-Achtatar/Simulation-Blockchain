//---------------------------------------------------------------------------------------
// Copyright (c) 2001-2021 by PDFTron Systems Inc. All Rights Reserved.
// Consult legal.txt regarding legal and license information.
//---------------------------------------------------------------------------------------


const { PDFNet } = require('@pdftron/pdfnet-node');
const { X509Certificate } = require('crypto');
const fs = require("fs");


var pem = require('pem');
const { pki } = require('node-forge');
var qr = require('qr-image');
const { toFileStream } = require('qrcode');
const { last, first } = require('rxjs');



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

        /*---------------- Ajout d'une E-Signature --------------------*/

        // Creation du signature digital par un certificat et nommer son champ
        let a = await PDFNet.X509Certificate.createFromFile('certificate.crt');
        let issuer = await (await (await a.getIssuerField()).getAllAttributesAndValues()).at(2).getAttributeTypeOID();
        let issuer1 = (await (await a.getIssuerField()).getStringValuesForAttribute(issuer)).at(0);
        console.log();
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

        // var cert = pki.createCaStore();

        // console.log(cert.getIssuer);
        // let a;
        // qr.toDataURL('aaa', function(err, url) {
        //     a = url;
        // });
        // const pfx = fs.readFileSync(__dirname + "/certificatea.pfx");
        // let a = new pem.Pkcs12ReadResult;
        // await pem.readPkcs12(pfx, { p12Password: "ahmedahmed" }, (err, cert) => {
        //     a = cert;
        // });
        // console.log(a);
        // element = await builder.createImage(a);
        // element.setTextMatrixEntries(0.5, 0, 0, 0.5, parseFloat((await page1.getPageWidth()).toString()) - 190, parseFloat((await page1.getPageHeight()).toString()) - 790);


        const qr_svg = qr.imageSync("omar", { type: 'png' });

        console.log(qr_svg);
        // toFileStream(qr_svg);
        // const qr_str = 'data:image/png;base64,' + qr_svg.toString('base64');
        // element = await builder.;
        // element.setTextMatrixEntries(0.5, 0, 0, 0.5, parseFloat((await page1.getPageWidth()).toString()) - 190, parseFloat((await page1.getPageHeight()).toString()) - 775);

        // writer.writeElement(element);
        // writer.writeElement(await builder.createTextNewLine());



        const signatureDate = await certification_sig_field.getSigningTime();
        console.log('ss' + await certification_sig_field.getSignatureName());
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



        // console.log(await);

        process.exit(1);


    } catch (err) {
        console.log('error', err)
    }
}

PDFNet.runWithCleanup(main, 'demo:omaralami230@gmail.com:7b01f4ab020000000092768e068e8737e8b8c939452e7892e0470df170');
