//variables
const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');
const listaCursos= document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn= document.querySelector('#vaciar-carrito');







//listeners
cargaEventListeners();

function cargaEventListeners(){
    //Dispara cuando se presiona agregar carrito
    cursos.addEventListener('click',comprarCurso);
    //cuando se elimina un curso del carrito
    carrito.addEventListener('click',eliminarCurso);
    //vaciar carrito
    vaciarCarritoBtn.addEventListener('click',vaciarCarrito);
    //cargar lista localstorage en carrito
    document.addEventListener('DOMContentLoaded', leerLocalStorage);

}





//funciones
//funcion que añade el curso a carrito
function comprarCurso(e){
    e.preventDefault();
    //delegation para agregar-carrito
    if(e.target.classList.contains('agregar-carrito')){
        const curso= e.target.parentElement.parentElement;
        //leemos los datos del curso seleccionado
        leerDatosCurso(curso);
    }
}

//lee los datos del curso
function leerDatosCurso(curso){
    const infoCurso = {
        imagen: curso.querySelector('.imagen-curso').src,
        titulo: curso.querySelector('h4').innerText,
        precio:curso.querySelector('.precio span').innerText,
        id: curso.querySelector('a').getAttribute('data-id')
    }
    insertarCarrito(infoCurso);
  
}

//muestra el curso seleccionado en el carrito
function insertarCarrito(curso){
    const row= document.createElement('tr');
    row.innerHTML=`
    <td>
        <img src="${curso.imagen}" style="width:100px;">
    </td>
    <td>${curso.titulo}</td>
    <td>${curso.precio}</td>
    <td>
        <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
    </td>
    `;
    listaCursos.appendChild(row);
    guardarCarritoLocalStorage(curso);
}

//eliminar curso
function eliminarCurso(e){
    e.preventDefault();
   let curso,cursoId, cursosLS,cursoLS;
   if(e.target.classList.contains('borrar-curso')){
       e.target.parentElement.parentElement.remove();
       curso=e.target.parentElement.parentElement;
       cursoId=curso.querySelector('.borrar-curso').getAttribute('data-id');
   }
   eliminarCursoLS(cursoId);
}

//vaciar carrito
function vaciarCarrito(e){
    e.preventDefault();
        while(listaCursos.firstChild){
            listaCursos.removeChild(listaCursos.firstChild);
        }
        //vaciar el carro en localStorage
        localStorage.clear('cursos');
        
        return false;
}

function guardarCarritoLocalStorage(curso){
    let cursos;

    cursos = obtenerCursosLocalStorage()
    cursos.push(curso);
    //reescribimos el array entero de localstorage con el curso añadido
    localStorage.setItem('cursos', JSON.stringify(cursos));
}

function obtenerCursosLocalStorage(){
    let cursosLS;

    if(localStorage.getItem('cursos')===null){
        cursosLS=[];
    }else{
        cursosLS = JSON.parse(localStorage.getItem('cursos'));
    }

    return cursosLS;

}


//imprime los cursos de localstorage en el carrito

function leerLocalStorage(){
    let cursosLS;
    cursosLS=obtenerCursosLocalStorage();
    cursosLS.forEach(function(curso){
        const row= document.createElement('tr');
        row.innerHTML=`
        <td>
            <img src="${curso.imagen}" style="width:100px;">
        </td>
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
        </td>
        `;
        listaCursos.appendChild(row);
        
    });
}

//eliminar curso de LocalStorage
function  eliminarCursoLS(cursoId){
    let cursosLS,cursoLS;
    cursosLS= obtenerCursosLocalStorage();
    cursosLS.forEach(function(cursoLS,index){
       if(cursoLS.id === cursoId){
        cursosLS.splice(index,1);
       }
   });

  localStorage.setItem('cursos',JSON.stringify(cursosLS));
}
