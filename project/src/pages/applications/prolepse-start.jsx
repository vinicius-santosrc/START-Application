
import React from 'react';
import HeaderApp from '../../components/HeaderApp';

import HeaderProlepse from './components/HeaderProlepse';
import Cronometro from './components/Cronometro';


if(window.location.href == window.location.origin + '/prolepse/start') {
    document.querySelector('body').style.background = 'black'
}


function ProlepseStartPage() {
    return (
        <div className="App">

            <HeaderProlepse />
            <div className='contents-page'>
                
                <Cronometro />
            </div>
        </div>
    )
}

export default ProlepseStartPage;