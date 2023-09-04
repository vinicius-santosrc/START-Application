import React from "react"
import { Form } from "react-router-dom";

let horadisplay
let horas;
let minutos; 
let segundos;


horadisplay = setInterval(() => {
    if(window.location.href == window.location.origin + '/prolepse/screenprotect') {
        let tempo = new Date();
        function timeformat(i) {
            return i < 10 ? i = '0' + i : i
        }
        
        horas = tempo.getHours();
        minutos = tempo.getMinutes();
        segundos = tempo.getSeconds();

        document.querySelector("#horaatual").textContent = timeformat(horas);
        document.querySelector("#minutosatuais").textContent = timeformat(minutos);
        document.querySelector("#segundosatuais").textContent = timeformat(segundos);
    }
}, 1000)

export default function ScreenProtectorPage() {
    return(
       <>
       <div className="cronometro-display">
            <div className="cronometro-display-time">
                <h1 className="tempo" id="horaatual">00</h1>
                <span className="separador">:</span>
                <h1 className="tempo" id="minutosatuais">00</h1>
                <span className="separador">:</span>
                <h1 className="tempo" id="segundosatuais">00</h1>
            </div>
            <div className="frase-motivacional">
            <h2>NÃO DESISTA, CADA DIA VOCÊ ESTÁ MAIS PROXIMO DO SEU OBJETIVO</h2>
       </div>
       </div>
    
       </>
    )
}