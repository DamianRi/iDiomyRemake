<div class="welcome item-wrapper animated fadeInUp grid-container">

    <div class="logo">
      <img class="imagen-logo" src="assets/img/logo.png" alt="iDiomy!" class="fluid-img">
    </div>
    <div class="elementos-intro">
      <h1 id="texto-bienvenida">¡Bienvenido a iDiomy!</h1>
      <p id="texto-introductorio"> <?php echo $_COOKIE["user"];?>, vamos a conocer palabras en otros idiomas</p>

      <img class="banderas" src="assets/img/banderas/deutschland.png">
      <img class="banderas" src="assets/img/banderas/italien.png">
      <img class="banderas" src="assets/img/banderas/portugal.png">
      <br>
      <button type="button" class="skip-intro animated swing" onclick="play_intro()">
        Jugar
      </button>
    </div>
      <!--<br>
      <input type="checkbox" id="remember"> No volver a mostrar
      <br/>-->
  </div>