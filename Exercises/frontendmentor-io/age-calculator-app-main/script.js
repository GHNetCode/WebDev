//Show width in pixels for screen size, -- disable when done...:
window.onresize=()=>{
    document.getElementById('resizeInnerW').textContent=window.innerWidth;
}












// Format Day and Month to ensure they have a leading 0 for single digits (0 - 9)...
function dmyNumF (ymdVal,id){


    let reg = /^\d+$/; //check only for numbers
    
    //DayBox
        if (id ==='DayBoxP'){
            //console.log('DayBoxP:DDMMval.value :'+DDMMval.value)
            
        
            if (!reg.test(ymdVal.value)){//if input not a number,reset to 0.
                ymdVal.value = 0;
            }
    
            rangeDayId.value=ymdVal.value; //update the rangeDay Slider..
            //below for Day and Month commented out, as format 
            //can be changed when form is validated and submitted..
           //if (ymdVal.value.length === 1){
           // ymdVal.value = '0' + ymdVal.value;
           // }
    
    
        }
    
        if (id ==='rangeDayId'){
           // DayBoxP.value=ymdVal.value; //update the rangeDay Slider..
        if (ymdVal.value.length === 1){
            DayBoxP.value = '0' + ymdVal.value;
        }else{DayBoxP.value=ymdVal.value;}}
     
    //MonthBox
     if (id ==='MonthBoxP'){
    
        if (!reg.test(ymdVal.value)){//if input not a number,reset to 0.
            ymdVal.value = 0;
        }
    
        rangeMonthId.value=ymdVal.value; //update the rangeDay Slider..
    
        //below for Day and Month commented out, as format 
        //can be changed when form is validated and submitted..
    
         //  if (ymdVal.value.length === 1){
         //   ymdVal.value = '0' + ymdVal.value;
         //   }
    }
    
    if (id ==='rangeMonthId'){
        if (ymdVal.value.length === 1){
        MonthBoxP.value = '0' + ymdVal.value;
        }else{MonthBoxP.value=ymdVal.value;}}
    
    //YearBox
    if (id ==='YearBoxP'){
    
        if (!reg.test(ymdVal.value)){//if input not a number,reset to 0.
            ymdVal.value = '0000';
        }
    
        rangeYearId.value=ymdVal.value; //update the rangeDay Slider..
    
        //below for Day and Month commented out, as format 
        //can be changed when form is validated and submitted..
    
        //   if (ymdVal.value.length === 1){
        //    ymdVal.value = '000' + ymdVal.value;
        //   }
    }
    
    if (id ==='rangeYearId'){
        if (ymdVal.value.length === 1){
            YearBoxP.value = '0' + ymdVal.value;
        }else{YearBoxP.value=ymdVal.value;}}
    
    
    };
    
    
    
    
     
    let dval;
    let mval;
    let yval;
    function dmyVals(DMY,dValue){
    if (DMY==='day'){dval=dValue;}
    if (DMY==='month'){mval=dValue;}
    if (DMY==='year'){yval=dValue;}};
    
    //Modal for Date Validation\Calculation...
    let iconArrBtnId = document.getElementById("iconArrBtn"); //class="iconArrBtn"
    iconArrBtnId.addEventListener("click",iconArrBtnFunc);
    
    
    
    // Create a date object from a date string
    let date = new Date();
    // Get year, month, and day part from the date
    let year = date.toLocaleString("default", { year: "numeric" });
    let month = date.toLocaleString("default", { month: "2-digit" });
    let day = date.toLocaleString("default", { day: "2-digit" });
    // Generate yyyy-mm-dd date string
    let formattedDate = year + "-" + month + "-" + day;//  yyyy-mm-dd
    
    
    
    function iconArrBtnFunc(){
    let dmyArr =[dval,mval,yval];
      
    //dateChk to confirm if we can continue validating..:
    let dateChk = true; //true = date is currently valid..
    
    let mDaysVal = 0;//Days for bday month.
    
    //reset any prior messages
    document.getElementById("dayMdlChkP1").innerHTML = "";
    document.getElementById("monthMdlChkP1").innerHTML = "";
    document.getElementById("yearMdlChkP1").innerHTML = "";
    
      //Loop to validate if there is a date value that is undefined or empty''.. 
       for (let i = 0; i < dmyArr.length; i++) {
    
            if (dmyArr[i]===undefined||dmyArr[i]===''){
                    //alert("value is undefined! or ''- i:"+'dmyArr[i] :'+dmyArr[i]+' i:'+[i]+' dmyArr.length:'+dmyArr.length);
    
              //Message:"This field is required"
               if (i===0){
                    document.getElementById("dayMdlChkP1").innerHTML = "This field is required";
                } else if (i===1){
                    document.getElementById("monthMdlChkP1").innerHTML = "This field is required";
                } else if (i===2){
                    document.getElementById("yearMdlChkP1").innerHTML = "This field is required";
                }
                
                dateChk = false;
        }else{
            if (i===0){document.getElementById("dayMdlChkP1").innerHTML = "";}
            if (i===1){document.getElementById("monthMdlChkP1").innerHTML = "";}
            if (i===2){document.getElementById("yearMdlChkP1").innerHTML = "";}
            }
    
    }
    
    
    if (dateChk){ //For Messages:"Must be a valid day","Must be a valid Month","Must be in the past"
                if(dval > 0 && dval < 32){
                    document.getElementById("dayMdlChkP1").innerHTML = "";
                    mDaysVal = 31;
                    }else{document.getElementById("dayMdlChkP1").innerHTML = "Must be a valid day";
                    dateChk = false;}
    
                if(mval > 0 && mval < 13){
                     document.getElementById("monthMdlChkP1").innerHTML = "";
                     }else{document.getElementById("monthMdlChkP1").innerHTML = "Must be a valid month";
                     dateChk = false;}
    
                if(yval < year){
                   document.getElementById("yearMdlChkP1").innerHTML = "";
                   }else{document.getElementById("yearMdlChkP1").innerHTML = "Must be in the past";
                   dateChk = false;}
       }
    
           //let m31daysAr = [1,3,5,7,8,10,12] //31 day months
           let m30daysAr = [4,6,9,11]//30 day months
       if (dateChk){//For Message: Must be a valid date.
    
         //
            m30daysAr.forEach(e =>{
            if (e==mval){//Check dval has 30 days or less..
                if (dval<=30){
                      document.getElementById("dayMdlChkP1").innerHTML = "";
                      mDaysVal = 30;
                }else{document.getElementById("dayMdlChkP1").innerHTML = "Must be a valid date";
                dateChk = false;}
            }
            });
    
    
            
            if (mval==2){//check Feb`s date! -- https://www.calendar.best/leap-years.html
                /*If a leap year ensure date is checked for Feb29th..
                 To check if a year is a leap year, it must be divisible by 4 and not divisible by 100 or divisible by 400.
                */
    
                  if(((yval % 4 == 0) && (yval % 100 !==0))|| (yval % 400 == 0)){
                    //alert('We got ourselves a leap year..')
                    //Feb date here can be the 29th..
                    if (dval<=28){
                        document.getElementById("dayMdlChkP1").innerHTML = "";
                        mDaysVal = 28 ; //adding 1 as consistently get +1 day more in the results...
                     }else{document.getElementById("dayMdlChkP1").innerHTML = "Must be a valid date";
                      dateChk = false;}
                    }else if (dval<=29){//else if Not a leap year...
                     document.getElementById("dayMdlChkP1").innerHTML = "";
                     mDaysVal = 29;
                    }else{document.getElementById("dayMdlChkP1").innerHTML = "Must be a valid date";
                     dateChk = false;}
    
            }
        }
    
        if (dateChk){//At this stage, no errors.. Time to calculate and update years,months,days..
        
    
            //convert mm,dd to an int..
              year = parseInt(year);
              month = parseInt(month);
              day = parseInt(day);
             
            let yearSum,monthSum,daySum;
    
        
               yearSum = year - yval -1;
                
                //Add the months between bday year and current year, IF 
                //more than twelve, add 1 year and then subtract 12  to get
                //months left minus 1 for the days....           
                if(((12 - mval) + month ) >= 12){
                    yearSum +=1; // Add one year.
                    monthSum = ((12 - mval) + month) -12;//-12 remove year from months..
                    
                }else{
                    monthSum = ((12 - mval) + month)
                
                }
    
                //mDaysVal is total num of days for the bday(mval) month..
                if ((mDaysVal - dval) + day >= mDaysVal){
                   // alert('1');
                    daySum = ((mDaysVal - dval) + day) -mDaysVal;
                }else{
                   // alert('2');
                    //check if leap year, if so then add days..
                    if (mDaysVal==29){  mDaysVal +=2; }
                    if (mDaysVal==28){  mDaysVal +=2; }
    
                    daySum = mDaysVal -(dval - day);
    
                    if (dval > day){
                        if (monthSum==0){ 
                            monthSum=12; yearSum -=1;}
                        monthSum -=1
                    }
                }
                
    
            document.getElementById("Cnt1bYrsN").innerHTML = yearSum;
            document.getElementById("Cnt1bMntsN").innerHTML = monthSum;
            document.getElementById("Cnt1bDysN").innerHTML = daySum;
            
            //Let`s give the numbers some life with animations and colors. :)
            counterAnim("#Cnt1bYrsN", 0, yearSum, 2000);
            counterAnim("#Cnt1bMntsN", 0, monthSum, 2000);
            counterAnim("#Cnt1bDysN", 0, daySum, 2000);
            rotateysm("Cnt1bYrsN");
            rotateysm("Cnt1bMntsN");
            rotateysm("Cnt1bDysN");
        }
    };
    
    function rotateysm(eId){
    let ysm = document.getElementById(eId);
        ysm.style.transform= 'rotate(360deg)';
        ysm.style.transition=  'transform 1s';
        ysm.style.animationName= 'color-change';
        ysm.addEventListener("animationend", myEndAnimFunc);
     }
    
     //lets ensure we can repeat the animation again after the button is clicked more than once..
     function myEndAnimFunc (){
        this.removeAttribute('style');
    }
    
    
    //Count the numbers function..
    const counterAnim = (qSelector, start = 0, end, duration) => {
        const target = document.querySelector(qSelector);
        let startTimestamp = null;
        const step = (timestamp) => {
         if (!startTimestamp) startTimestamp = timestamp;
         const progress = Math.min((timestamp - startTimestamp) / duration, 1);
         target.innerText = Math.floor(progress * (end - start) + start);
         if (progress < 1) {
          setTimeout(window.requestAnimationFrame(step), 1);
         }
        };
        setTimeout(window.requestAnimationFrame(step), 1);
       };
    









let rangeYearId = document.getElementById('rangeYearId');
let rangeMonthId = document.getElementById('rangeMonthId');
let rangeDayId = document.getElementById('rangeDayId');
let DayBoxLbLP = document.getElementById('DayBoxLbLP');
let DayBoxP = document.getElementById('DayBoxP');
let MonthBoxP = document.getElementById('MonthBoxP');
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
        //display range Slider and hide DDMMYYYYLabel..
        if(elementId ==='DayBoxLbLP'||'DayBoxP'||'rangeDayId'){
              if(DayBoxLbLP.style.display===''||'flex'){//initial and consecutive touches.. 
                  rangeDayId.style.display='flex';
                  DayBoxLbLP.style.display='none';//MM Label                
                 }
        }
        // DayBoxLbLP > DayBoxP > rangeDayId
        //hide range Slider and hide\display DDMMYYYYLabel..
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
                MonthBoxLbLP.style.display='none';//DDMMYYYYLabel                
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
                YearBoxLbLP.style.display='none';//DDMMYYYYLabel                
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
} 

 else if ('ontouchend' in window){
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
          

   
