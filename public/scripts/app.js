/*
  Daniel Orozco 13312
  UVG
  Sistemas y Tecnologias Web
  2016
*/

/*
state = 0: X
state = 1: O
*/

// Modelo / estado
var state = 0;
var end = false;

var viewportTurno = document.getElementById("turno");
var viewportGanador = document.getElementById("ganador");
var changeTrigger = document.getElementById("reset");

var tablero = document.getElementById("tablero");
var casillas = document.getElementsByClassName("casilla");

var tableroMatrix = [[-1,-1,-1],[-1,-1,-1],[-1,-1,-1]];

for (i = 0; i < casillas.length; i++){
  casillas[i].addEventListener('click', casilla, false);
}

function casilla()
{
  var itemId = this.getAttribute("id");
  var item = document.getElementById(itemId);
  var itemImg = item.innerHTML;
  var error = false;
  // Verificar si la casilla esta ocupada o el juego ya llego al final
  if ( (itemImg != '') || (end == true) )
    error = true;
  // Si no hay errores
  if (! error)
  {
    // Se pone la imagen en la casilla
    item.innerHTML = imagePlayer();
    // Se pone el valor en la matriz de la casilla correspondiente
    var fila = itemId.substring(9,10)-1;
    var columna = itemId.substring(10,11)-1;
    tableroMatrix[fila][columna] = state;
    // Verificar si hay ganador
    var win = ganador();
    if (! win)
    {
      if (isTableroFull()){
        viewportGanador.innerHTML = 'Empate';
        end = true;
      }
      else{
        // Se cambia de estado
        if(state == 0){
          state = 1;
        }
        else if(state == 1){
          state = 0;  
        }
        // Aplicar renderTurno al estado correspondiente
        viewportTurno.innerHTML = renderTurno();
      }      
    }
    else
    {
      end = true;
      viewportGanador.innerHTML = 'Ganador<br>' + imagePlayer();
    }      
  }
}

changeTrigger.addEventListener("click", reset);

function reset(){
  // Estado inicial
  state = 0;
  // Reiniciar matriz de juego
  tableroMatrix = [[-1,-1,-1],[-1,-1,-1],[-1,-1,-1]];
  // Borrar ganador
  viewportGanador.innerHTML = "Ganador";
  // Aplicar renderTurno al estado correspondiente
  viewportTurno.innerHTML = renderTurno();
  // Reset flag
  end = false;
  // Reset viewport de las casillas del tablero
  for (i = 0; i < casillas.length; i++){
    casillas[i].innerHTML = "";
  }
}

function imagePlayer(){
  var html = "";
  if(state == 0){
    html = '<img src="images/x.png" id="turno-img">';    
  }
  else{
    html = '<img src="images/o.png" id="turno-img">';
  }
  return html;
}

function renderTurno(){  
  return 'Turno<br>' + imagePlayer();
}

function ganador(){
  var rtrn = false;
  // Validaciones horizontales
  for (i = 0; i < 3; i++){
    var suma = -1;
    var tiros = 0;
    for(j = 0; j < 3; j++){ 
      suma += tableroMatrix[i][j];
      if (tableroMatrix[i][j] != -1)
        tiros++;
    }    
    if ( ((suma == 2) || (suma == -1) ) && (tiros == 3) ){
      rtrn = true;
      break;
    }   
  }
  // Validaciones verticales
  for (i = 0; i < 3; i++){
    var suma = -1;
    var tiros = 0;
    for(j = 0; j < 3; j++){ 
      suma += tableroMatrix[j][i];
      if (tableroMatrix[j][i] != -1)
        tiros++;
    }    
    if ( ((suma == 2) || (suma == -1) ) && (tiros == 3) ){
      rtrn = true;
      break;
    }   
  }
  // Validacioes diagonales
  var suma = -1;
  var tiros = 0;
  suma += tableroMatrix[0][0];  
  suma += tableroMatrix[1][1];
  suma += tableroMatrix[2][2];
  if (tableroMatrix[0][0] != -1)
    tiros++;
  if (tableroMatrix[1][1] != -1)
    tiros++;
  if (tableroMatrix[2][2] != -1)
    tiros++;
  if ( ((suma == 2) || (suma == -1) ) && (tiros == 3) )
    rtrn = true;
  suma = -1;
  tiros = 0;
  suma += tableroMatrix[0][2];
  suma += tableroMatrix[1][1];
  suma += tableroMatrix[2][0];
  if (tableroMatrix[0][2] != -1)
    tiros++;
  if (tableroMatrix[1][1] != -1)
    tiros++;
  if (tableroMatrix[2][0] != -1)
    tiros++;
  if ( ((suma == 2) || (suma == -1) ) && (tiros == 3) )
    rtrn = true;
  return rtrn;
}

function isTableroFull()
{
  var tiros = 0;
  for (i = 0; i < 3; i++){
    for(j = 0; j < 3; j++){      
      if (tableroMatrix[i][j] != -1)
        tiros++;
      else
        break;
    }
  }
  return (tiros == 9);
}

viewportTurno.innerHTML = renderTurno();