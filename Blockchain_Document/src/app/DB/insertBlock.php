<?php


header('Access-Control-Allow-Headers: Access-Control-Allow-Origin, Content-Type');
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json, charset=utf-8');
ini_set ('display_errors', 'on');
 ini_set ('log_errors', 'on');
 ini_set ('display_startup_errors', 'on');
 ini_set ('error_reporting', E_ALL);
include "db.php";




  $blockhash = $_REQUEST["blockhash"];

  $blocknonce = $_REQUEST["blocknonce"];
  $blockprev = $_REQUEST["blockprev"];
  $blockTSt = $_REQUEST["blockTSt"];
  $lastblockId;


try{

    // on utilise prepare pour éviter les SQL Injections
   $d = DateTime::createFromFormat('U.v', number_format($blockTSt /1000, 3, '.', ''));
   $blockTSt = $d->format("Y-m-d H:i:s.u");
  // $blockTSt = gmdate("Y-m-d H:i:s.u",$blockTSt);
  // $d = new DateTime($blockTSt);
  // echo $d->format('Y-m-d\TH:i:s.u');
  $stmt = $conn->prepare(" INSERT INTO `block` (`timestamp_B`, `previousHash_B`,`nonce_B`,`hash_B`,`id_BC`) VALUES (?,?,?,?,?); ");
  $stmt->bindParam(1,$blockTSt);
  $stmt->bindParam(2,$blockprev);
  $stmt->bindParam(3,$blocknonce);
  $stmt->bindParam(4,$blockhash);
  $id = 1;
  $stmt->bindParam(5,$id);

  $stmt->execute();
  // print_r("New records created successfully");

} catch(PDOException $e) {
  echo "Error: " . $e->getMessage();
}

try{
$stmt = $conn->prepare("SELECT max(id_B) as maxid FROM block");

	$stmt->execute();


  $idB = $stmt->fetchColumn();
  echo json_encode($idB);

}
  catch (PDOException $e) {

    $message = $e->getMessage();

   }
  $num = intval($_REQUEST["num"]);

  for($i = 1 ; $i <= $num ; $i++){
    $trfile = $_REQUEST["trfile".strval($i)];
    $trTSt = $_REQUEST["trTSt".strval($i)];

    $d = DateTime::createFromFormat('U.v', number_format($trTSt/1000, 3, '.', ''));
    $trTSt = $d->format("Y-m-d H:i:s.u");

    echo json_encode($trTSt);
    $trAddress = $_REQUEST["trAddress".strval($i)];
    try{
      echo json_encode($trTSt);
    $stmt = $conn->prepare(" INSERT INTO `transaction` (`fromHash_TR`,`docHash_TR`,`timestamp_TR`,`id_B`) VALUES (?,?,?,?); ");
    $stmt->bindParam(1,$trAddress);
    $stmt->bindParam(2,$trfile);
    $stmt->bindParam(3,$trTSt);
    echo json_encode($trTSt);
    $stmt->bindParam(4,$idB);

    $stmt->execute();
    echo "New records created successfully";

     } catch(PDOException $e) {
    echo "Error: " . $e->getMessage();
    }

  }



?>
