import * as CryptoJS from 'crypto-js';
import * as  PDFNet  from '@pdftron/pdfnet-node';
import {initialize} from '@pdftron/pdfnet-node';
import { exit } from 'process';
import * as qr from 'qr-image';

class DocumentSV {
  public statu: number;

    // ---------------- Preparation --------------------
    // Récuperer le document dont on veut signer
    constructor() {
        this.statu = 0;

    }
    async init(){
      console.log('sssssssssss');
      //await new Promise(resolve => setTimeout(resolve, 36000));
      const license : string  = 'demo:omaralami230@gmail.com:7b01f4ab020000000092768e068e8737e8b8c939452e7892e0470df170';

      await initialize(license);
     }

    asyncSign = async function() {
      const docpath : string = 'src/app/Document/CV.pdf';
      const pfxpath : string = 'src/app/Document/certificatea.pfx';


      const doc = await PDFNet.PDFDoc.createFromFilePath(docpath);

     const page1 = await doc.getPage(1);

      const builder = await PDFNet.ElementBuilder.create();


            // Writer est le responsable d'ajouter du texte,d'image,... à un block de builder
            const writer = await PDFNet.ElementWriter.create();


            /*---------------- Ajout d'une E-Signature --------------------*/

            const certification_sig_field =  await doc.createDigitalSignatureField('Certificate');

            await certification_sig_field.setDocumentPermissions(PDFNet.DigitalSignatureField.DocumentPermissions.e_annotating_formfilling_signing_allowed);
            const widgetAnnot = await PDFNet.SignatureWidget.createWithDigitalSignatureField(doc, new PDFNet.Rect(parseFloat((await page1.getPageWidth()).toString()) - 200, parseFloat((await page1.getPageHeight()).toString()) - 750, parseFloat((await page1.getPageWidth()).toString()) - 30, parseFloat((await page1.getPageHeight()).toString()) - 800), certification_sig_field);

            await page1.annotPushBack(widgetAnnot);
            const fields_to_lock = ['asdf_test_field'];


            await certification_sig_field.setFieldPermissions(PDFNet.DigitalSignatureField.FieldPermissions.e_include, fields_to_lock);

            await certification_sig_field.certifyOnNextSave(pfxpath, 'ahmedahmed');

            // Ajouter les Permissions à la signature
            await writer.beginOnPage(page1);

             let element = await builder.createTextBeginWithFont(await PDFNet.Font.create(doc, PDFNet.Font.StandardType1Font.e_times_roman), 20);
            await writer.writeElement(element);
            element = await builder.createNewTextRun('');
            await element.setTextMatrixEntries(0.5, 0, 0, 0.5, parseFloat(((await page1).getPageWidth()).toString()) - 190, parseFloat(((await page1).getPageHeight()).toString()) - 760);
            await writer.writeElement(element);

            // const optionss = {
            //     errorCorrectionLevel: 'H',
            //     type: 'png',
            //     quality: 0.9,
            //     margin: 0,
            //     color: {
            //         dark: "#010599FF",
            //         light: "#FFBF60FF"
            //     }
            // }
            const qr_svg =  qr.imageSync("omar");
            const signatureDate = await certification_sig_field.getSigningTime();
            element = await builder.createNewTextRun(`Date: ${(signatureDate).year}/${(signatureDate).month}/${(signatureDate).day} at ${(signatureDate).hour}:${( signatureDate).minute}:${(signatureDate).second}`);

            // element.setPosAdjustment(15);
            await element.setTextMatrixEntries(0.5, 0, 0, 0.5,  parseFloat((await page1.getPageWidth()).toString()) - 190, parseFloat((await page1.getPageHeight()).toString()) - 775);


            await writer.writeElement(element);


            const img = await PDFNet.Image.createFromMemory(doc,qr_svg,100,100,1,new PDFNet.ColorSpace());
            element = await builder.createImageScaled( img, 300, 600, 200, -150);
            await writer.writeElement(element);
            await writer.writeElement(await builder.createTextEnd());

            await writer.end(); // save changes to the current page
            await doc.pageRemove(await doc.getPageIterator(1));
            await doc.pagePushBack( page1);


            await doc.save('src/app/Document/Signed.pdf', PDFNet.SDFDoc.SaveOptions.e_remove_unused);

            return;

          }
        // Récuperer la page dont on veut signer

    // creer le builder qui va ajouter des blocks à la page


    ///////////////////////////////

    ///////////////////////////////////////
    public async verify(in_docpath : string) {

      try {



        // let in_public_key_file_path = pfxpath;
        let doc1 = await PDFNet.PDFDoc.createFromFilePath(in_docpath);
        await doc1.initSecurityHandler();
        const opts = await PDFNet.VerificationOptions.create(PDFNet.VerificationOptions.SecurityLevel.e_compatibility_and_archiving);
        // await opts.addTrustedCertificateUString(in_public_key_file_path, PDFNet.VerificationOptions.CertificateTrustFlag.e_default_trust + PDFNet.VerificationOptions.CertificateTrustFlag.e_certification_trust);

        const digsig_fitr = await doc1.getDigitalSignatureFieldIteratorBegin();

        var verification_status = true;
        if( !(await doc1.hasSignatures())){
          this.statu = 1;
        }
        else{

        for (; await digsig_fitr.hasNext(); await digsig_fitr.next()) {

            let curr = await digsig_fitr.current();
            let result = await curr.verify( opts);
//  modified is not in the blockchain, wrong digest
           if ((!((await result.getDigestStatus()) == 1)) && (!((await result.getDigestStatus()) == 3))){
            this.statu  = 2;
           }
           else if((await result.getPermissionsStatus()) != 2){
            this.statu = 3;
            }


        }
      }

      return this.statu;


      } catch (err) {

        return this.statu;
    }
  }
  public asyncHash = async function(in_docpath: string){
    const license : string  = 'demo:omaralami230@gmail.com:7b01f4ab020000000092768e068e8737e8b8c939452e7892e0470df170';
    await PDFNet.initialize(license);



    const doc = await PDFNet.PDFDoc.createFromFilePath(in_docpath);
    let a = await Buffer.from(await doc.saveMemoryBuffer(PDFNet.SDFDoc.SaveOptions.e_hex_strings));
      PDFNet.shutdown();
    return await (await CryptoJS.SHA256('a')).toString();
  }


    ////////////////////////////////////////////////////////////////

}

const _DocumentSV = DocumentSV;
export { _DocumentSV as DocumentSV };
