<?php

// Initialize the session
session_start();
 
// Check if the user is already logged in, if yes then redirect him to index page
if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true){
    header("location: index.php");
    exit;
}
 
// Include config file
require_once "config.php";
 
// Define variables and initialize with empty values
$username = $password = "";
$username_err = $password_err = "";
 


// Processing form data when form is submitted
if($_SERVER["REQUEST_METHOD"] == "POST"){
 
    // Check if username is empty
    if(empty(trim($_POST["username"]))){
        $username_err = "Por favor ingresa tu username.";
    } else{
        $username = trim($_POST["username"]);
        $username = strip_tags(trim($username));
    }
    
    // Check if password is empty
    if(empty(trim($_POST["password"]))){
        $password_err = "Por favor ingresa tu password.";
    } else{
        $password = trim($_POST["password"]);
        $password = strip_tags(trim($password));
    }
    
    // Validate credentials
    if(empty($username_err) && empty($password_err)){
        // Prepare a select statement
        $sql = "SELECT id, username, password, score FROM users WHERE username = ?";
        
        if($stmt = mysqli_prepare($link, $sql)){
            // Bind variables to the prepared statement as parameters
            mysqli_stmt_bind_param($stmt, "s", $param_username);
            
            // Set parameters
            $param_username = $username;
            
            // Attempt to execute the prepared statement
            if(mysqli_stmt_execute($stmt)){
                // Store result
                mysqli_stmt_store_result($stmt);
                
                // Check if username exists, if yes then verify password
                if(mysqli_stmt_num_rows($stmt) == 1){                    
                    // Bind result variables
                    mysqli_stmt_bind_result($stmt, $id, $username, $hashed_password, $score);
                    if(mysqli_stmt_fetch($stmt)){
                        if(password_verify($password, $hashed_password)){
                            // Password is correct, so start a new session
                            session_start();
                            
                            // Store data in session variables
                            $_SESSION["loggedin"] = true;
                            $_SESSION["id"] = $id;
                            $_SESSION["username"] = $username;                            
                            $_SESSION["score"] = $score;

                            // Inicializamos las cookies
                            setcookie("user", $_SESSION["username"]);
                            setcookie("score", $_SESSION["score"]);
                            setcookie("won-score", $_SESSION["score"]);
                            setcookie("username", $_SESSION["username"]);
                            // Redirect user to index page
                            header("location: index.php");
                        } else{
                            // Display an error message if password is not valid
                            $password_err = "La contraseña no es válida.";
                        }
                    }
                } else{
                    // Display an error message if username doesn't exist
                    $username_err = "No existe una cuenta con ese Usuario.";
                }
            } else{
                echo "Oops! Algo salió mal. Por favor intenta de nuevo.";
            }
        }
        
        // Close statement
        mysqli_stmt_close($stmt);
    }
    
    // Close connection
    mysqli_close($link);
}
?>
 
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Iniciar Sesión | iDiomy</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">    <meta name="description" content="iDiomy">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link href="https://fonts.googleapis.com/css?family=Chewy|Denk+One" rel="stylesheet">
    <link rel="stylesheet" href="assets/css/login.css">
</head>
<body class="body">
    <div class="wrapper">
        <div class="logo">
        <img class="imagen-logo" src="assets/img/logo.png" alt="iDiomy!" class="fluid-img">
        </div>
        <h1 class="idiomy-tittle">iDiomy</h1><br>
        <h2>Iniciar Sesión</h2>
        <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
            <div class=" <?php echo (!empty($username_err)) ? 'has-error' : ''; ?>">
                <label>Username</label>
                <input type="text" name="username" class="form-control" value="<?php echo $username; ?>">
                <span class="help-block"><?php echo $username_err; ?></span>
            </div>    
            <div class="form-group <?php echo (!empty($password_err)) ? 'has-error' : ''; ?>">
                <label>Password</label>
                <input type="password" name="password" class="form-control">
                <span class="help-block"><?php echo $password_err; ?></span>
            </div>
            <div class="form-group">
                <input type="submit" class="button-in" value="Entrar">
            </div>
            <p>¿ No tienes una cuenta ? <a href="register.php">Registrate</a>.</p>
        </form>
    </div>    
</body>
</html>