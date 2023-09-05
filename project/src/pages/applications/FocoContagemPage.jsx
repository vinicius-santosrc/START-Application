import HeaderProlepse from './components/HeaderProlepse';
import FocoContagem from "./components/FocoContagem";
import React from "react";

if(window.location.href == window.location.origin + '/prolepse/foco') {
    document.querySelector('body').style.background = 'black'
}
export default function FocoContagemPage() {
    return (
        <div className="App">
            <HeaderProlepse />
            <div className='contents-page'>
                <FocoContagem />
            </div>
        </div>
    )
}