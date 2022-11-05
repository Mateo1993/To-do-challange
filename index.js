const fecha = document.querySelector("#fecha");
const input = document.querySelector("#input");
const enter = document.querySelector("#enter");
const list = document.querySelector("#list");
const check ='fa-check-circle';
const uncheck = 'fa-circle';
const lineThrough = 'line-through';
let id;
let lista;

//Fecha

function addDate(date){
    const update_date = `<div class="fecha" id="fecha">
                        ${date}
                        </div>` 
    
    fecha.insertAdjacentHTML("afterbegin",update_date);
}

const hoy = new Date();
addDate(hoy.toLocaleDateString());

//Agregar tarea

function addTask(tarea, id, realizado, elimidado){
    if(elimidado){return};

    const real_izado = realizado?check:uncheck;
    const line = realizado?lineThrough:'';
    

    const elemento = `<li class="list-items">
                      <i class="far ${real_izado} co" data="realizado" id=${id}></i>
                      <p class="text ${line}">${tarea}</p>
                      <i class="fas fa-trash de" data="eliminado" id=${id}></i>
                      </li>`

    list.insertAdjacentHTML("beforeend",elemento);
}

//Funcion tarea realizada

function tareaRealizada(element){
    element.classList.toggle(check);
    element.classList.toggle(uncheck);
    element.parentNode.querySelector('.text').classList.toggle(lineThrough);
    lista[element.id].realizado = lista[element.id].realizado?false:true;
    console.log(lista[element.id].realizado)
    
}


//funcion tarea eliminada

function tareaEliminada(element){
    element.parentNode.parentNode.removeChild(element.parentNode)
    lista[element.id].elimidado = true
    console.log(lista[element.id].elimidado)
}




enter.addEventListener("click",()=>{
    const tarea = input.value;
    if(tarea){
        addTask(tarea, id, false, false);
        lista.push({
            nombre: tarea,
            id: id,
            realizado: false,
            elimidado: false
        })
    }else{
        alert("Add a task");
    }
    localStorage.setItem('TODO',JSON.stringify(lista))
    input.value= "";
    id++
})

document.addEventListener("keyup",(event)=>{
    if(event.key=="Enter"){
        const tarea = input.value;
        if(tarea){
            addTask(tarea, id, false, false);
            lista.push({
                nombre: tarea,
                id: id,
                realizado: false,
                elimidado: false
            })
        }else{
            alert("Add a task");
        }
        localStorage.setItem('TODO',JSON.stringify(lista))
        input.value= "";
        id++
    }
})

list.addEventListener('click',(event)=>{
    const element = event.target
    const elementData = element.attributes.data.value
    if(elementData==='realizado'){
        tareaRealizada(element);
    }
    else if(elementData==='eliminado'){
        tareaEliminada(element);
    }
    localStorage.setItem('TODO',JSON.stringify(lista))
})

//local storage get item

let data = localStorage.getItem('TODO');
if(data){
    lista=JSON.parse(data)
    id=lista.length
    cargarLista(lista)
}else{
    lista=[]
    id=0
}

function cargarLista(DATA){
    DATA.forEach(function(i){
        addTask(i.nombre,i.id,i.realizado,i.elimidado)
    })
}