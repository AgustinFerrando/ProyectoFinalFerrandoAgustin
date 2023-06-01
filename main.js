/*--- ProyectoFinalFerrandoAgustin ---*/

// Obtener referencias a los elementos del DOM
const ageMessage = document.getElementById("ageMessage");
const verifyAgeBtn = document.getElementById("verifyAgeBtn");
const formSection = document.getElementById("formSection");
const nameInput = document.getElementById("nameInput");
const submitNameBtn = document.getElementById("submitNameBtn");
const paymentSection = document.getElementById("paymentSection");
const paymentMethod = document.getElementById("paymentMethod");
const cuotasSection = document.getElementById("cuotasSection");
const cuotas = document.getElementById("cuotas");
const tarjetaSection = document.getElementById("tarjetaSection");
const tarjetaNumero = document.getElementById("tarjetaNumero");
const tarjetaVencimiento = document.getElementById("tarjetaVencimiento");
const tarjetaCVV = document.getElementById("tarjetaCVV");
const tarjetaTitular = document.getElementById("tarjetaTitular");
const submitPaymentBtn = document.getElementById("submitPaymentBtn");
const resultSection = document.getElementById("resultSection");
const priceResult = document.getElementById("priceResult");
const installmentsResult = document.getElementById("installmentsResult");
const cardInfo = document.getElementById("cardInfo");
const namesList = document.getElementById("namesList");

// Mostrar mensaje de verificación de edad al cargar la página
window.addEventListener("DOMContentLoaded", function () {
    ageMessage.style.display = "block";
});

// Verificar edad del usuario al hacer clic en el botón
verifyAgeBtn.addEventListener("click", function () {
    const edadUsuario = parseInt(ageInput.value);
    if (edadUsuario >= 18) {
        ageMessage.style.display = "none";
        formSection.style.display = "block";
    }
});

// Enviar nombre ingresado por el usuario al hacer clic en el botón
submitNameBtn.addEventListener("click", function () {
    const nombreIngresado = nameInput.value;
    if (nombreIngresado) {
        formSection.style.display = "none";
        paymentSection.style.display = "block";
    } else {
        alert("Debes ingresar un nombre.");
    }
});

// Mostrar opciones adicionales según la forma de pago seleccionada
paymentMethod.addEventListener("change", function () {
    if (paymentMethod.value === "cuotas") {
        cuotasSection.style.display = "block";
        tarjetaSection.style.display = "block";
    } else {
        cuotasSection.style.display = "none";
        tarjetaSection.style.display = "none";
    }
});

// Procesar el pago al hacer clic en el botón
submitPaymentBtn.addEventListener("click", function () {
    const montoInput = document.getElementById("nameInput2");
    const monto = montoInput.value.replace(/\./g, "");
    const formaPago = paymentMethod.value;

    if (monto === "") {
        
        const sweetAlert = document.querySelector('#submitPaymentBtn');

        sweetAlert.addEventListener('click', () =>{
            Swal.fire({
                title: 'Error!',
                text: 'Ingrese un monto valido.',
                icon: 'error',
                confirmButtonText: 'Cool'
              }); 
        });
        return;
    }

    if (formaPago === "cuotas") {
        const cantidadCuotas = cuotas.value;
        let recargo = 0;

        if (cantidadCuotas === "3") {
            recargo = 18;
        } else if (cantidadCuotas === "6") {
            recargo = 36;
        } else if (cantidadCuotas === "12") {
            recargo = 72;
        } else {
            console.log("Cantidad de cuotas inválida.");
        }

        /* tarjeta debería ser una instancia de una clase Tarjeta */
        const tarjeta = {
            tipo: "credito",
            numero: tarjetaNumero.value,
            vencimiento: tarjetaVencimiento.value,
            cvv: tarjetaCVV.value,
            titular: tarjetaTitular.value,
        };

        /* Esta función debe ser definida al principio del código */
        function calcularMonto(monto, recargo, cantidadCuotas) {
            const montoRecargo = (monto * recargo) / 100;
            const montoTotal = parseFloat(monto) + parseFloat(montoRecargo);
            const montoCuotas = montoTotal / cantidadCuotas;

            return { montoTotal, montoCuotas };
        }

        const resultado = calcularMonto(monto, recargo, cantidadCuotas);

        if (resultado) {
            priceResult.textContent = "Precio final con recargo: " + resultado.montoTotal;
            installmentsResult.textContent = "Monto de cada cuota: " + resultado.montoCuotas;
            cardInfo.textContent =
                "Número de tarjeta: " +
                tarjeta.numero +
                "\n" +
                "Vencimiento de tarjeta: " +
                tarjeta.vencimiento +
                "\n" +
                "Código de seguridad: " +
                tarjeta.cvv +
                "\n" +
                "Titular de la tarjeta: " +
                tarjeta.titular;

            resultSection.style.display = "block";
        }
    } else if (formaPago === "efectivo") {
        priceResult.textContent = "Monto a pagar: " + monto;
        resultSection.style.display = "block";
    } else {
        alert("Forma de pago inválida.");
    }
});

// Almacenar y recuperar nombres ingresados utilizando el almacenamiento local (localStorage)
const storedNames = localStorage.getItem("nombres");

let nombres = [];

if (storedNames) {
    nombres = JSON.parse(storedNames);
    
    namesList.innerHTML = "";

    const p = document.createElement("p");
    p.textContent = "Nombres ingresados: ";
    namesList.appendChild(p);
}

for (let i = 0; i < nombres.length; i++) {
    const listItem = document.createElement("li");
    listItem.textContent = nombres[i];
    console.log(nombres[i]);
    namesList.appendChild(listItem);
}
console.log(namesList);

submitNameBtn.addEventListener("click", function () {
    const nombreIngresado = nameInput.value;
    if (nombreIngresado) {
        nombres.push(nombreIngresado);
        localStorage.setItem("nombres", JSON.stringify(nombres));
    }
});

//Agregado de ApiPlaceHolder con 100 items en consola.
fetch('https://jsonplaceholder.typicode.com/posts')
  .then((response) => response.json())
  .then((json) => console.log(json));


