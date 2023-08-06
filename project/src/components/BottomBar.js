import React from 'react';

function BottomBar() {
    return (
        <div className='bottom-bar'>
            <div className='icon'>
                <i className="fa-solid fa-calendar"></i>
                <h3>ROTINA</h3>
            </div>

            <div className='icon'>
                <i className="fa-solid fa-dumbbell"></i>
                <h3>ACADEMIA</h3>
            </div>

            <div className='icon'>
                <i className="fa-solid fa-droplet"></i>
                <h3>HIDRATAÇÃO</h3>
            </div>

            <div className='icon'>
                <i className="fa-solid fa-bolt"></i>
                <h3>PROLEPSE</h3>
            </div>

            <div className='icon'>
                <i className="fa-solid fa-gear"></i>
                <h3>AJUSTES</h3>
            </div>
        
      </div>
    )
}

export default BottomBar