$(document).ready(function(){
    tablaProyectos = $("#tablaProyectos").DataTable({
       "columnDefs":[{
        "targets": -1,
        "data":null,
        "defaultContent": "<div class='text-center'><div class='btn-group'><button class='btn btn-primary btnEditar'>Editar</button><button class='btn btn-danger btnBorrar'>Borrar</button></div></div>"  
       }],
        
        //Para cambiar el lenguaje a español
    "language": {
            "lengthMenu": "Mostrar _MENU_ registros",
            "zeroRecords": "No se encontraron resultados",
            "info": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "infoFiltered": "(filtrado de un total de _MAX_ registros)",
            "sSearch": "Buscar:",
            "oPaginate": {
                "sFirst": "Primero",
                "sLast":"Último",
                "sNext":"Siguiente",
                "sPrevious": "Anterior"
             },
             "sProcessing":"Procesando...",
        }
    });
    
$("#btnNuevo").click(function(){
    $("#formProyectos").trigger("reset");
    $(".modal-header").css("background-color", "#28a745");
    $(".modal-header").css("color", "white");
    $(".modal-title").text("Nuevo Proyecto");            
    $("#modalCRUD").modal("show");        
    id=null;
    opcion = 1; //alta
});    
    
var fila; //capturar la fila para editar o borrar el registro
    
//botón EDITAR    
$(document).on("click", ".btnEditar", function(){
    fila = $(this).closest("tr");
    id = parseInt(fila.find('td:eq(0)').text());
    unidad = fila.find('td:eq(1)').text();
    detalle = fila.find('td:eq(2)').text();
    prioridad = parseInt(fila.find('td:eq(3)').text());
    
    $("#unidad").val(unidad);
    $("#detalle").val(detalle);
    $("#prioridad").val(prioridad);
    opcion = 2; //editar
    
    $(".modal-header").css("background-color", "#007bff");
    $(".modal-header").css("color", "white");
    $(".modal-title").text("Editar Persona");            
    $("#modalCRUD").modal("show");  
    
});

//botón BORRAR
$(document).on("click", ".btnBorrar", function(){    
    fila = $(this);
    id = parseInt($(this).closest("tr").find('td:eq(0)').text());
    opcion = 3 //borrar
    var respuesta = confirm("¿Está seguro de eliminar el registro: "+id+"?");
    if(respuesta){
        $.ajax({
            url: "bd/crud.php",
            type: "POST",
            dataType: "json",
            data: {opcion:opcion, id:id},
            success: function(){
                tablaProyectos.row(fila.parents('tr')).remove().draw();
            }
        });
    }   
});
    
$("#formProyectos").submit(function(e){
    e.preventDefault();    
    unidad = $.trim($("#unidad").val());
    detalle = $.trim($("#detalle").val());
    prioridad = $.trim($("#prioridad").val());    
    $.ajax({
        url: "bd/crud.php",
        type: "POST",
        dataType: "json",
        data: {unidad:unidad, detalle:detalle, prioridad:prioridad, id:id, opcion:opcion},
        success: function(data){  
            console.log(data);
            id = data[0].id;            
            unidad = data[0].unidad;
            detalle = data[0].detalle;
            prioridad = data[0].prioridad;
            if(opcion == 1){tablaProyectos.row.add([id,unidad,detalle,prioridad]).draw();}
            else{tablaProyectos.row(fila).data([id,unidad,detalle,prioridad]).draw();}            
        }        
    });
    $("#modalCRUD").modal("hide");    
    
});    
    
});