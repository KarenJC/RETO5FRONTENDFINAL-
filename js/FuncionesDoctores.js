function autoInicioRealacionEspecialidades(){

    $.ajax({
        url:"http://129.151.119.138:8080/api/Specialty/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            
            let $select = $("#select-specialty");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
            }); 
        }
    
    })
}


function traerInformacionDoctores(){
    console.log("se esta ejecutando")
    $.ajax({
        url:"http://129.151.119.138:8080/api/Doctor/all",
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
        myTable+="<th><font color=#015D5F> Nombre</font> </th>";
        myTable+="<th><font color=#015D5F> Departamento </font></th>";
        myTable+="<th><font color=#015D5F> Año Graduacion </font> </th>";
        myTable+="<th><font color=#015D5F> Description </font> </th>";
        myTable+="<th><font color=#015D5F> Especialidad </font> </th>";
        myTable+="<th colspan=2> <font color=015D5F> Opciones </font> </th>";
        myTable+="</tr>";

    for(i=0;i<respuesta.length;i++){
       
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].department+"</td>";
        myTable+="<td>"+respuesta[i].year+"</td>";
        myTable+="<td>"+respuesta[i].description+"</td>";
        myTable+="<td>"+respuesta[i].specialty.name+"</td>";
        myTable+="<td> <button onclick='actualizarDoctor("+respuesta[i].id+")'>Actualizar</button>";
        myTable+="<td> <button onclick='borrarDoctor("+respuesta[i].id+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado").html(myTable);
}

function guardarInformacionDoctor(){
    let var2 = {

        name:$("#name").val(),
        department:$("#department").val(),
        year:$("#year").val(),
        description:$("#description").val(),
        specialty:{id:+$("#select-specialty").val()},
    };

    console.log(var2);
        $.ajax({
        type:'POST',
        contentType:"application/json; charset=utf-8",
        dataType:'JSON',
        data: JSON.stringify(var2),

        url:"http://129.151.119.138:8080/api/Doctor/save",

       
        
        success:function(response) {
                console.log(response);
            console.log("Se guardo correctamente");
            alert("Se guardo correctamente");
            window.location.reload()
        },
        
        error: function(jqXHR, textStatus, errorThrown) { 
            window.location.reload()
            alert("No se guardo correctamente porque no hay una ESPECIALIDAD selecionada ");

        }
    });

    
}


function actualizarDoctor(idElemento){

    let myData={
        id:idElemento,
        name:$("#name").val(),
        department:$("#department").val(),
        year:$("#year").val(),
        description:$("#description").val(),
        specialty:{id: +$("#select-specialty").val()},

    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.119.138:8080/api/Doctor/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#name").val("");
            $("#department").val("");
            $("#year").val("");
            $("#description").val("");
            traerInformacionDoctores();
            alert("Se ha Actualizado Correctamente!")
            window.location.reload()

        },
        error: function(jqXHR, textStatus, errorThrown) { 
            window.location.reload()
            alert("No se pudo actualizar porque no hay una ESPECIALIDAD selecionada "); 

        }   
    }); 
        
}


function borrarDoctor(idElemento){
    let myData={
        id:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.119.138:8080/api/Doctor/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            traerInformacionDoctores();
            alert("Se ha Eliminado.")
        },
        error: function(jqXHR, textStatus, errorThrown) { 
            window.location.reload()
            alert("No se pudo Eliminar porque hay datos relacionados en Reservaciones y/o Mensajes  ");
        }
    });

}