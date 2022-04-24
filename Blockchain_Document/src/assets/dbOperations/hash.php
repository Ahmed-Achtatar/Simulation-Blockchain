<?php

header('Access-Control-Allow-Headers: Access-Control-Allow-Origin, Content-Type');
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json, charset=utf-8');
require '../../../vendor/autoload.php';

$hashedPDF = hash_file('sha256',__DIR__ ."/../assets/uploaded/etest.pdf");
echo json_encode($hashedPDF);
?>
