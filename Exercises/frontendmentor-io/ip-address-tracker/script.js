//Show width in pixels for screen size, -- disable when done...:
window.onresize=()=>{
    document.getElementById('resizeInnerW').textContent=window.innerWidth;
}

/*
Steps    Overview--:
1. If there is nothing entered in the search field, find IP address of current connection.
2. If there is something entered, validate if it`s a Domain if not then IP Address.
3. If it`s a domain name convert it to ip via API www.whoisxmlapi.com
4. If it`s an IP address get Geolocation Details.. 
*/

alert("Leave search field blank to retrieve your own current IP.")


//global variables..
let url = '';
let ipgeoKey = '7783fb11b9744bcebdba45a9d063dd2d'; //ipgeolocation.io
let inpTxtHasIp = false;
let inpTxtHasDom = false;


let sBRCiPaDD=document.getElementById('sBRCiPaDD');//IP address
let sBRCLoc=document.getElementById('sBRCLoc');//Location
let sBRCLocFlag=document.getElementById('sBRCLocFlag');//Location flag
let sBRCtimeZ=document.getElementById('sBRCtimeZ');// Local Time Zone (UTC)
let sBRCiSP=document.getElementById('sBRCiSP');// ISP Internet chocolatey spreading provider.. 😁


// https://www.whoisxmlapi.com/whoisserver/DNSService?apiKey=at_KGjrggTEbY8mXXDzkQVAoeARmsD40&domainName=tut.com&type=A&outputFormat=JSON
let wisxApiUrl="https://www.whoisxmlapi.com/whoisserver/DNSService?apiKey=at_KGjrggTEbY8mXXDzkQVAoeARmsD40&type=A&outputFormat=JSON&domainName="
//const wisxApiKey="?apiKey=at_KGjrggTEbY8mXXDzkQVAoeARmsD40";// !b
let wisxApiUrlget='';
let   wisxdomainName ;//&domainName=tut.com
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
  
}


//----------Start Button Event listener function for MouseClicks, touch and Enter key..
let btnArrHvr = document.getElementById('btnArrHvr');//srchInpTxt

// create a specific "pointerdown" event for our window to listen out for the Enter Key
// as all the code is implemented within the pointerdown event below "btnArrHvr.addEventListener("pointerdown",e =>{..."
let pntrDowEntEvnt = new PointerEvent('pointerdown')
window.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("btnArrHvr").dispatchEvent(pntrDowEntEvnt);
  }
});

//let btnArrHvr = document.getElementById('btnArrHvr');//srchInpTxt
     btnArrHvr.addEventListener("pointerdown",e =>{
     console.log("button pushed..");
     //reset url..
     url = '';
     let srchInpTxtcleaned='';
     inpTxtHasIp = false; //reset flags
     inpTxtHasDom = false; //reset flags

     //Check if srchInpTxt.value(search field) is null
     // if null, return by default current ip but only (after checking if site is reachable..)
     // console.log(srchInpTxt.value);
     //
     if (srchInpTxt.value===""){//Return default ip info..
        console.log("value has No data-- :"+srchInpTxt.value);
         url = 'https://api.ipgeolocation.io/ipgeo?apiKey='+ipgeoKey;
         console.log(url);
      }else{
       url ='https://api.ipgeolocation.io/ipgeo?apiKey='+ipgeoKey+'&ip='+srchInpTxt.value;
        console.log("url:"+url);
        // Checkif domain or an IP address.
        //1. Checking domain..
          // Clean up the string.. If we have 'https://' or 'http' or 'www.' in front lets remove them..
          // for regex check https://stackoverflow.com/questions/41942690/removing-http-or-http-and-www/41942787
           srchInpTxtcleaned = srchInpTxt.value.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0];
              console.log("srchInpTxt.value cleaned..:"+srchInpTxtcleaned);

              //String now cleaned, check number of elements\dots..
              let chkDomIpvalid = srchInpTxtcleaned.split("."); 

            //Check if a domain name has been entered. more than 0, less than 4 elements\Octets is a domain..
              if (chkDomIpvalid.length > 0 && chkDomIpvalid.length < 4 ){ 
                  console.log("Validate domain name further..");
                  //For regex check https://stackoverflow.com/questions/10306690/what-is-a-regular-expression-which-will-match-a-valid-domain-name-without-a-subd
                    function is_domain(srchInpTxtcleaned){
                       regexp = /^(([a-zA-Z]{1})|([a-zA-Z]{1}[a-zA-Z]{1})|([a-zA-Z]{1}[0-9]{1})|([0-9]{1}[a-zA-Z]{1})|([a-zA-Z0-9][a-zA-Z0-9-_]{1,61}[a-zA-Z0-9]))\.([a-zA-Z]{2,6}|[a-zA-Z0-9-]{2,30}\.[a-zA-Z]{2,3})$/g;
                              if (regexp.test(srchInpTxtcleaned)){
                                  return true;
                                }else{
                                  return false;
                                }
                        }
                      
                        if (is_domain(srchInpTxtcleaned)){// Domain validated, now lookup the ip address..
                          console.log("Domain Valid, lookup ip address..:"+srchInpTxtcleaned);

                            //calling whoisxmlapi API to convert Domain name to Ip...
                            wisxApiUrlget = wisxApiUrl + srchInpTxtcleaned;//Note wisxApiUrlget is also a flag to allow function getJsonWisx(wisxApiUrlget) to run.
                            console.log("wisxApiUrl -----:"+wisxApiUrl);
                          inpTxtHasDom = true;
                        }else{
                          console.log("Invalid domain name entered..:"+srchInpTxtcleaned);
                          alert('Invalid domain name entered..:'+ srchInpTxtcleaned);

                        }
             }else{ //Here onwards checking if input str is a valid ip...
                if (chkDomIpvalid.length === 4){
                console.log("we atleast have 4 octets, check further..")
              const isValidIp = value => (/^(?:(?:^|\.)(?:2(?:5[0-5]|[0-4]\d)|1?\d?\d)){4}$/.test(value));
              if(isValidIp (srchInpTxt.value)){
                 console.log('We have a Valid ip!')
                 inpTxtHasIp = true;
                 }else{
                  console.log('We have a INVALID ip..')
                  alert(srchInpTxt.value+" IP address attempt detected, please enter correct Ip Address.")

                }}
              };
   
      

      }
 
   



  if (srchInpTxt.value!==""&&wisxApiUrlget!==""&&inpTxtHasDom!==false){
      getJsonWisx(wisxApiUrlget).then(data =>{
        if (data){//We have some Data!!
          //console.log("Data1: "+JSON.stringify(data));
          //console.log(data.DNSData.dnsRecords[0].address);
            if (data.ErrorMessage){//If data.ErrorMessage property exists then site reached but 
                              //invalid page 404 or data\key returned messages..
              console.log("Data error message:"+JSON.stringify(data));
              console.log("Please validate URL is correct");
              alert("Data error message:"+JSON.stringify(data));
              alert("Please validate URL is correct");
            }else{
             console.log("We have data, ip converted..");
             console.log("Check if ip exists or not for given domain..");
             console.log("Data: "+JSON.stringify(data));
             //provide notification with list of multiple ip address`s and just looking up the 1st one..
             //console.log("typeof data.DNSData.dnsRecords: "+typeof data.DNSData.dnsRecords);
             //console.log("typeof data.DNSData.dnsRecords.address: "+typeof data.DNSData.dnsRecords[0].address);
              console.log(data.DNSData.dnsRecords.length);     
            //Cannot read properties of undefined (reading 'address')
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

                        let alertmsg = ("List of ip address`s that have been found for domain:"+srchInpTxtcleaned+", using the first IP as the location..:"+"\n"+ipLstArr+"\n"+"List can be copied to clipboard using Ctrl+C ...:")
                        prompt(alertmsg, ipLstArr);//Using prompt to allow copying to clipboard..
                        
                      }

                  }
                  //let alertmsg = ("List of ip address`s that have been found for domain:"+srchInpTxtcleaned+", using the first IP as the location..:"+"\n"+ipLstArr+"\n"+"List can be copied to clipboard using Ctrl+C ...:")
                  //prompt(alertmsg, ipLstArr);//Using prompt to allow copying to clipboard..
                  
                  inpTxtHasIp = true;
                  url ='https://api.ipgeolocation.io/ipgeo?apiKey='+ipgeoKey+'&ip='+data.DNSData.dnsRecords[0].address;
                  console.log(url);
                  setTimeout(getJSONurlFwrapr,2000);//Let`s give a bit of time for previous API to run to and initialize data.
                  wisxApiUrlget="";//Reset this for next time round as it`s a check flag..
                 }
              }else{// Ip does not exist..
                    alert("No ip address exists for domain:"+srchInpTxtcleaned);

                  }
            }

          }
          console.log("Data2: "+JSON.stringify(data));
          
        }).catch(Error =>{ // "fetch failed. (site,page,url error..)"
          console.error("Error fetching data, please validate url. If error is 'CORS related' please validate the API key..")
          console.error(Error);
      })

    }

    //console.log("before getJSON: ...")



getJSONurlFwrapr();//This same function is implemented twice-:
                   //1st time is here for when it is instantly available for when an ip address is queried.
                   //2nd time used in conjunction with setTimeout function (line:~172)
                   //for when waiting for getJsonWisx function to initialize data...

  })//----------End Button function btnArrHvr
 

//G_ENABLED_IDPS cookie-domain:.ipgeolocation.io cookie-name:G_ENABLED_IDPS cookie-path:/ 
//document.cookie = "G_ENABLED_IDPSpath=.ipgeolocation.io/;SameSite=Lax";;//let`s get rid of that pesky samesite=lax browser error..
function getJSONurlFwrapr(){// get JSON url Function Wrapper..
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
    if (srchInpTxt.value===""||inpTxtHasIp){//inpTxtHasIp domain must be converted to an ip address First via whoisxmlapi.com!
        inpTxtHasIp =false;//reset this for the next time..
        //Cookie.set('SameSite', 'Lax');//let`s get rid of that pesky samesite=lax browser error..
         getJSON(url).then(data => {
           //console.log(data); //for all of it..
           //data output -: {ip: '146.70.133.136',ip_version: 4,response_code: 200,response_message: 'OK'}
           // advIdNum.innerHTML=data.slip.id;
           // advTxt.innerHTML=data.slip.advice;
           if (data){//We have some Data!!
               if (data.message){//If message property exists then site reached but 
                                 //invalid page 404 or data\key returned messages..
               console.log("Data error message:"+JSON.stringify(data));
               alert("Data error message:"+JSON.stringify(data));
               }else{
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
                                       
              var localDate = new Date();// --TIMEZONE-->>
              var utcDateHHMM = new Date(Date.UTC(localDate.getUTCHours(),localDate.getUTCMinutes()));
              utcDateHHMM.setHours(localDate.getHours() +data.time_zone.offset);
              sBRCtimeZ.innerHTML=("UTC - "+utcDateHHMM.getUTCHours()+":"+localDate.getUTCMinutes()+" (Local Time)");// --TIMEZONE--<<
              sBRCiSP.innerHTML=data.isp//ISP


              //todo fix bug below -
              // 1. after searching a good domain and then a bad domainName there is buggy error..
              //    not the same if i search for bad domain first with same error.. "Invalid domain name entered"
                            


              // console.log("Data: "+JSON.stringify(data.));
               }
            }else{//Site reachable but data returned is invalid\"null"...
               console.log("Error: Invalid data returned. - data:" +JSON.stringify(data));
               alert("Error: Invalid data returned. - data:" +JSON.stringify(data));
            }
       }).catch(Error => { // Error reaching the site etc..
         // console.error(Error); 
           alert("Unable to reach the site--:"+url+" 1. Please check internet connection and url and try again. If you get 'Failed to load resource: net::ERR_BLOCKED_BY_CLIENT' in devtools(F12) check browser Adblockers/shields have been disabled to view returned site message(s).");
           console.error("Unable to reach the site--:"+url+" 1. Please check internet connection and url and try again. If you get 'Failed to load resource: net::ERR_BLOCKED_BY_CLIENT' in devtools(F12) check browser Adblockers/shields have been disabled to view returned site message(s).");
           console.error(Error);
           console.log(JSON.stringify(data));
           // NOTE!! If it is working in VSC( or other browsers) but NOT in Chrome, and you get error-: 
           //-TypeError: Failed to fetch
           //-at getJSON (script.js:18:28)
           //-at HTMLSpanElement.<anonymous> (script.js:50:5)
           //Now click on link under (script.js:18:28) which will take you to the "Sources" Tab in DevTools.
           //Check if there is a red line under 'fetch(url)'. Hover over the red x to reveal the message.
           //If the message is "Failed to load resource: net::ERR_BLOCKED_BY_CLIENT"
           //then check if Adblockers\Shields is disabled in Chrome and try again.
           // NOTE!!  If it is not working in ANY browsers Check internet connection and url are correct.
       })
     }
   }

   
   
