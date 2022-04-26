
/* Script to paint a the field on the game container with a svg and the 
proportions regarding the given scaling of the browser window. 
*/
const e1 = document.getElementById('game_container');
var width = e1.clientWidth;
var height = e1.clientHeight;


const svg1 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svg1.setAttribute ("width", width );
svg1.setAttribute ("height", height);

const length = Math.min(width, height)-100;
const rect1 = document.createElementNS("http://www.w3.org/2000/svg", "rect");
var posx1;
var posy1;
if(width >height){
    posx1 = (width-height)/2+50;
    posy1 = 50;
}else{
    posx1 = 50;
    posy1 = (width-height)/2+50;
}
rect1.setAttribute("stroke-width", 8);
rect1.setAttribute("x",posx1 );
rect1.setAttribute("y",posy1);
rect1.setAttribute("height",length);
rect1.setAttribute("width",length);
rect1.setAttribute("fill","none");
rect1.setAttribute("stroke","black")

svg1.appendChild( rect1 );


const rect2 = document.createElementNS("http://www.w3.org/2000/svg", "rect");
var posx2;
var posy2;
if(width >height){
    posx2 = (width-height)/2+125;
    posy2 = 125;
}else{
    posx2 = 125;
    posy2 = (width-height)/2+125;
}
rect2.setAttribute("stroke-width", 8);
rect2.setAttribute("x",posx2 );
rect2.setAttribute("y",posy2);
rect2.setAttribute("height",length-150);
rect2.setAttribute("width",length-150);
rect2.setAttribute("fill","none");
rect2.setAttribute("stroke","black")


svg1.appendChild( rect2 );


const rect3 = document.createElementNS("http://www.w3.org/2000/svg", "rect");
var posx3;
var posy3;
if(width >height){
    posx3 = (width-height)/2+200;
    posy3 = 200;
}else{
    posx3 = 200;
    posy3 = (width-height)/2+200;
}
rect3.setAttribute("stroke-width", 8);
rect3.setAttribute("x",posx3 );
rect3.setAttribute("y",posy3);
rect3.setAttribute("height",length-300);
rect3.setAttribute("width",length-300);
rect3.setAttribute("fill","none");
rect3.setAttribute("stroke","black");

svg1.appendChild( rect3 );

const ln1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
ln1.setAttribute("stroke-width", 8);
ln1.setAttribute("stroke","black");
ln1.setAttribute("x1", posx1+length/2);
ln1.setAttribute("y1", posy1);
ln1.setAttribute("x2",posx1+length/2);
ln1.setAttribute("y2", posy1+150);
svg1.appendChild(ln1);

const ln2 = document.createElementNS("http://www.w3.org/2000/svg", "line");
ln2.setAttribute("stroke-width", 8);
ln2.setAttribute("stroke","black");
ln2.setAttribute("x1", posx1);
ln2.setAttribute("y1", posy1+length/2);
ln2.setAttribute("x2",posx1+150);
ln2.setAttribute("y2", posy1+length/2);
svg1.appendChild(ln2);

const ln3 = document.createElementNS("http://www.w3.org/2000/svg", "line");
ln3.setAttribute("stroke-width", 8);
ln3.setAttribute("stroke","black");
ln3.setAttribute("x1", posx1+length);
ln3.setAttribute("y1", posy1+length/2);
ln3.setAttribute("x2",posx1+length-150);
ln3.setAttribute("y2", posy1+length/2);
svg1.appendChild(ln3);


const ln4 = document.createElementNS("http://www.w3.org/2000/svg", "line");
ln4.setAttribute("stroke-width", 8);
ln4.setAttribute("stroke","black");
ln4.setAttribute("x1", posx1+length/2);
ln4.setAttribute("y1", posy1+length);
ln4.setAttribute("x2",posx1+length/2);
ln4.setAttribute("y2", posy1+length-150);
svg1.appendChild(ln4);

svg1.setAttribute("z-index",-1);


e1.appendChild( svg1 );