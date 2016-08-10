/*
  Daniel Orozco 13312
  UVG
  Sistemas y Tecnologias Web
  2016
*/

/*
state.turno = 0: X
state.turno = 1: O
*/

// Modelo / estado
var state = {
  turno: 0,
  end: false,
  empate: false,
  tableroMatrix: [
    [-1,-1,-1],
    [-1,-1,-1],
    [-1,-1,-1]
  ],
  tableroImgs: [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ],
  ganadorImg: ''
};

var viewport = document.getElementById("viewport");

function render(state){
  var html = '<div class="indicadores">';
     html += '  <div class="viewport" id="turno">';
     if(state.turno == 0){
      html += 'Turno<br><img src="images/x.png" id="turno-img">';
     }
     else{
      html += 'Turno<br><img src="images/o.png" id="turno-img">';
     }
     html += "</div>"
     if (state.empate == true)
      html += '  <div class="viewport" id="ganador">Empate</div>';
     else
      html += '  <div class="viewport" id="ganador">Ganador<br>' + state.ganadorImg + '</div>';
     html += '</div>';
     html += '<div class="container">';
     html += '  <table id="tablero">';
     html += '    <tr>';
     html += '      <td class="casilla" id="viewport-11">' + state.tableroImgs[0][0] + '</td>';
     html += '      <td class="casilla" id="viewport-12">' + state.tableroImgs[0][1] + '</td>';
     html += '      <td class="casilla" id="viewport-13">' + state.tableroImgs[0][2] + '</td>';
     html += '    </tr>';
     html += '    <tr>';
     html += '      <td class="casilla" id="viewport-21">' + state.tableroImgs[1][0] + '</td>';
     html += '      <td class="casilla" id="viewport-22">' + state.tableroImgs[1][1] + '</td>';
     html += '      <td class="casilla" id="viewport-23">' + state.tableroImgs[1][2] + '</td>';
     html += '    </tr>';
     html += '    <tr>';
     html += '      <td class="casilla" id="viewport-31">' + state.tableroImgs[2][0] + '</td>';
     html += '      <td class="casilla" id="viewport-32">' + state.tableroImgs[2][1] + '</td>';
     html += '      <td class="casilla" id="viewport-33">' + state.tableroImgs[2][2] + '</td>';
     html += '    </tr>';
     html += '  </table>';
     html += '</div>';
     html += '<button id="reset">Reset</button>';
  return html;
}

viewport.innerHTML = render(state);

changeTrigger = document.getElementById("reset");
changeTrigger.addEventListener("click", reset);
casillas = document.getElementsByClassName("casilla");
for (i = 0; i < casillas.length; i++){
  casillas[i].addEventListener('click', casilla, false);
}

function imagePlayer(){
  var html = "";
  if(state.turno == 0){
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
  if ( (itemImg != '') || (state.end == true) )
    error = true;
  // Si no ha llegado al final
  if (! error)
  {    
    // Se pone el valor en la matriz de la casilla correspondiente
    var fila = itemId.substring(9,10)-1;
    var columna = itemId.substring(10,11)-1;
    state.tableroMatrix[fila][columna] = state.turno;
    // Se pone la imagen en la casilla
    state.tableroImgs[fila][columna] = imagePlayer();
    // Verificar si hay ganador
    var win = ganador();
    if (! win){
      if (isTableroFull()){
        state.empate = true;
        state.end = true;
      }
      else{
        // Se cambia de estado
        if(state.turno == 0){
          state.turno = 1;
        }
        else if(state.turno == 1){
          state.turno = 0;  
        }        
      }      
    }
    else{
      state.end = true;
      state.ganadorImg = imagePlayer();
    }    
  }
  viewport.innerHTML = render(state);
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
  state.turno = 0;
  // Reiniciar matriz de juego
  state.tableroMatrix = [[-1,-1,-1],[-1,-1,-1],[-1,-1,-1]];
  state.tableroImgs = [['', '', ''],['', '', ''],['', '', '']];
  state.ganadorImg = '';
  // Reset flags
  state.end = false;
  state.empate = false;
  // Aplicar renderTurno al estado correspondiente
  viewport.innerHTML = render(state);
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
      suma += state.tableroMatrix[i][j];
      if (state.tableroMatrix[i][j] != -1)
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
      suma += state.tableroMatrix[j][i];
      if (state.tableroMatrix[j][i] != -1)
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
  suma += state.tableroMatrix[0][0];  
  suma += state.tableroMatrix[1][1];
  suma += state.tableroMatrix[2][2];
  if (state.tableroMatrix[0][0] != -1)
    tiros++;
  if (state.tableroMatrix[1][1] != -1)
    tiros++;
  if (state.tableroMatrix[2][2] != -1)
    tiros++;
  if ( ((suma == 2) || (suma == -1) ) && (tiros == 3) )
    rtrn = true;
  suma = -1;
  tiros = 0;
  suma += state.tableroMatrix[0][2];
  suma += state.tableroMatrix[1][1];
  suma += state.tableroMatrix[2][0];
  if (state.tableroMatrix[0][2] != -1)
    tiros++;
  if (state.tableroMatrix[1][1] != -1)
    tiros++;
  if (state.tableroMatrix[2][0] != -1)
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
      if (state.tableroMatrix[i][j] != -1)
        tiros++;
      else
        break;
    }
  }
  return (tiros == 9);
}