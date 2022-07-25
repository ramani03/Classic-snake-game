document.addEventListener('DOMContentLoaded',()=>{
    const boxe= document.querySelectorAll('.game div');
    const total= document.querySelector('span');
    const stbutton =document.querySelector('.start');
    const width=10;
    let cindex=0;
    let cfruit=0;
    let csnake=[2,1,0];
    let di=1;
    let score=0;
    let speed=0.9;
    let timein=0;
    let interval=0;
    let Sn=new Audio('snack-crunch3.wav')
    function startgame(){
        csnake.forEach(i=>boxe[i].classList.remove('snake'));
        boxe[cfruit].classList.remove('fruit')
        clearInterval(interval);
        score=0;
        fruitmake(); 
        di=1;
        total.innerText=score;
        timein=1000;
        csnake=[2,1,0];
        cindex=0;
        csnake.forEach(i=>boxe[i].classList.add('snake'));
        interval=setInterval(actions,timein);
 }
 //snakes moves bottom right top left,hits itself
 function actions(){
     if((csnake[0]+ width>=(width*width )&&di===width)||(csnake[0]%width===(width-1)&&di===1)||(csnake[0]- width<0&&di===-width)||
     (csnake[0]%width===0&&di===-1)||boxe[csnake[0]+di].classList.contains('snake') )
     {

return clearInterval(interval);//clear the ongoiimg interval

     }
     const t= csnake.pop();//remove last of array
     boxe[t].classList.remove('snake');//remove snake from tail
     csnake.unshift(csnake[0]+di)//specift direction to the head
     //when hits the fruit
     if(boxe[csnake[0]].classList.contains('fruit')){
         boxe[csnake[0]].classList.remove('fruit');
         boxe[t].classList.add('snake');
         csnake.push(t);
         Sn.play();
         fruitmake();
         score=score+10;
         total.textContent=score;
         clearInterval(interval);
         timein=timein*speed;
         interval=setInterval(actions,timein);

     }
     boxe[csnake[0]].classList.add('snake');

 }
 function fruitmake(){
     do{
         cfruit=Math.floor(Math.random()*boxe.length);

     }while(boxe[cfruit].classList.contains('snake'))
     boxe[cfruit].classList.add('fruit')
 }
    function control(event){
        boxe[cindex].classList.remove('snake');
    if(event.keyCode===39)
    {
     di=1;//move to the right
    }
    else if(event.keyCode===38)
    {
        di=-width;//going back ten divisions back(up)
    }
    else if(event.keyCode===37)
    {
        di=-1;//1 block left
    }
    else if(event.keyCode===40)
    {
        di= +width;//ten divisions front(down)
    }
    
}
document.addEventListener('keyup',control)//event occurs when key is released
stbutton.addEventListener('click',startgame);
})