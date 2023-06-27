//Show width in pixels for screen size, -- disable when done...:
window.onresize=()=>{
  document.getElementById('resizeInnerW').textContent=window.innerWidth;
};

/*
Steps    Overview--:
0. On launch find the current ip address.
1. If there is nothing entered in the search field, find IP address of current connection.
2. If there is something entered, validate if it`s a Domain if not then IP Address.
3. If it`s a domain name convert it to ip via API www.whoisxmlapi.com
4. If it`s an IP address get Geolocation Details.. 
*/

let alertmsgIntro = ("Welcome to the 'IP Address Tracker' WebApp!"+"\n"+"\
"+"\n"+"\
Please Note: As this WebApp checks IP address`s please allow "+"\n"+"\
'Trackers/Ads' for it to function properly. See below URL image to allow for this site only (For BRAVE Browser)..."+"\n"+"\
"+"\n"+"\
Please also check your internet connection and try again."+"\n"+"\
"+"\n"+"\
");
let trkradsUrl = "https://ghnetcode.github.io/WebDev/Exercises/frontendmentor-io/ip-address-tracker/images/BRAVEbrowser%20AllowTracker&ads.png";
//prompt(alertmsgIntro, trkradsUrl);



//global variables!
let url = '';
let errMsgSite =''; // used for messages..
//let ipgeoKey = '5b7fb872d30843b3a61f0bb5c13c5e80'; //.length9 
let inpTxtHasIp = false;
let inpTxtHasDom = false;


let sBRCiPaDD=document.getElementById('sBRCiPaDD');//IP address
let sBRCLoc=document.getElementById('sBRCLoc');//Location
let sBRCLocFlag=document.getElementById('sBRCLocFlag');//Location flag
let sBRCtimeZ=document.getElementById('sBRCtimeZ');// Local Time Zone (UTC)
let sBRCiSP=document.getElementById('sBRCiSP');// ISP Internet chocolatey spreading provider.. 😁


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


//Setup Animations for the spinning arrow.
let iconArrowBtn = document.getElementById('iconArrowBtn');
const effect = new KeyframeEffect(//for Button
iconArrowBtn, // Element to animate
[{transform: 'rotate(0deg)'},{transform: 'rotate(720000deg)'}],// Keyframes
{duration: 20000} // Keyframe settings   8sec..  
);
const rotateArrow = new Animation(effect, document.timeline);
//rotateArrow.play();
//rotateArrow.reverse();
//rotateArrow.cancel();// to stop the animation before set duration..



//reset html elements for next search...
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
//Re-enable before go live!!
//window.onload=()=>{ btnArrHvr.dispatchEvent(pntrDowEntEvnt);};


// The Arrow button function to run when pressed..
btnArrHvr.addEventListener("pointerdown",e =>{

  btnArrHvr.style.display = "none";//only allow one press after x ms..
  setTimeout(()=>{//revert back the change..
  btnArrHvr.style.display = "unset";
  },10000);// 10seconds wait....

   console.log("button pushed..");
   htmlEreset();//clear previous results..
   //rotateArrow.play();

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
                  alert("No ip address exists for domain:"+srchInpTxtcleaned);
                }
                
          }

        }
console.log("Tracker 7");
        console.log("Data2: "+JSON.stringify(data));
        
      }).catch(Error =>{ // "fetch failed. (site,page,url error..)"
        rotateArrow.cancel();
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


  if (srchInpTxt.value===""||inpTxtHasIp){//Var inpTxtHasIp set to true once domain name converted to ip address via whoisxmlapi.com ...
console.log("Tracker 8")     
      //inpTxtHasIp =false;//reset this for the next time a search is performed..
      rotateArrow.play();
      let getUserIPChk = false;// check if function getUserIP succeeds..


          //As this app is using an 'API proxy' get the LOCAL host IP via https://ipv4.seeip.org/jsonip
          //BEFORE using the "Serverless API Proxy on glitch.com.
          async function getUserIP() {
            if (srchInpTxt.value===""&&inpTxtHasIp==false){
console.log("Tracker 9");
                try {
                 errMsgSite = "https://ipv4.seeip.org/jsonip";
                 const response = await fetch('https://ipv4.seeip.org/jsonip');
                 const data = await response.json();
                 console.log("inpTxtHasIp-:"+inpTxtHasIp)
                 console.log('User IP Address:', data.ip);
                 url = url+data.ip;
                 getUserIPChk = true;
               } catch (error) {
                 rotateArrow.cancel();
                 btnArrHvr.style.display = "unset";
                 console.error('Error fetching public IP from '+errMsgSite +' . :', error);
                // alert('Error fetching public IP from '+errMsgSite +' Please check internet connection and try again... :', error);
                prompt(alertmsgIntro, trkradsUrl);
               }
            };
//            else{
//console.log("Tracker 10")
//              try {
//                errMsgSite = url;
//                const response = await fetch(url);
//                const data = await response.json();
//                console.log("inpTxtHasIp-:"+inpTxtHasIp)
//                console.log('User IP Address:', data.ip);
//                //url = url+data.ip;
//                getUserIPChk = true;
//              } catch (error) {
//                rotateArrow.cancel();
//                console.error('Error fetching public IP from '+errMsgSite +' . :', error);
//                alert('Error fetching public IP from '+errMsgSite +' Please check internet connection and try again. . :', error);
//                 }}
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
             btnArrHvr.style.display = "unset";
             console.log("Data error message:"+JSON.stringify(data));
             alert("Data error message:"+JSON.stringify(data));
             }else{
console.log("Tracker 12")
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
            
            //stop arrow animation
            rotateArrow.cancel();
            setTimeout(()=>{//revert back the change..
              btnArrHvr.style.display = "unset";
              },2000)//give 2seconds
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

};
}

