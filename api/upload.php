<?php
    $filename       = $_FILES['file']['name'];
    $destination    = '../files/' . $filename;

    move_uploaded_file($_FILES['file']['tmp_name'] , $destination);
?>