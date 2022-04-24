<?php

header('Access-Control-Allow-Headers: Access-Control-Allow-Origin, Content-Type');
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json, charset=utf-8');

require '../../../vendor/autoload.php';
require_once("../../../vendor/phpqrcode/qrlib.php");

use setasign\Fpdi\Tcpdf\Fpdi;

if($_FILES){
  $pdf = new TCPDI(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);
  // header("Content-type: application/PDF");
  $target_dir = "../assets/uploaded/";
  $target_file = $target_dir . basename($_FILES["myPDF"]["name"]);
  move_uploaded_file($_FILES["myPDF"]["tmp_name"], $target_file);
  $url = $_REQUEST['url'];
  $pageCount = $pdf->setSourceFile($target_file);
  for ($i = 1; $i <= $pageCount; $i++) {
      $tplIdx = $pdf->importPage($i, '/MediaBox');
      $pdf->AddPage();
      $pdf->useTemplate($tplIdx);
  }
  $linktoblock = "";

// set certificate file
$certificate = 'file://'.realpath('../assets/certificate.crt');
  $prkey = 'file://'.realpath('../assets/private.key');

// set additional information
$info = array(
    'Name' => 'PFE',
    'Location' => 'Fes',
    'Reason' => 'Testing PFE',
    'ContactInfo' => 'http://www.madot.ma',
    );

$pdf->setSignature($certificate, $prkey, 'ahmedahmed', '', 2, $info);

QRcode::png($url,"test.png");
$pdf->Image('test.png', 180, 60, 15, 15, 'PNG');
// $pdf->Image('images/tcpdf_signature.png', 200, 50, 15, 15, 'PNG'); TODO

$pdf->setSignatureAppearance(180, 60, 15, 15);
$pdf->addEmptySignatureAppearance(180, 80, 15, 15);
// ob_get_clean();
// $pdf->Output("myPDF.pdf", 'I');
$pdf->Output(__DIR__ ."/../assets/uploaded/etest.pdf", 'F');
$data = file_get_contents("http://localhost/Blockchain/Blockchain_Document/src/app/assets/uploaded/etest.pdf");
  header("Content-type: application/octet-stream");
  header("Content-disposition: attachment;filename=YOURFILE.pdf");

  echo $data;
// $filePath = __DIR__ ."/../assets/uploaded/etest.pdf";
// $fileName= "etest.pdf";

// $file = readfile($filePath);
// echo $file;
// header('Content-Description: File Transfer');
// header("Content-type: application/PDF");
// header("Content-disposition: attachment; filename=" .basename($file));
// header('Content-Transfer-Encoding: binary');
// header('Expires: 0');
// header('Cache-Control: must-revalidate');
// header("Pragma: public");
// header("content-length: ". filesize($file));
// ob_clean();
// flush();
// readfile($file);


}

?>
