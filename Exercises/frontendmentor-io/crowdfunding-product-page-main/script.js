window.onresize =() =>{
document.querySelector('#resizeInnerW').textContent=window.innerWidth;
}

// Get the modal
let modal = document.getElementById("myModal"); //not in css..

// 'X'\check Button for menu toggle
let checkBinput = document.getElementById('checkB');

let boxConBtnCls = document.getElementsByClassName('boxConBtnCls');

//modulas radio buttons to handle the boxes and pledge sums..
let inpBtnStyler = document.getElementsByClassName('inpBtnStyler');
//let mdlCont1Rbtn = document.getElementById('mdl-Cont1Rbtn');
let mdlCont1 = document.getElementById('mdl-Cont1');
let mdlCont1Pld1 = document.getElementById('mdl-Cont1Pld1');
let mdlCont2 = document.getElementById('mdl-Cont2');
let mdlCont2Pld1 = document.getElementById('mdl-Cont2Pld1');
let mdlCont3 = document.getElementById('mdl-Cont3');
let mdlCont3Pld1 = document.getElementById('mdl-Cont3Pld1');
let mdlCont4 = document.getElementById('mdl-Cont4');
let mdlCont4Pld1 = document.getElementById('mdl-Cont4Pld1');

let btnVal;
for (let i = 0; i < inpBtnStyler.length; i++) {
  //console.log('button inside forloop..'+inpBtnStyler[i].id + ' i:' + [i]+' length:'+inpBtnStyler.length )
  if (inpBtnStyler[i].checked){
    console.log('inpBtnStyler[i].value --:'+inpBtnStyler[i].value+ ' !')
     btnVal = inpBtnStyler[i].value
 }
}

//Timer function for 'touchstart' events when using mobile..
let timedTouchFunc; 
let timer;
let touchduration = 150; //length of time ..
    timedTouchFunc = function() { //do something 
      modal.style.display = "flex";
      };


//check all events for "click" and "touchstart" and handle accordingly..
  if ('ontouchstart' in window) {
         document.addEventListener("touchstart", (event) => { //For touch screens only.. 
                
                //get id and class events from '(event)' for Variables above..
                let elementId = event.target.id;
                let elementCls = event.target.classList; //event.target.classList.contains("my-class")
                //console.log('all  elementCls :'+ elementCls)

          //For the Menu (hamburger). -:         
                //When the user touches anywhere except on the links  
                //inside of the menu (hamburger) toggle then close it.. 
                if (elementId == 'menu') {// 
                //  console.log('for checkB : '+ elementId);
                checkBinput.checked = false;
                }

          //For the modal/dialogue. -:
                //Close the modal(dialogue) if user touches on the 'x' button.
                if (elementId == 'myModalCloseBtn'){ //for spanCloseEid
                modal.style.display = "none";
                }

                //open the modal(dialogue) via timer function and Change color (hover effect) of the buttons  ..
                if (elementCls == 'boxConBtnCls') {
                    //Give a bit of time between changing the color 'active color' of the button
                    //and firing the modal\dialogue..
                    timer = setTimeout(timedTouchFunc, touchduration);
                    boxConBtnCls.style.background = 'rgb(76, 201, 193)';
                    boxConBtnCls.style.color = 'white';
                }

         //remember to put this in for mobile after testing!!
         if (elementCls == 'inpBtnStyler') {
          //Give a bit of time between changing the color 'active color' of the button
          //and firing the modal\dialogue..
          // timer = setTimeout(timedTouchFunc, touchduration);
          console.log('inpBtnStyler :'+inpBtnStyler);

             if (btnVal==='1'){
                  console.log('btnVal 1 :'+btnVal);
                }else if(btnVal==='2'){
                console.log('btnVal 2 :'+btnVal);
              } else {
                console.log('btnVal');
              }
            }
                

            });
      } else if ('ontouchend' in window){
        document.addEventListener("touchend", (event) => {
        let elementCls = event.target.classList;

        if (elementCls == 'boxConBtnCls') {

              // clearTimeout..
              if (timer){clearTimeout(timer);}
                boxConBtnCls.style.background = 'rgb(60, 180, 171)';
                boxConBtnCls.style.color = 'white';
            }





        
        });
    } else {
         document.addEventListener("click", (event) => { // For mouse clicks only..
          let elementId = event.target.id;
          let elementCls = event.target.classList; //event.target.classList.contains("my-class")
        //  console.log("all elementId's :"+ elementId);
        //  console.log("all elementCls's :"+ elementCls);
          

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

         //remember to put this in for mobile after testing!!
         if (elementCls == 'inpBtnStyler') {
          //Give a bit of time between changing the color 'active color' of the button
          //and firing the modal\dialogue..
          // timer = setTimeout(timedTouchFunc, touchduration);
         
        
          for (let i = 0; i < inpBtnStyler.length; i++) {
              //  let rBtn = inpBtnStyler[i];
              //console.log('button outside forloop..'+inpBtnStyler[i].id)
              if (inpBtnStyler[i].checked){
               //console.log('button selected'+inpBtnStyler[i].id)

              //Handle the events for pledges when radio button is pushed..

               // Grab button id for This box\div.. mdl-Cont2 -- Bamboo Stand
               if (inpBtnStyler[i].id ==='mdl-Cont1Rbtn'){ 
                // console.log('button selected-ifstatement'+inpBtnStyler[i].id)
                
                mdlCont1.style.height='320px'; //make the window longer to accommodate for the buttons etc..  
                mdlCont1.style.border= 'rgb(59, 180, 171) solid 2px';
                mdlCont1Pld1.style.display='flex';
              } else {
                mdlCont1.style.height='244px'; //make the window longer to accommodate for the buttons etc..  
                mdlCont1.style.border= 'rgb(218, 218, 218) solid 2px'; //'unset' no worky.. :(
                mdlCont1Pld1.style.display='none'; // Set back to none / Flex!
               }

                  // Grab button id for This box\div.. mdl-Cont2 -- Bamboo Stand
                  if (inpBtnStyler[i].id ==='mdl-Cont2Rbtn'){ 
                    // console.log('button selected-ifstatement'+inpBtnStyler[i].id)
                    
                    mdlCont2.style.height='422px'; //make the window longer to accommodate for the buttons etc..  
                    mdlCont2.style.border= 'rgb(59, 180, 171) solid 2px';
                    mdlCont2Pld1.style.display='flex';
                  } else {
                    mdlCont2.style.height='unset'; //make the window longer to accommodate for the buttons etc..  
                    mdlCont2.style.border= 'rgb(218, 218, 218) solid 2px'; //'unset' no worky.. :(
                    mdlCont2Pld1.style.display='none'; // Set back to none / Flex!
                   }

                  // Grab button id for This box\div.. mdl-Cont3 -- Black Edition Stand
                  if (inpBtnStyler[i].id ==='mdl-Cont3Rbtn'){ 
                    // console.log('button selected-ifstatement'+inpBtnStyler[i].id)
                    mdlCont3.style.height='422px'; //make the window longer to accommodate for the buttons etc..  
                    mdlCont3.style.border= 'rgb(59, 180, 171) solid 2px'
                    mdlCont3Pld1.style.display='flex';

                  } else {
                    mdlCont3.style.height='unset';
                    mdlCont3.style.border= 'rgb(218, 218, 218) solid 2px';
                    mdlCont3Pld1.style.display='none'; // Set back to none / Flex!
                   }

                   // Grab button id for This box\div.. mdl-Cont4 -- Mahogany Special Edition
                  if (inpBtnStyler[i].id ==='mdl-Cont4Rbtn'){
                    // console.log('button selected-ifstatement'+inpBtnStyler[i].id)
                    
                    mdlCont4.style.height='422px'; //make the window longer to accommodate for the buttons etc..  
                    mdlCont4.style.border= 'rgb(59, 180, 171) solid 2px'
                    mdlCont4Pld1.style.display='flex';

                  } else {
                    mdlCont4.style.height='unset';
                    mdlCont4.style.border= 'rgb(218, 218, 218) solid 2px';
                    mdlCont4Pld1.style.display='none'; // Set back to none / Flex!
                    }


                }
             }
         }

      });
   }


   //https://www.javascripttutorial.net/javascript-dom/javascript-radio-button/
   
   

//   const btn = document.querySelector('#btn');        
//   const radioButtons = document.querySelectorAll('input[name="size"]');
//   btn.addEventListener("click", () => {
//       let selectedSize;
//       for (const radioButton of radioButtons) {
//           if (radioButton.checked) {
//               selectedSize = radioButton.value;
//               break;
//           }
//       }
//       // show the output:
//       output.innerText = selectedSize ? `You selected ${selectedSize}` : `You haven't selected any size`;
//   });



  
