<?php

header('Access-Control-Allow-Headers: Access-Control-Allow-Origin, Content-Type');
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json, charset=utf-8');

include "db.php";

try{
  $stmt = $conn->prepare("SELECT id_TR , fromHash_TR, docHash_TR, timestamp_TR , id_B FROM transaction");
    $stmt->execute();
    $Transactions = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($Transactions);
}catch (PDOException $e) {$message = $e->getMessage();}

?>
