const entrada = document.getElementById("nueva-tarea");
const botonAgregar = document.getElementById("agregar");
const lista = document.getElementById("lista");
const contador = document.getElementById("contador");

let tareas = [];

function guardar() {
  localStorage.setItem("tareas", JSON.stringify(tareas));
}

function cargar() {
  const guardadas = localStorage.getItem("tareas");
  if (guardadas !== null) {
    tareas = JSON.parse(guardadas);
  }
}

function mostrar() {
  lista.innerHTML = "";

  tareas.forEach(function (tarea, indice) {
    const li = document.createElement("li");
    if (tarea.completada) {
      li.classList.add("completada");
    }

    const texto = document.createElement("span");
    texto.textContent = tarea.texto;
    texto.addEventListener("click", function () {
      tareas[indice].completada = !tareas[indice].completada;
      guardar();
      mostrar();
    });

    const botonBorrar = document.createElement("button");
    botonBorrar.textContent = "Borrar";
    botonBorrar.addEventListener("click", function () {
      tareas.splice(indice, 1);
      guardar();
      mostrar();
    });

    li.appendChild(texto);
    li.appendChild(botonBorrar);
    lista.appendChild(li);
  });

  const pendientes = tareas.filter(function (t) {
    return !t.completada;
  }).length;

  if (tareas.length === 0) {
    contador.textContent = "No hay tareas todavía";
  } else {
    contador.textContent = "Pendientes: " + pendientes + " de " + tareas.length;
  }
}

function agregarTarea() {
  const texto = entrada.value.trim();

  if (texto === "") {
    return;
  }

  tareas.push({ texto: texto, completada: false });
  entrada.value = "";
  guardar();
  mostrar();
}

botonAgregar.addEventListener("click", agregarTarea);

entrada.addEventListener("keydown", function (evento) {
  if (evento.key === "Enter") {
    agregarTarea();
  }
});

cargar();
mostrar();