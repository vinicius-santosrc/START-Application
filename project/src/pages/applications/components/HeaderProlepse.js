import React from 'react';

function openbarprolepse() {

}

function openbarprolepsemobile() {
    
}

export default function HeaderProlepse() {
    return(
        <>
        <div className='flex-header-application-prolepse'>
            <i onClick={openbarprolepse} className="fa-solid fa-bars"></i>
            <h1>START</h1>
        </div>
        <div className='pc-header-flexbox-prolepse'>
            <h1>START</h1>
            <i className="fa-solid fa-bars"></i>
        </div>
    </>
    )
}