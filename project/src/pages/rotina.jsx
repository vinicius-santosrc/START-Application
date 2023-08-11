import React, { createElement } from 'react';
import HeaderApp from '../components/HeaderApp';
import { app, auth } from '../systemlogin';
import { json } from 'react-router-dom';
import Swal from 'sweetalert2'




function buttonrotinaauto() {
    alert('button rotina auto')
}

app.auth().onAuthStateChanged(u => {
    if(u) {
        adicionarotinasexistentes(u)
    }
})

function adicionarotinasexistentes(u) {
    app.firestore()
    .collection("rotinas")
    .where('user.uid', '==', u.uid)
    .orderBy('date', 'desc')
    .get()
    .then(s => {
        const rotinas = s.docs.map(doc => ({
            ...doc.data(),
            uid: doc.id
            }));
        if(rotinas) {
            showrotinas(rotinas)

        }
        if(rotinas.length == 0) {
            document.querySelector('.rotinasmobile').style.display = 'none';document.querySelector('.rotinas-pc').style.display = 'none'
        }
    }).catch(e => {
        console.log('ERRO AO CARREGAR/ CONSULTE UM DESENVOLVEDOR / erro: ' + e)
    })
}

function showrotinas(rotinas) {
    const divrotinas = document.querySelector('.db-rotinas')
    
    rotinas.forEach(rotinas => {
        const divinside = document.createElement('div')
        divinside.setAttribute('class', 'rotina')
        const divleft = document.createElement('div')
        divleft.setAttribute('class', 'left-side-button-rotina')

        const li = document.createElement('li');
        li.classList.add('right-side-button-rotina')

        const name = document.createElement('h2');
        name.innerHTML = rotinas.name
        divleft.appendChild(name);

        const desc = document.createElement('p');
        desc.innerHTML = rotinas.description
        divleft.appendChild(desc);

        const date = document.createElement('p');
        date.innerHTML = formatDate(rotinas.date)
        divleft.appendChild(date);

        const rotina_list = document.createElement('li')

        const insiderotinalist = document.createElement('div')
        insiderotinalist.setAttribute('class', 'listofrotinas')
        rotina_list.appendChild(insiderotinalist)

        divinside.addEventListener('click', () => {
            if(document.querySelector('.rotina_item') == null) {
                loadrotinas()
            }
            else {
                document.querySelector('.listofrotinas').innerHTML = ''
            }
        })

        li.appendChild(rotina_list)
        divinside.appendChild(divleft)
        divinside.appendChild(li)

        divrotinas.appendChild(divinside)


        function loadrotinas() {
            window.location.href = './rotina?uid=' + rotinas.uid
            
        }
    })

}

getUrlRotina()


function getUrlRotina() {
    const urlParams = new URLSearchParams(window.location.search)
    return urlParams.get('uid')
}

function isnewrotine() {
    return getUrlRotina() ? false : true;
}

function excluirrotina() {
    
    const uid = getUrlRotina();
    app.firestore()
    .collection("rotinas")
    .doc(uid)
    .delete()
    .then(() => {
        Swal.fire(
            'Deletada!',
            'Sua rotina foi excluída com sucesso.',
            'success'
          )
        window.location.href='./rotina'
    })
    .catch((e) => {
        alert('ERRO: ' + e)
        
        window.location.href='./rotina'
    })
}
if (!isnewrotine()) {
    const uid = getUrlRotina();
    app.firestore()
    .collection("rotinas")
    .doc(uid)
    
    .get()
    .then(doc => {
        if(doc.exists) {
            console.log(doc.data())
            document.querySelector('.rotinaedit').style.display = 'block'
            var rotinaatual = doc.data()
            var rotina2 = rotinaatual.rotina

            let output = ''

            rotina2.forEach(i => {
                console.log(rotina2.forEach(i => {
                    console.log(i.name)
                }))
                output += `<div class="componentrotinashow">
                    <h2>
                    ${JSON.stringify(i)}
                    </h2>
                </div>`
            })
            document.querySelector('.nameeditrotina').value = rotinaatual.name
            document.querySelector('.desceditrotina').value = rotinaatual.description
            document.querySelector('.rotina-exist').innerHTML = output
            }


        else {
            window.location.href="./rotina"
        }
    })
    .catch((e) => {
        alert('ERRO: ' + e)
        window.location.href="./rotina"
    })
}

function formatDate(date) {
    return new Date(date).toLocaleDateString('pt-br')
}

function saverotina() {
    const data = new Date()
    const year = data.getFullYear()
    const mounth = data.getMonth() + 1
    const day = data.getDate()
   
        return {
            date: `${year}-${mounth}-${day}`,
            name: document.querySelector('.nameeditrotina').value,
            description: document.querySelector('.desceditrotina').value,
            rotina: '',
            user: {
                uid: app.auth().currentUser.uid
            }
        }
}

function salvarRotina() {
    const updatevar = saverotina();

    update(updatevar)


    
}

function update(updatevar) {
    app.firestore()
    .collection("rotinas")
    .doc(getUrlRotina())
    .update(updatevar)
    .then(() => {
        Swal.fire(
            'Sucesso!',
            'Você salvou sua rotina com sucesso.',
            'success'
          )
    })
    .catch((e) => {
        alert('ERRO: ' + e)
    })
}

function fechareditrotina() {
    
    window.location.href = './rotina'
}

function showcomponentadd() {

}

function verifystep() {
    if(step == 1) {
        document.querySelector('.etapa1').style.display = 'block'
        document.querySelector('.etapa2').style.display = 'none'
        document.querySelector('.etapa3').style.display = 'none'
        document.querySelector('.etapa4').style.display = 'none'
        document.querySelector('.stepbutton').style.display = 'block'
        document.querySelector('.stepanme').innerHTML = 'Etapa 1'
        document.querySelector('.createrotina').style.display = 'none'
        
    }
    else if (step == 2) {
        document.querySelector('.etapa1').style.display = 'none'
        document.querySelector('.etapa2').style.display = 'block'
        document.querySelector('.etapa3').style.display = 'none'
        document.querySelector('.etapa4').style.display = 'none'
        document.querySelector('.stepbutton').style.display = 'block'
        document.querySelector('.stepanme').innerHTML = 'Etapa 2'
        document.querySelector('.createrotina').style.display = 'none'

    }
    else if(step == 3) {
        document.querySelector('.etapa1').style.display = 'none'
        document.querySelector('.etapa2').style.display = 'none'
        document.querySelector('.etapa3').style.display = 'block'
        document.querySelector('.etapa4').style.display = 'none'
        document.querySelector('.stepbutton').style.display = 'block'
        document.querySelector('.stepanme').innerHTML = 'Etapa 3'
        document.querySelector('.createrotina').style.display = 'none'

    }
    else if(step == 4) {
        document.querySelector('.etapa1').style.display = 'none'
        document.querySelector('.etapa2').style.display = 'none'
        document.querySelector('.etapa3').style.display = 'none'
        document.querySelector('.etapa4').style.display = 'block'
        document.querySelector('.stepbutton').style.display = 'none'
        document.querySelector('.stepanme').innerHTML = 'Etapa 4'
        document.querySelector('.createrotina').style.display = 'block'
    }
}

function organizarrotina() {
    document.querySelector('.organizarsuarotina-tab').style.display = 'block'
    document.querySelector('.background').style.display = 'block'
}

function fecharorganizarrotina() {
    document.querySelector('.organizarsuarotina-tab').style.display = 'none'
    document.querySelector('.background').style.display = 'none'

    document.querySelector('#namerotine').value = ''
    document.querySelector('#descrotina').value = ''

    document.querySelector('#namerotine').value = ''
    document.querySelector('#descrotina').value = ''
    document.querySelector('.componentadd_name').value = ''
    document.querySelector('.start').value = ''
    document.querySelector('.end').value = ''

    canelcomponentrotina()
    localStorage.setItem('componentesatuais', '')
    document.querySelector('.rotinacriada').innerHTML = ''

    step = 1

    verifystep()


}

localStorage.setItem('componentesatuais', '')

function createnewrotine() {
    const namerotine = document.querySelector('#namerotine')
    let descrotine = document.querySelector('#descrotina')
    var rotinajson = localStorage.getItem('componentesatuais')

    if(document.querySelector('#descrotina').value == '') {
        descrotine.value = 'Sem descrição'
    }

    if(namerotine.value == '' || descrotine.value == '' || rotinajson == [] || localStorage.getItem('componentesatuais') == undefined) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Insira todos os dados.',
          })
    }
    
    else {
        const data = new Date()
        const year = data.getFullYear()
        const mounth = data.getMonth() + 1
        const day = data.getDate()
        var rotinajson = JSON.parse(localStorage.getItem('componentesatuais'))
        auth.onAuthStateChanged((u) => {
            let uidvar = u.uid
            const newrotine = {
                date: `${year}-${mounth}-${day}`,
                description: descrotine.value,
                name: namerotine.value,
                rotina: rotinajson,
                user: {
                    uid: uidvar
                }
        }
        app.firestore()
        .collection('rotinas')
        .add(newrotine)
        .then(() => {
            Swal.fire(
                'Sucesso!',
                'Sua rotina foi criada.',
                'success'
              )
            window.location.reload()
        }).catch((e) => {
            alert('ERRO: ' + e)
        })
        })
    }
}
function addcomponenttorotina() {
    document.querySelector('.rotinatop').style.display = 'none'
    document.querySelector('.component').style.display = 'block'
}

function canelcomponentrotina() {
    document.querySelector('.rotinatop').style.display = 'block'
    document.querySelector('.component').style.display = 'none'
}
let componentejson = []

function addtorotineatual() {
    let namecomponent = document.querySelector('.componentadd_name').value
    let starthorario = document.querySelector('.start').value
    let endhorario = document.querySelector('.end').value

    componentejson
    .push(
        {
            [namecomponent]: {
                start: starthorario,
                end: endhorario
            }
        }
    )


    namecomponent = ''
    starthorario = ''
    endhorario = ''
    localStorage.setItem('componentesatuais', JSON.stringify(componentejson))
    document.querySelector('.rotinacriada').innerHTML = JSON.stringify(componentejson).replace(/"/g, '')
}

let step = 1

function backbutton() {
    if(step < 5 && step > 1) {
        step -= 1
    }
    else if(step <= 1) {

    }

    if(step == 1) {
        document.querySelector('.etapa1').style.display = 'block'
        document.querySelector('.etapa2').style.display = 'none'
        document.querySelector('.etapa3').style.display = 'none'
        document.querySelector('.etapa4').style.display = 'none'
        document.querySelector('.stepbutton').style.display = 'block'
        document.querySelector('.stepanme').innerHTML = 'Etapa 1'
        document.querySelector('.createrotina').style.display = 'none'
        
    }
    else if (step == 2) {
        document.querySelector('.etapa1').style.display = 'none'
        document.querySelector('.etapa2').style.display = 'block'
        document.querySelector('.etapa3').style.display = 'none'
        document.querySelector('.etapa4').style.display = 'none'
        document.querySelector('.stepbutton').style.display = 'block'
        document.querySelector('.stepanme').innerHTML = 'Etapa 2'
        document.querySelector('.createrotina').style.display = 'none'

    }
    else if(step == 3) {
        document.querySelector('.etapa1').style.display = 'none'
        document.querySelector('.etapa2').style.display = 'none'
        document.querySelector('.etapa3').style.display = 'block'
        document.querySelector('.etapa4').style.display = 'none'
        document.querySelector('.stepbutton').style.display = 'block'
        document.querySelector('.stepanme').innerHTML = 'Etapa 3'
        document.querySelector('.createrotina').style.display = 'none'

    }
    else if(step == 4) {
        document.querySelector('.etapa1').style.display = 'none'
        document.querySelector('.etapa2').style.display = 'none'
        document.querySelector('.etapa3').style.display = 'none'
        document.querySelector('.etapa4').style.display = 'block'
        document.querySelector('.stepbutton').style.display = 'none'
        document.querySelector('.stepanme').innerHTML = 'Etapa 4'
        document.querySelector('.createrotina').style.display = 'block'
    }
}

function nextstep() {
    if(step < 4) {
        step += 1
    }
    else if(step == 4) {

    }

    if(step == 1) {
        document.querySelector('.etapa1').style.display = 'block'
        document.querySelector('.etapa2').style.display = 'none'
        document.querySelector('.etapa3').style.display = 'none'
        document.querySelector('.etapa4').style.display = 'none'
        document.querySelector('.stepbutton').style.display = 'block'
        document.querySelector('.stepanme').innerHTML = 'Etapa 1'
        document.querySelector('.createrotina').style.display = 'none'
        
    }
    else if (step == 2) {
        document.querySelector('.etapa1').style.display = 'none'
        document.querySelector('.etapa2').style.display = 'block'
        document.querySelector('.etapa3').style.display = 'none'
        document.querySelector('.etapa4').style.display = 'none'
        document.querySelector('.stepbutton').style.display = 'block'
        document.querySelector('.stepanme').innerHTML = 'Etapa 2'
        document.querySelector('.createrotina').style.display = 'none'

    }
    else if(step == 3) {
        document.querySelector('.etapa1').style.display = 'none'
        document.querySelector('.etapa2').style.display = 'none'
        document.querySelector('.etapa3').style.display = 'block'
        document.querySelector('.etapa4').style.display = 'none'
        document.querySelector('.stepbutton').style.display = 'block'
        document.querySelector('.stepanme').innerHTML = 'Etapa 3'
        document.querySelector('.createrotina').style.display = 'none'

    }
    else if(step == 4) {
        document.querySelector('.etapa1').style.display = 'none'
        document.querySelector('.etapa2').style.display = 'none'
        document.querySelector('.etapa3').style.display = 'none'
        document.querySelector('.etapa4').style.display = 'block'
        document.querySelector('.stepbutton').style.display = 'none'
        document.querySelector('.stepanme').innerHTML = 'Etapa 4'
        document.querySelector('.createrotina').style.display = 'block'
    }
    
        


}

function RotinaPage() {
    return (
        <div className="App">
            <HeaderApp />
            <div className='contents-page'>
                <div className="background" onClick={fecharorganizarrotina}></div>
                <div className='rotinaedit'>
                    <div className='rotinaedit-header'>
                        <div className='titleedit'>
                            <i className="fa-solid fa-pen-ruler"></i>
                            <h1>EDITOR DE ROTINAS</h1>
                        </div>
                        <i onClick={fechareditrotina} className="fa-solid fa-xmark"></i>
                    </div>
                    <p>Edite sua rotina existente</p>
                       <div className='infoofeditrotina'>
                            <div className='itemofrotina'>
                                <label>Nome da Rotina: </label><br />
                                <input className='nameeditrotina' placeholder='' /> <br />
                            </div>
                            <div className='itemofrotina'>
                            <label>Descrição: </label><br />
                            <input className='desceditrotina' placeholder='' /><br />
                            </div>
                            <label>Rotina</label><br />
                            <div className='rotina-exist'>
                                
                            </div>
                       </div>
                    <div className='buttonseditrotina'>
                        <button className='btn-delete-rotine' onClick={excluirrotina}>EXCLUIR ROTINA</button>
                        <button className='btn-save-rotina' onClick={salvarRotina}>SALVAR</button>
                    </div>
                        
                </div>
                <div className='organizarsuarotina-tab'>
                <div className='organizarrotina-top'>
                    <h1><i className="fa-solid fa-bookmark"></i> ORGANIZE SUA ROTINA</h1>
                    <i onClick={fecharorganizarrotina} className="fa-solid fa-xmark"></i>
                    </div>
                <p>Crie sua rotina de acordo com as importâncias de cada tarefa.</p>
                <div className='organizarrotina-buttons'>
                   <div className='flexboxrotina'>
                    <h1 className='stepanme'>Etapa {step}</h1>
                    <div className="etapa1">
                            <label>Digite um nome para sua rotina</label><br />
                            <input type="text" id="namerotine" placeholder='Nome' />
                        </div>
                        <div className="etapa2">
                            <label>Descrição (Opcional)</label><br />
                            <input type="text" id="descrotina" placeholder='Exemplo: Foco nos estudos' />
                        </div>
                        <div className="etapa3">
                            <label>Importância</label><br />
                            <select name="importancia" id="importancia" disabled>
                                <option value="Baixa">Baixa</option>
                                <option value="Média">Média</option>
                                <option value="Alta">Alta</option>
                            </select>
                        </div>
                        <div className="etapa4">
                            <div className='rotinatop'>
                                <label>Rotina</label><br />
                                <button onClick={addcomponenttorotina}>ADICIONAR COMPONENTE</button>
                            </div>
                            <div className='component'>
                                <h1>Adicione o componente</h1>
                                <input className='componentadd_name' placeholder='Nome do componente(Ex: Academia)' />
                                <div className='horarios'>
                                    <input type="number" className='start' placeholder='Horário de início (Ex: 10)' />
                                    <input type="number" className='end' placeholder='Horário de término (Ex: 12)' />
                                </div>
                                <div className='rotinacriada'>

                                </div>
                                <button className='add' onClick={addtorotineatual}>Adicionar</button>
                                <button className='cancel'onClick={canelcomponentrotina}>Cancelar</button>
                            </div>
                        </div>
                        <div className='componentadd-organizerotina'>
                            <p>Nome do componente: </p><input type="text" placeholder='Nome' id="namecomp" />
                            <div>
                                <input id="startcomp" placeholder='Início (Ex: 16)' />
                                <input id="endcomp" placeholder='Término (Ex: 18)' />
                            </div>
                            <div>ADICIONAR</div>
                        </div>
                   </div>
                </div>
                <div className='prevnextbutton'>
                    <div className='backbutton'><button onClick={backbutton}><i className="fa-solid fa-caret-left"></i> VOLTAR</button></div>
                    <div className='stepbutton'><button onClick={nextstep}>PRÓXIMO <i className="fa-solid fa-caret-right"></i></button></div>
                </div>
                <div className='createrotina'><button onClick={createnewrotine}>Criar rotina</button></div>
                </div>
                <div className='background-page'>
                    <img src="./imgs/rotina-page-banner.webp" alt='fundo academia'/>
                </div>
                <div className='flex-box-rotinas'>
                    <div> 
                    <div className='rotinasmobile'>
                                <h2>Suas rotinas</h2>
                                <div className='db-rotinas'>
                                    
                                </div>
                            </div>
                    </div>
                    <div className='left-side-page'>
                        <div className='title-page'>
                            <i className="fa-regular fa-calendar"></i>
                            <h1>Rotina</h1>
                        </div>
                        <div className="content-page-middle">
                            <div className='button-info'>
                                <button onClick={organizarrotina}>ORGANIZE SUA ROTINA</button>
                                <p>Crie sua rotina de acordo com as importâncias de cada tarefa. </p>
                            </div>
                            <div className='button-info'>
                                <button onClick={buttonrotinaauto}>ROTINA AUTOMÁTICA</button>
                                <p>A aplicação irá desenvolver uma rotina otimizada para você. </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RotinaPage;