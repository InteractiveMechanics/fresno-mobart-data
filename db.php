<?php
function getDB() {
    $dbhost = "localhost";
    $dbuser = "staging_mobart";
    $dbpass = "Qv4ub2*1";
    $dbname = "staging_mobart";
    $dbConnection = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass); 
    $dbConnection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    return $dbConnection;
}
?>