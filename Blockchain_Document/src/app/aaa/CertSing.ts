
import { PDFNet } from '@pdftron/pdfnet-node';
import * as fs from "fs";
import { exit } from 'process';
var qr = require('qr-image');

class DocumentSign {
	public docpath: string;
	public certificate: string;
	public timestamp: any;
    // ---------------- Preparation --------------------
    // Récuperer le document dont on veut signer
    constructor(docpath : string, certificate : string) {
        this.docpath = docpath;
        this.certificate = certificate;
        this.timestamp = Date.now();

    }
    async Sign() {
      try {

      await PDFNet.initialize('demo:omaralami230@gmail.com:7b01f4ab020000000092768e068e8737e8b8c939452e7892e0470df170');
      const doc = await PDFNet.PDFDoc.createFromFilePath(this.docpath);

     const page1 = await doc.getPage(1);

      const builder = await PDFNet.ElementBuilder.create();
      console.log('builder' + builder);
            // Writer est le responsable d'ajouter du texte,d'image,... à un block de builder
            const writer = await PDFNet.ElementWriter.create();
            console.log('writer' + writer);

            /*---------------- Ajout d'une E-Signature --------------------*/

            const certification_sig_field =  await doc.createDigitalSignatureField('Certificate');
            console.log('field' + certification_sig_field);
            await certification_sig_field.setDocumentPermissions(PDFNet.DigitalSignatureField.DocumentPermissions.e_annotating_formfilling_signing_allowed);
            const widgetAnnot = await PDFNet.SignatureWidget.createWithDigitalSignatureField(doc, new PDFNet.Rect(parseFloat((await page1.getPageWidth()).toString()) - 200, parseFloat((await page1.getPageHeight()).toString()) - 750, parseFloat((await page1.getPageWidth()).toString()) - 30, parseFloat((await page1.getPageHeight()).toString()) - 800), certification_sig_field);
            console.log('widg' + widgetAnnot);
            await page1.annotPushBack(widgetAnnot);
            const fields_to_lock = ['asdf_test_field'];
            console.log('fdlock' + fields_to_lock);

            await certification_sig_field.setFieldPermissions(PDFNet.DigitalSignatureField.FieldPermissions.e_include, fields_to_lock);

            await certification_sig_field.certifyOnNextSave(this.certificate, 'ahmedahmed');

            // Ajouter les Permissions à la signature
            await writer.beginOnPage(page1);
            console.log('doc' + doc);
            console.log('page' + page1);
             let element = await builder.createTextBeginWithFont(await PDFNet.Font.create(doc, PDFNet.Font.StandardType1Font.e_times_roman), 20);
            await writer.writeElement(element);
            element = await builder.createNewTextRun('');
            await element.setTextMatrixEntries(0.5, 0, 0, 0.5, parseFloat(((await page1).getPageWidth()).toString()) - 190, parseFloat(((await page1).getPageHeight()).toString()) - 760);
            await writer.writeElement(element);

            const options = {
                errorCorrectionLevel: 'H',
                type: 'png',
                quality: 0.9,
                margin: 0,
                color: {
                    dark: "#010599FF",
                    light: "#FFBF60FF"
                }
            }
            const qr_svg = await qr.imageSync("omar", options);
            const signatureDate = await certification_sig_field.getSigningTime();
            element = await builder.createNewTextRun(`Date: ${(signatureDate).year}/${(signatureDate).month}/${(signatureDate).day} at ${(signatureDate).hour}:${( signatureDate).minute}:${(signatureDate).second}`);

            // element.setPosAdjustment(15);
            await element.setTextMatrixEntries(0.5, 0, 0, 0.5,  parseFloat((await page1.getPageWidth()).toString()) - 190, parseFloat((await page1.getPageHeight()).toString()) - 775);


            await writer.writeElement(element);
            console.log(this.certificate);
            fs.writeFileSync('my-qr-code.png', qr_svg);
            const img = await PDFNet.Image.createFromFile(doc, 'my-qr-code.png');
            element = await builder.createImageScaled( img, 300, 600, 200, -150);
            await writer.writeElement(element);
            await writer.writeElement(await builder.createTextEnd());
            console.log(this.certificate);
            await writer.end(); // save changes to the current page
            await doc.pageRemove(await doc.getPageIterator(1));
            await doc.pagePushBack( page1);


            await doc.save('src/app/aaa/mm.pdf', PDFNet.SDFDoc.SaveOptions.e_remove_unused);
            exit(1);

          } catch (err) {
            console.log('error', err)
        }
          }
        // Récuperer la page dont on veut signer

    // creer le builder qui va ajouter des blocks à la page


    ///////////////////////////////

    ///////////////////////////////////////
    public async verify() {
      try {
        let isValid : number;
        await PDFNet.initialize('demo:omaralami230@gmail.com:7b01f4ab020000000092768e068e8737e8b8c939452e7892e0470df170');
        let in_docpath = 'CV.pdf';
        let in_public_key_file_path = this.certificate;
        let doc1 = await PDFNet.PDFDoc.createFromFilePath(in_docpath);
        doc1.initSecurityHandler();
        const opts = await PDFNet.VerificationOptions.create(PDFNet.VerificationOptions.SecurityLevel.e_compatibility_and_archiving);
        await opts.addTrustedCertificateUString(in_public_key_file_path, PDFNet.VerificationOptions.CertificateTrustFlag.e_default_trust + PDFNet.VerificationOptions.CertificateTrustFlag.e_certification_trust);
        // Add trust root to store of trusted certificates contained in VerificationOptions.
        const digsig_fitr = doc1.getDigitalSignatureFieldIteratorBegin();
        console.log(digsig_fitr);
        var verification_status = true;
        for (; await (await digsig_fitr).hasNext(); await (await digsig_fitr).next()) {
            let curr = await (await digsig_fitr).current();
            let result = await curr.verify( opts);
            if (await result.getVerificationStatus()) {
                console.log('Signature verified, objnum: ' + await (await curr.getSDFObj()).getObjNum());
            } else {
                console.log('Signature verification failed, objnum: ' + await (await curr.getSDFObj()).getObjNum());
                verification_status = false;
            }

            // switch (await result.getDigestAlgorithm()) {
            //     case PDFNet.DigestAlgorithm.Type.e_SHA1:
            //         console.log('Digest algorithm: SHA-1');
            //         break;
            //     case PDFNet.DigestAlgorithm.Type.e_SHA256:
            //         console.log('Digest algorithm: SHA-256');
            //         break;
            //     case PDFNet.DigestAlgorithm.Type.e_SHA384:
            //         console.log('Digest algorithm: SHA-384');
            //         break;
            //     case PDFNet.DigestAlgorithm.Type.e_SHA512:
            //         console.log('Digest algorithm: SHA-512');
            //         break;
            //     case PDFNet.DigestAlgorithm.Type.e_RIPEMD160:
            //         console.log('Digest algorithm: RIPEMD-160');
            //         break;
            //     case PDFNet.DigestAlgorithm.Type.e_unknown_digest_algorithm:
            //         console.log('Digest algorithm: unknown');
            //         break;
            // }
            if (await result.hasTrustVerificationResult()){
              console.log('Detailed verification result: \n\t' +
            await result.getDocumentStatusAsString() + '\n\t' +
            await result.getDigestStatusAsString() + '\n\t' +
            await result.getPermissionsStatusAsString());
            }


            let changes = await result.getDisallowedChanges();
            for (var i = 0; i < changes.length; ++i) {
                let change = changes[i];
                console.log('\tDisallowed change: ' + change.getTypeAsString() + ', objnum: ' + change.getObjNum());
            }

            // Get and print all the detailed trust-related results, if they are available.
            // if (await result.hasTrustVerificationResult()) {
            //     let trust_verification_result = await  result.getTrustVerificationResult();
            //     console.log(await trust_verification_result.wasSuccessful() ? 'Trust verified.' : 'Trust not verifiable.');
            //     console.log(await trust_verification_result.getResultString());

            //     let tmp_time_t = await trust_verification_result.getTimeOfTrustVerification();
            //     switch (await trust_verification_result.getTimeOfTrustVerificationEnum()) {
            //         case PDFNet.VerificationOptions.TimeMode.e_current:
            //             console.log('Trust verification attempted with respect to current time (as epoch time):' + tmp_time_t);
            //             break;
            //         case PDFNet.VerificationOptions.TimeMode.e_signing:
            //             console.log('Trust verification attempted with respect to signing time (as epoch time): ' + tmp_time_t);
            //             break;
            //         case PDFNet.VerificationOptions.TimeMode.e_timestamp:
            //             console.log('Trust verification attempted with respect to secure embedded timestamp (as epoch time): ' + tmp_time_t);
            //             break;
            //     }

                // let cert_path = await trust_verification_result.getCertPath();
                // if (cert_path.length == 0) {
                //     console.log('Could not print certificate path.');
                // } else {
                //     console.log('Certificate path:');
                //     for (var i = 0; i < cert_path.length; i++) {
                //         console.log('\tCertificate:');
                //         let full_cert = cert_path[i];
                //         console.log('\t\tIssuer names:');
                //         let issuer_dn = await (await full_cert.getIssuerField()).getAllAttributesAndValues();
                //         for (var j = 0; j < issuer_dn.length; j++) {
                //             console.log('\t\t\t' + issuer_dn[j].getStringValue());
                //         }
                //         console.log('\t\tSubject names:');
                //         let subject_dn = await (await full_cert.getSubjectField()).getAllAttributesAndValues();
                //         for (var j = 0; j < subject_dn.length; j++) {
                //             console.log('\t\t\t' + await subject_dn[j].getStringValue());
                //         }
                //         console.log('\t\tExtensions:');
                //         let extension_dn = await full_cert.getExtensions();
                //         for (var j = 0; j < extension_dn.length; j++) {
                //             console.log('\t\t\t' + await extension_dn[j].toString());
                //         }
                //     }
                // }

            console.log(result);

        }
        exit(1);
      } catch (err) {
        console.log('error', err);
    } }


    ////////////////////////////////////////////////////////////////

}

let a = new DocumentSign('./CV.pdf','./certificatea.pfx');
a.Sign();
a.verify();

