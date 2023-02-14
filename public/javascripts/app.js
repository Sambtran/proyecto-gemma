

function fichar()
{
    console.log($("prueba").val())

    $.ajax({
        url:"/registros",
        type:"POST",
        data: JSON.stringify({nombre: $("#nombre").val(), nombrej: $("#nombrej").val(),puntos: $("puntos").val}),
        contentType:"application/json; charset=utf-8",
        dataType:"json",
        success: function(data) {
        }
    });
}
function borrarParticipante(id) 
{
    $.ajax({
        url:"/participantes/" + id,
        type:"DELETE",
        contentType:"application/json; charset=utf-8",
        dataType:"json",
        success: function(data) {
            window.location = "/participantes";
        }
    });
}