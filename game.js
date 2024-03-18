const score = document.querySelector('.score');
const press2start = document.querySelector('.press2start');
const displaygame = document.querySelector('.displaygame');
const level = document.querySelector('.level');

const speed = {easy: 5, medium: 10, hard: 15};

let controls = { ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false }

let player = { speed: 5, score: 0 };

level.addEventListener('click', (e)=> {
    player.speed = speed[e.target.id];
});

press2start.addEventListener('click', () => {
    press2start.classList.add('hide');
    displaygame.innerHTML = "";
    player.start = true;
    player.score = 0;
    window.requestAnimationFrame(play);
    let normalElement = document.createElement('div');
    normalElement.setAttribute('class', 'normal');
    displaygame.appendChild(normalElement);
    player.x = normalElement.offsetLeft;
    player.y = normalElement.offsetTop  ;

    for(let i=0; i<3; i++){
        let kalaban = document.createElement('div');
        kalaban.setAttribute('class', 'kalaban');
        kalaban.y = ((i+1) * 350) * - 1;
        kalaban.style.top = kalaban.y + "px";
        kalaban.style.left = Math.floor(Math.random() * 350) + "px";
        displaygame.appendChild(kalaban);
    }
});

function boomcrash(a,b){
    arect = a.getBoundingClientRect();
    brect = b.getBoundingClientRect();

    return !((arect.top >  brect.bottom) || (arect.bottom <  brect.top) || (arect.right <  brect.left) || (arect.left >  brect.right)); 
}

function diewompwomp() {
    player.start = false;
    press2start.classList.remove('hide');
    press2start.innerHTML = "YOU LOST! <br> your score is " + player.score + "<br> click to play again!";
}

function movekalaban(normalElement){
    let kalabans = document.querySelectorAll('.kalaban');
    kalabans.forEach((item)=> {

        if(boomcrash(normalElement, item)){
            diewompwomp();
        }
        if(item.y >= 750){
            item.y = -300;
            item.style.left = Math.floor(Math.random() * 350) + "px";
        }
        item.y += player.speed;
        item.style.top = item.y + "px";
    });
} 

function play() {
    let normalElement = document.querySelector('.normal');
    let road = displaygame.getBoundingClientRect();

    if(player.start){
        movekalaban(normalElement);
            
        if(controls.ArrowUp && player.y > (road.top + 70)) player.y -= player.speed;
        if(controls.ArrowDown && player.y < (road.bottom - 85)) player.y += player.speed;
        if(controls.ArrowLeft && player.x > 0) player.x -= player.speed;
        if(controls.ArrowRight && player.x < (road.width - 70)) player.x += player.speed;

        normalElement.style.top = player.y + "px";
        normalElement.style.left = player.x + "px";

        window.requestAnimationFrame(play);

        player.score++;
        const scorecounter = player.score - 1;
        score.innerHTML = 'Score: ' + scorecounter;          
    }
}
document.addEventListener('keydown', (e)=>{
    e.preventDefault();
    controls[e.key] = true;
});

document.addEventListener('keyup', (e)=>{
    e.preventDefault();
    controls[e.key] = false;
});
