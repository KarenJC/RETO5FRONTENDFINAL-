function traerReporteStatus(){
    console.log("test");
    $.ajax({
        url:"http://129.151.119.138:8080/api/Reservation/report-status",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuesta(respuesta);
        }
    });
}
function pintarRespuesta(respuesta){

    let myTable="<table>"; 
        myTable+="<tr>";
        myTable+="<th><font color=#613100>Completadas</font></th>";
        myTable+="<th><font color=#613100>Canceladas</font></th>";
        myTable+="</tr>";
        myTable+="<tr>";
        myTable+="<td><center>"+respuesta.completed+"</center></td>";
        myTable+="<td><center>"+respuesta.cancelled+"</center></td>";
        myTable+="</tr>";
        
    myTable+="</table>";
    $("#resultadoStatus").html(myTable);
}
function traerReporteDate(){

    var fechaInicio = document.getElementById("RstarDate").value;
    var fechaCierre = document.getElementById("RdevolutionDate").value;
    console.log(fechaInicio);
    console.log(fechaCierre);
    
        $.ajax({
            url:"http://129.151.119.138:8080/api/Reservation/report-dates/"+fechaInicio+"/"+fechaCierre,
            type:"GET",
            datatype:"JSON",
            success:function(respuesta){
                console.log(respuesta);
                pintarRespuestaDate(respuesta);
            },
            error: function(jqXHR, textStatus, errorThrown) { 
            window.location.reload()
            alert("No se genero el reporte porque no hay Fechas Especificadas");
        }
        });
    }
    function pintarRespuestaDate(respuesta){

        let myTable="<table>"; 
            myTable+="<tr>";
            myTable+="<th><font color=#613100> Fecha Inicio</font></th>";
            myTable+="<th><font color=#613100> Fecha Final</font></th>";
            myTable+="<th><font color=#613100> Estado Reserva </font></th>";
            myTable+="<th><font color=#613100> Nombre Cliente</font></th>";
            myTable+="</tr>";
            
            for(i=0;i<respuesta.length;i++){
            
            myTable+="<tr>";
            myTable+="<td>"+respuesta[i].devolutionDate+"</td>";
            myTable+="<td>"+respuesta[i].startDate+"</td>";
            myTable+="<td>"+respuesta[i].status+"</td>";
            myTable+="<td>"+respuesta[i].client.name+"</td>";
            myTable+="</tr>";
        }
        myTable+="</table>";
        $("#resultadoDate").html(myTable);
    }

    function traerReporteClientes(){
        $.ajax({
            url:"http://129.151.119.138:8080/api/Reservation/report-clients",
            type:"GET",
            datatype:"JSON",
            success:function(respuesta){
                console.log(respuesta);
                pintarRespuestaClientes(respuesta);
            }
    });
}
    function pintarRespuestaClientes(respuesta){

        let myTable="<table>"; 
            myTable+="<tr>";
            myTable+="<th><font color=#613100> Total </font></th>";
            myTable+="<th><font color=#613100> Nombre Cliente</font></th>";
            myTable+="<th><font color=#613100> Correo Cliente</font></th>";
            myTable+="<th><font color=#613100> Edad Cliente </font></th>";
            myTable+="</tr>";
          
        for(i=0;i<respuesta.length;i++){
            myTable+="<tr>";
            myTable+="<td>"+respuesta[i].total+"</td>";
            myTable+="<td>"+respuesta[i].client.name+"</td>";
            myTable+="<td>"+respuesta[i].client.email+"</td>";
            myTable+="<td>"+respuesta[i].client.age+"</td>";
            myTable+="</tr>";
        }
        myTable+="</table>";
        $("#resultadoClientes").html(myTable);
    }
