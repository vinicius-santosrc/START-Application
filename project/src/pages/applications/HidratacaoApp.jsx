import React from "react"
import HeaderHidratacao from "./components/HeaderHidratacao"
import LeftSideHidratacaoBody from "./components/LeftSideHidratacaoBody"
import RightSideHidratacaoInfo from "./components/RightSideHidratacaoInfo"
import BottomHidratacao from "./components/BottomHidratacao"

if(window.location.href == window.location.origin + '/application/hidratacao') {
    document.querySelector('body').style.background = 'black'
}

export default function HidratacaoApp() {
    return(
        <>
            <HeaderHidratacao />
            <div className="flexbox-hidratation">
                <LeftSideHidratacaoBody />
                <RightSideHidratacaoInfo />
            </div>
            <BottomHidratacao />
        </>
    )
}