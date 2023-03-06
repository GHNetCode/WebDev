
// window.onresize =() =>{
// document.querySelector('#resizeInnerW').textContent=window.innerWidth;
// }

const btnC = document.getElementById("idhState");
btnC.addEventListener('touchstart', () => btnC.style.background = 'blue')
btnC.addEventListener('touchmove', () => btnC.style.background = 'red')
btnC.addEventListener('touchend', () => btnC.style.background = 'green')


// function myFunkyB(){
// alert("You have clicked the Button!");
// }


// function changeBackground(color) {
//    // document.body.style.background = color;
//     document.getElementById("idhState").style.background=color;
//  }
//   document.getElementById("idhState").ontouchstart = changeBackground('red');
  //document.getElementById("idhState").ontouchend = changeBackground('blue');
