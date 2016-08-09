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
var end = false
var empate = false;
var tiro = -1;
var tableroMatrix = [[-1,-1,-1],[-1,-1,-1],[-1,-1,-1]];
var tableroImgs = [['', '', ''],['', '', ''],['', '', '']];
var ganadorImg = '';

var viewport = document.getElementById("viewport");

function render(){
  var html = '<div class="indicadores">';
     html += '  <div class="viewport" id="turno">';
     if(state == 0){
      html += 'Turno<br><img src="images/x.png" id="turno-img">';
     }
     else{
      html += 'Turno<br><img src="images/o.png" id="turno-img">';
     }
     html += "</div>"
     if (empate == true)
      html += '  <div class="viewport" id="ganador">Empate</div>';
     else
      html += '  <div class="viewport" id="ganador">Ganador<br>' + ganadorImg + '</div>';
     html += '</div>';
     html += '<div class="container">';
     html += '  <table id="tablero">';
     html += '    <tr>';
     html += '      <td class="casilla" id="viewport-11">' + tableroImgs[0][0] + '</td>';
     html += '      <td class="casilla" id="viewport-12">' + tableroImgs[0][1] + '</td>';
     html += '      <td class="casilla" id="viewport-13">' + tableroImgs[0][2] + '</td>';
     html += '    </tr>';
     html += '    <tr>';
     html += '      <td class="casilla" id="viewport-21">' + tableroImgs[1][0] + '</td>';
     html += '      <td class="casilla" id="viewport-22">' + tableroImgs[1][1] + '</td>';
     html += '      <td class="casilla" id="viewport-23">' + tableroImgs[1][2] + '</td>';
     html += '    </tr>';
     html += '    <tr>';
     html += '      <td class="casilla" id="viewport-31">' + tableroImgs[2][0] + '</td>';
     html += '      <td class="casilla" id="viewport-32">' + tableroImgs[2][1] + '</td>';
     html += '      <td class="casilla" id="viewport-33">' + tableroImgs[2][2] + '</td>';
     html += '    </tr>';
     html += '  </table>';
     html += '</div>';
     html += '<button id="reset">Reset</button>';
  return html;
}

viewport.innerHTML = render();

changeTrigger = document.getElementById("reset");
changeTrigger.addEventListener("click", reset);
casillas = document.getElementsByClassName("casilla");
for (i = 0; i < casillas.length; i++){
  casillas[i].addEventListener('click', casilla, false);
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

function casilla()
{  
  var itemId = this.getAttribute("id");
  var item = document.getElementById(itemId);
  var itemImg = item.innerHTML;
  var error = false;
  // Verificar si la casilla esta ocupada o el juego ya llego al final
  if ( (itemImg != '') || (end == true) )
    error = true;
  // Si no ha llegado al final
  if (! error)
  {    
    // Se pone el valor en la matriz de la casilla correspondiente
    var fila = itemId.substring(9,10)-1;
    var columna = itemId.substring(10,11)-1;
    tableroMatrix[fila][columna] = state;
    // Se pone la imagen en la casilla
    tableroImgs[fila][columna] = imagePlayer();
    // Verificar si hay ganador
    var win = ganador();
    if (! win){
      if (isTableroFull()){
        empate = true;
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
      }      
    }
    else{
      end = true;
      ganadorImg = imagePlayer();
    }    
  }
  viewport.innerHTML = render();
  changeTrigger = document.getElementById("reset");
  changeTrigger.addEventListener("click", reset);
  casillas = document.getElementsByClassName("casilla");
  for (i = 0; i < casillas.length; i++){
    casillas[i].addEventListener('click', casilla, false);
  }
}

//changeTrigger.addEventListener("click", reset);

function reset(){
  // Estado inicial
  state = 0;
  // Reiniciar matriz de juego
  tableroMatrix = [[-1,-1,-1],[-1,-1,-1],[-1,-1,-1]];
  tableroImgs = [['', '', ''],['', '', ''],['', '', '']];
  ganadorImg = '';
  // Reset flags
  end = false;
  empate = false;
  // Aplicar renderTurno al estado correspondiente
  viewport.innerHTML = render();
  changeTrigger = document.getElementById("reset");
  changeTrigger.addEventListener("click", reset);
  casillas = document.getElementsByClassName("casilla");
  for (i = 0; i < casillas.length; i++){
    casillas[i].addEventListener('click', casilla, false);
  }  
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