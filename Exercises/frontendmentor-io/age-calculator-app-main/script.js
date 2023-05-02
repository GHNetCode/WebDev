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
    document.addEventListener("touchstart", (event) => { //For touch screens only.. 

        //get id and class events from '(event)' for Variables above..
        let elementId = event.target.id;
        let elementCls = event.target.classList; //event.target.classList.contains("my-class")
      //  console.log('touchstart all  elementCls :'+ elementCls)
      //  console.log('touchstart all  elementId :'+ elementId);

    //problem with below is the Label does not 
        if(elementId ==='DayBoxLbLP'){ //||'DayBoxP'||'rangeDayId'){
        console.log('0tstart DayBoxLbLP...' );

            if(DayBoxLbLP.style.display===''||'flex'){//initial and consecutive touches.. 
                console.log("1tstart display===''||'flex'" );
                rangeDayId.style.display='flex';
                DayBoxLbLP.style.display='none';//MM Label
                
               }

        }

        
        // DayBoxLbLP > DayBoxP > rangeDayId


          if(elementId ==='DayBoxP'){
              console.log('2tstart DayBoxP' );
                 rangeDayId.style.display='flex';
                 DayBoxLbLP.style.display='none';//MM Label
          }

             //    if(!DayBoxP.onfocus){
             //      console.log('3tstart !DayBoxP.onfocus...' );
             //                  if (DayBoxP.value===''){
             //           DayBoxLbLP.style.display='flex';
             //          }
             //    }

             if(elementId !=='DayBoxLbLP'){ // the or operator "||" not behaving!! so using nested if statement..
                console.log('tstart NOT DayBoxP-rangeDayId...elementId:'+elementId );
                rangeDayId.style.display='none';
                    if (DayBoxP.value===''){
                     DayBoxLbLP.style.display='flex';
                     }
    
            }
            
             if(elementId !=='DayBoxP'){
                rangeDayId.style.display='none';
                if (DayBoxP.value===''){
                 DayBoxLbLP.style.display='flex';
                 }
                }
    

            //check if DayBoxLbLP.style.display='none'...


           //need to check if DayBoxLbLP and DayBoxLbLP has been touched and is active or not
           //
           //so below function needs reviewing...
           //if (elementId !=='DayBoxP'||'DayBoxLbLP'){
           //    console.log('3tstart !==DayBoxP||DayBoxLbLP --.elementId :'+elementId );

           //     if (DayBoxP.value===''){
           //         console.log("4tstart DayBoxP.value'' :"+DayBoxP.value );
                //    DayBoxLbLP.style.display='flex';
           //     }
           // }




    //       else{
              //  rangeDayId.style.display='none';
    //              if (DayBoxP.value===''){
    //                console.log("3tstart DayBoxP.value==='' If statement.." );
                    //applying the below when 
                  //  rangeDayId.style.display='none';
                  //  DayBoxLbLP.style.display='flex';
    //         }
    //      }

    
//
    //   if(elementId ==='rangeDayId'){
    //    console.log('touchstart rangeDayId If statement..' );
    //      DayBoxLbLP.style.display="none";//Label
    //      rangeDayId.style.display="flex";
    //   }else{
    //      rangeDayId.style.display="none";
    //      }
//


     //need to implement rangeDayId function for tracking and ending the slider.. 
     //with touchstart -- implement rangeDayId function in here..
     //next is touchmove ( here maybe just ensure that flex is displayed... ) 
     //and touchend.. then end the touch..





    if(elementId ==='MonthBoxP'){
            rangeMonthId.style.display='flex';
            MonthBoxLbLP.style.display='none';//MM Label
     }else{                   
          rangeMonthId.style.display='none';
          if (MonthBoxP.value===''){
            MonthBoxLbLP.style.display='flex';
        }}

   if(elementId ==="YearBoxP"){
            // YearBoxLbLP.style.display="none";
            rangeYearId.style.display="flex";
            YearBoxLbLP.style.display="none";//YYYY Label
     }else{
        rangeYearId.style.display="none";
        if (YearBoxP.value===""){
            YearBoxLbLP.style.display="flex";
        }}
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

} else{ document.addEventListener("click", (event) => {
           //get id and class events from '(event)' for Variables above..
           let elementId = event.target.id;
           let elementCls = event.target.classList; //event.target.classList.contains("my-class")
           console.log('all  elementCls :'+ elementCls)
           console.log('all  elementId :'+ elementId);


            if(elementId ==="DayBoxP"){
                    rangeDayId.style.display="flex";
                    DayBoxLbLP.style.display="none";//MM Label
             }else{                   
                  rangeDayId.style.display="none";
                            if (DayBoxP.value===""){
                   DayBoxLbLP.style.display="flex";
               }
             }

             if(elementId ==="rangeDayId"){
                DayBoxLbLP.style.display="none";
                rangeDayId.style.display="flex";
             }//else{rangeDayId.style.display="none";}


            if(elementId ==="MonthBoxP"){
                    rangeMonthId.style.display="flex";
                    MonthBoxLbLP.style.display="none";//MM Label
             }else{                   
                  rangeMonthId.style.display="none";
                  if (MonthBoxP.value===""){
                    MonthBoxLbLP.style.display="flex";
                }}

           if(elementId ==="YearBoxP"){
                    // YearBoxLbLP.style.display="none";
                    rangeYearId.style.display="flex";
                    YearBoxLbLP.style.display="none";//YYYY Label
             }else{
                rangeYearId.style.display="none";
                if (YearBoxP.value===""){
                    YearBoxLbLP.style.display="flex";
                }  
                
                }
            

      });}
          

// Format Day and Month to ensure they have a leading 0 for single digits (0 - 9)...

function DDMMnum (DDMMval,id){
//DayBox
    if (id ==="DayBoxP"){
        //console.log('DayBoxP:DDMMval.value :'+DDMMval.value)
        rangeDayId.value=DDMMval.value; //update the rangeDay Slider..
        //below for Day and Month commented out, as format 
        //can be changed when form is validated and submitted..
//       if (DDMMval.value.length === 1){
//        DDMMval.value = "0" + DDMMval.value;
//       }
    }

    if (id ==="rangeDayId"){
       // DayBoxP.value=DDMMval.value; //update the rangeDay Slider..
    if (DDMMval.value.length === 1){
        DayBoxP.value = "0" + DDMMval.value;
    }else{DayBoxP.value=DDMMval.value;}}
 
//MonthBox
 if (id ==="MonthBoxP"){
    rangeMonthId.value=DDMMval.value; //update the rangeDay Slider..

    //below for Day and Month commented out, as format 
    //can be changed when form is validated and submitted..
//     if (DDMMval.value.length === 1){
//        DDMMval.value = "0" + DDMMval.value;
//      }
}

if (id ==="rangeMonthId"){
    if (DDMMval.value.length === 1){
    MonthBoxP.value = "0" + DDMMval.value;
    }else{MonthBoxP.value=DDMMval.value;}}
};

//Implement onchange function.. check value is not ""..

        // if(DDMMval.value=="")
        // {DayBoxLbLP.style.display="flex";}

function dmyChgLabel(id){//on change
    if (id ==="DayBoxP"){
        // if(DDMMval.value=="")
        // {DayBoxLbLP.style.display="flex";}
        console.log('dmyChgLabel-DayBoxP :'+DayBoxP.value);
        if (DayBoxP.value==="")
        {DayBoxLbLP.style.display="flex";
        }else{DayBoxLbLP.style.display="none";}
    }
}