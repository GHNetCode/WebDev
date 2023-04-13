window.onresize =() =>{
document.querySelector('#resizeInnerW').textContent=window.innerWidth;
}

// Get the modal
let modal = document.getElementById("myModal"); //not in css..

// 'X'\check Button for menu toggle
let checkBinput = document.getElementById('checkB');

const boxConBtnCls = document.getElementsByClassName('boxConBtnCls');



//Timer function for 'touchstart' events when using mobile..
//let timedTouchFunc; 
let timer;
let touchduration = 200; //length of time ..
let timedTouchFunc = function() { //do something 
      modal.style.display = "flex"; //display the modulas!
      };


//check all events for "click" and "touchstart" and handle accordingly..
  if ('ontouchstart' in window) {
         document.addEventListener("touchstart", (event) => { //For touch screens only.. 
                
                //get id and class events from '(event)' for Variables above..
                let elementId = event.target.id;
                let elementCls = event.target.classList; //event.target.classList.contains("my-class")
                //console.log('all  elementCls :'+ elementCls)
                //console.log('all  elementId :'+ elementId);
                

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

                //open the modal(dialogue) via timer function..
                if (elementCls == 'boxConBtnCls') {
                    //Give a bit of time when launching the modal\dialogue..
                    timer = setTimeout(timedTouchFunc, touchduration);
                    
                }

            });

      } else if ('ontouchend' in window){
        document.addEventListener("touchend", (event) => {
        let elementCls = event.target.classList;

        if (elementCls == 'boxConBtnCls') {
              boxConBtnCls.classList.remove('touch-hover-effect');
               // clearTimeout..
              if (timer){clearTimeout(timer);}
              
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
          //console.log('for checkB : '+ elementId);
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

   
   



//modulas radio buttons to handle the boxes and pledge sums..
let inpBtnStyler = document.getElementsByClassName('inpBtnStyler');
let mdlCont1 = document.getElementById('mdl-Cont1');
let mdlCont1Pld1 = document.getElementById('mdl-Cont1Pld1');
let mdlCont2 = document.getElementById('mdl-Cont2');
let mdlCont2Pld1 = document.getElementById('mdl-Cont2Pld1');
let mdlCont3 = document.getElementById('mdl-Cont3');
let mdlCont3Pld1 = document.getElementById('mdl-Cont3Pld1');
let mdlCont4 = document.getElementById('mdl-Cont4');
let mdlCont4Pld1 = document.getElementById('mdl-Cont4Pld1');

for(const radioBtn of inpBtnStyler){
  radioBtn.addEventListener('change', showChecked);
}        

function showChecked(e) {
  //console.log(e);
  if (this.checked) {
    //mdlCont1Rbtn.checked
      //document.querySelector('#output').innerText = `You selected ${this.value}`;
      console.log('this.checked :'+ e+'  this.checked:'+this.checked+'  this.id:'+this.id);
    
      if(this.id==='mdl-Cont1Rbtn'){
        console.log('Lets set the relevant properties for Cont1Rbtn..');
      
        mdlCont1.style.height='320px'; //make the window longer to accommodate for the buttons etc..  
        mdlCont1.style.border= 'rgb(59, 180, 171) solid 2px';
        mdlCont1Pld1.style.display='flex';
      } else {
        mdlCont1.style.height='244px'; // window height to accommodate for the buttons etc..  
        mdlCont1.style.border= 'rgb(218, 218, 218) solid 2px'; //'unset' no worky.. :(
        mdlCont1Pld1.style.display='none'; // Set back to none / Flex!
      }
      if(this.id==='mdl-Cont2Rbtn'){
        console.log('Lets set the relevant properties for Cont2Rbtn..');
      
        mdlCont2.style.height='422px'; //make the window longer to accommodate for the buttons etc..  
        mdlCont2.style.border= 'rgb(59, 180, 171) solid 2px';
        mdlCont2Pld1.style.display='flex';
      } else {
        mdlCont2.style.height='unset'; //make the window longer to accommodate for the buttons etc..  
        mdlCont2.style.border= 'rgb(218, 218, 218) solid 2px'; //'unset' no worky.. :(
        mdlCont2Pld1.style.display='none'; // Set back to none / Flex!
      }
      if(this.id==='mdl-Cont3Rbtn'){
        console.log('Lets set the relevant properties for Cont3Rbtn..');
      
       mdlCont3.style.height='422px'; //make the window longer to accommodate for the buttons etc..  
       mdlCont3.style.border= 'rgb(59, 180, 171) solid 2px'
       mdlCont3Pld1.style.display='flex';
     } else {
       mdlCont3.style.height='unset';
       mdlCont3.style.border= 'rgb(218, 218, 218) solid 2px';
       mdlCont3Pld1.style.display='none'; // Set back to none / Flex!
      }
      if(this.id==='mdl-Cont4Rbtn'){
        console.log('Lets set the relevant properties for Cont4Rbtn..');
      
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




//icon Bookmark function...
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
      //  'icon-bookmark'   == Unsaved
      //  'icon-bookmarked' == Saved
      function iconBmarkF() {
        if (document.getElementById('icon-bookmarked')) { //Delete the bookmark(already Saved 'green colour') !
          
           //update button from 'Deleted' to 'Save' status for next time round.
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
              //console.log(bookmarks);
              //console.log(bookmarks.length);
              console.log("deleted");
    } else {//code below runs when "grey colour 'Save'" button is clicked.
      document.getElementById('icon-bookmark').id = 'icon-bookmarked'; //update button from 'Save' to 'Delete'..
              //check if localStorage already has this site bookmarked\saved, if Not found then add it..
              //If match is found set Chk to true and abort a push onto the array.
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
                  // console.log('docTitle - pushed onto the array!')
                 } else {
                  // console.log ('docTitle already bookmarked:'+docTitle);
                 }
                 if (urlChk==false){
                   bookmarks.push(url)//No match found, push element..
                  // console.log('url - pushed onto the array!')
                 } else {
                  // console.log ('URL already bookmarked:'+url)
                 }

              // set updated array into localStorage "bookmarks"
                localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
                //console.log(bookmarks);
                console.log("saved");
                alert("Now bookmarked to localStorage, please use the browser`s bookmark button to save this bookmark permanently.");
            }
}
iconBmark.addEventListener("click", iconBmarkF);

// Initialize data first time when page is loaded and update 
// the bookmarked button color to saved\unsaved to reflect current
// state in localStorage..
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
       // iconBmark.innerHTML = "Delete";
        document.getElementById('icon-bookmark').id = 'icon-bookmarked'; //update button to 'Delete'..
      } //else {
        //  iconBmark.innerHTML = "Save"; 
        //document.getElementById('icon-bookmarked').id = 'icon-bookmark'; //update button to 'Save' ..
         //}
  




 