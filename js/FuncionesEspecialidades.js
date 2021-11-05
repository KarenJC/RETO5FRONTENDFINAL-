function traerInformacionEsp(){
    console.log("test"); 
    $.ajax({
        url:"http://129.151.119.138:8080/api/Specialty/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaEsp(respuesta);
        }
    });
}

function pintarRespuestaEsp(respuesta){

    let myTable="<table>";

        myTable+="<tr>";
        myTable+="<th><font color=#527300> Nombre Especialidad </font></th>";
        myTable+="<th><font color=#527300> Descripcion </font> </th>";
        myTable+="<th colspan=2> <font color=527300> Opciones </font> </th>";
        myTable+="</tr>";

    for(i=0;i<respuesta.length;i++){
       
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].description+"</td>";
        myTable+="<td> <button onclick=' actualizarInformacion("+respuesta[i].id+")'>Actualizar</button>";
        myTable+="<td> <button onclick='borrarEspecialidad("+respuesta[i].id+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado2").html(myTable);
}


function guardarInformacionEsp(){
    let myDataEsp={
        name:$("#nameEsp").val(),
        description:$("#descriptionEsp").val(),
    };
    
    $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(myDataEsp),
        
        url:"http://129.151.119.138:8080/api/Specialty/save",


        success:function(response) {
                console.log(response);
            console.log("Se guardo correctamente");
            alert("Se guardo correctamente");
            window.location.reload()
        },

         error: function(jqXHR, textStatus, errorThrown) {
              window.location.reload()
            alert("No se guardo correctamente");

        }

    });

}

function actualizarInformacion(idElemento){

    let myData={
        id:idElemento,
        name:$("#nameEsp").val(),
        description:$("#descriptionEsp").val()

    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.119.138:8080/api/Specialty/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado2").empty();
            $("#id").val("");
            $("#nameEsp").val("");
            $("#descriptionEsp").val("");
            traerInformacionEsp();
            alert("Se ha Actualizado correctamente")
        }
    });

}

function borrarEspecialidad(idElemento){
    let myData={
        id:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    console.log(dataToSend);
    $.ajax({
        url:"http://129.151.119.138:8080/api/Specialty/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado2").empty();
            traerInformacionEsp();
            alert("Se ha Eliminado.")
        }
    });

}
