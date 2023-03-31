window.onresize =() =>{
document.querySelector('#resizeInnerW').textContent=window.innerWidth;
}

// Get the modal
let modal = document.getElementById("myModal"); //not in css..

// 'X'\check Button for menu toggle
let checkBinput = document.getElementById('checkB');

let boxConBtnCls = document.getElementsByClassName('boxConBtnCls');


//Timer function for touchstart events..
let timedTouchFunc; 
let timer;
let touchduration = 200; //length of time button is 'touched' before we do something..
    timedTouchFunc = function() { //do something 
      modal.style.display = "flex";
      };


//check all events for "click" and "touchstart" and handle accordingly..
  if ('ontouchstart' in window) {
         document.addEventListener("touchstart", (event) => { //For touch screens only.. 
                
                //get id and class events from '(event)' for Variables above..
                let elementId = event.target.id;
                let elementCls = event.target.classList; //event.target.classList.contains("my-class")
  
          //For the Menu (hamburger). -:         
                //When the user touches anywhere except on the links  
                //inside of the menu (hamburger) toggle then close it.. 
                if (elementId == 'menu') {// 
                //  console.log('for checkB : '+ elementId);
                checkBinput.checked = false;
                }

          //For the modal/dialogue. -:
                //Lets close the modal(dialogue) if user touches on the 'x' button.
                if (elementId == 'myModalCloseBtn'){ //for spanCloseEid
                modal.style.display = "none";
                }

                //Change color of the buttons and open the modal(dialogue)..
                if (elementCls == 'boxConBtnCls') {
                    boxConBtnCls.style.background = 'rgb(76, 201, 193)';
                    boxConBtnCls.style.color = 'white';   

                    //Give a bit of time between changing the color 'active color' of the button
                    //and firing the modal\dialogue..
                    timer = setTimeout(timedTouchFunc, touchduration);
                }

            });
      } else if ('ontouchend' in window){
        document.addEventListener("touchend", (event) => {
        let elementCls = event.target.classList;

        if (elementCls == 'boxConBtnCls') {
          //  modal.style.display = "flex";
            boxConBtnCls.style.background = 'rgb(60, 180, 171)';
            boxConBtnCls.style.color = 'white';
            }
        //stops short touches from firing the event
        if (timer)
        clearTimeout(timer); // clearTimeout, not cleartimeout..

             });

      } else {
         document.addEventListener("click", (event) => { // For mouse clicks only..
          let elementId = event.target.id;
          let elementCls = event.target.classList; //event.target.classList.contains("my-class")
          console.log("all elementId's :"+ elementId);
          console.log("all elementCls's :"+ elementCls);
          

    //For the Menu (hamburger). -:         
        //When the user clicks anywhere except on the links  
        //inside of the menu (hamburger) toggle, close it.. 
        if (elementId == 'menu') {// 
          console.log('for checkB : '+ elementId);
          checkBinput.checked = false;
        }
    //For the modal/dialogue. -:
        //Lets close the modal(dialogue) if user clicks on the 'x' button.
        if (elementId == 'myModalCloseBtn'){ //for spanCloseEid
          modal.style.display = "none";
     }
         //Lets close the modal(dialogue) if user clicks outside of the modal window..
         if (elementId == 'myModal') {
           modal.style.display = "none";
          }

         //Lets open the modal(dialogue)..
         if (elementCls == 'boxConBtnCls') {
          modal.style.display = "flex";
         }
      });
   }


  
