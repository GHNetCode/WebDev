
// window.onresize =() =>{
// document.querySelector('#resizeInnerW').textContent=window.innerWidth;
// }

// function myFunkyB(){
// alert("You have clicked the Button!");
// }


function changeBackground(color) {
   // document.body.style.background = color;
    document.getElementById("idhState").style.background=color;
 }
  document.getElementById("idhState").ontouchstart = changeBackground('red');
  //document.getElementById("idhState").ontouchend = changeBackground('blue');
