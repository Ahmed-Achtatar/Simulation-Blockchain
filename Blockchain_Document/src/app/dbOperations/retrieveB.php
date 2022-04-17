<?php

header('Access-Control-Allow-Headers: Access-Control-Allow-Origin, Content-Type');
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json, charset=utf-8');

include "db.php";

try{
  $stmt = $conn->prepare("SELECT id_B, timestamp_B, previousHash_B,nonce_B , hash_B FROM block");
    $stmt->execute();
    $Blocks = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($Blocks);
}catch (PDOException $e) {$message = $e->getMessage();}

?>
