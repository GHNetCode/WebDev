window.onresize=()=>{
  document.getElementById('resizeInnerW').textContent=window.innerWidth;
  }
  
  
  let error = '';
  let parentElemct1D1 = document.getElementById("ct1D1"); //Div for ct1D1inp, ct1D1Btn
  let ct1D1inp = document.getElementById('ct1D1inp');//ct1D1inp - url field..
  let ct1D1Btn = document.getElementById('ct1D1Btn');//ct1D1Btn - 'Shorten It!' button..
  let ct1DlongUrlP = document.getElementById("ct1DlongUrlP");//ct1DlongUrlP - long url (ct1D1inp) for the new tiles added...
  let ct1DshortUrl = ''; //For the Api to fill this in..
  let ct1D1CpyLnkBtnId ='';//For 1.OnLoadLclStrg(...) to pass this to 2.UrlLinkDiv(...) for rendering local Storage..
  let ct1D1ShrtLnkPId =''; //For 1.OnLoadLclStrg(...) to pass this to 2.UrlLinkDiv(...) for rendering local Storage..
  
  let ct1DlongUrl='';
  let OnLoadLclStrgFlag=false; //Flag to ensure we skip func onWriteLclStrg during initial load
                              // when running func UrlLinkDiv.

  let oneClickFlag=false; // For function plsAddLnkMsg() -: "Please add a link" msg..
  let iKey = 0; // Key Id for Local storage to keep track of buttons. This value always increments even when the oldest link is replaced..
  

  // To allow more Links (or Rows) to be added, adjust the 'maxRows' parameter..
  let maxRows=3;//For Data retention and sanity.. Number of Links that can be displayed..
  let maxnumLnksMsg = ' Limit for maxRows "Links" currently set to.. :'+(maxRows)+"\n"+"\
"+"Please save oldest link before it's overwritten.."+"\n"+"\ "
  
  
  // As we need to wait 1 second for this the request, lets had some visual effects 
  // on the 'Shorten IT!' button..
  // Setup Animations for the spinning arrow.:
  const effect = new KeyframeEffect(//for Button
  ct1D1Btn, // Element to animate.. 
  [{transform: 'rotate(0deg) scalex(0.3)'},{transform: 'rotate(-7200deg) scalex(0.0)'}], //,{transform: 'scalex(1)'},{transform: 'scalex(2)'}],// Keyframes
  {duration: 1000} // Keyframe settings   1sec..  
  );
  const rotatect1D1Btn = new Animation(effect, document.timeline);
  //rotatect1D1Btn.play();
  //rotatect1D1Btn.reverse();
  //rotatect1D1Btn.cancel();// to stop the animation before set duration..

 
  
  ct1D1Btn.addEventListener("pointerdown",e=>{//Button 'Shorten It!' pressed..

  console.log('ct1D1Btn Button has been pressed..')
  
  //console.log('Url text field..:'+ct1D1inp.value)

  async function BtnProc(){//process functions for Button "Shorten It!"
   if (ct1D1inp.value){//ct1D1inp - check if we have data and process it..
  //    console.log('we have data:'+ct1DlongUrl);
      ct1DlongUrl=ct1D1inp.value;

        //When Shorten Button is rotating lets color it..:
        ct1D1Btn.style.background='linear-gradient(0.25turn, #c7a2ff, #502457, #eb88fa)';
        rotatect1D1Btn.play();

        oneClickFlag=false;//Reset oneClickFlag..:
        error = ''; //reset error flag....:
      
         urlValidator(ct1DlongUrl); //Validate url before calling func UrlLinkDiv() to shorten it..
  
          if (error===''){// Url validated.. 
  
            //Lets disable button presses and style button..
              ct1D1Btn.classList.toggle('noPointerEvnC');// pointer-events: none;
              setTimeout(()=>{
                  ct1D1Btn.classList.remove('noPointerEvnC');
                  ct1D1Btn.style.background='';
                },1000)//Enable button presses and remove style after 1 sec..
  
              //Call API and return a str..
              ct1DshortUrl = await getShortUrl(ct1DlongUrl);
              //console.log('ct1DshortUrl-:'+ct1DshortUrl);
  
              if(ct1DshortUrl){//Api returned short url ok, let`s call UrlLinkDiv to create and display it.
                  OnLoadLclStrgFlag=false
                  UrlLinkDiv(ct1D1CpyLnkBtnId,ct1D1ShrtLnkPId,ct1DlongUrl,ct1DshortUrl);
              }else{
                  rotatect1D1Btn.cancel();
                  console.log('Error fetching url, please check internet connection..:'+error ); 
              }
          }
      }else{
           console.log('Please add a link..')
          if (!oneClickFlag||ct1DlongUrl==''){plsAddLnkMsg();}//call plsAddLnkMsg "Please add a link"  
           oneClickFlag=true;
      }
  }
  
  
  BtnProc();
  
  })
  
  
  //function to create & display err msg and style input element.. ct1D1 is 
  //the parent, insert "ct1D1AdLnkMsg" between id`s ct1D1inp & ct1D1Btn
  function plsAddLnkMsg(){
      let childElem = document.getElementById("ct1D1Btn");
      let textnode = document.createTextNode("Please add a link");
      // Create new & style p element to put our textnode in..
      let newPElem = document.createElement("p");//for P element id:'ct1D1AdLnkMsg' 
      newPElem.setAttribute('id','ct1D1AdLnkMsg');// assign id -: ct1D1AdLnkMsg
      newPElem.style.display="flex";
      newPElem.style.position="relative";
      newPElem.style.flexDirection="column";
      newPElem.style.justifyContent="center";
      newPElem.style.alignItems="center";
        if(window.innerWidth<=700){//Mobile
         newPElem.style.marginLeft="-140px";
         newPElem.style.marginTop="-10px";
         newPElem.style.color="rgba(255, 0, 0, 0.500)";
        }else{//Desktop
          newPElem.style.marginLeft="-1050px";
          newPElem.style.marginTop="95px";
          newPElem.style.color="rgba(255, 102, 102, 0.619)";
        }
      newPElem.style.fontsize="12px";
      newPElem.style.fontStyle="italic";

      newPElem.appendChild(textnode);
      parentElemct1D1.insertBefore(newPElem, childElem);
  
      // Style other elements and properties..
      ct1D1inp.classList.toggle('warn');//
      ct1D1inp.style.border="inset 3px rgba(255, 0, 0, 0.500)"; //set back to none..
      //Mobile screen size less than 700px
      if(window.innerWidth<=700){
        parentElemct1D1.style.height="182px";
        ct1D1Btn.style.top="110px"
      }else{//Desktop more than 700px

      }
  }
  
  //on Text Input clear error styling..
  // 1. check if child elem id ct1D1AdLnkMsg is still  
  //    present and remove it to clear msg "Please add a link" 
  //    when text is entered in the input field..
  // 2. Reset border back to none..
  function resetErrStyles(){
  let ct1D1AdLnkMsg=document.getElementById('ct1D1AdLnkMsg'); 

      if(ct1D1AdLnkMsg!==null){ct1D1AdLnkMsg.remove();}
     
      //applies to both Mobile and Desktop..
      ct1D1inp.classList.remove('warn');
      ct1D1inp.style.border="unset";

      console.log('window.innerWidth :'+window.innerWidth);

      if(window.innerWidth<=700){
      parentElemct1D1.style.height="160px";
      ct1D1Btn.style.top="86px"
      }
  }

  ct1D1inp.oninput=function(){
   if (ct1D1inp.value===ct1D1inp.value[0]){//Only on the first character lets reset the params..
      resetErrStyles();
      }
  };
  ct1D1inp.onpaste=function(){//Ensure error is also cleared when pasting occurs..
      resetErrStyles();
  };
  
   
  
      //lets call our Api to return the shorted link from..: https://shrtco.de/docs
      //GET/POST: https://api.shrtco.de/v2/shorten?url=example.org/very/long/link.html
      //"short_link":shrtco.de","short_link2":9qr.de","short_link3":shiny.link
      async function getShortUrl(ct1DlongUrl) {
          try {
            const response = await fetch('https://api.shrtco.de/v2/shorten?url='+ct1DlongUrl,{ signal: AbortSignal.timeout(2000)});// timeout in 2 seconds..
            const data = await response.json();
          return (data.result.short_link)//data.result.short_link3
          } catch (err) {
              error = err;
            console.error('Error fetching url:'+err );
            alert('Please Check internet connection, error fetching url:'+err);
  
          }
        }
  
  
  //Validate url..
  async function urlValidator(ct1DlongUrl){
      let errMsg="Woops, looks like we got ourselves an invalid Url..."+"\n"+"\
      -:  "+ct1DlongUrl+"\n"+"\ ";
  
      try {
            new URL(ct1DlongUrl);//Validate the Url against the URL constructor
  //          console.log('We have a valid Url, Great!:'+ct1DlongUrl);
            return true;
        } catch (err) {
          rotatect1D1Btn.cancel();
          ct1D1Btn.style.background="" //reset ct1D1Btn.style.background back to it`s set colors.
  //        console.log('invalid url...: '+ct1DlongUrl)
          error = err;
  //            console.log(errMsg)
              alert(errMsg+err);
            return false;
          }
      }
  
  
  
    // Before cloning check max number of links (children) already added to the UI ..
      // if above threshold advise to copy\save old link..
       let numChd = document.getElementById("ct1D").childElementCount;
  
  
  //Child id`s in Cloned Div "ct1D1LnksN1Clnd" to be udpated...
   let ct1D1LnksN1 = document.getElementById("ct1D1LnksN1");
   let ct1Dsep = document.getElementById('ct1Dsep');
   let ct1D1ShrtLnkP = document.getElementById('ct1D1ShrtLnkP');
   let ct1D1CpyLnkBtn = document.getElementById('ct1D1CpyLnkBtn');
   let ct1DinitHt = document.getElementById('ct1D').clientHeight; //Get initial clientHeight.
   let ct1D1CpyLnkBtnArr =[];//Array to store Btn number and Link..
  
  //For Desktop #joiners need "top\height" adjusting when a new link is added..
   let ctjnrD3D4 = document.getElementById('ctjoinerD3D4');
      ctjnrD3D4.style.top=(512+"px");//Overriding initial setting from '' to 512px..
   let ctjnrD4D5 = document.getElementById('ctjoinerD4D5');
      ctjnrD4D5.style.top=(550+"px");//Overriding initial setting from '' to 550px.. 

  //UrlLinkDiv function runs when-:
  //1.Function OnLoadLclStrg() is called on the initial startup, clones and updates the UI.
  //2.Pressing the "Shorten It!" Button, updates the template then clones it with new link, updates the UI and then writes to storage..
   function UrlLinkDiv(ct1D1CpyLnkBtnId,ct1D1ShrtLnkPId,ct1DlongUrl,ct1DshortUrl){//show shorten validated Url and write to local storage..
    
      // Get the parent element 
       let parentElemct1D = document.getElementById("ct1D");// ct1D2 insertBefore ct1C 
      // Get parent's child where we want to insert the new div next too..
       let childElem = document.getElementById("ct1D2");

    
      //prompt Notifications for Deleting the oldest link (first one in the list) only apply After 
      //pressing the 'Shorten it!' button in this function UrlLinkDiv()..
      // Before cloning check max number of 'links (children)' already added on the page ..
      // if above threshold advise to copy\save old link...
        numChd = document.getElementById("ct1D").childElementCount;
      // console.log('UrlLinkDiv -: ct1D has '+numChd+' children...........');//num of children cloned..
    
        if (numChd > (7+maxRows)){
             //NOTE iKey has Already been incremented.
            if (iKey===maxRows){
                if (document.getElementById("ct1D1ShrtLnkP")){// The first child id there is no num appended..
                    
                    //prompt..:
                    let p=null;
                    let oldShortUrl=("https://"+document.getElementById("ct1D1ShrtLnkP").innerText);
                     p = prompt(maxnumLnksMsg,"Old link -: "+oldShortUrl);
                     //if (p){//usr clicked on the ok button, lets copy old link to clipboard..
                     //    navigator.clipboard.writeText(oldShortUrl);
                     // }
  
                     
                      let ct1D1LsN1CldiKey = document.getElementById("ct1D1LsN1Cld"+(iKey  - maxRows));
                      ct1D1LsN1CldiKey.parentNode.removeChild(ct1D1LsN1CldiKey);
                      ct1D1CpyLnkBtnArr.splice(0,2);//Lets remove the first 2 elements from our array..
                    }
                }else if(iKey > maxRows ){
  
                    // Here we have a number that are appended to id ct1D1ShrtLnkP..
  
                    //prompt..:
                    let p=null;
                    let oldShortUrl=("https://"+document.getElementById("ct1D1ShrtLnkP"+((iKey  - maxRows)-1)).innerText);
                     p = prompt(maxnumLnksMsg,"Old link -: "+oldShortUrl);
                     //if (p){//usr clicked on the ok button, lets copy old link to clipboard..
                     //   navigator.clipboard.writeText(oldShortUrl);
                     // }
  
                    //ct1D1LsN1Cld
                      let ct1D1LsN1CldiKey = document.getElementById("ct1D1LsN1Cld"+(iKey  - maxRows));//+((iKey -1)  - maxRows))
                      // console.log("UrlLinkDiv numChd Removing Child ct1D1LsN1Cld"+(iKey  - maxRows));//+((iKey -1)  - maxRows))
                      ct1D1LsN1CldiKey.parentNode.removeChild(ct1D1LsN1CldiKey);
                      ct1D1CpyLnkBtnArr.splice(0,2);//Lets remove the first 2 elements from our array..
    
                }
         }
  
  
        //OnLoadLclStrgFlag used to determine if OnLoadLclStrg is currently using this function'UrlLinkDiv'..
         if (OnLoadLclStrgFlag){//From OnLoadLclStrg() - Before cloning, update the 'Div\Template' ct1D1LnksN1...
          //When loading from storage we do Not have a button id "ct1D1CpyLnkBtn" stored
          //this will need to be accounted for..
           if (iKey===0){
                ct1D1CpyLnkBtnId='ct1D1CpyLnkBtn';
                ct1D1ShrtLnkPId='ct1D1ShrtLnkP';

                }else if (iKey>=1){//decrease all consecutive iKey`s by 1...
                ct1D1LnksN1.id = 'ct1D1LnksN1'+(iKey -1);
                ct1Dsep.id = 'ct1Dsep'+(iKey -1);
                ct1DlongUrlP.id = 'ct1DlongUrlP'+(iKey -1);
                ct1D1CpyLnkBtnId='ct1D1CpyLnkBtn'+(iKey -1);
                ct1D1ShrtLnkPId='ct1D1ShrtLnkP'+(iKey -1);

            }
              ct1D1CpyLnkBtn.id = ct1D1CpyLnkBtnId;
              ct1D1ShrtLnkP.id = ct1D1ShrtLnkPId;
              ct1D1CpyLnkBtnArr.push(ct1D1CpyLnkBtnId,ct1DshortUrl)
          }
  

    //lets update the original ct1D1LnksN1 DIV with new Url before cloning..
     ct1DlongUrlP.textContent=ct1DlongUrl;
     ct1D1ShrtLnkP.textContent=ct1DshortUrl;
     
    //Clone div '#ct1D1LnksN1' (already defined in html & css) to display the links..
    //and display it setting the display param..
    //Clone it with deep copy (true), so we have all the children..
     let ct1D1LnksN1Clnd = ct1D1LnksN1.cloneNode('true');  
    
    // Update the ID and add a class to it to keep styles intact..
     ct1D1LnksN1Clnd.id = 'ct1D1LsN1Cld'+iKey;
     ct1D1LnksN1Clnd.classList.add('ct1D1LnksN1Cls')
  
  
         if (OnLoadLclStrgFlag){//After cloning Div ct1D1LnksN1, and before loading to dom..
        
            //set template for next round
            ct1Dsep.id = 'ct1Dsep'+iKey;
            ct1DlongUrlP.id = 'ct1DlongUrlP'+iKey;
            ct1D1ShrtLnkP.id = 'ct1D1ShrtLnkP'+iKey;
            ct1D1CpyLnkBtn.id = 'ct1D1CpyLnkBtn'+iKey;
        
           }else{ //update id`s when "Shorten It" button is pushed..
          
              //update template child elem Id`s
              ct1D1LnksN1.id = 'ct1D1LnksN1'+iKey;
              ct1Dsep.id = 'ct1Dsep'+iKey;
              ct1DlongUrlP.id = 'ct1DlongUrlP'+iKey;
              ct1D1ShrtLnkP.id = 'ct1D1ShrtLnkP'+iKey;
              ct1D1CpyLnkBtn.id = 'ct1D1CpyLnkBtn'+iKey;
          
              ct1D1CpyLnkBtnId = ct1D1CpyLnkBtn.id;// ID "ct1D1CpyLnkBtnId" used for local storage
              ct1D1ShrtLnkPId  = ct1D1ShrtLnkP.id;  // ID "ct1D1ShrtLnkPId" used for local storage
          
          //Push id 'ct1D1CpyLnkBtn.id' and link onto an array to use as a filter for addGlobalEventListener() 
          //that updates/resets buttons textContent and style and copies link to the clipboard when btn is pressed.
           if (iKey===0){ 
               ct1D1CpyLnkBtnArr.push('ct1D1CpyLnkBtn',ct1D1ShrtLnkP.textContent)
            }else if (iKey>=1){//decrease all consecutive iKey`s by 1...
               ct1D1CpyLnkBtnArr.push('ct1D1CpyLnkBtn'+(iKey -1),ct1D1ShrtLnkP.textContent)
            }
          
        }
  
    
  

      // add it to the DOM after child ct1D1LnksN1
      ct1D1LnksN1.after(ct1D1LnksN1Clnd);
      
      //update clone so it can be Displayed..
      ct1D1LnksN1Clnd.style.display="flex";
      
  
      //resize/move other elements to accommodate height of new clone.. ct1D
      //lets take into account the 'maxRows' (number of links that can be displayed) to ensure we do 
      //not continue adding above the maxRows.) 1485px
      if(window.innerWidth<=700){//Mobile
        if ((parentElemct1D.clientHeight) < ((ct1DinitHt) + (maxRows * 190)) ){
          let parElClntHt = (parentElemct1D.clientHeight + 190);//160
          parentElemct1D.style.height=(parElClntHt+"px");// no need for the toString param as the datatype for "px" is already a string...
          //console.log('parentElemct1D-height:'+parentElemct1D.clientHeight )
       }
      }else{//Desktop: > 700px   elements cloned 88px
          //#ctjoinerD3D4, #ctjoinerD4D5
            console.log('parentElemct1D.clientHeight'+parentElemct1D.clientHeight)
            console.log('(ct1DinitHt)+(maxRows * 89))'+((ct1DinitHt)+(maxRows * 89)))

          //if ((parentElemct1D.clientHeight) < ((ct1DinitHt) + (maxRows * 89)) ){//adding +1 so we are always within the limits..
          if (numChd <= (7+maxRows)){
            let ctjnrD3D4Tp = Number((ctjnrD3D4.style.top).slice(0,-2)); 
              ctjnrD3D4.style.top=((ctjnrD3D4Tp+88)+"px"); //512(initial height) + 88 (cloned height)
              console.log((ctjnrD3D4Tp+88)+"px")
              console.log('ctjnrD3D4.style.top-------- :'+ctjnrD3D4.style.top);
            let ctjnrD4D5Tp = Number((ctjnrD4D5.style.top).slice(0,-2)); 
              ctjnrD4D5.style.top=((ctjnrD4D5Tp+88)+"px"); //512(initial height) + 88 (cloned height)
              console.log((ctjnrD4D5Tp+88)+"px")
              console.log('ctjnrD3D4.style.top-------- :'+ctjnrD4D5.style.top);
         }

      }
       
  
      // Insert the new element before the childElem
      parentElemct1D.insertBefore(ct1D1LnksN1Clnd, childElem);
  
      ct1D1LnksN1Clnd.focus();
  
      if (!OnLoadLclStrgFlag){//Skip writing to local storage on initial load when OnLoadLclStrg() is run..
          onWriteLclStrg(ct1D1CpyLnkBtnId,ct1D1ShrtLnkPId,ct1DlongUrl,ct1DshortUrl);
      }
  
  }
  
  
  // Global EventListener for All Buttons added( including the cloned 'Copy' buttons) 
  // reason for this approach is when cloning, the EventListener is not taken into account.
  // updating event from: 'pointerdown' (addGlobalEventListener('pointerdown',...)
  //           to  : 'click'  ...
  //           This is to resolve issue with message when working with the clipboard
  //           msg received: 'Must be handling a user gesture to use custom clipboard'
  // Cloned copy button is pushed..:
   addGlobalEventListener('click', 'button', e =>{
      // console.log('From addGlobalEventListener');
         console.log('addGlobalEventListener e.target.id :'+ e.target.id);//This will show just the button id clicked on..
         
  
         
      //1. Check array ct1D1CpyLnkBtnArr for Cloned Buttons.
      //2. Copies the short Link. 3. Updates button style. 4. updates textContent.
        for(i=0; i <=ct1D1CpyLnkBtnArr.length; i++){
   
          if (ct1D1CpyLnkBtnArr[i]!==undefined&&
              ct1D1CpyLnkBtnArr[i]===e.target.id
              //&&e.target.id==='ct1D1CpyLnkBtn'
              ){
 
                let elem = document.getElementById(e.target.id);
                // Setup Animations for the copy button.:
                const effect2 = new KeyframeEffect(//for Button
                elem, // Element to animate.. 
                [{transform: 'scalex(0.5)'},{transform: 'scalex(0.2)'}], //,{transform: 'scalex(1)'},{transform: 'scalex(2)'}],// Keyframes
                {duration: 250} // Keyframe settings   1sec..  
                );
                const AnimcpyBtn = new Animation(effect2, document.timeline);
                AnimcpyBtn.play();
 
                 let clpData=ct1D1CpyLnkBtnArr[i+1]; 
                 const copyText = async () => {
                  try {
                      await navigator.clipboard.writeText(clpData);
                      //await navigator.clipboard.writeText(ct1D1CpyLnkBtnArr[i+1]);
                      console.log('Short link copied to clipboard ok..:'+clpData)
                    //       alert('Text copied to clipboard: '+clpData);
                       } catch (error) {
                           console.log('Copy failed..:'+error.message)
                           alert('Copy failed: timed out, please try again.:'+error.message);
                       }
                     };
                     copyText();

             //set button style
               e.target.style.background="linear-gradient(rgb(41, 33, 63),rgb(78, 61, 122))";
             //update text
               e.target.textContent="Copied!";
             }
  
         //reset btn styles for cloned div`s 'ct1D1CpyLnkBtn' if the button was not pressed.
          if (ct1D1CpyLnkBtnArr[i]!==undefined&&    //ct1D1CpyLnkBtnArr[i].slice(0,14)==='ct1D1CpyLnkBtn'
              ct1D1CpyLnkBtnArr[i]!==e.target.id){
  
            //      console.log('addGlobalEventListener reset btnstyle for:'+ct1D1CpyLnkBtnArr[i])
  
                  //btnstyle for ct1D1CpyLnkBtn 
                  if(ct1D1CpyLnkBtnArr[i].slice(0,14)==='ct1D1CpyLnkBtn'){
                     let lnkBtnElem = document.getElementById(ct1D1CpyLnkBtnArr[i]);
                         lnkBtnElem.style.background ="";
                         lnkBtnElem.textContent="Copy";
                      }
  
               }
       }
  
          
   });
  
  
   function addGlobalEventListener(type, selector, callback){
       document.addEventListener(type, e =>{
           if(e.target.matches(selector)){
               callback(e);}
       })
   };
  


// Using a 'dummy' button to click to reset the style 
// of the button from 'copied' to 'copy' when
// the page is switched back from another tab
// so it is starting a fresh..
   document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      console.log('visibilitychange visibilityState changed to visible 1..');
      ct1Cbtn.click();
    } 
  });
  


  //Write to local storage...
  //1. The Function onWriteLclStrg is used by UrlLinkDiv().
  //2. onWriteLclStrg() checks param 'numStored' updated by OnLoadLclStrg() when adding\removing LocalStorage keys
  //   and updates 'numStored' param as well..
  let numStored=0 // incremented by onWriteLclStrg OnLoadLclStrg
  function onWriteLclStrg(ct1D1CpyLnkBtnId,ct1D1ShrtLnkPId,ct1DlongUrl,ct1DshortUrl){
  
      //write new Links to local storage array for retrieval later
      //localStorage.setItem("key", "value");
      //https://www.saintsatplay.com/blog/2015-10-21-storing-and-retrieving-objects-with-localstorage?s=2015/10/storing-and-retrieving-objects-with-localstorage
      //button id        - ct1D1CpyLnkBtnId ( the key we need for retrieval..)
      //long url string  - ct1DlongUrl
      //short url string - ct1DshortUrl
              let cloneLinkData = [{'ct1D1CpyLnkBtnId':ct1D1CpyLnkBtnId},
              {'ct1D1ShrtLnkPId':ct1D1ShrtLnkPId},
              {'ct1DlongUrl':ct1DlongUrl},
              {'ct1DshortUrl':ct1DshortUrl}]
  
      //console.log('onWriteLclStrg ct1D1CpyLnkBtnId-- --:'+ct1D1CpyLnkBtnId);
      //console.log('onWriteLclStrg numStored Before writing\adding -- --:'+numStored);

      //numStored is increased via function OnLoadLclStrg()
      if (numStored===maxRows){//Threshold reached, lets Remove oldest link and Add the newest..
         // console.log('onWriteLclStrg warning msg..');

          let key = localStorage.getItem('ct1D1CpyLnkBtn'+(iKey - maxRows));//getItem('ct1D1CpyLnkBtn'+i); 
          let LSkey = JSON.parse(key)
           // console.log('onWriteLclStrg  LSkey[0].ct1D1CpyLnkBtnId :'+LSkey[0].ct1D1CpyLnkBtnId );
          if ((LSkey[0].ct1D1CpyLnkBtnId!==null)&&((LSkey[0].ct1D1CpyLnkBtnId).slice(0,14))==='ct1D1CpyLnkBtn'){//Check this key is for This WebApp!
            // console.log('onWriteLclStrg Exceeded threshold, removing..:'+'ct1D1CpyLnkBtn'+(iKey - maxRows));
               localStorage.removeItem('ct1D1CpyLnkBtn'+(iKey - maxRows))
               localStorage.setItem(ct1D1CpyLnkBtnId, JSON.stringify(cloneLinkData));
          
            //no need to decrease numStored as we are also re-adding the new link.
        }
      }else{//Within threshold 'maxRows', lets keep adding more to local storage keys\Data..
          //write to storage..:
          localStorage.setItem(ct1D1CpyLnkBtnId, JSON.stringify(cloneLinkData));
          numStored++;//update number of items stored...
          //console.log('Stored Items for ThisWebApp After Writing-:'+numStored);
      }
  
    iKey++;//iKey increment for Storage Key and ID(s) for next loop.
    console.log('onWriteLclStrg iKey number incremented for next loop:'+iKey);
  }
  
  
  //Get number of items stored for This Webapp and serve it back to the UI..
  //Update numStored, incremented by onWriteLclStrg & OnLoadLclStrg
  function OnLoadLclStrg(){//On first initial load of the page check local storage, validate key and render to UI..
      OnLoadLclStrgFlag=true;
  //    console.log("OnLoadLclStrg function..");
  
  
  // 1. get Highest storage key 'iKey' as this is needed with maxRows..
  // 2. Set iKey value to the highest number already stored and increase 'numStored' variable..
      for (i = 0; i < localStorage.length; i++){
          let key = localStorage.key(i);

         if(key!=null&&(key).slice(0,14)==='ct1D1CpyLnkBtn'){//Checked and this key is for this WebApp..
          //keyV -: update keyV with verified key[{..}] (found above) so we can get the highest appended number.
          // storage keys always start with 'ct1D1CpyLnkBtn'..
           let keyV = localStorage.getItem('ct1D1CpyLnkBtn'+(key).substring(key.length - (key.length-14)));
           let LSkey = JSON.parse(keyV);

           numStored++;
  
            //Set the iKey value to the highest number already stored..
             if (iKey < (LSkey[0].ct1D1CpyLnkBtnId.substring(LSkey[0].ct1D1CpyLnkBtnId.length - (LSkey[0].ct1D1CpyLnkBtnId.length-14)))){
                           iKey=Number (LSkey[0].ct1D1CpyLnkBtnId.substring(LSkey[0].ct1D1CpyLnkBtnId.length - (LSkey[0].ct1D1CpyLnkBtnId.length-14)));
                        // console.log('OnLoadLclStrg setting highest iKey- :'+iKey);
              }
          }
      }

       //console.log('OnLoadLclStrg (iKey ) :'+iKey);
       //console.log('OnLoadLclStrg (maxRows) :'+ maxRows); 
       //console.log('OnLoadLclStrg numStored :'+ numStored);
  
       // As iKey starts at 0 lets increase this by 1 to align with maxRows 
       // which starts from 1...
       if((iKey+1) > maxRows){
        //  console.log('OnLoadLclStrg if((iKey+1) > maxRows)..........');
        //  console.log('OnLoadLclStrg ((iKey+1) - maxRows) -:'+((iKey+1) - maxRows));
        //  console.log('OnLoadLclStrg            (iKey+1)  -:'+(iKey+1));
  

       iKey = ((iKey+1) - maxRows);

         //Let`s display it (localStorage) back in the correct order..
          for (i = iKey; i < (iKey + maxRows ); i++){ 
          let key = localStorage.getItem('ct1D1CpyLnkBtn'+i);//Check we actually got the correct key to write back to the UI. 
          let LSkey = JSON.parse(key);

            //console.log('LSkey[0].ct1D1CpyLnkBtnId:'+LSkey[0].ct1D1CpyLnkBtnId);
            
            if(key!==null){
                UrlLinkDiv((LSkey[0].ct1D1CpyLnkBtnId),
                           (LSkey[1].ct1D1ShrtLnkPId),
                           (LSkey[2].ct1DlongUrl),
                           (LSkey[3].ct1DshortUrl));
            iKey++;               
             }
          }
        console.log('OnLoadLclStrg iKey (Above rowMax) incremented on Initial load, for next loop.:'+ iKey) 
       }else{//Let`s display it back in the correct order calling UrlLinkDiv() function.
  
             // Here we know that we have LESS than maxRows,
             // so lets reset iKey to 0 for this for loop..
             // counting from 0
             iKey =0;
              for (i = 0; i < localStorage.length; i++){
  
              // console.log('OnLoadLclStrg --- i:'+i);
              // console.log('OnLoadLclStrg localStorage.length--- :'+localStorage.length);
              // console.log('OnLoadLclStrg --- iKey:'+iKey);
  
              let key = localStorage.getItem('ct1D1CpyLnkBtn'+i);//Check this key is for This WebApp..
              let LSkey = JSON.parse(key);
             // console.log('OnLoadLclStrg key:'+key);
  
            if(key!==null){//Check this strg key is for This WebApp..
  
              UrlLinkDiv((LSkey[0].ct1D1CpyLnkBtnId),
                             (LSkey[1].ct1D1ShrtLnkPId),
                             (LSkey[2].ct1DlongUrl),
                             (LSkey[3].ct1DshortUrl));
  
                             console.log('OnLoadLclStrg iKey on Initial load before increment..:'+ iKey)
                             iKey++;
                }
  
        }
      
  //      console.log('OnLoadLclStrg iKey (Below rowMax) incremented on Initial load, for next loop.:'+ iKey)
      }
  }
  
  
  
  
  
  //console.log("OnLoadLclStrgFlag :"+OnLoadLclStrgFlag)
  OnLoadLclStrg();
  //console.log("OnLoadLclStrgFlag :"+OnLoadLclStrgFlag)
  
  
  // That`s all folks...