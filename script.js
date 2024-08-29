

window.addEventListener('load',()=>{


const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// const button1 = document.querySelector('#button1');
// const mainContainer = document.querySelector('#main-container');
const gameOver = document.querySelector('#game-over-button');
const heightCollision = document.getElementsByClassName('coordinatesCeiling');

// bv stands for background velocity.
canvas.width = innerWidth;
canvas.height = innerHeight;

window.addEventListener('resize',()=>{
    canvas.width = innerWidth;
    canvas.height = innerHeight;



})
let gravity = false;
let jump = false;
let quit = false;
let collision = false;
const height = 75;
const ground = 560;
heightCollision.textContent = ground;






class Main{
    constructor(x,y,width,height,dx,dy){
            this.x = x;
            this.y = y;
            this.w = width;
            this.h = height;
            this.dx = dx;
            this.dy = dy;
            this.bv = 0;
            this.img = new Image();
            this.img.src = 'background.jpg'
          
         
            // MOVEMENT EVENTS
        window.addEventListener('keydown',({key})=>{
            if(key === 'd'){
                this.dx = 10;
                this.bv = -10;

              
            }

             if(key === 'a'){
                this.dx = -10;
                this.bv = 5;
                console.log('TRUE');
              
               
            }
    })
        // this is why it doesn't move in air, need to fix this value.
        window.addEventListener('keyup',()=>{
            this.dx = 0;
            this.bv = 0;
    })
        // JUMP EVENTS
        window.addEventListener('keydown',({key})=>{
            // need an and condition here, this way if i hit w this only happens once.
            if(key === 'w'){
                this.dy -= 50;
                jump = true;
                
            }
        
    })
        window.addEventListener('keyup',()=>{
            // need an and condition here, this way if i hit w this only happens once.
            this.dy = 0;
           
    })

    // loop through images

   
  
         
}
    drawPlayer(){
        
        this.img = new Image();
        this.img.src = 'Dinosaur/Jump (9).png';
        ctx.drawImage(this.img,this.x,this.y,this.w,this.h);

    }
    drawBackground(){
        ctx.drawImage(this.img,this.x + canvas.width * 2, this.y, canvas.width * 2,canvas.height);

        ctx.drawImage(this.img,this.x, this.y, canvas.width * 2,canvas.height);
        
        // ceiling reference
        ctx.fillStyle = 'blue'
        ctx.fillRect(0,height,50,50)

        // ground reference
        ctx.fillStyle = 'red'
        ctx.fillRect(0,ground,50,50)
        // this.imgX2 -= 5;
       
        
    }
    moveBackground(){
        this.x += this.bv;
        // endless scroller
        if(this.x + canvas.width * 2 <= canvas.width){
            this.x = 0
        }

        // left side collision
        if(this.x >= 1){
            this.x = 0;
        }
    }



    movePlayer(){
        this.x += this.dx;
        this.y += this.dy;
        if(this.x <= 0){
        this.x = 0;
        // if(this.x <= canvas.width ){
        // this.x = 0
      }
      
    }

    jump(){
      
        // gravity
        if(this.y <= height){
           gravity = true;
        }
        if(gravity){
            this.dy = 5;
        }
        
        if(this.y + this.h >= ground){
            this.dy = 0;
            gravity = false;
            collision = true;
            
        }
       
    }

    quit(){
        window.addEventListener('keypress',({key})=>{
            if(key === '5'){
                quit = true;
               
            }
         })
    }
   

    characterIdleWalk(){
        ctx.drawImage(this.img,this.x, this.y, );
    }

}

const quitGame = new Main();


const player = new Main(0,canvas.height - 390,200,200,0,0);


const background = new Main(0,0)


// const startGame = ()=>{


const animation = setInterval(()=>{
   
    ctx.clearRect(0,0,innerWidth,innerHeight);
    background.drawBackground();
    background.moveBackground();
    player.drawPlayer();
    player.movePlayer();
    player.jump();
    quitGame.quit();

    if(quit === true){
       clearInterval(animation)
       setTimeout(()=>{
        gameOver.style.display = 'block';
      },1000)
      setTimeout(()=>{
       location.reload();
      },3000)
    }

}, 1000 / 60)
// }

})

// const hideMenu = ()=>{
//     mainContainer.style.display = 'none';
// }

// const mainMenu = ()=>{
//     mainContainer.style.display = 'block';
// }


// button1.addEventListener('click', startGame)
// button1.addEventListener('click', hideMenu)





// setInterval(()=>{


// },100)

