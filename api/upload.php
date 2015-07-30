<?php
    date_default_timezone_set('America/Los_Angeles');

    $date           = date('Y-m-d-His');
    $filename       = $_FILES['file']['name'];
    $destination    = '../files/' . $date . '_' . $filename;

    move_uploaded_file($_FILES['file']['tmp_name'] , $destination);
    print_r($date . '_' . $filename);
?>