<?php

// Include config file
require_once "config.php";

// Initialize the session
session_start();
$won_score = $_COOKIE["won-score"];
$id = $_SESSION["id"];
$sql = "UPDATE users SET score=? WHERE id=?";

if($stmt = mysqli_prepare($link, $sql)){
    // Bind variables to the prepared statement as parameters
    mysqli_stmt_bind_param($stmt, "ii", intVal($won_score), $id);
       
    // Attempt to execute the prepared statement
    if(mysqli_stmt_execute($stmt)){
 
        echo "Se actuliazó";
    }else{
        echo "Oops! Algo salió mal. Por favor intenta de nuevo.";
    }
}
// Close statement
mysqli_stmt_close($stmt);

        // Unset all of the session variables
$_SESSION = array();
setcookie("won-score", '', time() - 42000);
setcookie("won-score+", '', time() - 42000);

// Destroy the session.
session_destroy();
 
// Redirect to login page
header("location: login.php");
exit;
?>