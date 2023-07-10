//Show width in pixels for screen size, -- disable when done...:
window.onresize=()=>{
  document.getElementById('resizeInnerW').textContent=window.innerWidth;
};

/*
Steps    Overview--:
0. On launch find the current ip address.
1. If there is nothing entered in the search field, find IP address of current connection.
2. If there is something entered, validate if it`s a Domain if not then IP Address.
3. If it`s a domain name convert it to ip via API www.whoisxmlapi.com ( if more than one ip use the first ip address..)
4. If it`s an IP address get Geolocation Details.. 
*/

/**
If you are curious how this has been implemented in the background
please see the diagram  



 */


let alertmsgIntro = ("Welcome to the 'IP Address Tracker' WebApp!"+"\n"+"\
"+"\n"+"\
Please be aware this WebApp is based entirely on free web services and as a "+"\n"+"\
result goes to sleep after being used, so please press it`s search button"+"\n"+"\
to wake it up if needed.😴  In addition for best experience please allow "+"\n"+"\
'Trackers' for it to function properly. See below URL image to allow for this site only (For BRAVE Browser)..."+"\n"+"\
"+"\n"+"\
Lastly if you continuously get this message, please also check your internet connection and try again."+"\n"+"\
"+"\n"+"\
");
let trkradsUrl = "https://ghnetcode.github.io/WebDev/Exercises/frontendmentor-io/ip-address-tracker/images/BRAVEbrowser%20AllowTracker&ads.png";
//prompt(alertmsgIntro, trkradsUrl);



//global variables..
let url = '';
let errMsgSite =''; // used for messages.. 
let inpTxtHasIp = false;
let inpTxtHasDom = false;
let lat = '';
let lng = '';

let sBRCiPaDD=document.getElementById('sBRCiPaDD');//IP address
let sBRCLoc=document.getElementById('sBRCLoc');//Location
let sBRCLocFlag=document.getElementById('sBRCLocFlag');//Location flag
let sBRCtimeZ=document.getElementById('sBRCtimeZ');// Local Time Zone (UTC)
let sBRCiSP=document.getElementById('sBRCiSP');// ISP ...
let HereApiMap=document.getElementById('HereApiMap');// ISP ...


// https://www.whoisxmlapi.com/whoisserver/DNSService?apiKey=at_KGjrggTEbY8mXXDzkQVAoeARmsD40&domainName=tut.com&type=A&outputFormat=JSON
//let wisxApiUrl="https://www.whoisxmlapi.com/whoisserver/DNSService?apiKey=at_sqEwNRG6G69xcfzaEFQMPOcvpWR&type=A&outputFormat=JSON&domainName="
let wisxApiUrl = 'https://njsar.glitch.me/wxmlApi/'

let wisxApiUrlget='';
//let   wisxdomainName ;//&domainName=tut.com
const getJsonWisx = async wisxApiUrl => {
const response = await fetch(wisxApiUrl);
  if(!response.status >= 200 && !response.status <= 299){ // check if response worked (no http errors etc...)
    // For this Api, possible Invalid 'error' includes "CORS",
    // is actually an invalid API key for example..
       throw new Error(response); //response.statusText
   }else{
   const data = response.json(); // get JSON from the response
   return data; // This async function returns a promise which resolves to this data value..
   }

};


//Setup Animations for the spinning arrow.:
const effect = new KeyframeEffect(//for Button
iconArrowBtn, // Element to animate.. background-color(lightblue)
[{transform: 'rotate(0deg) scalex(2)'},{transform: 'rotate(700000deg) scalex(4)'}], //,{transform: 'scalex(1)'},{transform: 'scalex(2)'}],// Keyframes
{duration: 15000} // Keyframe settings   15sec..  
);
const rotateArrow = new Animation(effect, document.timeline);
//rotateArrow.play();
//rotateArrow.reverse();
//rotateArrow.cancel();// to stop the animation before set duration..



//reset html elements for next search...:
function htmlEreset(){
  sBRCiPaDD.innerHTML=('127.0.0.1'); //IP ADDRESS
  sBRCLoc.innerText=('City,Country'); // LOCATION
  document.getElementById('sBRCLoc').appendChild(sBRCLocFlag);// previous line 'sBRCLoc.innerText=..' overwrites the inner img tag, so it needs adding again..
  sBRCLocFlag.src=('./images/icon-arrow.svg'); // LOCATION FLAG
  sBRCtimeZ.innerHTML=("UTC - 00:00 (Local Time)");// --TIMEZONE--<<
  sBRCiSP.innerHTML=("Internet Service Provider");
};



// For the Button event
let btnArrHvr = document.getElementById('btnArrHvr');//srchInpTxt
let btnArrHvrMASK = document.getElementById('btnArrHvrMASK');//protect button from multiple presses..
 

// create a specific "pointerdown" event for the window to listen out for the Enter Key
let pntrDowEntEvnt = new PointerEvent('pointerdown');
window.addEventListener("keypress", function(event) {

// If the user presses the "Enter" key on the keyboard
if (event.key === "Enter") {

  // Cancel the default action, if needed
  event.preventDefault();
  
  // Trigger the button element with a click
  //document.getElementById("btnArrHvr").dispatchEvent(pntrDowEntEvnt);
  btnArrHvr.dispatchEvent(pntrDowEntEvnt);
};
});


//On initial load of the page, let`s dispatch a pointerdown event to press the button ..:
//on behalf of the user.. Re-enable before go live!!
//window.onload=()=>{ btnArrHvr.dispatchEvent(pntrDowEntEvnt);};

//prompt(alertmsgIntro, trkradsUrl);

// The Arrow button function to run when pressed..
btnArrHvr.addEventListener("pointerdown",e =>{

  btnArrHvrMASK.style.zIndex = "2";//Bring Mask Forwards with z-index 2, to protect button for x amount of time..
  btnArrHvrMASK.style.background="linear-gradient(#0000008b,#33016480)";
  setTimeout(()=>{//revert back the change..
  btnArrHvrMASK.style.zIndex = "unset";
  btnArrHvrMASK.style.background = "unset";
  btnArrHvr.style.display = "unset";//reset spinning arrow..
  },15000);// 10 seconds wait....

   console.log("button pushed..");
   htmlEreset();//clear previous results..
   rotateArrow.play();

   //reset url..
   url = '';
   let srchInpTxtcleaned='';
   inpTxtHasIp = false; //reset flags
   inpTxtHasDom = false; //reset flags

   //Check if srchInpTxt.value(search field) is null
   // if null, return by default current ip but only (after checking if site is reachable..)
   // console.log(srchInpTxt.value);
   //
   if (srchInpTxt.value===""){//Return default ip info if nothing in the search field..
console.log("Tracker 1");
      console.log("value has No data-- :"+srchInpTxt.value);
       // url = 'https://api.ipgeolocation.io/ipgeo?apiKey='+ipgeoKey;
          url = 'https://njsar.glitch.me/ipgeoApi/'
       console.log(url);
       errMsgSite = url;
    }else{//If something is in the search field, analyze search string if domain or ip... 
console.log("Tracker 2");
      // Checkif domain or an IP address.
      //1. Checking domain..
        // Clean up the string.. If we have 'https://' or 'http' or 'www.' in front lets remove them..
        // for regex check https://stackoverflow.com/questions/41942690/removing-http-or-http-and-www/41942787
         srchInpTxtcleaned = srchInpTxt.value.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0];
         //remove whitespaces from the String.
         srchInpTxtcleaned = srchInpTxtcleaned.split(' ').join('');
            console.log("srchInpTxt.value cleaned..: '"+srchInpTxtcleaned+"'");
            //String now cleaned, check number of elements\dots..
            let chkDomIpvalid = srchInpTxtcleaned.split("."); 
            url = 'https://njsar.glitch.me/ipgeoApi/'+srchInpTxtcleaned;
            console.log("url:"+url);
            errMsgSite = url;
          //Check if a domain name has been entered. more than 0, less than 4 elements\Octets is a domain..
            if (chkDomIpvalid.length > 0 && chkDomIpvalid.length < 4 ){ 
                console.log("Validate domain name further..");
                //For regex check https://stackoverflow.com/questions/10306690/what-is-a-regular-expression-which-will-match-a-valid-domain-name-without-a-subd
                function is_domain(srchInpTxtcleaned){
                  regexp = /^(([a-zA-Z]{1})|([a-zA-Z]{1}[a-zA-Z]{1})|([a-zA-Z]{1}[0-9]{1})|([0-9]{1}[a-zA-Z]{1})|([a-zA-Z0-9][a-zA-Z0-9-_]{1,61}[a-zA-Z0-9]))\.([a-zA-Z]{2,6}|[a-zA-Z0-9-]{2,30}\.[a-zA-Z]{2,3})$/g;
                          if (regexp.test(srchInpTxtcleaned)){
                                return true;
                              }else{
                                console.log("domain is not valid..");
                                inpTxtHasDom = false;
                                return false;
                              }
                    }
                      if (is_domain(srchInpTxtcleaned)){// Domain validated, now lookup the ip address..
console.log("Tracker 3");
                        console.log("Domain Valid, lookup ip address..:"+srchInpTxtcleaned);

                          //calling whoisxmlapi API to convert Domain name to Ip...
                          wisxApiUrlget = wisxApiUrl + srchInpTxtcleaned;//Note wisxApiUrlget is also a flag to allow function getJsonWisx(wisxApiUrlget) to run.
                          console.log("wisxApiUrl -----:"+wisxApiUrl);
                        inpTxtHasDom = true;
                      }else{
                        console.log("Invalid domain name entered..:"+srchInpTxtcleaned);
                        inpTxtHasDom = false;
                        alert('Invalid domain name entered..:'+ srchInpTxtcleaned);
                        rotateArrow.cancel();
                        btnArrHvr.style.display = "unset";//reset spinning arrow..
                      }
           }else{ //Here onwards checking if input str is a valid ip...
              if (chkDomIpvalid.length === 4){
console.log("Tracker 4");
              console.log("we atleast have 4 octets, check further..");
            const isValidIp = value => (/^(?:(?:^|\.)(?:2(?:5[0-5]|[0-4]\d)|1?\d?\d)){4}$/.test(value));
            if(isValidIp (srchInpTxtcleaned)){// srchInpTxt.value
console.log("Tracker 5");
               console.log('We have a Valid ip! -:'+srchInpTxtcleaned);// srchInpTxt.value
               inpTxtHasIp = true;
               }else{
                rotateArrow.cancel();
                btnArrHvr.style.display = "unset";//reset spinning arrow..
                console.log('We have a INVALID ip..'+srchInpTxtcleaned);// srchInpTxt.value
                alert(srchInpTxtcleaned+" IP address attempt detected, please enter correct Ip Address.");
              }}
            };
    }

if (srchInpTxt.value!==""&&wisxApiUrlget!==""&&inpTxtHasDom!==false){
    rotateArrow.play();
    getJsonWisx(wisxApiUrlget).then(data =>{
      if (data){//We have some Data!!
        //console.log("Data1: "+JSON.stringify(data));
        //console.log(data.DNSData.dnsRecords[0].address);


          if (data.ErrorMessage){//If data.ErrorMessage property exists then site reached but 
                            //invalid page 404 or data\key returned messages..
            rotateArrow.cancel();
            btnArrHvr.style.display = "unset";//reset spinning arrow..
            console.log("Data error message:"+JSON.stringify(data));
            console.log("Please validate URL is correct");
            alert("Data error message:"+JSON.stringify(data));
            alert("Please validate URL is correct");
          }else{
           console.log("We have data, ip converted..");
           console.log("Check if ip exists or not for given domain..");
           console.log("Data: "+JSON.stringify(data));
           
           //Notification with list of multiple ip address`s and just looking up the 1st one..
           //console.log("typeof data.DNSData.dnsRecords: "+typeof data.DNSData.dnsRecords);
           //console.log("typeof data.DNSData.dnsRecords.address: "+typeof data.DNSData.dnsRecords[0].address);
            console.log(data.DNSData.dnsRecords.length);     
            if(data.DNSData.dnsRecords.length !==0){
              if(data.DNSData.dnsRecords[0].address){//Check if ip exists or not for given domain..

                // IP exists, use the first one in the list by default..
                let ipLstArr =[];
                for (i=0; i < data.DNSData.dnsRecords.length; i++){
                  ipLstArr.push(data.DNSData.dnsRecords[i].address);
                    console.log(i+1+" - "+ipLstArr[i]);
                    console.log(data.DNSData.dnsRecords.length);
                     if (i > 1 && i+1===data.DNSData.dnsRecords.length){//Let`s ensure we at the last element... 
                      //if more than one ip, advise 1st one is being used...
                      //and provide the list of ip`s..
                      ipLstArr= ipLstArr.join('\n');
                      console.log(ipLstArr); 
                      let alertmsg = ("A list of ip address`s have been found for domain the '"+srchInpTxtcleaned+"', using the first IP as the location..:"+"\n"+ipLstArr+"\n"+"List can be copied to clipboard using Ctrl+C ...:")
                      prompt(alertmsg, ipLstArr);//Using prompt to allow copying to clipboard..
                    }

                }
console.log("Tracker 6");
                inpTxtHasIp = true;
                //url ='https://api.ipgeolocation.io/ipgeo?apiKey='+ipgeoKey+'&ip='+data.DNSData.dnsRecords[0].address;
                  url = 'https://njsar.glitch.me/ipgeoApi/'+data.DNSData.dnsRecords[0].address;
                console.log(url);
                setTimeout(getJSONurlFwrapr,2000);//Let`s give a bit of time for previous API(wisxApi) to run and initialize data.
                wisxApiUrlget="";//Reset this for next time round as it`s a check flag..
               }
            }else{// Ip does not exist..
                  rotateArrow.cancel();
                  btnArrHvr.style.display = "unset";//reset spinning arrow..
                  alert("No ip address exists for domain:"+srchInpTxtcleaned);
                }
                
          }

        }
console.log("Tracker 7");
        console.log("Data2: "+JSON.stringify(data));
        
      }).catch(Error =>{ // "fetch failed. (site,page,url error..)"
        rotateArrow.cancel();
        btnArrHvr.style.display = "unset";//reset spinning arrow..
        console.error("Error fetching data, please check the internet."+errMsgSite+". If error is 'CORS related' please validate the API key..")
        alert("Error fetching data from '"+errMsgSite+"', please check the internet connection. ")
        console.error(Error);
    })

  }

  //console.log("before getJSON: ...")



getJSONurlFwrapr();//This same function is implemented twice-:
                 //1st time is here for when it is instantly available for when an ip address is queried.
                 //2nd time used in conjunction with setTimeout function (line:~195)
                 //for when waiting for getJsonWisx function to initialize data...

})//----------End Button function btnArrHvr----------//




function getJSONurlFwrapr(){// Function Wrapper - 'getJSONurlFwrapr'..


//Define the getJson function and retrieve the data..:
//The async and await keywords enable asynchronous, promise-based behavior to be written in a cleaner style..(see mdn website for more..)
const getJSON = async url => {
  const response = await fetch(url);
  if(!response.response_code ===200){ // check if response worked (no http errors etc...)
      throw new Error(response); //response.statusText
  }else{
  const data = response.json(); // get JSON from the response
  return data; // This async function returns a promise which resolves to this data value..
  }
}

//Revert after testing DISABLE
  if (srchInpTxt.value===""||inpTxtHasIp){//Var inpTxtHasIp set to true once domain name converted to ip address via whoisxmlapi.com ...
console.log("Tracker 8")     
      //inpTxtHasIp =false;//reset this for the next time a search is performed..
      rotateArrow.play();
      let getUserIPChk = false;// check if function getUserIP succeeds..


          //As this app is using an 'API proxy' get the LOCAL host IP via public service..
          //BEFORE using the "nodejs server on glitch.com.
          async function getUserIP() {
            if (srchInpTxt.value===""&&inpTxtHasIp==false){
console.log("Tracker 9");
//               
                 //errMsgSite = "https://ipv4.seeip.org/jsonip";  //respData.ip
                 errMsgSite = "https://api.bigdatacloud.net/data/client-ip";  //respData.ipString
     

                 // As we have been waiting for quite some time for a response from fetch, lets put a timeout..
                 await fetch('https://api.bigdatacloud.net/data/client-ip',{ signal: AbortSignal.timeout(5000)})
                 .then((response) => {
                        if (response.ok) {
                          return response.json();
                          }else {
                            throw new Error('Something went wrong');
                          }
                  })
                  .then((respData) => {
                  // Do something with the fetched response data
                   console.log('respData :'+JSON.stringify(respData) );
                   console.log("inpTxtHasIp-:"+inpTxtHasIp);
                    console.log('User IP Address:', respData.ipString);
                    url = url+respData.ipString;
                    getUserIPChk = true;
                  //  return respData
                  })
                  .catch((error) => {
                    setTimeout(rotateArrow.cancel(),500);// stop spin in background when prompt is displayed..
                    console.log('the error we got..'+error)
                    btnArrHvr.style.display = "unset";//reset spinning arrow..
                    prompt(alertmsgIntro, trkradsUrl)
                  });
            };
        } 

       async function getip(){//wrapping this in a async function as we need to ensure getUserIP() runs first!!
        await getUserIP();
          console.log("Tracker 11")
          console.log('srchInpTxt.value -:'+ srchInpTxt.value);
          console.log("inpTxtHasIp-:"+inpTxtHasIp)
          console.log('url -:'+ url);
          console.log('getUserIPChk -:'+ getUserIPChk);

          if (getUserIPChk||inpTxtHasIp){// Check getUserIP() function has run ( when no ip entered to be retrieved...)
                                         // or inpTxtHasIp set to true when an ip address has been entered.

        await getJSON(url).then(data => {
          console.log('url -:'+ url);
          console.log('data -:'+ data); //for all of it..
          if (data){//We have some Data!!
          //  rotateArrow.play();
             if (data.message){//If message property exists then site reached but 
                               //invalid page 404 or data\key returned messages..
             rotateArrow.cancel();
             btnArrHvr.style.display = "unset";//reset spinning arrow..
             console.log("Data error message:"+JSON.stringify(data));
             alert("Data error message:"+JSON.stringify(data));
             }else{
console.log("Tracker 12");
             console.log("We`re cooking!!");
             console.log("Data: "+JSON.stringify(data));

            console.log(data.ip);
            sBRCiPaDD.innerHTML=data.ip; //IP ADDRESS
            //sBRCLoc.innerText=(data.city+","+data.country_code3+" "+data.zipcode); // LOCATION
            sBRCLoc.innerText=(data.city+","+data.country_code3+" "+data.zipcode+" "); // LOCATION
            
            //img.src ='https://media.geeksforgeeks.org/wp-content/uploads/20190529122828/bs21.png';
           
            document.getElementById('sBRCLoc').appendChild(sBRCLocFlag);// previous line 'sBRCLoc.innerText=..' overwrites the inner img tag, so it needs adding again..
            sBRCLocFlag.src=(data.country_flag); // LOCATION FLAG
            //const div = document.createElement('div');
            //div.style.background = 'url(img.png)';

            console.log(data.country_flag);
            let HHMM = String(data.time_zone.current_time).slice(11,16);
              console.log('HHMM-:'+HHMM);

            //console.log("utcDateHHMM.getUTCHours:"+utcDateHHMM.getUTCHours() +data.time_zone.offset);
            //sBRCtimeZ.innerHTML=("UTC - "+utcDateHH.getUTCHours()+":"+localDate.getUTCMinutes()+" (Local Time)");// --TIMEZONE--<<
            sBRCtimeZ.innerHTML=( HHMM+" (Local Time)");// --TIMEZONE--<<
            sBRCiSP.innerHTML=data.isp//ISP

            //To Do!! get screen width to determine map size..
            //width=800 , height=1024
            //- Mobile: w375px   h530px
            //- Desktop: w1440px h520px
            //manually setting for mobile at the moment..
            let width='',height='';
            console.log('window.innerWidth:'+window.innerWidth)
            if (window.innerWidth>'700'){
                  width='1440',height='522';
            }else{width='375' ,height='530';}

            setTimeout(()=>{ getmap(data.latitude,data.longitude,width,height);
                                },3000);
            //stop arrow animation in getmap func called..
            //rotateArrow.cancel();
            //setTimeout(()=>{//revert back the change..
            //  btnArrHvr.style.display = "unset";//reset spinning arrow..
            //  },2000)//give 2seconds
            // console.log("Data: "+JSON.stringify(data.));
             }
          }else{//Site reachable but data returned is invalid\"null"...
console.log("Tracker 13");
             console.log("Error: Invalid data returned. - data:" +JSON.stringify(data));
             alert("Error: Invalid data returned. - data:" +JSON.stringify(data));
             rotateArrow.cancel();
             btnArrHvr.style.display = "unset";
          }
     }).catch(Error => { 
console.log("Tracker 14");
         rotateArrow.cancel();
         btnArrHvr.style.display = "unset";
         alert("Unable to reach the site--:"+errMsgSite+" 1. Please check internet connection and try again. If you get 'Failed to load resource: net::ERR_BLOCKED_BY_CLIENT' in devtools(F12) check browser Adblockers/shields have been disabled to view returned site message(s).");
         console.error("Unable to reach the site--:"+errMsgSite+" 1. Please check internet connection and try again. If you get 'Failed to load resource: net::ERR_BLOCKED_BY_CLIENT' in devtools(F12) check browser Adblockers/shields have been disabled to view returned site message(s).");
         console.error(Error);
         //console.log(JSON.stringify(data));
         // NOTE!! If it is working in VSC( or other browsers) but NOT in Chrome, and you get error-: "Failed to load resource: net::ERR_BLOCKED_BY_CLIENT"
         // found in "Sources" Tab in DevTools, then check if Adblockers\Shields is disabled in Chrome and try again.
     }
    )


   }

 };
  getip(); //async function getip

  async function getmap(lat,lng,width,height){
      //call the "map-here" api from here..
      //https://developer.here.com/documentation/examples/rest/map-image/map-image-width-height
      //lat = data.latitude; //52.5159
      //filler join with %2C
      //lng = data.longitude;//13.3777
      //z zoom to 13  //h 800  //w 1440  //f file format 0:PNG 1:JPEG 2:GIF etc..
      
      //https://njsar.glitch.me/hereMApi/&c=-17.925537,25.8492134&z=13&ppi=72&f=0&h=800&w=1024
      errMsgSite = "https://njsar.glitch.me/hereMApi";
      
      
      let mapurl = 'https://njsar.glitch.me/hereMApi/&c='+lat+','+lng+'&z=14&ppi=72&f=0&h='+height+'&w='+width;
      console.log('fetching hereMApi..: '+mapurl);
    
       await fetch(mapurl,{ signal: AbortSignal.timeout(5000)})
      .then(response=>{
             if (response.ok){
               console.log('accessed url to generate map ok...');
               setTimeout(()=>{
                var timestamp = new Date().getTime();
                
                 if (window.innerWidth>'700'){
                        document.getElementById("HereApiMapDskt").src='https://njsar.glitch.me/hImgMaps/hereMap0.png?t='+timestamp;//append time to force it refresh the cache..
                  }else{document.getElementById("HereApiMapMble").src='https://njsar.glitch.me/hImgMaps/hereMap0.png?t='+timestamp;//append time to force it refresh the cache..
                  } 

                rotateArrow.cancel();
                btnArrHvr.style.display = "unset";
                btnArrHvrMASK.style.zIndex = "unset";
                btnArrHvrMASK.style.background = "unset";
                },5000)//give some time for imgMap to download to https://njsar.glitch.me...
               }else{
                 throw new Error('Something went wrong accessing the url...');
               }
       })   
       .catch((error) => {
         setTimeout(rotateArrow.cancel(),500);// stop spin in background when prompt is displayed..
         console.log('Error fetching '+errMsgSite+'...: '+error)
         btnArrHvr.style.display = "unset";//reset spinning arrow..
         prompt(alertmsgIntro, trkradsUrl)
       });    
        }

};
}

