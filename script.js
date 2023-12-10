const cells=document.querySelectorAll(".cell");
const statusText=document.querySelector("#statusText");
const btn=document.querySelector("#restartbtn");
const winningConditions=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6],
    [0,3,6],
    [1,4,7],
    [2,5,8]
];
let options=["","","","","","","","",""];
let currentplayer="x";
let running=false;

initializeGame();

function initializeGame(){
  cells.forEach(cell=>{ cell.addEventListener("click",cellclicked);
  btn.addEventListener("click",restartgame);
  statusText.textContent=`${currentplayer}'s turn`;
  running=true;
  })
}
function cellclicked(){
 const cellindex=this.getAttribute("cellindex");
 if(options[cellindex]!="" || !running){
    return;
 }
 else{
    updatecell(this,cellindex);
    
    checkwinner();
 }
}
function updatecell(cell , index){
  options[index]=currentplayer;
  cell.textContent=currentplayer;
}
function changeplayer(){
   currentplayer=(currentplayer=="x")?"o":"x";
   statusText.textContent=`${currentplayer}'s turn`;
}
function checkwinner(){
 let roundwon=false;

 for(let i=0;i<winningConditions.length;i++){
    const condition=winningConditions[i];
    const cellA=options[condition[0]];
    const cellB=options[condition[1]];
    const cellC=options[condition[2]];

    if(cellA=="" || cellB=="" || cellC==""){
        continue;
    }

    if(cellA==cellB && cellB==cellC){
        roundwon=true;
        
        break;
    }
 }
 if(roundwon){
    statusText.textContent=`${currentplayer} won`;
    running=false;
 }
 else if(!options.includes("")){
    statusText.textContent=`Draw!!`;
    running=false;
 }
 else{
    changeplayer();
 }
}
function restartgame(){
   currentplayer="x";
   options=["","","","","","","","",""];
   statusText.textContent=`${currentplayer}'s turn`;
   cells.forEach(cell=>cell.textContent="");
   running=true;
}
