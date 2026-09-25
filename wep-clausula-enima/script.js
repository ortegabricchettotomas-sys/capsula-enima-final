let loadmorebtn = document.querySelector('#load-more');
let currentitem = 4;

loadmorebtn.onclick = () => {

    let boxes = [...document.querySelectorAll('.box-container .box')];
    for(var i = currentitem; i< currentitem +4; i++) {
        boxes[i].style.display = 'inline-block'
    }
    currentitem +=4;
    if(currentitem >=boxes.length) {
        loadmorebtn.style.display='none'
    }
}


// //carrito
const carrito = document.getElementById('carrito');
const elementos1 = document.getElementById('lista-1');
const lista = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
const totalContenedor = document.getElementById('val-total'); 

cargarEventListeners();

function cargarEventListeners() {
    elementos1.addEventListener('click', comprarElemento);
    carrito.addEventListener('click', eliminarElemento);
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
}

function comprarElemento(e) {
    if(e.target.classList.contains('agregar-carrito')) {
        e.preventDefault();
        const elemento = e.target.parentElement.parentElement;
        leerDatosElemento(elemento);
    }
}

function leerDatosElemento(elemento) {

    let precioTexto = elemento.querySelector('.precio').textContent;
    let precioNumerico = parseFloat(precioTexto.replace(/[^0-9.]/g, ''));

    const infoElemento = {
        Imagen: elemento.querySelector('img').src,
        titulo: elemento.querySelector('h3').textContent,
        precio: precioNumerico,
        id: elemento.querySelector('a').getAttribute('data-id'),
        cantidad: 1 
    }

   
    const existe = Array.from(lista.querySelectorAll('tr')).find(row => row.querySelector('.borrar').getAttribute('data-id') === infoElemento.id);

    if (existe) {
       
        const campoCantidad = existe.querySelector('.col-cantidad');
        let cantidadActual = parseInt(campoCantidad.textContent);
        campoCantidad.textContent = cantidadActual + 1;
    } else {
       
        insertarCarrito(infoElemento);
    }

    calcularTotal();
}

function insertarCarrito(elemento) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td style="padding: 10px; text-align: center;">
            <img src="${elemento.Imagen}" width="80" style="display: block; margin: 0 auto;" />
        </td>
        <td style="padding: 10px; text-align: left; min-width: 100px;">
            ${elemento.titulo}
        </td>
        <td class="col-precio" style="padding: 10px; text-align: center; min-width: 80px;">
            $${elemento.precio}
        </td>
        <td class="col-cantidad" style="padding: 10px; text-align: center; min-width: 60px; font-weight: bold;">
            ${elemento.cantidad}
        </td>
        <td style="padding: 10px; text-align: center;">
            <a href="#" class="borrar" data-id="${elemento.id}" style="text-decoration: none; color: red; font-weight: bold;">X</a>
        </td>
    `;
    lista.appendChild(row);
}

function eliminarElemento(e) {
    e.preventDefault();
    if(e.target.classList.contains('borrar')) {
        const fila = e.target.parentElement.parentElement;
        const campoCantidad = fila.querySelector('.col-cantidad');
        let cantidadActual = parseInt(campoCantidad.textContent);

        if (cantidadActual > 1) {
           
            campoCantidad.textContent = cantidadActual - 1;
        } else {
            
            fila.remove();
        }

       
        calcularTotal();
    }
}

function vaciarCarrito() {
    while(lista.firstChild) {
        lista.removeChild(lista.firstChild);
    }
    calcularTotal(); 
    return false;
}


function calcularTotal() {
    let total = 0;
    const filas = lista.querySelectorAll('tr');

    filas.forEach(fila => {
        const precioTexto = fila.querySelector('.col-precio').textContent;
        const precio = parseFloat(precioTexto.replace(/[^0-9.]/g, ''));
        const cantidad = parseInt(fila.querySelector('.col-cantidad').textContent);
        
        total += precio * cantidad;
    });

    totalContenedor.textContent = total.toLocaleString('es-AR'); 
}