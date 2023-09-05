import React from "react"

let total = 0
let db_ls = localStorage.getItem("database-hidratationt137tg178t")

function TotalOfItems() {
    if(db_ls != null) {
        JSON.parse(db_ls).map((r) => {
            let filejson = [r.qnt]
            filejson.forEach((i) => {
                total += i
            })
        })
        return total /4;
    }
}


export default function LeftSideHidratacaoBody() {
    return(
        <>
            <div className="right-side-hidratacao">
                <div className="background-circle"></div>
                    <div className="body-target"></div>
                    <div className="body-info-target">
                        <progress value={TotalOfItems()} max={2000} />
                        <p>{TotalOfItems()}ml de 2.000ml</p>
                    </div>
            </div>
        </>
    )
}