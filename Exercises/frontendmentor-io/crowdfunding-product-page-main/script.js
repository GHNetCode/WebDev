window.onresize =() =>{
document.querySelector('#resizeInnerW').textContent=window.innerWidth;
}

// Get the modal
let modal = document.getElementById("myModal"); //not in css..

// Get all the buttons for class boxConBtnCls to open the modal
let btnClsE = document.getElementsByClassName('boxConBtnCls');
let btnClsV = false;

//If one of buttons for class 'boxConBtnCls' 
//are pressed set var btnClsV to true to be handled below..
for (let i = 0; i < btnClsE.length; i++){
  btnClsE[i].onclick = function() { /* For mouse clicks*/
              //modal.style.display = "flex";
              //window.alert('btnClsE');
        btnClsV = true;
     };
    }

//   uncheck the radio button.. 
// let rinputs = document.getElementById('mdl-Cont1Rbtn');


// Get the <span> 'x' element that closes the modal..
let spanCloseE = document.getElementsByClassName("close")[0];
let spanCloseV = false;
spanCloseE.onclick = function() {
   //rinputs.checked = false; //lets also uncheck/clear any selected radio buttons when the close button is used..
   spanCloseV = true;
  }

  
// When the user clicks anywhere except on the links 
  // inside of the menu toggle, close it..
        function uncheck() {
          let checkBinputs = document.getElementById('checkB');
         // let menu = document.getElementById('menu');
         // menu.style.transform= "scale(0.0) translate(-100%, -100%)";
          checkBinputs.checked = false;
         }
        // window.onclick = function(event) {
        // if (event.target == menu) {
        //   uncheck();
        // }
          //if (event.target == modal) {
          //  modal.style.display = "none";
          //  rinputs.checked = false;
          //}
       // }








//check all events for "click" and "touchstart" and handle accordingly..
  if ('ontouchstart' in window) {
          document.addEventListener("touchstart", () => { /*...*/ 
              //  modal.style.display = "none";
              //  rinputs.checked = false; //lets also uncheck/clear any selected radio buttons when the close button is used..
              //  window.alert('touchstart');
              //  
              if (spanCloseV){//Check if this event is for element(spanCloseE x button)..
                 modal.style.display = "none";
                 spanCloseV = false;//reset for next time round..
            }

            //Lets open the modal(dialogue)..
            if (btnClsV){//Check if this event is for element(boxConBtnCls)..
                //window.alert('btnClsV');
                modal.style.display = "flex";
                btnClsV = false; //reset for next time round..
           }

           //Lets close the modal(dialogue) if user clicks outside of the modal window..
            if (event.target == modal) {
              modal.style.display = "none";
          }

          //When the user clicks anywhere except on the links  inside of the menu toggle, close it.. 
          if (event.target == menu) {
            uncheck();
          }

            });
      } else {
          document.addEventListener("click", () => { 
            if (spanCloseV){//Check if this event is for element(spanCloseE x button)..
              modal.style.display = "none";
              spanCloseV = false;//reset for next time round..
         }

         //Lets open the modal(dialogue)..
         if (btnClsV){//Check if this event is for element(boxConBtnCls)..
             //window.alert('btnClsV');
             modal.style.display = "flex";
             btnClsV = false; //reset for next time round..
        }

        //Lets close the modal(dialogue) if user clicks outside of the modal window..
         if (event.target == modal) {
           modal.style.display = "none";
       }

        //When the user clicks anywhere except on the links  inside of the menu toggle, close it.. 
        if (event.target == menu) {
          uncheck();
        }

       });
   }


  
       //   'menu' below is an element id for the menu.. 
         
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



