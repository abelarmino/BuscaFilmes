
const API_KEY="8abd6f7b650d13746997f8fb94d3a3ee"
const API_LANGUAGE="&language=pt-BR"
const inputId = document.querySelector('#inputSearch')
const inputIdNav = document.querySelector('#inputSearchNav')
const buttonId = document.querySelector('#buttonSearchLg')
const buttonIdNav = document.querySelector('#buttonSearchNav')
const buttonIdSm = document.querySelector('#buttonSearchSm')
const divFilmeId = document.querySelector('#cardFilme')
const IMG_URL= "https://image.tmdb.org/t/p/w500"



function informacoesFilme(filmes){

    
    return filmes.map((filme) => {
       
        
        const divCol = document.createElement('div')
        divCol.setAttribute('class', 'col-sm-4')

        const divCard = document.createElement('div')
        divCard.setAttribute('class', 'card mb-4 shadow')

        const poster = document.createElement('img')
        if (filme.poster_path==null){
            poster.src="img/posterVazio.jpg"
            poster.setAttribute('class','card-img-top img-thumbnail')
        } else {
            poster.src=IMG_URL + filme.poster_path
            poster.setAttribute('class','card-img-top img-thumbnail')
        }

        const divCardBody = document.createElement('div')
        divCardBody.setAttribute('class', 'card-body')

        const cardTitle = document.createElement('h4')
        cardTitle.innerHTML = filme.title
        cardTitle.setAttribute('class', 'card-title')

        const cardOriginalTitle = document.createElement('h6')
        cardOriginalTitle.innerHTML = filme.original_title
        cardOriginalTitle.setAttribute('class','card-subtitle text-muted')

        const buttonSinopse = document.createElement('button')
        buttonSinopse.innerHTML='Sinopse'
        buttonSinopse.setAttribute('class', 'btn btn-secondary mt-3 align-righ')
        buttonSinopse.setAttribute('data-bs-toggle','modal')
        buttonSinopse.setAttribute('data-bs-target','#sinopseModal')
      

        
        divCol.appendChild(divCard)
        divCard.appendChild(poster)
        divCard.appendChild(divCardBody)
        divCardBody.appendChild(cardTitle)
        divCardBody.appendChild(cardOriginalTitle)
        divCardBody.appendChild(buttonSinopse)
        divFilmeId.appendChild(divCol)

        buttonSinopse.onclick = function (event){
            mostraSinopse(filme.overview, filme.title)
        }

        
    })
}
function mostraSinopse(filmeSinopse, filmeTitulo){
    const divTitulo = document.querySelector('#modalHeader')
    const divSinopse = document.querySelector('#modalBody')

    divTitulo.innerHTML=''
    divSinopse.innerHTML=''

    const titulo = document.createElement('h5')
    titulo.innerHTML = filmeTitulo;
    titulo.setAttribute('class','modal-title')


    const sinopse = document.createElement('p')
    sinopse.innerHTML = filmeSinopse;
    
    
    console.log(divSinopse)
   
    divTitulo.appendChild(titulo)
    divSinopse.appendChild(sinopse)
}




buttonId.onclick = function (event){
    event.preventDefault();
    const searchValue = inputId.value
    pesquisaFilme(searchValue)
}
buttonIdSm.onclick = function (event){
    event.preventDefault();
    const searchValue = inputId.value
    pesquisaFilme(searchValue)
}
buttonIdNav.onclick = function (event){
    event.preventDefault();
    const searchValue = inputIdNav.value
    pesquisaFilme(searchValue)
}

function pesquisaFilme(searchValue){
    const SEARCH_URL="https://api.themoviedb.org/3/search/movie?api_key="+ API_KEY + '&query="' + searchValue + '"' + API_LANGUAGE
    fetch(SEARCH_URL)
        .then((res)=> res.json())
        .then((data)=> {
            divFilmeId.innerHTML=''
            const filmes = data.results
            informacoesFilme(filmes)
   
            console.log('Data:', data)
            
            
        })
        .catch((error)=>{
            console.log('Erro', error)
        });
}

