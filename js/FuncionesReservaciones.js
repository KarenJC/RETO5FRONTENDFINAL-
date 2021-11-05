function autoInicioRelacionCliente(){
    
    $.ajax({
        url:"http://129.151.119.138:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
          
            let $select = $("#select-client");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.idClient+'>'+name.name+'</option>');
            
            }); 
        }
    
    })
}
function autoInicioRelacionDoctores(){

    $.ajax({
        url:"http://129.151.119.138:8080/api/Doctor/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
        
            let $select = $("#select-doctor");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
         
            }); 
        }
    
    })
}

function traerInformacionReservaciones(){
    console.log("se esta ejecutando")
    $.ajax({
        url:"http://129.151.119.138:8080/api/Reservation/all",
        type: "GET",
        datatype: "JSON",
        success: function (response) {
            console.log(response);
            pintarRespuestaReservaciones(response);
        }
    });
}

function pintarRespuestaReservaciones(response){
   
    let myTable="<table>";
        myTable+="<tr>";
        myTable+="<th><font color=000649><center> Fecha Inicio </center></font></th>";
        myTable+="<th><font color=000649><center> Fecha Final </center></font></th>";
        myTable+="<th><font color=000649><center> Estado </center></font></th>";
        myTable+="<th><font color=000649><center> Cliente </center></font></th>";
        myTable+="<th><font color=000649><center> Doctor </center></font></th>";
        myTable+="<th colspan=2> <font color=000649> Opciones </font></th>";
        myTable+="</tr>";
      
    for(i=0;i<response.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+response[i].startDate+"</td>";
        myTable+="<td>"+response[i].devolutionDate+"</td>";
        myTable+="<td>"+response[i].status+"</td>";
        myTable+="<td>"+response[i].client.name+"</td>";
        myTable+="<td>"+response[i].doctor.name+"</td>";
        myTable+='<td><button  onclick="borrarReservacion(' + response[i].idReservation + ')">Borrar Reserva</button></td>';
        myTable+='<td><button  onclick="actualizarReservacion(' + response[i].idReservation + ')">Actualizar Reserva</button></td>';
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado3").html(myTable);
}


function agregarReservacion() {
    
    if($("#startDate").val().length == 0 || $("#devolutionDate").val().length == 0 || $("#status").val().length == 0){
        alert("Todos los campos son Obligatorios")
    }else{  
        let elemento = {
            startDate: $("#startDate").val(),
            devolutionDate: $("#devolutionDate").val(),
            status: $("#status").val(),
            doctor:{id: +$("#select-doctor").val()},
            client:{idClient: +$("#select-client").val()},
            
        };

        console.log(elemento);
        $.ajax({
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(elemento),
            datatype: "json",

            url:"http://129.151.119.138:8080/api/Reservation/save",

            success:function(response) {
                console.log(response);
            console.log("Se guardo correctamente");
            alert("Se guardo correctamente");
            window.location.reload()
            traerInformacionReservaciones();

            },
            error: function(jqXHR, textStatus, errorThrown) {
             window.location.reload()
            alert("No se guardo correctamente, por que no hay un cliente y un doctor especificado");
            }
        });
    }
}


function actualizarReservacion(idElemento) {
    
        let elemento = {
            idReservation: idElemento,
            startDate: $("#startDate").val(),
            devolutionDate: $("#devolutionDate").val(),
            status: $("#status").val(),
            doctor:{id: +$("#select-doctor").val()},
            client:{idClient: +$("#select-client").val()},
        };
        console.log(elemento);
        let dataToSend=JSON.stringify(elemento);

        $.ajax({
            datatype: 'json',
            data: dataToSend,
            contentType: "application/JSON",
            url:"http://129.151.119.138:8080/api/Reservation/update",
            type: "PUT",

             success:function(respuesta){
            $("#resultado3").empty();
            $("#startDate").val("");
            $("#devolutionDate").val("");
            $("#status").val("");
            
            traerInformacionReservaciones();
            alert("Se ha Actualizado correctamente")
            window.location.reload()

        },
        error: function(jqXHR, textStatus, errorThrown) { 
            window.location.reload()
            alert("No se pudo actualizar por que no hay un cliente y un doctor especificado");
            }
        });
    
}
function borrarReservacion(idElemento){
    let myData={
        idMessage:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    console.log(dataToSend);
    $.ajax({
        url:"http://129.151.119.138:8080/api/Reservation/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado3").empty();
            traerInformacionReservaciones();
            alert("Se ha Eliminado.")
            }
        });
}