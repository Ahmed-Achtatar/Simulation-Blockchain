<?php


header('Access-Control-Allow-Headers: Access-Control-Allow-Origin, Content-Type');
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json, charset=utf-8');


require '../../../../vendor/autoload.php';
require_once("../../../../vendor/phpqrcode/qrlib.php");

use setasign\Fpdi\Tcpdf\Fpdi;
if($_FILES){

  $pdf = new TCPDI(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);
  $target_dir = "uploaded/";
  $target_file = $target_dir . basename($_FILES["myPDF"]["name"]);
  move_uploaded_file($_FILES["myPDF"]["tmp_name"], $target_file);

  //Merging of the existing PDF pages to the final PDF
  $pageCount = $pdf->setSourceFile($target_file);
  for ($i = 1; $i <= $pageCount; $i++) {
      $tplIdx = $pdf->importPage($i, '/MediaBox');
      $pdf->AddPage();
      $pdf->useTemplate($tplIdx);
  }
  $linktoblock = "";


  // $pdf->Output('example_052.pdf', 'D');

  // -----------------------

  // create new PDF document

// $pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

// // set document information
// $pdf->SetCreator(PDF_CREATOR);
// $pdf->SetAuthor('Nicola Asuni');
// $pdf->SetTitle('TCPDF Example 052');
// $pdf->SetSubject('TCPDF Tutorial');
// $pdf->SetKeywords('TCPDF, PDF, example, test, guide');

// // set default header data
// $pdf->SetHeaderData(PDF_HEADER_LOGO, PDF_HEADER_LOGO_WIDTH, PDF_HEADER_TITLE.' 052', PDF_HEADER_STRING);

// // set header and footer fonts
// $pdf->setHeaderFont(Array(PDF_FONT_NAME_MAIN, '', PDF_FONT_SIZE_MAIN));
// $pdf->setFooterFont(Array(PDF_FONT_NAME_DATA, '', PDF_FONT_SIZE_DATA));

// // set default monospaced font
// $pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);

// // set margins
// $pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_TOP, PDF_MARGIN_RIGHT);
// $pdf->SetHeaderMargin(PDF_MARGIN_HEADER);
// $pdf->SetFooterMargin(PDF_MARGIN_FOOTER);

// // set auto page breaks
// $pdf->SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);

// // set image scale factor
// $pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);

// // set some language-dependent strings (optional)
// if (@file_exists(dirname(__FILE__).'/lang/eng.php')) {
//     require_once(dirname(__FILE__).'/lang/eng.php');
//     $pdf->setLanguageArray($l);
// }

// // ---------------------------------------------------------

// /*
// NOTES:
//  - To create self-signed signature: openssl req -x509 -nodes -days 365000 -newkey rsa:1024 -keyout tcpdf.crt -out tcpdf.crt
//  - To export crt to p12: openssl pkcs12 -export -in tcpdf.crt -out tcpdf.p12
//  - To convert pfx certificate to pem: openssl pkcs12 -in tcpdf.pfx -out tcpdf.crt -nodes
// */

// set certificate file
$certificate = 'file://'.realpath('./certificate.crt');
  $prkey = 'file://'.realpath('./private.key');

// set additional information
$info = array(
    'Name' => 'PFE',
    'Location' => 'Fl9hwa',
    'Reason' => 'Testing PFE',
    'ContactInfo' => 'http://www.madot.ma',
    );

// set document signature
$pdf->setSignature($certificate, $prkey, 'ahmedahmed', '', 2, $info);


// // set font
// $pdf->SetFont('helvetica', '', 12);

// // add a page
// $pdf->AddPage();

// // print a line of text
// $text = 'This is a <b color="#FF0000">digitally signed document</b> using the default (example) <b>tcpdf.crt</b> certificate.<br />To validate this signature you have to load the <b color="#006600">tcpdf.fdf</b> on the Arobat Reader to add the certificate to <i>List of Trusted Identities</i>.<br /><br />For more information check the source code of this example and the source code documentation for the <i>setSignature()</i> method.<br /><br /><a href="http://www.tcpdf.org">www.tcpdf.org</a>';
// $pdf->writeHTML($text, true, false, true, false,'');

// // // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// // // *** set signature appearance ***

// create content for signature (image and/or text)
QRcode::png("coded number here","test.png");
$pdf->Image('test.png', 180, 60, 15, 15, 'PNG');
$pdf->Image('images/tcpdf_signature.png', 200, 50, 15, 15, 'PNG');


// define active area for signature appearance
$pdf->setSignatureAppearance(180, 60, 15, 15);

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// *** set an empty signature appearance ***
$pdf->addEmptySignatureAppearance(180, 80, 15, 15);

// ---------------------------------------------------------
//Close and output PDF document
$pdf->Output(__DIR__ ."/uploaded/etest.pdf", 'F');

}

?>
