<?php
    $server = "localhost";
    $username = "efitzpatrick_capstoneadmin";
    $password = "si+{PByA5&.20gu{";
    $database = "efitzpatrick_capstone";

    $connection = mysqli_connect($server,$username,$password,$database);
    if(!$connection){
        die(mysqli_connect_error());
    }
?>