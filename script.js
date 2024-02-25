const state = {
    score: 0,
    level: 1,
    time: 60,
    lives: 3,
    bonus: 1,
    bonusscore: 200
};

(function game(){

function randArray(lev){
    switch(lev){
        case 1: 
            var arr =[];
            for(let i=0;i<6;i++){
                let el = rand(1,99);
                if(!arr.includes(el)){
                    arr.push(el);
                }
                else{
                    i--;
                }
                
            }
            return arr;
        case 2:
            var arr =[];
            for(let i=0;i<9;i++){
                let el = rand(10,999);
                if(!arr.includes(el)){
                    arr.push(el);
                }
                else{
                    i--;
                }
            }
            return arr;
        case 3:
            var arr =[];
            for(let i=0;i<9;i++){
                let el = rand(10,999);
                if(!arr.includes(el)){
                    arr.push(el);
                }
                else{
                    i--;
                }
            }
            return arr;
        case 4:
            var arr =[];
            for(let i=0;i<12;i++){
                let el = rand(100,9999);
                if(!arr.includes(el)){
                    arr.push(el);
                }
                else{
                    i--;
                }
            }
            return arr;
        case 5:
            var arr =[];
            for(let i=0;i<16;i++){
                let el = rand(100,9999);
                if(!arr.includes(el)){
                    arr.push(el);
                }
                else{
                    i--;
                }
            }
            return arr;
    }
}

function rand(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

function startGame() {
    
    if(document.querySelector('.learn')){
        
        document.querySelector('.learn').onclick= 
        function(){
            launchGame(); 
            document.querySelector(".learn").parentNode.removeChild(document.querySelector(".learn"));
            document.getElementsByClassName('timer')[0].innerHTML = 'Время: ' + state.time + ' сек';
            timer = setInterval("document.getElementsByClassName('timer')[0].innerHTML = 'Время: ' + state.time + ' сек'; state.time--;", 1000);
            timeout = setTimeout('clearInterval(timer)', 61050);
        };
    }
    else{
        document.getElementsByClassName('timer')[0].innerHTML = 'Время: ' + state.time + ' сек';
        timer = setInterval("document.getElementsByClassName('timer')[0].innerHTML = 'Время: ' + state.time + ' сек'; state.time--;", 1000);
        timeout = setTimeout('clearInterval(timer)', 61050);
        launchGame();
    }
    
    
}

function launchGame () {
    document.querySelector('.buttons').classList.toggle('active');
    
    if(state.level!=1){
        let butrem = document.getElementsByClassName('item');
        while(butrem[0]){
            butrem[0].parentNode.removeChild(butrem[0]);
        }
    }
    if(state.level>=5){
        document.querySelector('.buttons').style.gridTemplateColumns = 'repeat(4, 150px)';
    }
    let numbers = randArray(state.level);
    let numnum = rand(0,numbers.length-1);
    let num = numbers[numnum]
    document.querySelector('.number').innerHTML = 'Найдите число: ' + num;
    document.querySelector('.level').innerHTML = 'Уровень: ' + state.level + '-5';
    document.querySelector('.score').innerHTML = 'Очки: ' + state.score;
    document.querySelector('.lives').innerHTML = 'Попытки: ' + state.lives;
    document.querySelector('.bonus').innerHTML = 'Бонус: x' + state.bonus;
    changeBackground(rand(1,5));
    scoretimer = setInterval('state.bonusscore--;',50);
    let scoretimeout = setTimeout('clearInterval(scoretimer)',5000);
    for(let i=0;i<numbers.length;i++){
        
        let box = document.createElement('button');
        box.className = 'item';
        
        box.innerText = numbers[i];
        changeButtonColor(rand(1,6), box);
        
        if (state.level >= 5){
            box.style.width = '150px';
            
        }
        if(state.level > 2){
            box.className += changeButtonMovement( rand(1,4));
        }
        
        box.onclick = function(){
            clearTimeout(scoretimeout);
            clearInterval(scoretimer);
            document.querySelector('.buttons').classList.toggle('active');
            if(num == parseInt(box.innerText.match(/\d+/))){
                state.score += state.bonusscore*state.bonus;
                
                if(state.bonus<5){
                    state.bonus++;
                }
            }
            else {
                state.bonus = 1;
                state.lives--;
            }

            if(state.level <5){
                state.level++;
            }
                
            state.bonusscore = 200;
            if(state.time<=0 || state.lives == 0){
                
                
                endGame(state.score);
            }
            else{
                
                launchGame();
            }
            
            
            
        }
        document.querySelector('.buttons').appendChild(box);

       


        
    }
    


}

function endGame(score){
    clearTimeout(timeout);
    document.querySelector('.score').innerHTML = 'Очки: ' + score;
    state.time = 60;
    document.querySelector('.lives').innerHTML = 'Попытки: ' + state.lives;
    document.querySelector('.number').innerHTML = '';
    clearInterval(timer);
    let butrem = document.getElementsByClassName('item');
        while(butrem[0]){
            butrem[0].parentNode.removeChild(butrem[0]);
        }
    let totalScore = document.createElement('text');
    totalScore.className = 'totalScore';
    totalScore.innerText = 'Ваши очки: ' + score;

    totalScore.style.fontSize = '60px';
    
    document.querySelector('.number').appendChild(totalScore);
    //
    let restart = document.createElement('button');
    restart.innerText = 'Ещё раз?';
    restart.className = 'restart';
    document.querySelector('.buttons').style.gridTemplateColumns = 'repeat(3,200px)';
    restart.onclick = function(){
        state.lives = 3;
        state.score = 0;
        state.level = 1;
        restart.parentNode.removeChild(restart);
        totalScore.parentNode.removeChild(totalScore);
        let img = document.createElement('img');
        img.src = 'learn.png';
        img.className = 'learn';
        document.querySelector('.game').prepend(img);
        startGame();
    }
    document.querySelector('.buttons').appendChild(restart);
}

function changeButtonMovement(i){
    switch(i){
        case 1:
            if(rand(1,3)==1){
                return ' buttonsize';
            }
            else{
                return ''
            }
            
        
        case 2:
            
            return ' fontsize';
            
            
        
        case 3:
            if(rand(1,2)==1){
                return ' boxmove';
            }
            else{
                return ''
            }
            
        case 4:
            return '';

    }
}

function changeBackground(i){
    switch(i){
        case 1:
            return document.querySelector('.game').style.backgroundColor = '#46a6d5';
        case 2:
            return document.querySelector('.game').style.backgroundColor = '#94c94d';
        case 3:
            return document.querySelector('.game').style.backgroundColor = '#f28e37';
        case 4:
            return document.querySelector('.game').style.backgroundColor = '#8e3dcb';
        case 5:
            return document.querySelector('.game').style.backgroundColor = '#fc73b0';

    }
}

function changeButtonColor(i,but){
    switch(i){
        case 1:
            return but.style.backgroundColor = '#46a6d5';
        case 2:
            return but.style.backgroundColor = '#94c94d';
        case 3:
            return but.style.backgroundColor = '#f28e37';
        case 4:
            return but.style.backgroundColor = 'rgba(0,0,0,0)';
        case 5:
            return but.style.backgroundColor = '#8e3dcb';
        case 6:
            return but.style.backgroundColor = '#fc73b0';
    }
}
startGame();


}());