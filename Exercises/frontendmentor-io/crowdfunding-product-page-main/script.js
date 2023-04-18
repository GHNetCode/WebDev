window.onresize =() =>{
document.querySelector('#resizeInnerW').textContent=window.innerWidth;
}


// Modal Mask..
let modal = document.getElementById("myModal"); //The Modal MASK!
// Modal containers..
let modalCntId = document.getElementById("modalCntId"); //


// 'X'\check Button for menu toggle
let checkBinput = document.getElementById('checkB');


let mdlCont1 = document.getElementById('mdl-Cont1');
let mdlCont1Pld1 = document.getElementById('mdl-Cont1Pld1');
let mdlCont2 = document.getElementById('mdl-Cont2');
let mdlCont2Pld1 = document.getElementById('mdl-Cont2Pld1');
let mdlCont3 = document.getElementById('mdl-Cont3');
let mdlCont3Pld1 = document.getElementById('mdl-Cont3Pld1');
let mdlCont4 = document.getElementById('mdl-Cont4');
let mdlCont4Pld1 = document.getElementById('mdl-Cont4Pld1');
//Save the initial "init" state of the window to reset when needed..
  function mdlCont1F(init){
  if(init){mdlCont1.style.height='244px'; // window height to accommodate for the buttons etc..  
    mdlCont1.style.border= 'rgb(218, 218, 218) solid 2px'; //'unset' no worky.. :(
    mdlCont1Pld1.style.display='none'; // Set back to none / Flex!
    //rbtnIdChecked = null;
  }else{mdlCont1.style.height='320px'; //make the window longer to accommodate for the buttons etc..  
    mdlCont1.style.border= 'rgb(59, 180, 171) solid 2px';
    mdlCont1Pld1.style.display='flex';
  }
}
  function mdlCont2F(init){
  if(init){mdlCont2.style.height='unset'; //make the window longer to accommodate for the buttons etc..  
    mdlCont2.style.border= 'rgb(218, 218, 218) solid 2px'; //'unset' no worky.. :(
    mdlCont2Pld1.style.display='none'; // Set back to none / Flex!
    //rbtnIdChecked = null;
  } else {mdlCont2.style.height='422px'; //make the window longer to accommodate for the buttons etc..  
    mdlCont2.style.border= 'rgb(59, 180, 171) solid 2px';
    mdlCont2Pld1.style.display='flex';
  }
}

  function mdlCont3F(init){
  if(init){mdlCont3.style.height='unset';
    mdlCont3.style.border= 'rgb(218, 218, 218) solid 2px';
    mdlCont3Pld1.style.display='none'; // Set back to none / Flex! 
    //rbtnIdChecked = null;
  } else {mdlCont3.style.height='422px'; //make the window longer to accommodate for the buttons etc..  
    mdlCont3.style.border= 'rgb(59, 180, 171) solid 2px'
    mdlCont3Pld1.style.display='flex';
 }
}
  function mdlCont4F(init){
  if(init){mdlCont4.style.height='unset';
    mdlCont4.style.border= 'rgb(218, 218, 218) solid 2px';
    mdlCont4Pld1.style.display='none'; // Set back to none / Flex!
  } else {mdlCont4.style.height='422px'; //make the window longer to accommodate for the buttons etc..  
    mdlCont4.style.border= 'rgb(59, 180, 171) solid 2px'
    mdlCont4Pld1.style.display='flex';
  }
}
  

//modulas radio buttons to handle the boxes and pledge sums..
let inpRadBtn = document.getElementsByClassName('inpRadBtn');
for(let radioBtn of inpRadBtn){
  radioBtn.addEventListener('change', showChanged);
}
let rbtnIdChecked;
function showChanged(e) {//Show Changed radio btn, checked or unchecked..
if (this.checked) {
    //console.log('this.id :'+this.id)
    rbtnIdChecked = this.id; //This is used for below functions, unchecking when modal\dialogue 'X'button is closed.
      if(this.id==='mdl-Cont1Rbtn'){
        mdlCont1F();}else{mdlCont1F(true);}
      if(this.id==='mdl-Cont2Rbtn'){
        mdlCont2F();}else{ mdlCont2F(true); }
      if(this.id==='mdl-Cont3Rbtn'){
        mdlCont3F();}else{mdlCont3F(true); }
      if(this.id==='mdl-Cont4Rbtn'){
        mdlCont4F();}else{mdlCont4F(true);}
    }
}

//use function to Uncheck the radio button using variable 'rbtnIdChecked' set above and reset pledges.. !
  function rbtnUnchkF (){
  //  console.log('rbtnUnchkF is running!! Check rbtnIdChecked:'+rbtnIdChecked);
  //  console.log('clearBoxBorder:'+clearBoxBorder);
     if(rbtnIdChecked==='mdl-Cont1Rbtn'){
       rbtnIdEl = document.getElementById(rbtnIdChecked);//Get the Element id to uncheck it..
        rbtnIdEl.checked = false;
        mdlCont1F(true);
        rbtnIdChecked = null;
     }else if(rbtnIdChecked==='mdl-Cont2Rbtn'){
       rbtnIdEl = document.getElementById(rbtnIdChecked); 
       rbtnIdEl.checked = false;
       mdlCont2F(true);
       rbtnIdChecked = null;
      }else if(rbtnIdChecked==='mdl-Cont3Rbtn'){
       rbtnIdEl = document.getElementById(rbtnIdChecked);
       rbtnIdEl.checked = false;
       mdlCont3F(true);
       rbtnIdChecked = null;
      }else if(rbtnIdChecked==='mdl-Cont4Rbtn'){
       rbtnIdEl = document.getElementById(rbtnIdChecked);
       rbtnIdEl.checked = false;
       mdlCont4F(true);
       rbtnIdChecked = null;
      } 
    }
            

            let clearBoxBorder= null;
            function clearBoxBdr(){
              if(clearBoxBorder==='box1Btn1'){mdlCont1F(true);
              }else if(clearBoxBorder==='box3ConBox1Btn') {mdlCont2F(true);
              }else if(clearBoxBorder==='box3ConBox2Btn') {mdlCont3F(true);
              }
            }
            

//Timer function for 'touchstart' events when using mobile..
//let timedTouchFunc; 
let timer;
let touchduration = 250; //length of time ..
let timedTFmenu = function() {checkBinput.checked = false;}
let timedTFmyModal = function() {modal.style.display = "none";
    clearBoxBdr();rbtnUnchkF();}
let timedMDbox = function() {modal.style.display = "flex";
    rbtnIdChecked = null;//reset the radio button for continue button to work
    modalCntId.style.display = "flex";//the modal Containers..
    window.scroll(0,0);}//Display modal
let timedPldMsg = function() {
    //modal.style.display = "flex"; //modal mask
    //calculate the sums: number left-1, BtnSum+currentSum,Total-Backers..
    if(rbtnIdChecked=='mdl-Cont2Rbtn'){
      simpleSumFunc('sumClsLftBam','mdl-Cont2Pld1Btn1');}
    if(rbtnIdChecked=='mdl-Cont3Rbtn'){
      simpleSumFunc('sumClsLftBla','mdl-Cont3Pld1Btn1');}
    if (rbtnIdChecked){//only when radio button is checked, display the thank you button..
      modal.style.display = "flex"; //mask
      modalCntId.style.display = "none";//close modal Containers..
      pledgeTyou.style.display = 'flex';//and bring up the thank you box.
      window.scroll(0,0);}}
let timedPldMsgCls = function() {pledgeTyou.style.display = 'none';
  modal.style.display = "none"; //mask
  rbtnUnchkF();} //reset the dialogue/modal boxes and radio buttons..


//get button, class and BtnSum$ for each radio button..
//update via Pledge Continue Button..
function simpleSumFunc(sumClsLft,BtnSumId){
  //console.log('simpleSumFunc works! :)')
  //update Number left in stock.. (both classes decrease by 1 so no need to determine which class\button.)
    let sumLft = document.getElementsByClassName(sumClsLft); //class'sumClsLftBam'
      for(i=0; i<sumLft.length; i++){
        console.log('sumLft[i] :'+sumLft[i].innerHTML); 
        sumLft[i].innerHTML = (parseInt(sumLft[i].innerHTML) - 1);
      }

  // add the BtnSum$ to the Total amount (currentSum $) raised..
    let BtnSum = document.getElementById(BtnSumId).innerHTML;// get BtnSum$ value..  
           
    let eCurrSum = document.getElementById('currentSum'); 
    let currentSum = document.getElementById('currentSum').innerHTML; 
    let newSum = currentSum.replace(/,/g,'');//remove the "," to add the value..
      newSum = (parseInt(newSum) +parseInt(BtnSum));
      newSum = newSum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");//add the "," back..
      eCurrSum.innerHTML = newSum;

  //add 1 to id totalBacknum ( total number of backers..)
    let eTotalBknum = document.getElementById('totalBacknum'); 
    let TotalBknum = document.getElementById('totalBacknum').innerHTML;
    let newTSum = TotalBknum.replace(/,/g,'');//remove the "," to add the value..
        newTSum = (parseInt(newTSum) +1);//cast / pass this as a int and add 1..
        newTSum = newTSum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");//add the "," back..
       eTotalBknum.innerHTML = newTSum;
}


//check all events for "click" and "touchstart" and handle accordingly..
  if ('ontouchstart' in window) {
         document.addEventListener("touchstart", (event) => { //For touch screens only.. 
                
                //get id and class events from '(event)' for Variables above..
                let elementId = event.target.id;
                let elementCls = event.target.classList; //event.target.classList.contains("my-class")
                console.log('all  elementCls :'+ elementCls)
                console.log('all  elementId :'+ elementId);
                

          //For the Menu (hamburger). -:         
                //When the user touches anywhere except on the links  
                //inside of the menu (hamburger) toggle then close it.. 
                if (elementId == 'menu') {// 
                //  console.log('for checkB : '+ elementId);
                //checkBinput.checked = false;
                timer = setTimeout(timedTFmenu, touchduration);
                }
                
          //highlight the appropriate box in the pledge..
          //Track boxes being highlighted and clear them with a variable
          // not just with the radio button.. if box1Btn1 then run
                 if ( elementId ==='box1Btn1'){ mdlCont1F(); clearBoxBorder='box1Btn1';}
                 if ( elementId ==='box3ConBox1Btn'){ mdlCont2F();clearBoxBorder='box3ConBox1Btn';}
                 if ( elementId ==='box3ConBox2Btn'){ mdlCont3F();clearBoxBorder='box3ConBox2Btn';}
     
          //For the modal/dialogue. -:
              //Close the modal(dialogue) if user presses on the 'x' button.
                if (elementId == 'myModalCloseBtn'){ //for spanCloseEid
                //modal.style.display = "none";
                timer = setTimeout(timedTFmyModal, touchduration);
                }
              //open the modal(dialogue) via timer function..
                if (elementCls == 'boxConBtnCls') {
                  //console.log('class: boxConBtnCls found!');
                    //Give a bit of time when launching the modal\dialogue..
                    timer = setTimeout(timedMDbox, touchduration);
                  //  modal.style.display = "flex";
                  //  modalCntId.style.display = "flex";//the modal Containers..
                  //  window.scroll(0,0);
                }

           //display the "Thanks for your support!" message after pressing Continue for a pledge..
            if (elementCls == 'mdl-ContPldBtnCls2'){ //mdl-ContPldBtnCls
              timer = setTimeout(timedPldMsg, touchduration);
              //console.log('class: mdl-ContPldBtnCls2 found!');
              
             }
           //Close the "Thanks for your support!" message after 
           //pressing it`s "Got it!" button, and reset modal\dialogue radio buttons
            if (elementId === 'pledgeTyouB'){
              timer = setTimeout(timedPldMsgCls, touchduration);
              //console.log('ID: pledgeTyouB found!')
              }
            });
      } else if ('ontouchend' in window){
        document.addEventListener("touchend", (event) => {
        let elementId = event.target.id;
        let elementCls = event.target.classList;

        if (elementCls == 'boxConBtnCls') {
               if (timer){clearTimeout(timer);}// clearTimeout..
            }
           if(elementId == 'myModalCloseBtn'||'menu') {
              if (timer){clearTimeout(timer);}// clearTimeout..
           }
        });
    } else {
         document.addEventListener("click", (event) => { // For mouse clicks only..
          let elementId = event.target.id;
          let elementCls = event.target.classList; //event.target.classList.contains("my-class")
         console.log('elementId : '+ elementId);
         console.log('elementCls : '+ elementCls);
       //For the Menu (hamburger). -:         
        //When the user clicks anywhere except on the links  
        //inside of the menu (hamburger) toggle, close it.. 
        if (elementId == 'menu') {// 
          //console.log('for checkB : '+ elementId);
          checkBinput.checked = false;
         }

         //highlight the boxes with the button selected, keep track to clear box border when needed.
         if ( elementId ==='box1Btn1'){ mdlCont1F(); clearBoxBorder='box1Btn1';}
         if ( elementId ==='box3ConBox1Btn'){ mdlCont2F(); clearBoxBorder='box3ConBox1Btn';}
         if ( elementId ==='box3ConBox2Btn'){ mdlCont3F(); clearBoxBorder='box3ConBox2Btn';}
         
       //For the modal/dialogue. -:
        //Lets close the modal(dialogue) box if user clicks on the 'x' button.
        //reset rbuttons for the ok(pledgeTyouB) and x buttons(myModalCloseBtn)
         if (elementId == 'myModalCloseBtn'){ //for spanCloseEid
          console.log('myModalCloseBtn:, check rbtnUnchkF works.. to clear the border..')
               modal.style.display = "none";
               clearBoxBdr();
               rbtnUnchkF();
              }
            
          //display the "Thanks for your support!" message after pressing Continue for a pledge..
          //and add the sums depending on button pushed.
          if (elementCls == 'mdl-ContPldBtnCls2'){ //mdl-ContPldBtnCls
              
              //calculate the sums: number left-1, BtnSum+currentSum,Total-Backers..
               if(rbtnIdChecked=='mdl-Cont2Rbtn'){
                  simpleSumFunc('sumClsLftBam','mdl-Cont2Pld1Btn1');}
               if(rbtnIdChecked=='mdl-Cont3Rbtn'){
                  simpleSumFunc('sumClsLftBla','mdl-Cont3Pld1Btn1');}

              //open Thank You msg If Radio button in checked..
                if (rbtnIdChecked){
                modal.style.display = "flex"; //mask
                modalCntId.style.display = "none";//close modal Containers..
                pledgeTyou.style.display = 'flex';//and bring up the thank you box.
                window.scroll(0,0);
                }

             }

           //Close the "Thanks for your support!" message after 
           //pressing it`s "Got it!" button, and reset radio buttons
            if (elementId === 'pledgeTyouB'){
              //console.log('ID: pledgeTyouB found!')
              pledgeTyou.style.display = 'none';
              modal.style.display = "none"; //mask
              rbtnUnchkF(); //reset the dialogue/modal boxes and radio buttons..
              }
           //Lets open the modal(dialogue) and scroll to the top
             if (elementCls == 'boxConBtnCls') {//boxConBtnCls (continue, select reward)
              //rbtnIdChecked = null;//reset the radio button for continue button to work
              modal.style.display = "flex"; //mask
              modalCntId.style.display = "flex";//the modal Containers..
              window.scroll(0,0);
             }
      });
   }
 


          //TO DO.. 1: put above replicated code in their functions!!
          //        2: get the numbers below adding up ok.. :)
          // time for SHABBAT :)
//Handle the Sums
  //id currentSum    $ 89,914
  //id totalBacknum  5,007 total backers

  //id box3ConBox1p3 101 left (Bamboo Stand)
    //Pledge-:
     //<button id mdl-Cont2Pld1Btn1"  $ 25 (this is just a price tag.. not a input field! :) 
     //<button id mdl-Cont2Pld1Btn2"  Continue 
     // on pressing continue get price tag from 'Btn1' update currentSum and total backers..

//class "mdl-ContPldBtnCls" contains the price tag for each pledge.
//radio button can determine what price it is..
//rbtnIdChecked will be updated with :
//      mdl-Cont1Rbtn,mdl-Cont2Rbtn
//      mdl-Cont3Rbtn,mdl-Cont4Rbtn
// when the continue button (mdl-Cont2Pld1Btn2) is pushed
// get relevant radio button































//icon Bookmark function to handle localStorage with prompt..
      let docTitle = document.title
    //Get the url up to pathname../index.html...  (not  window.location.href)
      let url = window.location.protocol + "//" + window.location.host + window.location.pathname //get string length!!
      let docTitleChk = false; 
      let urlChk = false;
      const iconBmark = document.getElementById("icon-bookmark");

          let bookmarks = JSON.parse(localStorage.getItem("bookmarks"));//get current bookmarks in localStorage..
          //As bookmarks local storage might be null lets keep everyone happy creating a blank array
            if (bookmarks===null){
                bookmarks = [];
                console.log('bookmarks[]'+bookmarks)
              }
            
          // bookmark id's-:
          //  'icon-bookmark'   == Unsaved "Grey"
          //  'icon-bookmarked' == Saved  "Teal\Green"
          function iconBmarkF() {
            if (document.getElementById('icon-bookmarked')) { //Delete the bookmark(already Saved 'green colour') !

               //update button from '"Teal\Green"' to 'Grey' status for next time round.
                document.getElementById('icon-bookmarked').id = 'icon-bookmark';
            
                  //Need to check and verify Before popping\splicing so we do not remove other bookmarks!!
                  for (let i=0; i <= bookmarks.length; i++){
                    //console.log('If delete button pushed- bookmarks[i]..: ' + bookmarks[i]+' i:'+i);
                      if (bookmarks[i]==docTitle || bookmarks[i]==url){
                           //console.log("element Being removed :" + bookmarks[i]+' i:'+i);
                           bookmarks = bookmarks.splice(i, 1);
                           //console.log("Remaining elements :" + bookmarks);
                      }
                 }
                  //bookmarks updated, now update localStorage...
                  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
                  //console.log("deleted");
        } else {//code below runs when "Grey" button is clicked.
          document.getElementById('icon-bookmark').id = 'icon-bookmarked'; //update button from 'Save' to 'Delete'..
                  //check if localStorage already has this site bookmarked\saved, if Not found then add it..
                  //If match is found set 'Chk' to true and abort a push onto the array.
                    docTitleChk = false;
                    urlChk = false;
                    for (let i=0; i <= bookmarks.length; i++){
                      if (bookmarks[i]==docTitle){
                         //console.log('docTitle: We have a Match, halt push bookmarks[i]:'+bookmarks[i]+' [i]:'+[i]);
                           docTitleChk = true;
                     }else if(bookmarks[i]==url){
                         //console.log('url: We have a Match, halt push bookmarks[i]:'+bookmarks[i]+' [i]:'+[i]);
                           urlChk = true;
                      }
                    } 

                     if (docTitleChk==false){
                       bookmarks.push(docTitle)//No match found, push element..
                     } // console.log('docTitle - pushed onto the array!')

                     if (urlChk==false){
                       bookmarks.push(url)//No match found, push element..
                     } // console.log('url - pushed onto the array!')

                  // update localStorage with the updated bookmarks array..
                    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
                    //console.log(bookmarks);
                    console.log("saved");
                    alert("Now bookmarked to localStorage, please use the browser`s bookmark button to save this bookmark permanently.");
                }
    }
    iconBmark.addEventListener("click", iconBmarkF);

    // Initialize data first time when page is loaded and update 
    // the bookmarked button color to Grey\Teal to reflect current
    // state in localStorage.
    console.log('Init: docTitle :'+docTitle)   
    console.log('Init: url :'+url)
      for (let i=0;  i <= bookmarks.length; i++){
        console.log('bookmarks[i]:'+bookmarks[i]+' [i]:'+[i]);
            if (bookmarks[i]==docTitle){
                //console.log('docTitle: We have a Match. (1 of 2)');
                docTitleChk = true; 
              }
            if (bookmarks[i]==url){
                //console.log('url: We have a Match. (1 of 2)');
                urlChk = true;
              }
          }
        if (urlChk && docTitleChk==true){
            console.log('Bookmark already exists, update the icon!');
           
            document.getElementById('icon-bookmark').id = 'icon-bookmarked'; //update button to 'Delete'..
          }