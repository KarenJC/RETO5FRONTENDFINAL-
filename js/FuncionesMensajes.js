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


function traerInformacionMensajes(){
    console.log("se esta ejecutando")
    $.ajax({
        url:"http://129.151.119.138:8080/api/Message/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaMensajes(respuesta);
        }
    });
}

function pintarRespuestaMensajes(respuesta){

    let myTable="<table>";

        myTable+="<tr>";
        myTable+="<th><font color=#4D0112> Mensajes </font></th>";
        myTable+="<th><font color=#4D0112> Nombre Doctor </font></th>";
        myTable+="<th><font color=#4D0112> Nombre Cliente </font></th>";
        myTable+="<th colspan=2> <font color=4D0112> Opciones </font> </th>";
        myTable+="</tr>";

    for(i=0;i<respuesta.length;i++){
       
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].messageText+"</td>";
        myTable+="<td>"+respuesta[i].doctor.name+"</td>";
        myTable+="<td>"+respuesta[i].client.name+"</td>";
        myTable+="<td> <button onclick='actualizarMensaje("+respuesta[i].idMessage+")'>Actualizar</button>";
        myTable+="<td> <button onclick='borrarMensaje("+respuesta[i].idMessage+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado1").html(myTable);
}




function guardarInformacionMensajes(){
    if ($("#messageText").val().length==0 ){

        alert("Todos los campos son obligatorios");
    }else{

        let var2 = {
            messageText:$("#messageText").val(),
            doctor:{id: +$("#select-doctor").val()},
            client:{idClient: +$("#select-client").val()},

     
        };
       
        console.log(var2);
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(var2),
        dataType: 'JSON',
        url:"http://129.151.119.138:8080/api/Message/save",
       
        
        success:function(response) {
                console.log(response);
            console.log("Se guardo correctamente");
            alert("Se guardo correctamente");
            window.location.reload()
    
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
             window.location.reload()
            alert("No se guardo correctamente, por que no hay un cliente y un doctor especificado");
    
    
        }
        });
    }
}

function actualizarMensaje(idElemento){
    let myData={
        idMessage:idElemento,
        messageText:$("#messageText").val(), 
        doctor:{id: +$("#select-doctor").val()},
        client:{idClient: +$("#select-client").val()},  
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.119.138:8080/api/Message/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado1").empty();
            $("#messageText").val("");
            
            traerInformacionMensajes();
            alert("se ha Actualizado correctamente el mensaje")
            window.location.reload()

        },
        error: function(jqXHR, textStatus, errorThrown) { 
            window.location.reload()
            alert("No se pudo actualizar por que no hay un cliente y un doctor especificado");

        }
    });

}

function borrarMensaje(idElemento){
    let myData={
        idMessage:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    console.log(dataToSend);
    $.ajax({
        url:"http://129.151.119.138:8080/api/Message/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado1").empty();
            traerInformacionMensajes();
            alert("Se ha Eliminado.")
        }
    });

}