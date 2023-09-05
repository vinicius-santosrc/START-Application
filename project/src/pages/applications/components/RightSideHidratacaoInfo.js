import React from "react"
import { app, auth } from '../../../lib/firebase';
import Swal from 'sweetalert2'

function add250ml() {
    AddtoListOfMl(250)
}

function add500ml() {
    AddtoListOfMl(500)
}

function add750ml() {
    AddtoListOfMl(750)
}

function add1000ml() {
    AddtoListOfMl(1000)
}

const datatoday = new Date;
const dia = datatoday.getDate()

const current_timestamp = dia
let hidratationlist = []

if(localStorage.getItem("database-hidratationt137tg178t")) {
    hidratationlist = JSON.parse(localStorage.getItem("database-hidratationt137tg178t"))
}
else {
    localStorage.setItem("database-hidratationt137tg178t", '[]')
}

if(localStorage.getItem('datatodayfaint123g8t71') != dia) {
    localStorage.setItem("database-hidratationt137tg178t", '[]')
}
localStorage.setItem("datatodayfaint123g8t71", current_timestamp)

function AddtoListOfMl(value) {
    hidratationlist.push({
        qnt: value
    })
    Save()
    window.location.reload()
}

function Save() {
    localStorage.setItem("database-hidratationt137tg178t", JSON.stringify(hidratationlist))
}

export default function RightSideHidratacaoInfo() {
    return(
        <>
            <div className="block-rightside">
                <h3>CLIQUE PARA ADICIONAR AO SEU PROGRESSO DIÁRIO</h3>
                <div className="cards-hidratation">
                    <div onClick={add250ml} className="card-h">
                        <p><i className="fa-solid fa-glass-water"></i> 250ml</p>
                    </div>
                    <div onClick={add500ml} className="card-h">
                        <p><i className="fa-solid fa-glass-water"></i> 500ml</p>
                    </div>
                    <div onClick={add750ml} className="card-h">
                        <p><i className="fa-solid fa-glass-water"></i> 750ml</p>
                    </div>
                    <div onClick={add1000ml} className="card-h">
                        <p><i className="fa-solid fa-glass-water"></i> 1000ml</p>
                    </div>
                </div>
            </div>
        </>
    )
}