window.onresize =() =>{
document.querySelector('#resizeInnerW').textContent=window.innerWidth;
}

// Get the modal
let modal = document.getElementById("myModal"); //not in css..

// When the user clicks anywhere except on the links 
  // inside of the menu toggle, close it..
  let checkBinput = document.getElementById('checkB');


//check all events for "click" and "touchstart" and handle accordingly..
  if ('ontouchstart' in window) {
         document.addEventListener("touchstart", (event) => {  
          // Retrieve element id from touches element..
          //let elementId = event.target.id;
            // If element has id
            //  if (elementId !== '') {
            //  console.log(elementId);
            //  }
            // If element has no id
            //  else { 
            //  console.log("An element without an id was clicked.");
            //  }

                let elementId = event.target.id;
                let elementCls = event.target.classList; //event.target.classList.contains("my-class")
                  console.log("all elementId's :"+ elementId);
                  console.log("all elementCls's :"+ elementCls);


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
                //Lets close the modal(dialogue) if user touches outside of the modal window..
                //Note: Disabling for touchscreens..
              //  if (elementId == 'myModal') {
              //   modal.style.display = "none";
              //  }

                //Lets open the modal(dialogue)..
                if (elementCls == 'boxConBtnCls') {
                modal.style.display = "flex";
                }                
            });

      } else {
         document.addEventListener("click", (event) => { 

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


  
