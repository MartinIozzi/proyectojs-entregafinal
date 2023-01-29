let madera
let precio_total = 0;
let compras = []
let num_id = 0;

class Venta{
    constructor(id, tipo_madera, alto, ancho, cuotas){
        this.id = id;
        this.tipo_madera = tipo_madera;
        this.alto = alto;
        this.ancho = ancho;
        this.precio_sin_iva
        this.precio_con_iva
        this.cuotas = cuotas;
        this.precio_mensual
        this.precio_final
    }

    calcular_precio () {

        const metro_pino = 100;
        const metro_roble = 80;
        const metro_arce = 120;
        const metro_cerezo = 200;

        let metros = this.alto * this.ancho;
        let tipo = this.tipo_madera;

        if (tipo == "pino" || tipo == "Pino" || tipo == "PINO") {
            this.precio_sin_iva = metros * metro_pino
        }
        else if (tipo == "roble" || tipo == "Roble" || tipo == "ROBLE") {
            this.precio_sin_iva = metros * metro_roble
        }
        else if (tipo == "arce" || tipo == "Arce" || tipo == "ARCE") {
            this.precio_sin_iva = metros * metro_arce
        }
        else if (tipo == "cerezo" || tipo == "Cerezo" || tipo == "CEREZO") {
            this.precio_sin_iva = metros * metro_cerezo
        }
    }

    calcular_iva () {
        const iva = 1.21;
        this.precio_con_iva = iva * this.precio_sin_iva

    }

    precio_cuotas () {
        let cuotas = this.cuotas
        if (cuotas == 1) {
            this.precio_final = this.precio_con_iva;
        }
        else if (cuotas == 3) {
            this.precio_final = this.precio_con_iva * 1.15;
        }
        else if (cuotas == 6) {
            this.precio_final = this.precio_con_iva * 1.30;
        }
        else if (cuotas == 9) {
            this.precio_final = this.precio_con_iva * 1.45;
        }
        else if (cuotas == 12) {
            this.precio_final = this.precio_con_iva * 1.60;
        }
        this.precio_mensual = this.precio_final / cuotas
    }

    compra() {
        this.calcular_precio()
        this.calcular_iva()
        this.precio_cuotas()
    }
}

function guardar_datos() {  
    num_id++;
    let nueva = new Venta (num_id,
    document.getElementById("casilleros1").value, 
    document.getElementById("casilleros2").value,
    document.getElementById("casilleros3").value, 
    document.getElementById("casilleros4").value)
    nueva.compra()

    let madera = {
        id: nueva.id,
        tipo: nueva.tipo_madera,
        alto: nueva.alto,
        ancho: nueva.ancho,
        cuotas: nueva.cuotas,
        precio_con_iva: nueva.precio_con_iva,
        precio_sin_iva: nueva.precio_sin_iva,
        precio_mensual: nueva.precio_mensual,
        precio_final: nueva.precio_final
    }

    compras.push(madera)

    let madera_JSON = JSON.stringify (compras)

    localStorage.setItem("local" , madera_JSON)

    console.log(compras)

    let contenedor = document.getElementById ("contenedor");
    let marco = document.createElement("div");
    let img = document.createElement("div");
    let contenido = document.createElement("div");
    let boton_eliminar = document.createElement("div");

    marco.className = "panel_compras"
    img.className = "panel_img"
    contenido.className = "panel_contenido"
    boton_eliminar.className = "panel_eliminar"

    if(madera.tipo == "roble" || madera.tipo == "Roble" || madera.tipo == "ROBLE") {
        let imagen = document.createElement("img")
        imagen.src = "./img/roble.jpg"
        img.append(imagen)
    }
    else if (madera.tipo == "pino" || madera.tipo == "Pino" || madera.tipo == "PINO") {
        let imagen = document.createElement("img")
        imagen.src = "./img/pino.jpg"        
        img.append(imagen)
    }
    else if (madera.tipo == "arce" || madera.tipo == "Arce" || madera.tipo == "ARCE") {
        let imagen = document.createElement("img")
        imagen.src = "./img/arce.jpg"
        img.append(imagen)
    }
    else if (madera.tipo == "cerezo" || madera.tipo == "Cerezo" || madera.tipo == "CEREZO") {
        let imagen = document.createElement("img")
        imagen.src = "./img/cerezo.jpg"
        img.append(imagen)
    }
    else{}

    let parrafo1 = document.createElement("p")
    parrafo1.innerHTML = `<strong>El tipo de madera es:</strong> ${nueva.tipo_madera}`
    contenido.append(parrafo1)

    let parrafo2 = document.createElement("p")
    parrafo2.innerHTML = `<strong>El alto de las maderas es de:</strong> ${nueva.alto}`
    contenido.append(parrafo2)
    
    let parrafo3 = document.createElement("p")
    parrafo3.innerHTML = `<strong>El ancho de las maderas es de:</strong> ${nueva.ancho}`
    contenido.append(parrafo3)

    let parrafo4 = document.createElement("p")
    parrafo4.innerHTML = `<strong>El precio con iva es:</strong> $${nueva.precio_con_iva = Math.round(nueva.precio_con_iva)}`
    contenido.append(parrafo4)

    let parrafo5 = document.createElement("p")
    parrafo5.innerHTML = `<strong>El precio sin iva es:</strong> $${nueva.precio_sin_iva = Math.round(nueva.precio_sin_iva)}`
    contenido.append(parrafo5)
    
    let parrafo6 = document.createElement("p")
    parrafo6.innerHTML = `<strong>La cantidad de cuotas son de:</strong> ${nueva.cuotas}`
    contenido.append(parrafo6)
    
    let parrafo7 = document.createElement("p")
    parrafo7.innerHTML = `<strong>El precio final es de:</strong> $${nueva.precio_final = Math.round(nueva.precio_final)}`
    contenido.append(parrafo7)

    let eliminar = document.createElement("p")
    eliminar.innerHTML = `Eliminar selección`
    boton_eliminar.append(eliminar)
    eliminar.addEventListener("click" , function(){
        marco.className = "esconder"
        let id = document.getElementById ("id").value

        let copia_carrito = JSON.parse(localStorage.getItem('local'))
        console.log(copia_carrito)
        for(let i=0; i<copia_carrito.length;i++){
            if(copia_carrito[i].id==id){
                copia_carrito.splice(i,1)
            }
        }
        let carrito_JSON = JSON.stringify (copia_carrito)
        localStorage.setItem('local' , carrito_JSON)
    })

    let lista_compra = JSON.parse(localStorage.getItem('local'))
    lista_compra.forEach(compra => {
    precio_total += compra.precio_final
    })

    let texto_final = document.getElementById("mostrar_precio");
    texto_final.innerHTML = `$${precio_total = Math.round (precio_total)}`

    let parrafo_nuevo = document.createElement("p");
    parrafo_nuevo.className = "esconder"
    parrafo_nuevo.setAttribute("id", "id")
    parrafo_nuevo.innerText = num_id
    contenido.append(parrafo_nuevo)



    //ALERT
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Tu compra a sido guardada',
        showConfirmButton: false,
        timer: 1200
      })

      marco.append(img);
      marco.append(contenido);
      marco.append(boton_eliminar);
      contenedor.append(marco);
}

//ALERT
function seguir_comprando (){
    Swal.fire({
        title: '¿Quiere seguír comprando?',
        text: "Seleccione una opción",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, quiero seguir comprando'
      }).then((result) => {
        if (result.isConfirmed) {
            let campo1 = document.getElementById("casilleros1");
            let campo2 = document.getElementById("casilleros2");
            let campo3 = document.getElementById("casilleros3");
            let campo4 = document.getElementById("casilleros4");

            campo1.value = "";
            campo2.value = "";
            campo3.value = "";
            campo4.value = "";
          Swal.fire({
            icon: 'success',
            text: 'Éxito'
        })
        }
      })
}
