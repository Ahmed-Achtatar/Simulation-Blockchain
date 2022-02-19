//---------------------------------------------------------------------------------------
// Copyright (c) 2001-2021 by PDFTron Systems Inc. All Rights Reserved.
// Consult legal.txt regarding legal and license information.
//---------------------------------------------------------------------------------------


const { PDFNet } = require('@pdftron/pdfnet-node');

async function main() {
    try {
        const doc = await PDFNet.PDFDoc.createFromFilePath('CV.pdf');

        const page1 = await doc.getPage(1);

        // Create a text field that we can lock using the field permissions feature.
        // ElementBuilder is used to build new Element objects
        const builder = await PDFNet.ElementBuilder.create();
        // ElementWriter is used to write Elements to the page
        const writer = await PDFNet.ElementWriter.create();
        const pageRect = await PDFNet.Rect.init(200, 200, 612, 794);
        let page = await doc.pageCreate(pageRect);
        writer.beginOnPage(page1);
        let element = await builder.createTextBeginWithFont(await PDFNet.Font.create(doc, PDFNet.Font.StandardType1Font.e_times_roman), 12);
        writer.writeElement(element);

        element = await builder.createNewTextRun('Hello World! qosihoihofhzaouhzoufhoauzhfouafh');
        // element.setTextMatrixEntries(10, 0, 0, 10, 0, 600);
        let gstate = await element.getGState();
        // Set the spacing between lines
        gstate.setLeading(15);
        writer.writeElement(element);
        writer.writeElement(await builder.createTextNewLine());
        writer.writeElement(await builder.createTextEnd());

        writer.end(); // save changes to the current page
        doc.pagePushBack(page1);
        // const a = await doc.getPageIterator();
        // doc.pageRemove(a);

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
        console.log(parseFloat((await page1.getPageHeight()).toString()) + (new PDFNet.ColorPt(200, 100, 50, 1)).toString + '    ' + (await page1.getPageHeight()).toString());
        const widgetAnnot = await PDFNet.SignatureWidget.createWithDigitalSignatureField(doc, new PDFNet.Rect(parseFloat((await page1.getPageWidth()).toString()) - 200, parseFloat((await page1.getPageHeight()).toString()) - 750, parseFloat((await page1.getPageWidth()).toString()) - 30, parseFloat((await page1.getPageHeight()).toString()) - 780), certification_sig_field);
        const redColor = await PDFNet.ColorPt.init(1, 0, 0);
        // await widgetAnnot.setBackgroundColor(redColor, 1);
        // widgetAnnot.setContents("aaa");
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


        await doc.save('mm.pdf', PDFNet.SDFDoc.SaveOptions.e_remove_unused);


        process.exit(1);


    } catch (err) {
        console.log('error', err)
    }


}

PDFNet.runWithCleanup(main, 'demo:omaralami230@gmail.com:7b01f4ab020000000092768e068e8737e8b8c939452e7892e0470df170');
