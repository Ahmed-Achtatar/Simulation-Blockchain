<?php
$servername = "madot.ma";
$username = "madotma_ahmed";
$password = "!*=POMcF8b&5";

try {
$conn = new PDO("mysql:host=$servername;dbname=madotma_BC;", $username, $password);
// set the PDO error mode to exception
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
echo "Connection failed: " . $e->getMessage();
}
?>
