window.onresize=()=>{
document.getElementById('resizeInnerW').textContent=window.innerWidth;
}



let parentElemct1D1 = document.getElementById("ct1D1"); //Div for ct1D1inp, ct1D1Btn
let ct1D1inp = document.getElementById('ct1D1inp');//ct1D1inp - url field..
let ct1D1Btn = document.getElementById('ct1D1Btn');//ct1D1Btn - 'Shorten It!' button..
let ct1DlongUrlP = document.getElementById("ct1DlongUrlP");//ct1DlongUrlP - long url (ct1D1inp) for the new tiles added...
let ct1DshortUrl = ''; //let the Api fill this one in..

let ct1DlongUrl='';
let oneClickFlag=false;

// implement another function for the enter key to also push the button
ct1D1Btn.addEventListener("pointerdown",e=>{//Button 'Shorten It!' pressed..

console.log('ct1D1Btn Button has been pressed..')

console.log('Url text field..:'+ct1D1inp.value)

async function BtnProc(){//process functions for Button "Shorten It!"

//ct1D1inp - check if we have data and process it..
if (ct1D1inp.value){
         oneClickFlag=false;//reset oneClickFlag..:
          ct1DlongUrl=ct1D1inp.value;
        console.log('we have data:'+ct1DlongUrl);

        //urlValidator(longUrl);//Validate url and then call func UrlLinkDiv to shorten it..
        if (urlValidator(ct1DlongUrl)){
            ct1DshortUrl = await getShortUrl(ct1DlongUrl);
            //console.log('ct1DshortUrl-:'+ct1DshortUrl);
          }

        UrlLinkDiv(ct1DlongUrl,ct1DshortUrl);

    }else{
         console.log('Please add a link..')
        if (!oneClickFlag){plsAddLnkMsg();}//call plsAddLnkMsg "Please add a link"  
         oneClickFlag=true;
    }
}
BtnProc();
})

function plsAddLnkMsg(){//function to create&display err msg and style input element.. ct1D1 is the parent, insert "ct1D1AdLnkMsg" between id`s ct1D1inp & ct1D1Btn
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
    newPElem.style.marginLeft="-140px";
    newPElem.style.marginTop="-10px";
    newPElem.style.fontsize="12px";
    newPElem.style.fontStyle="italic";
    newPElem.style.color="rgba(255, 0, 0, 0.500)";
    newPElem.appendChild(textnode);
    parentElemct1D1.insertBefore(newPElem, childElem);

    // Style other elements and properties..
    ct1D1inp.classList.toggle('warn');//
    ct1D1inp.style.border="inset 3px rgba(255, 0, 0, 0.500)"; //set back to none..
    parentElemct1D1.style.height="182px";
    ct1D1Btn.style.top="110px"
    //Remember to adjust height of button ct1D1Btn and ct1D1 parent container..

}


//DRY Function
//on Text Input clear error styling..
// 1. check if child elem id ct1D1AdLnkMsg is still  
//    present and remove it to clear msg "Please add a link" when text is enter in input field..
// 2. Reset border back to none..

function resetErrStyles(){
    let ct1D1AdLnkMsg=document.getElementById('ct1D1AdLnkMsg'); 
    if(ct1D1AdLnkMsg!==null){ct1D1AdLnkMsg.remove();}
    ct1D1inp.style.border="unset";
    ct1D1inp.classList.remove('warn');
    parentElemct1D1.style.height="160px";
    ct1D1Btn.style.top="86px"
}
ct1D1inp.oninput=function(){
   // console.log("We got input!! --:"+ct1D1inp.value[0])
 if (ct1D1inp.value===ct1D1inp.value[0]){//Only on the first character lets reset the params..
    resetErrStyles();
    }
};

//Ensure error is also cleared when pasting occurs..
ct1D1inp.onpaste=function(){
       // console.log('onpaste -:'+ct1D1inp.value);
        resetErrStyles();
};

 

    //lets call our Api to return the shorted link.. https://shrtco.de/docs
    //GET/POST: https://api.shrtco.de/v2/shorten?url=example.org/very/long/link.html
    async function getShortUrl(ct1DlongUrl) {
        try {
          const response = await fetch('https://api.shrtco.de/v2/shorten?url='+ct1DlongUrl);
          const data = await response.json();
          //console.log('data:', JSON.stringify(data));
          console.log('getShortUrl data.result.short_link3:'+data.result.short_link3);
          //ct1DshortUrl=data.result.short_link3;
          //console.log('getShortUrl data.result.short_link3:'+ct1DshortUrl);
        return (data.result.short_link3)
        } catch (error) {
          console.error('Error fetching url:'+error );
        }
      }



async function urlValidator(ct1DlongUrl){//Validate url..
    let errMsg="Woops, looks like we got ourselves an invalid Url..."+"\n"+"\
    -:  "+ct1DlongUrl+"\n"+"\ ";


    try {
          new URL(ct1DlongUrl);//Validate the Url against the URL constructor
          console.log('We have a valid Url, Great!:'+ct1DlongUrl);
        //  ct1DshortUrl = await (getShortUrl(ct1DlongUrl)) //return short url 'ct1DshortUrl'...
        //  .then (console.log('urlValidator  data.result.short_link3:'+ct1DshortUrl))
          //.then (UrlLinkDiv(ct1DlongUrl,ct1DshortUrl));

          return true;
      } catch (err) {
        console.log('invalid url...: '+ct1DlongUrl)
            console.log(errMsg)
            alert(errMsg+err);
        //  return false;
        }
    }


//update all child id`s in Cloned Div "ct1D1LnksN1Clnd"..
let ct1Dsep = document.getElementById('ct1Dsep');
let ct1D1ShrtLnkP = document.getElementById('ct1D1ShrtLnkP');
let ct1D1CpyLnkBtn = document.getElementById('ct1D1CpyLnkBtn');
let cloneElIdCntr = 0;// clone counter so each copy id is unique when an id is assigned..

function UrlLinkDiv(ct1DlongUrl,ct1DshortUrl){//show shorten validated Url and write to local storage 

    // Get the parent element 
    let parentElemct1D = document.getElementById("ct1D");// ct1D2 insertBefore ct1C 

    // Get parent's child where we want to insert the new div next too..
    let childElem = document.getElementById("ct1D2");
    
    //Let`s clone div '#ct1D1LnksN1' id already defined in html & css to display the links..
    //and display it setting the display param..
    //Get Div to be cloned..
    let ct1D1LnksN1 = document.getElementById("ct1D1LnksN1");
    
    //lets update the original ct1D1LnksN1 DIV with new Urls BEFORE cloning..
    ct1DlongUrlP.textContent=ct1DlongUrl;
    ct1D1ShrtLnkP.textContent=ct1DshortUrl;
    
    //Clone it..
    let ct1D1LnksN1Clnd = ct1D1LnksN1.cloneNode('true');
    
    // Update the ID and add a class to it...
    ct1D1LnksN1Clnd.id = 'ct1D1LsN1Cld'+cloneElIdCntr;
    ct1D1LnksN1Clnd.classList.add('ct1D1LnksN1Cls')
    
    console.log('ct1D1LnksN1.id-:'+ct1D1LnksN1.id)
    console.log('ct1D1LnksN1Clnd.id-:'+ct1D1LnksN1Clnd.id)
    
    //update child elem Id`s
    ct1Dsep.id = 'ct1Dsep'+cloneElIdCntr;
    ct1DlongUrlP.id = 'ct1DlongUrlP'+cloneElIdCntr;
    ct1D1ShrtLnkP.id = 'ct1D1ShrtLnkP'+cloneElIdCntr;
    ct1D1CpyLnkBtn.id = 'ct1D1CpyLnkBtn'+cloneElIdCntr;
    let ct1D1CpyLnkBtnId = ct1D1CpyLnkBtn.id;// ID "ct1D1CpyLnkBtnId" used for local storage
    
    //console.log('ct1DlongUrlP.id-:'+ct1DlongUrlP.id)
    //console.log('ct1D1ShrtLnkP.id-:'+ct1D1ShrtLnkP.id)
    //console.log('ct1D1CpyLnkBtn.id-:'+ct1D1CpyLnkBtn.id)
    cloneElIdCntr++;//increment ID(s) for next time round..
    
    // add it to the DOM after child ct1D1LnksN1
    ct1D1LnksN1.after(ct1D1LnksN1Clnd);
    
    //update clone so it can be Displayed..
    ct1D1LnksN1Clnd.style.display="flex";
    
    
    //resize to accommodate new height.. ct1D
    let parElClntHt = (parentElemct1D.clientHeight + 190);//160
     parentElemct1D.style.height=(parElClntHt+"px");// no need for the toString param as the datatype for "px" is already a string...
     console.log('parentElemct1D-height:'+parentElemct1D.clientHeight )
    
    // Insert the new element before the childElem
    parentElemct1D.insertBefore(ct1D1LnksN1Clnd, childElem);
    // parentElement.appendChild(newDivElem);
    

    //write new Links to local storage for retrieval( on loading, or via onClick)
    //localStorage.setItem("key", "value");
    //https://www.saintsatplay.com/blog/2015-10-21-storing-and-retrieving-objects-with-localstorage?s=2015/10/storing-and-retrieving-objects-with-localstorage
    //button id        - ct1D1CpyLnkBtnId ( the key we need for retrieval..)
    //long url string  - ct1DlongUrl
    //short url string - ct1DshortUrl
    console.log('before updating array..: '+ct1DshortUrl)
    let cloneLinkData = [{'ct1D1CpyLnkBtnId':ct1D1CpyLnkBtnId},
                         {'ct1DlongUrl':ct1DlongUrl},
                         {'ct1DshortUrl':ct1DshortUrl}]
    localStorage.setItem(ct1D1CpyLnkBtnId, JSON.stringify(cloneLinkData));
}


//Implement the copy button!

//Check local storage and Update the UI during initial load of page... 
//Possibly can upgrade UrlLinkDiv giving "localStorage.setItem" its own function with a flag
//to determine if Check local storage Runs during loading of the page.
//CHECK Sandbox to get localStorage.key info.. :)




