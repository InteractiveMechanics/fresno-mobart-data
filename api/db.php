<?php
function getDB() {
    $dbhost = "localhost";
    $dbuser = "iaccessf_moodle";
    $dbpass = "@48;pbjKz2Q4";
    $dbname = "iaccessf_mobart";
    $dbConnection = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass); 
    $dbConnection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    return $dbConnection;
}
function getMoodleDB() {
    $dbhost = "localhost";
    $dbuser = "iaccessf_moodle";
    $dbpass = "@48;pbjKz2Q4";
    $dbname = "iaccessf_moodle";
    $dbConnection = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass); 
    $dbConnection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    return $dbConnection;
}
?>
