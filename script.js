
//DADOS INICIAIS
//posições
let square =  {
    a1:'', a2:'', a3:'',  
    b1:'', b2:'', b3:'',
    c1:'', c2:'', c3:''

};

let player =  '';
let warning = '';
let playing = false;
let positionWin =  '';

reset();

//EVENTOS
document.querySelector('.reset').addEventListener('click', reset);
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', itemClick);
});


//FUNÇÕES

//Verifica onde o usuário clicou para adicionar o 'X' ou 'O'
function itemClick(e){
    let item = e.target.getAttribute('data-item');
    if(playing && square[item] === ''){
        square[item] =  player;
        renderSquare();
        togglePlayer();
    }
}

//Reseta o campo
function reset(){
  
    warning = '';

    let random = Math.floor(Math.random() * 2);
    player = (random === 0) ?  'x': 'o';

    for(let i in square){
        square[i] = '';
    }

    playing = true;
    renderSquare();''
    renderInfo();

}

//Percorre o Array com as posições  
function renderSquare(){
    for(let i in square){
        let item = document.querySelector(`div[data-item=${i}]`);
        item.innerHTML = square[i];
        
    }
    checkGame();
}

//Altera os campos de vez e o resultado 
function renderInfo(){
 
    document.querySelector('.vez').innerHTML = player;
    document.querySelector('.resultado').innerHTML = warning;
}

//Troca a vez do player
function togglePlayer(){
    player = (player === 'x') ? 'o' : 'x';
    if(playing === false){
        player = '';
    }
    renderInfo();
}


//Verifica o resultado do jogo
function checkGame(){
    if(checkWinnerFor('x')){
        warning = 'O "x" venceu';
        playing = false;
        for(let x in positionWin){
            positionColor = document.querySelector(`div[data-item=${positionWin[x]}]`);
            console.log(positionWin[x]);
            positionColor.style.color ="green" ;
        }

    } else if(checkWinnerFor('o')){
        warning = 'O "o" venceu';
        playing = false;
    } else if(isFull()){
        warning = 'Deu empate';
        playing =  false;
    } 
   
}

//Verifica se houve vencedor
function checkWinnerFor(player){
    let pos = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3', 
        'a3,b2,c1'
    ];

    for(let w in pos){
        const pArray = pos[w].split(',');
        
        positionWin = pArray;

        let hasWon = pArray.every(option => square[option] === player);
        console.log(hasWon);
        if(hasWon){
            return true;
        }
    }
    return false;
}

//Verifica se há empate
function isFull(){
    for(let i in square){
        if(square[i] === ''){
            return false;
        }
    }

    return true;
}