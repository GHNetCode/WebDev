window.onresize =() =>{
document.querySelector('#resizeInnerW').textContent=window.innerWidth;
}

// Get the modal
let modal = document.getElementById("myModal"); //not in css..

// Get the buttons that opens the modal
let btnClsE = document.getElementsByClassName('boxConBtnCls');
let btnClsV = false;

// Get the radio button to uncheck 
let rinputs = document.getElementById('mdl-Cont1Rbtn');

// loop through each button in 
// 'boxConBtnCls' and run methods
// for the onclick eventHandler to open the modal myModal..
for (let i = 0; i < btnClsE.length; i++){
  btnClsE[i].onclick = function() { /* For mouse clicks*/
              //modal.style.display = "flex";
        btnClsV = true;
     };
    }



// Get the <span> element that closes the modal
let spanCloseE = document.getElementsByClassName("close")[0];
let spanCloseV = false;

// When the user clicks on <span> (x), update spanCloseV to close the modal..
spanCloseE.onclick = function() {
   //rinputs.checked = false; //lets also uncheck/clear any selected radio buttons when the close button is used..
   spanCloseV = true;
  }
// btnC.addEventListener('touchstart', () => {
//   btnC.style.background = 'rgb(160, 194, 23)';
//   btnC.style.color = 'rgb(38, 19, 147)';
//   })

  if ('ontouchstart' in window) {

          document.addEventListener("touchstart", () => { /*...*/ 
                modal.style.display = "none";
                rinputs.checked = false; //lets also uncheck/clear any selected radio buttons when the close button is used..
                window.alert('touchstart');
                });
        } else {
          document.addEventListener("click", () => { 

              if (spanCloseV){//Check if this event is for the element(spanCloseE x button)..
                  window.alert('spanCloseV');
                  // evt.target.style.visibility = "hidden";
                  modal.style.display = "none";
                  //rinputs.checked = false;
                  spanCloseV = false;//reset for next time round..
              }

              if (btnClsV){//Check if this event is for the element(boxConBtnCls)..
                  window.alert('btnClsV');
                  // evt.target.style.visibility = "hidden";
                  modal.style.display = "flex";
                  btnClsV = false; //reset for next time round..
             }
            
                // modal.style.display = "none";
                // rinputs.checked = false; //lets also uncheck/clear any selected radio buttons when the close button is used..
        });
  }


  // When the user clicks anywhere outside of the modal, close it
  //create uncheck function 
//   function uncheck() {
//    let checkBinputs = document.getElementById('checkB');
   // let menu = document.getElementById('menu');
   // menu.style.transform= "scale(0.0) translate(-100%, -100%)";
  //  checkBinputs.checked = false;
    
//  }
  
        //'menu' below is an element id for the menu.. 
      //  window.onclick = function(event) {
      //      if (event.target == menu) {
      //        uncheck();
      //      }
      //      if (event.target == modal) {
      //        modal.style.display = "none";
      //        rinputs.checked = false;
      //      }
      //    }

          /*
          
         // implement the touch events for mobile phones..:
          const btnC = document.getElementById("idhState");
            btnC.addEventListener('touchstart', () => {
            btnC.style.background = 'rgb(160, 194, 23)';
            btnC.style.color = 'rgb(38, 19, 147)';
            })

        //btnC.addEventListener('touchmove', () => btnC.style.background = 'red')
            btnC.addEventListener('touchend', () => {
            btnC.style.background = 'hsl(71, 73%, 54%)'
            btnC.style.color = 'white';
             })
          
          
          */



