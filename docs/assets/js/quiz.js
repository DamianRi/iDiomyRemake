var correcto = new Audio();
correcto.src="assets/audio/NFF-choice-good.wav";
correcto.volume = 0.4;
var incorrecto = new Audio();
incorrecto.src="assets/audio/NFF-choice-bad.wav";
incorrecto.volume = 0.4;
var homeBoton = new Audio();
homeBoton.src="assets/audio/home.mp3";
var botones = new Audio();
botones.src = "assets/audio/drip.mp3";
var current = 0;

var username = getCookie("username").toUpperCase();

$('#container').on('click', '.answer-button', function(){
  if (!$(".can").hasClass("hide")) return;
  var isCorrect = $(this).checkAnswer();
  var correct_answer = $(this).getCorrectAnswer();
  var msg = "La respuesta correcta es <b>" + correct_answer + "</b>.<br>¡Ánimo, "+ username+", vamos con la siguiente!";
  if (isCorrect) {
    correcto.play();
    msg = "¡ACERTASTE, MUY BIEN HECHO "+username+"!";
    $(this).addClass('correcto').removeClass('answer-button');
  }else{
    incorrecto.play();
    $(this).addClass('incorrecto').removeClass('answer-button');
  }
  $('#message').html(msg);
  //$('.fadeInUp').addClass('hide').removeClass('fadeInUp');
  $('.can').removeClass('hide').addClass('fadeInUp');
});

$('#container').on('click','.next-button', function(){
  showNext(current);
});


var showedGame = false; // Variable para saber cuando el juego ha sido desplegado 

function showNext(n) {
  $('.fadeInUp').addClass('hide').removeClass('fadeInUp');
  current++;
  var items = $('.question');
  var size = items.length;

  console.log("Size:"+size, "< Current"+current, "ShowedGame"+showedGame);
  if (size - 1 < current && showedGame) {
    $('.fadeIn').addClass('hide').removeClass('fadeIn'); // Quitamos el div del juego

    var quizData = $('#quiz-data');
    var category = quizData.attr('data-category');
    var quiz = quizData.attr('data-quiz');
    var points = 0;
    var score = JSON.parse(localStorage.getItem("score"));
    var answers = score["idioma"+idiomaActual]["category"+category]["quiz"+ quiz];
    
    for(var answer in answers){
      points += answers[answer].points;
    }

    var result = parseFloat(points/size);
    var result_percentage = Math.round(result*100)/100;
    var puntosGanados = 0;
    $('.resume').removeClass('hide').addClass('fadeInUp');
    $('.body-second-style').removeClass('body-second-style').addClass('body');
    if(result_percentage === 0){
      $('.result-message').html("No obtuviste ninguna estrella. Inténtalo de nuevo! ");
      $('.stars').append($('<img>',{class:'no-star',src:'assets/img/resultado_quiz/no-star.png'}))
      $('.stars').append($('<img>',{class:'no-star',src:'assets/img/resultado_quiz/no-star.png'}))
      $('.stars').append($('<img>',{class:'no-star',src:'assets/img/resultado_quiz/no-star.png'}))
      $('.stars').append($('<img>',{class:'no-star',src:'assets/img/resultado_quiz/no-star.png'}))
      $('.stars').append($('<img>',{class:'no-star',src:'assets/img/resultado_quiz/no-star.png'}))

    }else if (result_percentage <= .2 && result_percentage > 0){
      puntosGanados = 1;
      $('.result-message').html("Puedes mejorar. ¡Inténtalo de nuevo! ");
      $('.stars').append($('<img>',{class:'star',src:'assets/img/resultado_quiz/star.png'}))
      $('.stars img').addClass('animated heartBeat estrellas');  
      $('.stars').append($('<img>',{class:'no-star',src:'assets/img/resultado_quiz/no-star.png'}))
      $('.stars').append($('<img>',{class:'no-star',src:'assets/img/resultado_quiz/no-star.png'}))
      $('.stars').append($('<img>',{class:'no-star',src:'assets/img/resultado_quiz/no-star.png'}))
      $('.stars').append($('<img>',{class:'no-star',src:'assets/img/resultado_quiz/no-star.png'}))
    }else if (result_percentage <= .4 && result_percentage > .2){
      puntosGanados = 2;
      $('.result-message').html("¡Muy bien! ");
      $('.stars').append($('<img>',{class:'star',src:'assets/img/resultado_quiz/star.png'}))
      $('.stars').append($('<img>',{class:'star',src:'assets/img/resultado_quiz/star.png'}))
      $('.stars img').addClass('animated heartBeat estrellas');
      $('.stars').append($('<img>',{class:'no-star',src:'assets/img/resultado_quiz/no-star.png'}))
      $('.stars').append($('<img>',{class:'no-star',src:'assets/img/resultado_quiz/no-star.png'}))
      $('.stars').append($('<img>',{class:'no-star',src:'assets/img/resultado_quiz/no-star.png'}))
    }else if (result_percentage <= .6 && result_percentage > .4){
      puntosGanados = 3;
      $('.result-message').html("¡Muy bien! ");
      $('.stars').append($('<img>',{class:'star',src:'assets/img/resultado_quiz/star.png'}))
      $('.stars').append($('<img>',{class:'star',src:'assets/img/resultado_quiz/star.png'}))
      $('.stars').append($('<img>',{class:'star',src:'assets/img/resultado_quiz/star.png'}))
      $('.stars img').addClass('animated heartBeat estrellas');
      $('.stars').append($('<img>',{class:'no-star',src:'assets/img/resultado_quiz/no-star.png'}))
      $('.stars').append($('<img>',{class:'no-star',src:'assets/img/resultado_quiz/no-star.png'}))
    }else if (result_percentage < 1 && result_percentage > .6){
      puntosGanados = 4;
      $('.result-message').html("¡Muy bien! ");
      $('.stars').append($('<img>',{class:'star',src:'assets/img/resultado_quiz/star.png'}))
      $('.stars').append($('<img>',{class:'star',src:'assets/img/resultado_quiz/star.png'}))
      $('.stars').append($('<img>',{class:'star',src:'assets/img/resultado_quiz/star.png'}))
      $('.stars').append($('<img>',{class:'star',src:'assets/img/resultado_quiz/star.png'}))
      $('.stars img').addClass('animated heartBeat estrellas');
      $('.stars').append($('<img>',{class:'no-star',src:'assets/img/resultado_quiz/no-star.png'}))
    }else if (result_percentage === 1){
      puntosGanados = 5;
      $('.result-message').html("¡Felicidades! Demuestra tus habilidades en los demás niveles y categorías.<br>");
      $('.stars').append($('<img>',{class:'star',src:'assets/img/resultado_quiz/star.png'}))
      $('.stars').append($('<img>',{class:'star',src:'assets/img/resultado_quiz/star.png'}))
      $('.stars').append($('<img>',{class:'star',src:'assets/img/resultado_quiz/star.png'}))
      $('.stars').append($('<img>',{class:'star',src:'assets/img/resultado_quiz/star.png'}))
      $('.stars').append($('<img>',{class:'star',src:'assets/img/resultado_quiz/star.png'}))
      $('.stars img').addClass('animated heartBeat estrellas');
    }
    var ws = getCookie("won-score");
    var actualScore = parseInt(ws)+puntosGanados;
    document.cookie = "won-score="+actualScore;
      //location.reload();
    //$( "#user-score" ).html("<span><img src='assets/img/resultado_quiz/star.png' ></span>ScoreS: <?php echo $_COOKIE[\"won-score\"]?>");
    $( "#user-score" ).load(" #user-score > *");

  } else if(size-1 < current){
    loadCards();
    $(".game-card").addClass('fadeIn').removeClass('hide');
    console.log("Juego Mostrado");
    showedGame = true; 
  }else{
    showedGame = false;
    $(items[current]).addClass('fadeInUp').removeClass('hide');
  }
}

$('#container').on('click','#otro', function(){
  $('.body').removeClass('body').addClass('body-second-style');
  $('.correcto'). removeClass('correcto').addClass('answer-button');
  $('.incorrecto'). removeClass('incorrecto').addClass('answer-button');
  $('.stars').empty();
  current = - 1;
  showNext(current);
});

$('#container').on('click','#menu', function(){
  $('.body-second-style').removeClass('body-second-style').addClass('body');
  current = 0;
  $('#container').load('assets/templates/panel.html',function(){
    renderPanel(categories);
  });
});

$('#container').on('click','.volver-niveles',function(e){
  $('.body-second-style').removeClass('body-second-style').addClass('body');
  current = 0;
  $(this).volverNiveles();
});

// Función para quitar los intros actuales
$('#container').on('click','.skip',function(){
  showQuiz(); // Se contienua mostrando las preguntas del nivel
});

$('#container').on('click','.next-intro',function(){
  var target = $(this).attr("data-target");
  var items = $(".intro.item");
  if (target < items.length) {
    $(".intro.item.fadeInUp").removeClass("fadeInUp").addClass("hide");
    $(items[target]).addClass("fadeInUp").removeClass("hide");
  } else {
    showQuiz();
  }
});

// Función inciar con el despliegues de las preguntas
function showQuiz() {
  $("#intro").addClass("hide");
  $(".quiz.items").removeClass("hide");
}

// Al terminar las preguntas y mostrar el resumen del nivel
// al hacer click en el botón de siguiente nivel
$('#container').on('click', '.siguienteNivel', function(){
  $(this).renderNextQuiz(); // Iniciamos el despliegue del siguiento nivel
  $('.body').removeClass('body').addClass('body-second-style'); // Mostramos el estilo para las intros y preguntas
});

$('#container').on('click','#menu', function(){
  homeBoton.play();
});

$('#container').on('click','.botones', function(){
  botones.play();
});


function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}