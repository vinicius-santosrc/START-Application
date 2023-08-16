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

function criarpostagem() {

    const uid = getUrlRotina();
    app.firestore()
    .collection("rotinas")
    .doc(uid)
    .get()
    .then(doc => {
        console.log(doc.data())
        var rotinaatual = doc.data()
        var rotina2 = rotinaatual.rotina
        let postagem
        const date = new Date
        const ano = date.getFullYear()
        const mes = date.getMonth()
        const dia = date.getDate()
        let horas = date.getHours()
    
        if(horas < 10) {
          horas = '0' + horas
        }

        let output = ''

            rotina2.forEach(i => {
                output += `
                        <tr>
                            <td>[${JSON.stringify(i.start).replace(/"/g, '')} - ${JSON.stringify(i.end).replace(/"/g, '')}]</td>
                            <td>${JSON.stringify(i.name).replace(/"/g, '')}</td>
                            <td>${JSON.stringify(i.desc).replace(/"/g, '')}</td>
                        <tr>
                        `
            })
    
        const dataatual = ano.toString() + mes.toString() + dia.toString() + '.' + horas.toString()
    
        const newpost = {
          userphoto: auth.currentUser.photoURL,
          name: auth.currentUser.displayName,
          uid: auth.currentUser.uid,
          curtidas: 0,
          post: {
            desc: rotinaatual.description,
            name: rotinaatual.name,
            uid: uid,
          },
          date: dataatual,
          created: dataatual,
        }

        app.firestore()
        .collection("publicacoes")
        .add(newpost)
        .then(s => {
            Swal.fire('Publicado!', 'Você compartilhou seu treino', 'success')
            window.location.reload()
        })
    
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
            var rotinaatual = doc.data()
            var rotinauser = rotinaatual.user.uid
            let output = ''

            if(app.auth().currentUser.uid == rotinauser){ 
                document.querySelector('.rotinaedit').style.display = 'block'
                var rotina2 = rotinaatual.rotina

                rotina2.forEach(i => {
    
                    output += `<div class="componentrotinashow">
                        <div>
                            <h2>[<span class="comecocomponent">${JSON.stringify(i.start).replace(/"/g, '')}</span> - <span class="fimcomponente">${JSON.stringify(i.end).replace(/"/g, '')}</span>]: ${JSON.stringify(i.name).replace(/"/g, '')}</h2>
                        </div>
                        <p>${JSON.stringify(i.desc).replace(/"/g, '')}</p>
                    </div>`
                })
                document.querySelector('.nameeditrotina').value = rotinaatual.name
                document.querySelector('.desceditrotina').value = rotinaatual.description
            }
            else {
                document.querySelector('.rotinaview').style.display = 'block'
                var rotina2 = rotinaatual.rotina
                var rotinauser = rotinaatual.user.uid
                console.log(rotinauser)
                document.querySelector('.App-header').style.background = `#1B1B1B`
                rotina2.forEach(i => {
    
                    output += `<div class="componentrotinashow">
                        <div>
                            <h2>[<span class="comecocomponent">${JSON.stringify(i.start).replace(/"/g, '')}</span> - <span class="fimcomponente">${JSON.stringify(i.end).replace(/"/g, '')}</span>]: ${JSON.stringify(i.name).replace(/"/g, '')}</h2>
                        </div>
                        <p>${JSON.stringify(i.desc).replace(/"/g, '')}</p>
                    </div>`
                })
                document.querySelector('.rotinaname-view').innerHTML = rotinaatual.name + ' (Compartilhada)'
                document.querySelector('.rotinaname-description').innerHTML = rotinaatual.description
                
            }
            document.querySelector('.rotina-exist').innerHTML = output
            document.querySelector('.rotinas-view-index').innerHTML = output
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
        
        document.querySelector('.stepbutton').style.display = 'block'
        document.querySelector('.stepanme').innerHTML = 'Etapa 1'
        document.querySelector('.createrotina').style.display = 'none'
        
    }
    else if (step == 2) {
        document.querySelector('.etapa1').style.display = 'none'
        document.querySelector('.etapa2').style.display = 'block'
        document.querySelector('.etapa3').style.display = 'none'
        
        document.querySelector('.stepbutton').style.display = 'block'
        document.querySelector('.stepanme').innerHTML = 'Etapa 2'
        document.querySelector('.createrotina').style.display = 'none'

    }
    else if(step == 3) {
        document.querySelector('.etapa1').style.display = 'none'
        document.querySelector('.etapa2').style.display = 'none'
        document.querySelector('.etapa3').style.display = 'block'
        
        document.querySelector('.stepbutton').style.display = 'none'
        document.querySelector('.stepanme').innerHTML = 'Etapa 3'
        document.querySelector('.createrotina').style.display = 'block'

    }
}

function organizarrotina() {
    document.querySelector('.organizarsuarotina-tab').style.display = 'block'
    document.querySelector('.background').style.display = 'block'
}

function fecharorganizarrotina() {
    window.location.reload()
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
            let username = u.displayName
            let useremail = u.email
            let uidvar = u.uid
            const newrotine = {
                date: `${year}-${mounth}-${day}`,
                description: descrotine.value,
                name: namerotine.value,
                rotina: rotinajson,
                user: {
                    uid: uidvar,
                    createdby: username + ' (' + useremail + ')'
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
    localStorage.setItem('componentesatuais', '')
    document.querySelector('.rotinacriada').innerHTML = ''
}
let componentejson = []

function addtorotineatual() {
    let namecomponent = document.querySelector('.componentadd_name').value
    let desccomponent = document.querySelector('.componentadd_desc').value
    let starthorario = document.querySelector('.start').value
    let endhorario = document.querySelector('.end').value
    

    if(namecomponent == '' || starthorario == '' || endhorario == '') {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Insira todos os dados.',
          })
    }
    else {
        if(desccomponent == '') {
            desccomponent = 'Sem descrição'
            addrotina2()
        }
        else {
            addrotina2()
        }

        function addrotina2() {
            componentejson
            .push(
                    {
                        name: namecomponent,
                        desc: desccomponent,
                        start: starthorario,
                        end: endhorario
                    }
            )

            let output = ''
            localStorage.setItem('componentesatuais', JSON.stringify(componentejson))
            for(let i of JSON.parse(localStorage.getItem('componentesatuais'))) {
                output += `
                <div class="rotinalist-criada">
                    <h2>${i.name}</h2>
                    <p>${i.desc}</p>
                    <p>${i.start} - ${i.end}</p>
                </div>
                `
            }

            namecomponent = '';
            desccomponent = '';
            starthorario = '';
            endhorario = '';

            document.querySelector('.rotinacriada').innerHTML = output
            
            }
    }
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
        
        document.querySelector('.stepbutton').style.display = 'block'
        document.querySelector('.stepanme').innerHTML = 'Etapa 1'
        document.querySelector('.createrotina').style.display = 'none'
        document.querySelector('.backbutton').style.display = 'none'
        
    }
    else if (step == 2) {
        document.querySelector('.etapa1').style.display = 'none'
        document.querySelector('.etapa2').style.display = 'block'
        document.querySelector('.etapa3').style.display = 'none'
        
        document.querySelector('.stepbutton').style.display = 'block'
        document.querySelector('.stepanme').innerHTML = 'Etapa 2'
        document.querySelector('.createrotina').style.display = 'none'
        document.querySelector('.backbutton').style.display = 'block'

    }
    else if(step == 3) {
        document.querySelector('.etapa1').style.display = 'none'
        document.querySelector('.etapa2').style.display = 'none'
        document.querySelector('.etapa3').style.display = 'block'
        
        document.querySelector('.stepbutton').style.display = 'none'
        document.querySelector('.stepanme').innerHTML = 'Etapa 3'
        document.querySelector('.createrotina').style.display = 'block'
        document.querySelector('.backbutton').style.display = 'block'

    }
}

function nextstep() {
    if(step < 3) {
        step += 1
    }
    else if(step == 3) {

    }

    if(step == 1) {
        document.querySelector('.etapa1').style.display = 'block'
        document.querySelector('.etapa2').style.display = 'none'
        document.querySelector('.etapa3').style.display = 'none'
        
        document.querySelector('.stepbutton').style.display = 'block'
        document.querySelector('.stepanme').innerHTML = 'Etapa 1'
        document.querySelector('.createrotina').style.display = 'none'
        document.querySelector('.backbutton').style.display = 'none'
        
    }
    else if (step == 2) {
        document.querySelector('.etapa1').style.display = 'none'
        document.querySelector('.etapa2').style.display = 'block'
        document.querySelector('.etapa3').style.display = 'none'
        
        document.querySelector('.stepbutton').style.display = 'block'
        document.querySelector('.stepanme').innerHTML = 'Etapa 2'
        document.querySelector('.createrotina').style.display = 'none'
        document.querySelector('.backbutton').style.display = 'block'

    }
    else if(step == 3) {
        document.querySelector('.etapa1').style.display = 'none'
        document.querySelector('.etapa2').style.display = 'none'
        document.querySelector('.etapa3').style.display = 'block'
        
        document.querySelector('.stepbutton').style.display = 'none'
        document.querySelector('.stepanme').innerHTML = 'Etapa 3'
        document.querySelector('.createrotina').style.display = 'block'
        document.querySelector('.backbutton').style.display = 'block'

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
                       <div className='btn-share-div'>
                        <button className='btn-share-rotina' onClick={criarpostagem} >COMPARTILHAR NO FEED</button>
                       </div>
                    <div className='buttonseditrotina'>
                        <button className='btn-delete-rotine' onClick={excluirrotina}>EXCLUIR ROTINA</button>
                        <button className='btn-save-rotina' onClick={salvarRotina}>SALVAR</button>
                    </div>
                        
                </div>

                <div className='rotinaview'>
                    <div className='top-rotinaview'>
                        <div>
                            <i class="fa-solid fa-calendar-check"></i>
                        </div>
                        <div>
                            <h1 className='rotinaname-view'></h1>
                        </div>
                    </div>
                    <div className='top-bottom-rotinaview'>
                        <p className='rotinaname-description'>Descrição</p>
                    </div>
                    <div className='middle-rotinaview'>
                        <a href={window.location.origin + '/'}><i className="fa-solid fa-caret-left"></i> VOLTAR PARA PÁGINA INÍCIAL</a>
                        <div className='rotinas-view-index'>
                        </div>
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
                            <div className='rotinatop'>
                                <label>Rotina</label><br />
                                <button className='addcompbtn' onClick={addcomponenttorotina}>+ ADICIONAR COMPONENTE</button>
                            </div>
                            <div className='component'>
                                <h1>Adicione o componente</h1>
                                <input className='componentadd_name' placeholder='Nome do componente(Ex: Academia)' />
                                <input className='componentadd_desc' placeholder='Descrição (Opcional)' />
                                <div className='horarios'>
                                    <div><p>Início: </p><input type="time" className='start'  /></div>
                                    <div><p>Término: </p><input type="time" className='end' /></div>
                                </div>
                                
                                <button className='add' onClick={addtorotineatual}>Adicionar</button>
                                <button className='cancel'onClick={canelcomponentrotina}>Cancelar</button>
                            </div>
                            <div className='rotinacriada'>

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