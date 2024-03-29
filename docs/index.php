<?php
// Initialize the session
session_start();

// Check if the user is logged in, if not then redirect him to login page
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
    header("location: login.php");
    exit;
}
?>

<!doctype html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <title>iDiomy - Idiomas</title>
  <meta name="description" content="iDiomy">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <link rel="stylesheet" href="modules/animate.css/animate.min.css">
  <link rel="stylesheet" href="assets/css/main.css">
  <link rel="stylesheet" href="assets/css/idiomas.css">
  <link rel="stylesheet" href="assets/css/secciones.css">
  <link rel="stylesheet" href="assets/css/responsive.css">
  <link rel="stylesheet" href="assets/css/responsive-landscape.css">
  <link rel="stylesheet" href="assets/css/game.css">
  
  <link href="https://fonts.googleapis.com/css?family=Chewy|Denk+One" rel="stylesheet"> 
</head>

<body class="body">
  <noscript>
    Debes habilitar javascript en tu navegador!
  </noscript>
  <a class="logout" href="logout.php">Salir</a>
  <div id="user-score" class="user-score"><img src='assets/img/resultado_quiz/star.png' ><p>Score: <?php echo $_COOKIE["won-score"]?></p></div>
  <div id="container">
  </div>

  <script type="text/javascript" src="modules/jquery/dist/jquery.min.js " ></script>
  <script type="text/javascript" src="modules/jsrender/jsrender.min.js" ></script>
  <script type="text/javascript" src="assets/js/functions.js" ></script>
  <script type="text/javascript" src="assets/js/storage.js" ></script>
  <script type="text/javascript" src="assets/js/load.js" ></script>
  <script type="text/javascript" src="assets/js/quiz.js" ></script>
  <script type="text/javascript" src="assets/js/game.js"></script>

</body>

</html>
