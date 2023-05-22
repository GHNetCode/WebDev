//Show width in pixels for screen size, -- disable when done...:
window.onresize=()=>{
    document.getElementById('resizeInnerW').textContent=window.innerWidth;
}



//Define the getJson function..:
//The async and await keywords enable asynchronous, promise-based behavior to be written in a cleaner style..(see mdn website for more..)
const getJSON = async url => {
    const response = await fetch(url);
    if(!response.ok){ // check if response worked (no http errors etc...)
      throw new Error(response.statusText);
    }else{
    const data = response.json(); // get JSON from the response
    return data; // This async function returns a promise which resolves to this data value..
    }
  }
  

let contDiceIcon = document.getElementById("contDiceIcon");
let advIdNum = document.getElementById("idNum");
let advTxt = document.getElementById("advTxt");
let contAdvSlp = document.getElementById("contAdvSlp");

  const effect = new KeyframeEffect(//for advTxt
        advTxt, // Element to animate
    [ // Keyframes
      {transform: 'translateX(0%)'}, 
      {transform: 'translateX(800%)'},
      {transform: 'ease-in-out'}
    ],
    {duration: 1500} // Keyframe settings
  );

    const effect2 = new KeyframeEffect(//for Button
        contDiceIcon, // Element to animate
    [ // Keyframes
      {transform: 'rotate(0deg)'},
      {transform: 'rotate(-360deg)'}
    ],
    {duration: 1500} // Keyframe settings
  );

  const animation = new Animation(effect, document.timeline);
  const animation2 = new Animation(effect2, document.timeline);
  

 //Use getJson function..:
 //let url = 'https://soundcloud.com/oembed?url= (Insert URL) &format=json'; 
 //let url = 'https://soundcloud.com/oembed?url=https://soundcloud.com/brainalien/unknown-reality-livestream-lockdown?si=25f007f00d1646869460db5142f8d338&format=json';
 let url = 'https://api.adviceslip.com/advice'
//  console.log("Fetching data...");


contDiceIcon.addEventListener("pointerdown",e =>{
    console.log('button pressed..');
    animation.play();
    animation2.play();
    getJSON(url).then(data => {
        // console.log(data.slip.id);
        advIdNum.innerHTML=data.slip.id;
        advTxt.innerHTML=data.slip.advice; 
  }).catch(error => {
        console.error(error);
        advTxt.innerHTML = error;
  })
})







