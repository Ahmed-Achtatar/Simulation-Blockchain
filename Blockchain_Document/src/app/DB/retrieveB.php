<?php


header('Access-Control-Allow-Headers: Access-Control-Allow-Origin, Content-Type');
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json, charset=utf-8');
ini_set ('display_errors', 'on');
 ini_set ('log_errors', 'on');
 ini_set ('display_startup_errors', 'on');
 ini_set ('error_reporting', E_ALL);
include "db.php";


try{
  $stmt = $conn->prepare("SELECT id_B, timestamp_B, previousHash_B,nonce_B , hash_B FROM block");
    $stmt->execute();
    $Blocks = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($Blocks);
}catch (PDOException $e) {$message = $e->getMessage();}
try{
  $stmt = $conn->prepare("SELECT id_TR , fromHash_TR, docHash_TR, timestamp_TR , id_B FROM block");
    $stmt->execute();
    $Transactions = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($Transactions);
}catch (PDOException $e) {$message = $e->getMessage();}
?>
