//Variables

const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');
const listaCursos = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn= document.querySelector('#vaciar-carrito');

//Listeners
cargarEventListeners();

function cargarEventListeners(){

    cursos.addEventListener('click', comprarCurso);
    
    carrito.addEventListener('click', borrarCurso);

    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

    document.addEventListener('DOMContentLoaded',leerLocalStorage);
}


//funciones
//funcion que añade el curso al carrito
function comprarCurso(e){
e.preventDefault();
  if(e.target.classList.contains('agregar-carrito')){
    const curso= e.target.parentElement.parentElement;
    //enviamos el curso para leer los datos
    leerDatosCurso(curso);
  }

}

//leer los datos de curso
function leerDatosCurso(curso){
    const infoCurso ={
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id')
    }

    insertarCarrito(infoCurso);
}

//inserta la info del carrito
function insertarCarrito(curso){
    const row = document.createElement('tr');
    row.innerHTML= `
        <td>
            <img src="${curso.imagen}" width="100">
        </td>
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
    `;
    listaCursos.appendChild(row);
    guardarCursoLocalStorage(curso);
}

//borrar curso del carrito
function borrarCurso(e){
    e.preventDefault;
    let curso,cursoId;
    if (e.target.classList.contains('borrar-curso')){
        e.target.parentElement.parentElement.remove();
        curso = e.target.parentElement.parentElement;
        cursoId= curso.querySelector('a').getAttribute('data-id'); 
    }
    eliminarCursoLocalStorage(cursoId);

}

//borrar carrito
function vaciarCarrito(){
    let cursos;
    while(listaCursos.firstChild){
        listaCursos.removeChild(listaCursos.firstChild);
    }
    eliminarCarritoLS();
}

//function carrito LocalStorage
function guardarCursoLocalStorage(curso){
    let cursos;
    //
    cursos=obtenerCursosLocalStorage();
    cursos.push(curso);
    localStorage.setItem('cursos',JSON.stringify(cursos));
}

//Comprueba que haya elementos localStorage
function obtenerCursosLocalStorage(){
    let cursosLS;

    if(localStorage.getItem('cursos')===null){
        cursosLS=[];
    }else{
        cursosLS = JSON.parse(localStorage.getItem('cursos'));
    }

    return cursosLS;
}

// carga los cursos en el carrito al cargar el DOM de la pagina

function leerLocalStorage(){
    let cursosLS;
    cursosLS= obtenerCursosLocalStorage();
    cursosLS.forEach(curso => {
        //construir el template
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
            <img src="${curso.imagen}" width="100">
        </td>
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
    `;
        listaCursos.appendChild(row);
    });
}

function eliminarCursoLocalStorage(cursoBorrar){
    let cursosLS;

    cursosLS= obtenerCursosLocalStorage();

    cursosLS.forEach(function(curso,index){
        if (curso.id === cursoBorrar){
            cursosLS.splice(index,1)
        }
    });
    localStorage.setItem('cursos', JSON.stringify(cursosLS));
}

//vacia carrito LS
function eliminarCarritoLS(){
    localStorage.clear();
}