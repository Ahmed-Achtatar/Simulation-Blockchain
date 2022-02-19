import signer from 'node-signpdf';
import { SUBFILTER_ETSI_CADES_DETACHED, pdfkitAddPlaceholder } from 'node-signpdf';

const signedPdf = signer.sign(
    fs.readFileSync(PATH_TO_PDF_FILE),
    fs.readFileSync(PATH_TO_P12_CERTIFICATE),
);


const pdfToSign = pdfkitAddPlaceholder({
    subFilter: SUBFILTER_ETSI_CADES_DETACHED,
});
