 function fichar()
{
    
  if(highscoreold<=highScore){
    highscoreold = highScore
    highScore = parseInt(highScore)
    $.ajax({
        url:"/registros",
        type:"POST",
        data: JSON.stringify({nombre: nombret, nombrej: nombrejt,puntos: highScore}),
        contentType:"application/json; charset=utf-8",
        dataType:"json",
        success: function(data) {
        }
    });}else{
      
    }
}

