window.onresize=()=>{
    document.getElementById('resizeInnerW').textContent=window.innerWidth;
}

//
// Sort out the double digits for Day and Month and Year!!
//


//rangeYearId rangeMonthId'||'rangeDayId'
let rangeYearId = document.getElementById('rangeYearId');
let rangeMonthId = document.getElementById('rangeMonthId');
let rangeDayId = document.getElementById('rangeDayId');

if ('ontouchstart' in window){
    document.addEventListener("touchstart", (event) => { //For touch screens only.. 

        //get id and class events from '(event)' for Variables above..
        let elementId = event.target.id;
        let elementCls = event.target.classList; //event.target.classList.contains("my-class")
        console.log('all  elementCls :'+ elementCls)
        console.log('all  elementId :'+ elementId);


   if(elementId !=='YearBoxP'){
            rangeYearId.style.display="none";
     }else{rangeYearId.style.display="flex";}
   if(elementId !=='MonthBoxP'){
            rangeMonthId.style.display="none";
     }else{
          rangeMonthId.style.display="flex";}
   if(elementId !=='DayBoxP'){
            rangeDayId.style.display="none";
     }else{
          rangeDayId.style.display="flex";}



});} else if ('ontouchend' in window){
        document.addEventListener("touchend", (event) => {
        
        //get id and class events from '(event)' for Variables above..
        let elementId = event.target.id;
        let elementCls = event.target.classList; //event.target.classList.contains("my-class")
        console.log('all  elementCls :'+ elementCls)
        console.log('all  elementId :'+ elementId);

        

        });
      } else{ document.addEventListener("click", (event) => {
           //get id and class events from '(event)' for Variables above..
           let elementId = event.target.id;
           let elementCls = event.target.classList; //event.target.classList.contains("my-class")
           console.log('all  elementCls :'+ elementCls)
           console.log('all  elementId :'+ elementId);

           if(elementId !=='YearBoxP'){
                    rangeYearId.style.display="none";
             }else{rangeYearId.style.display="flex";}
           if(elementId !=='MonthBoxP'){
                    rangeMonthId.style.display="none";
             }else{
                  rangeMonthId.style.display="flex";}
           if(elementId !=='DayBoxP'){
                    rangeDayId.style.display="none";
             }else{
                  rangeDayId.style.display="flex";}


      });}
          

