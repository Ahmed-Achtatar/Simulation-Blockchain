<?php


header('Access-Control-Allow-Headers: Access-Control-Allow-Origin, Content-Type');
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json, charset=utf-8');

include "db.php";

  $blockhash = $_REQUEST["blockhash"];
  $blocknonce = $_REQUEST["blocknonce"];
  $blockprev = $_REQUEST["blockprev"];
  $blockTSt = $_REQUEST["blockTSt"];
  $lastblockId;

try{
   $d = DateTime::createFromFormat('U.v', number_format($blockTSt /1000, 3, '.', ''));
   $blockTSt = $d->format("Y-m-d H:i:s.u");
  $stmt = $conn->prepare(" INSERT INTO `block` (`timestamp_B`, `previousHash_B`,`nonce_B`,`hash_B`,`id_BC`) VALUES (?,?,?,?,?); ");
  $stmt->bindParam(1,$blockTSt);
  $stmt->bindParam(2,$blockprev);
  $stmt->bindParam(3,$blocknonce);
  $stmt->bindParam(4,$blockhash);
  $id = 1;
  $stmt->bindParam(5,$id);
  $stmt->execute();
} catch(PDOException $e) {echo "Error: " . $e->getMessage();}

try{

$stmt = $conn->prepare("SELECT max(id_B) as maxid FROM block");
	$stmt->execute();
  $idB = $stmt->fetchColumn();
} catch (PDOException $e) {$message = $e->getMessage();}

  $num = intval($_REQUEST["num"]);

  for($i = 1 ; $i <= $num ; $i++){
    $trfile = $_REQUEST["trfile".strval($i)];
    $trTSt = $_REQUEST["trTSt".strval($i)];
    $d = DateTime::createFromFormat('U.v', number_format($trTSt/1000, 3, '.', ''));
    $trTSt = $d->format("Y-m-d H:i:s.u");
    $trAddress = $_REQUEST["trAddress".strval($i)];

    try{
      $stmt = $conn->prepare(" INSERT INTO `transaction` (`fromHash_TR`,`docHash_TR`,`timestamp_TR`,`id_B`) VALUES (?,?,?,?); ");
      $stmt->bindParam(1,$trAddress);
      $stmt->bindParam(2,$trfile);
      $stmt->bindParam(3,$trTSt);
      $stmt->bindParam(4,$idB);
      $stmt->execute();
     } catch(PDOException $e) {echo "Error: " . $e->getMessage();}
  }

?>
