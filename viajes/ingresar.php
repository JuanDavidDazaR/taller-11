<?php
    $user=$_POST["usuario"];
    $pass=$_POST["password"];

    $servurl="http://localhost:3001/usuarios/$user/$pass";
    $curl=curl_init($servurl);

    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    $response=curl_exec($curl);
    curl_close($curl);

    if ($response===false){
        header("Location:index.html");
    }

    $resp = json_decode($response);

    if (count($resp) != 0){
        session_start();
        $_SESSION["usuario"]=$user;
        if ($user == "admin1"){ 
            echo "admin";
            header("Location:admin.php");
        } 
        else { 
            echo "usuario";
            header("Location:usuario.php");
        } 
    }
    else {
    header("Location:index.html"); 
    }

?>




