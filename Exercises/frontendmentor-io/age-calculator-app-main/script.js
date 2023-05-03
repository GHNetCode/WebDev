window.onresize=()=>{
    document.getElementById('resizeInnerW').textContent=window.innerWidth;
}

//
// Sort out the double digits for Day and Month and Year!!
//



let rangeYearId = document.getElementById('rangeYearId');
let rangeMonthId = document.getElementById('rangeMonthId');
let rangeDayId = document.getElementById('rangeDayId');
let DayBoxLbLP = document.getElementById('DayBoxLbLP');
let DayBoxP = document.getElementById('DayBoxP');
let MonthBoxLbLP = document.getElementById('MonthBoxLbLP');
let YearBoxLbLP = document.getElementById('YearBoxLbLP');




if ('ontouchstart' in window){
    document.addEventListener('touchstart', (event) => { //For touch screens only.. 

        //get id and class events from '(event)' for Variables above..
        let elementId = event.target.id;
        let elementCls = event.target.classList; //event.target.classList.contains('my-class')
      //  console.log('touchstart all  elementCls :'+ elementCls)
      //  console.log('touchstart all  elementId :'+ elementId);


    //Day BOX
        //display range Slider and hide Label..
        if(elementId ==='DayBoxLbLP'||'DayBoxP'||'rangeDayId'){ 
              if(DayBoxLbLP.style.display===''||'flex'){//initial and consecutive touches.. 
                  rangeDayId.style.display='flex';
                  DayBoxLbLP.style.display='none';//MM Label                
                 }
        }
        // DayBoxLbLP > DayBoxP > rangeDayId
        //hide range Slider and hide\display Label..
        if(elementId !=='DayBoxLbLP'){ 
            if(elementId !=='DayBoxP'){
                if (DayBoxP.value===''){
                 DayBoxLbLP.style.display='flex';
                 }
            if(elementId !=='rangeDayId'){
                if (rangeDayId.style.display==='flex'){
                    rangeDayId.style.display='none';
                   }
            }else if(elementId ==='rangeDayId'){
                DayBoxLbLP.style.display='none';
            }
          }
        }

    
    //Month BOX
        //display range Slider and hide Label..
        if(elementId ==='MonthBoxLbLP'||'MonthBoxP'||'rangeMonthId'){ 
            if(MonthBoxLbLP.style.display===''||'flex'){//initial and consecutive touches.. 
                rangeMonthId.style.display='flex';
                MonthBoxLbLP.style.display='none';//MM Label                
               }
      }

      // MonthBoxLbLP > MonthBoxP > rangeMonthId
      //hide range Slider and hide\display Label..
      if(elementId !=='MonthBoxLbLP'){ 
          if(elementId !=='MonthBoxP'){
              if (MonthBoxP.value===''){
               MonthBoxLbLP.style.display='flex';
               }
          if(elementId !=='rangeMonthId'){
              if (rangeMonthId.style.display==='flex'){
                  rangeMonthId.style.display='none';
                 }
          }else if(elementId ==='rangeMonthId'){
              MonthBoxLbLP.style.display='none';
          }
        }
      }

    //Year BOX
        //display range Slider and hide Label..
        if(elementId ==='YearBoxLbLP'||'YearBoxP'||'rangeYearId'){ 
            if(YearBoxLbLP.style.display===''||'flex'){//initial and consecutive touches.. 
                rangeYearId.style.display='flex';
                YearBoxLbLP.style.display='none';//MM Label                
               }
      }

      // YearBoxLbLP > YearBoxP > rangeYearId
      //hide range Slider and hide\display Label..
      if(elementId !=='YearBoxLbLP'){ 
          if(elementId !=='YearBoxP'){
              if (YearBoxP.value===''){
               YearBoxLbLP.style.display='flex';
               }
          if(elementId !=='rangeYearId'){
              if (rangeYearId.style.display==='flex'){
                  rangeYearId.style.display='none';
                 }
          }else if(elementId ==='rangeYearId'){
              YearBoxLbLP.style.display='none';
          }
        }
      }
    
    

  
});
} else if ('ontouchmove' in window){
    console.log('ontouchmove fired..');
        document.addEventListener("touchmove",(event) =>{
            let elementId = event.target.id;
            let elementCls = event.target.classList; //event.target.classList.contains("my-class")
            console.log('ontouchmove all  elementCls :'+ elementCls)
            console.log('ontouchmove all  elementId :'+ elementId);
    

            if(elementId ==="rangeDayId"){
                DayBoxLbLP.style.display="none";
                rangeDayId.style.display="flex";
             }
});

} else if ('ontouchend' in window){
        document.addEventListener("touchend", (event) => {
        
        //get id and class events from '(event)' for Variables above..
        let elementId = event.target.id;
        let elementCls = event.target.classList; //event.target.classList.contains("my-class")
        console.log('ontouchend all  elementCls :'+ elementCls)
        console.log('ontouchend all  elementId :'+ elementId);

         

        });

} else{ document.addEventListener('click', (event) => {
           //get id and class events from '(event)' for Variables above..
           let elementId = event.target.id;
           let elementCls = event.target.classList; //event.target.classList.contains('my-class')
           console.log('all  elementCls :'+ elementCls)
           console.log('all  elementId :'+ elementId);


            if(elementId ==='DayBoxP'){
                    rangeDayId.style.display='flex';
                    DayBoxLbLP.style.display='none';//MM Label
             }else{                   
                  rangeDayId.style.display='none';
                            if (DayBoxP.value===''){
                   DayBoxLbLP.style.display='flex';
               }
             }

             if(elementId ==='rangeDayId'){
                DayBoxLbLP.style.display='none';
                rangeDayId.style.display='flex';
             }//else{rangeDayId.style.display='none';}


            if(elementId ==='MonthBoxP'){
                    rangeMonthId.style.display='flex';
                    MonthBoxLbLP.style.display='none';//MM Label
             }else{                   
                  rangeMonthId.style.display='none';
                  if (MonthBoxP.value===''){
                    MonthBoxLbLP.style.display='flex';
                }}

           if(elementId ==='YearBoxP'){
                    // YearBoxLbLP.style.display='none';
                    rangeYearId.style.display='flex';
                    YearBoxLbLP.style.display='none';//YYYY Label
             }else{
                rangeYearId.style.display='none';
                if (YearBoxP.value===''){
                    YearBoxLbLP.style.display='flex';
                }  
                
                }
            

      });}
          

// Format Day and Month to ensure they have a leading 0 for single digits (0 - 9)...

function DDMMnum (DDMMval,id){
//DayBox
    if (id ==='DayBoxP'){
        //console.log('DayBoxP:DDMMval.value :'+DDMMval.value)
        rangeDayId.value=DDMMval.value; //update the rangeDay Slider..
        //below for Day and Month commented out, as format 
        //can be changed when form is validated and submitted..
//       if (DDMMval.value.length === 1){
//        DDMMval.value = '0' + DDMMval.value;
//       }
    }

    if (id ==='rangeDayId'){
       // DayBoxP.value=DDMMval.value; //update the rangeDay Slider..
    if (DDMMval.value.length === 1){
        DayBoxP.value = '0' + DDMMval.value;
    }else{DayBoxP.value=DDMMval.value;}}
 
//MonthBox
 if (id ==='MonthBoxP'){
    rangeMonthId.value=DDMMval.value; //update the rangeDay Slider..

    //below for Day and Month commented out, as format 
    //can be changed when form is validated and submitted..
//     if (DDMMval.value.length === 1){
//        DDMMval.value = '0' + DDMMval.value;
//      }
}

if (id ==='rangeMonthId'){
    if (DDMMval.value.length === 1){
    MonthBoxP.value = '0' + DDMMval.value;
    }else{MonthBoxP.value=DDMMval.value;}}
};

//Implement onchange function.. check value is not ''..

        // if(DDMMval.value=='')
        // {DayBoxLbLP.style.display='flex';}

function dmyChgLabel(id){//on change
    if (id ==='DayBoxP'){
        // if(DDMMval.value=='')
        // {DayBoxLbLP.style.display='flex';}
        console.log('dmyChgLabel-DayBoxP :'+DayBoxP.value);
        if (DayBoxP.value==='')
        {DayBoxLbLP.style.display='flex';
        }else{DayBoxLbLP.style.display='none';}
    }
}