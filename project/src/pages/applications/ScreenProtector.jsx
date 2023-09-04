
import React from 'react';
import HeaderApp from '../../components/HeaderApp';

import HeaderProlepse from './components/HeaderProlepse';
import ScreenProtectorPage from './components/ScreenProtectorPage';


if(window.location.href == window.location.origin + '/prolepse/screenprotect') {
    document.querySelector('body').style.background = 'black'
}

export default function ScreenProtector() {
    return (
        <div className="App">

            <HeaderProlepse />
            <div className='contents-page'>
                <ScreenProtectorPage />
            </div>
        </div>
    )
}

