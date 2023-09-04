
import React from 'react';
import HeaderApp from '../../components/HeaderApp';

import HeaderProlepse from './components/HeaderProlepse';
import Cronometro from './components/Cronometro';


if(window.location.href == window.location.origin + '/prolepse/cronometro') {
    document.querySelector('body').style.background = 'black'
}


function CronometroPage() {
    return (
        <div className="App">

            <HeaderProlepse />
            <div className='contents-page'>
                <Cronometro />
            </div>
        </div>
    )
}

export default CronometroPage;