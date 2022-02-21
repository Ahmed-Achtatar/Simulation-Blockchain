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

        var options = {
            errorCorrectionLevel: 'H',
            type: 'png',
            quality: 0.9,
            margin: 0,
            color: {
                dark: "#010599FF",
                light: "#FFBF60FF"
            }
        }
        const qr_svg = qr.imageSync("omar", options);

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


        ///////////////////////////////

        /////////////////////////////////////////
        let in_docpath = 'mm.pdf';
        in_public_key_file_path = 'certificatea.pfx';
        const doc1 = await PDFNet.PDFDoc.createFromFilePath(in_docpath);
        doc1.initSecurityHandler();
        console.log('==========');
        const opts = await PDFNet.VerificationOptions.create(PDFNet.VerificationOptions.SecurityLevel.e_compatibility_and_archiving);
        await opts.addTrustedCertificateUString(in_public_key_file_path, PDFNet.VerificationOptions.CertificateTrustFlag.e_default_trust + PDFNet.VerificationOptions.CertificateTrustFlag.e_certification_trust);
        // Add trust root to store of trusted certificates contained in VerificationOptions.
        const digsig_fitr = await doc1.getDigitalSignatureFieldIteratorBegin();
        console.log(digsig_fitr);
        var verification_status = true;
        for (; await digsig_fitr.hasNext(); await digsig_fitr.next()) {
            const curr = await digsig_fitr.current();
            const result = await curr.verify(opts);
            if (await result.getVerificationStatus()) {
                console.log('Signature verified, objnum: ' + await (await curr.getSDFObj()).getObjNum());
            } else {
                console.log('Signature verification failed, objnum: ' + await (await curr.getSDFObj()).getObjNum());
                verification_status = false;
            }

            switch (await result.getDigestAlgorithm()) {
                case PDFNet.DigestAlgorithm.Type.e_SHA1:
                    console.log('Digest algorithm: SHA-1');
                    break;
                case PDFNet.DigestAlgorithm.Type.e_SHA256:
                    console.log('Digest algorithm: SHA-256');
                    break;
                case PDFNet.DigestAlgorithm.Type.e_SHA384:
                    console.log('Digest algorithm: SHA-384');
                    break;
                case PDFNet.DigestAlgorithm.Type.e_SHA512:
                    console.log('Digest algorithm: SHA-512');
                    break;
                case PDFNet.DigestAlgorithm.Type.e_RIPEMD160:
                    console.log('Digest algorithm: RIPEMD-160');
                    break;
                case PDFNet.DigestAlgorithm.Type.e_unknown_digest_algorithm:
                    console.log('Digest algorithm: unknown');
                    break;
            }

            console.log('Detailed verification result: \n\t' +
                await result.getDocumentStatusAsString() + '\n\t' +
                await result.getDigestStatusAsString() + '\n\t' +
                await result.getTrustStatusAsString() + '\n\t' +
                await result.getPermissionsStatusAsString());

            const changes = await result.getDisallowedChanges();
            for (var i = 0; i < changes.length; ++i) {
                const change = changes[i];
                console.log('\tDisallowed change: ' + await change.getTypeAsString() + ', objnum: ' + await change.getObjNum());
            }

            // Get and print all the detailed trust-related results, if they are available.
            if (await result.hasTrustVerificationResult()) {
                const trust_verification_result = await result.getTrustVerificationResult();
                console.log(await trust_verification_result.wasSuccessful() ? 'Trust verified.' : 'Trust not verifiable.');
                console.log(await trust_verification_result.getResultString());

                const tmp_time_t = await trust_verification_result.getTimeOfTrustVerification();
                switch (await trust_verification_result.getTimeOfTrustVerificationEnum()) {
                    case PDFNet.VerificationOptions.TimeMode.e_current:
                        console.log('Trust verification attempted with respect to current time (as epoch time):' + tmp_time_t);
                        break;
                    case PDFNet.VerificationOptions.TimeMode.e_signing:
                        console.log('Trust verification attempted with respect to signing time (as epoch time): ' + tmp_time_t);
                        break;
                    case PDFNet.VerificationOptions.TimeMode.e_timestamp:
                        console.log('Trust verification attempted with respect to secure embedded timestamp (as epoch time): ' + tmp_time_t);
                        break;
                }

                const cert_path = await trust_verification_result.getCertPath();
                if (cert_path.length == 0) {
                    console.log('Could not print certificate path.');
                } else {
                    console.log('Certificate path:');
                    for (var i = 0; i < cert_path.length; i++) {
                        console.log('\tCertificate:');
                        const full_cert = cert_path[i];
                        console.log('\t\tIssuer names:');
                        const issuer_dn = await (await full_cert.getIssuerField()).getAllAttributesAndValues();
                        for (var j = 0; j < issuer_dn.length; j++) {
                            console.log('\t\t\t' + await issuer_dn[j].getStringValue());
                        }
                        console.log('\t\tSubject names:');
                        const subject_dn = await (await full_cert.getSubjectField()).getAllAttributesAndValues();
                        for (var j = 0; j < subject_dn.length; j++) {
                            console.log('\t\t\t' + await subject_dn[j].getStringValue());
                        }
                        console.log('\t\tExtensions:');
                        const extension_dn = await full_cert.getExtensions();
                        for (var j = 0; j < extension_dn.length; j++) {
                            console.log('\t\t\t' + await extension_dn[j].toString());
                        }
                    }
                }
            }
            console.log(result);
        }

        ////////////////////////////////////////////////////////////////

        process.exit(1);


    } catch (err) {
        console.log('error', err)
    }
}

PDFNet.runWithCleanup(main, 'demo:omaralami230@gmail.com:7b01f4ab020000000092768e068e8737e8b8c939452e7892e0470df170');
