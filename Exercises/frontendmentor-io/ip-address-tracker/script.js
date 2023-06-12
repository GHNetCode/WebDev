//Show width in pixels for screen size, -- disable when done...:
window.onresize=()=>{
    document.getElementById('resizeInnerW').textContent=window.innerWidth;
}

/*
Steps:
1. If there is nothing entered in the search field, find IP address of current connection.
2. If there is something entered, validate if it`s a Domain if not then IP Address.
3. If it`s a domain name convert it to ip.
4. If it`s an IP address get Geolocation Details.. 
*/

alert("Leave search field blank to retrieve your own IP.")

//let url = 'https://api.iplocation.net/?cmd=get-ip';
let url = '';
let ipgeoKey = '7783fb11b9744bcebdba45a9d063dd2d'; //ipgeolocation.io

let inpTxtHasIp = false;
let inpTxtHasDom = false;


 

const apiKeygf = "37f8bdcf-4048-4180-9162-e3406e73847a";// !b
const host1 = "tut.com";
let gfRes;
//const getJSON = async url => {
const requestOLD = async host1 =>{
//async function request(host1) {
//const response = await fetch(url);
  const responsegf = await fetch("https://api.geekflare.com/dnsrecord", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKeygf,
      "Access-Control-Allow-Origin": "https://api.geekflare.com",
    },
    body: JSON.stringify({ url: host1, types: ["A"] }),
  });

  if (responsegf.ok){
    const  {data}  = await responsegf.json();
    console.log(data.A[0].address);
    gfRes = (data.A[0].address);
    return data.A[0].address;
  } else {
    console.log(responsegf);
  }
}


//----------
let btnArrHvr = document.getElementById('btnArrHvr');


     btnArrHvr.addEventListener("pointerdown",e =>{
     console.log("button pushed..");
     //reset url..
     url = '';
     setTimeout(()=>{
      const apiKeygf = "37f8bdcf-4048-4180-9162-e3406e73847a";// !b
      const host1 = "google.com";
      async function request(host1){
        const response = await fetch("https://api.geekflare.com/dnsrecord",{
          method: "POST",
          //mode: "cors", // no-cors, *cors, same-origin
         // cache: "default", // *default, no-cache, reload, force-cache, only-if-cached
         // credentials: "same-origin", // include, *same-origin, omit
         // Origin: "127.0.0.1:3000",
          headers:{
            //"Content-Type":"application/json",
            "Content-Type":"application/json",
            "x-api-key":apiKeygf,
            //"origin": "https://api.geekflare.com/dnsrecord",
            "Access-Control-Allow-Origin":"*",
          },
          body: JSON.stringify({ url: host1, types: ["A"] }),
        });
      
        if (response.ok) {
          const { data } = await response.json();
          console.log(data.A[0].address);
        } else {
          console.log(response);
        }
      }
      request(host1);
      
      },4000)




     }
  )
  //--------
  