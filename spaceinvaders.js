// ================================SPACEINVADERS V 0.1================================


// ================================KONSTS/OBJEKTS================================
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const keys = {};    // keys ist ein Objekt das immer den aktuellen Zustand aller Tasten speichert. 
                    // Wenn main Pfeil-Links drückt, wird keys['ArrowLeft'] = true -- wenn man loslässt, wird es wieder false.

document.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});

document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

const player = {
    x : canvas.width / 2 -20,
    y : canvas.height -40,
    width: 40,
    height: 20,
    speed: 5,
    color: 'lime'
}
const ALIEN_ROWS = 5;
const ALIEN_COLS = 11;
let aliens = [];


//================================FUNKTIONEN================================
function drawPlayer(){
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}
function createAliens() {
    for(let r = 0; r < ALIEN_ROWS; r++){
        for(let c = 0; c < ALIEN_COLS; c++ ){
            aliens.push({
                x : 50 + c * 40,
                y : 50 + r * 40,
                alive : true,
                color : 'purple',

            })
        }
    }  
}
function updatePlayer() {
        if(keys['ArrowLeft'] && player.x > 0) {
            player.x -= player.speed;
        }
        if(keys['ArrowRight'] && player.x + player.width < canvas.width) {
            player.x += player.speed;
        }
}
function drawAliens(){
    aliens.forEach(alien => {
        if(alien.alive === true){
            ctx.fillStyle = alien.color;
            ctx.fillRect(alien.x, alien.y, 30, 20);
        }
        
    });
}
function gameLoop() {
    //1. der Canvas wird geleert
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,canvas.width, canvas.height);

    //2. den Spieler zeichnen
    updatePlayer();
    drawPlayer();
    drawAliens();
    
    //3. den nächsten Frame anfordern
    requestAnimationFrame(gameLoop);
}
//================================GAMELOOP================================
createAliens();
gameLoop();