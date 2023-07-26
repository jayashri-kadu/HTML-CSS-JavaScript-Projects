let isDOBOpen = false;
let dateOfBirth;
const settingIconEl = document.getElementById("settingIcon");
const settingContentEl = document.getElementById("settingContent");
const initialTextEl = document.getElementById("initialText");
const afterDOBButtonTxtEl = document.getElementById("afterDOBButtonTxt");
const dobButtonEl = document.getElementById("dobButton");
const dobInputEl = document.getElementById("dobInput");

const yearEl = document.getElementById("year");
const monthEl = document.getElementById("month");
const dayEl = document.getElementById("day");
const hourEl = document.getElementById("hour");
const minuteEl = document.getElementById("minute");
const secondEl = document.getElementById("second");

const makeTwoDigitNumber = (number) => {
    return number > 9 ? number : `0${number}`
}

const toggleDOBSelector = ()=>{
    if(isDOBOpen){
        settingContentEl.classList.add("hide");
    }
    else{
        settingContentEl.classList.remove("hide");
    }
    isDOBOpen = !isDOBOpen;

    console.log("Toggle", isDOBOpen);
};

const updateAge = ()=>{
    const currentDate = new Date();
    const dateDiffrence = currentDate - dateOfBirth;
    const year = Math.floor(dateDiffrence/(1000 * 60 * 60 * 24 * 365));
    const month = Math.floor((dateDiffrence/(1000 * 60 * 60 * 24 * 365)) % 12);
    const day = Math.floor(dateDiffrence/(1000 * 60 * 60 * 24 ))% 30;
    const hour = Math.floor(dateDiffrence/(1000 * 60 * 60 )) % 24;
    const minute = Math.floor(dateDiffrence/(1000 * 60 ) ) % 60;
    const second = Math.floor(dateDiffrence/1000 )  % 60 ;

    yearEl.innerHTML = makeTwoDigitNumber(year);
    monthEl.innerHTML = makeTwoDigitNumber(month);
    dayEl.innerHTML = makeTwoDigitNumber(day);
    hourEl.innerHTML = makeTwoDigitNumber(hour);
    minuteEl.innerHTML = makeTwoDigitNumber(minute);
    secondEl.innerHTML = makeTwoDigitNumber(second);
   
}

const localStorageGetter = ()=>{
    const year = localStorage.getItem("year");
    const month = localStorage.getItem("month");
    const date = localStorage.getItem("date")
    
    if(year && month && date){
        dateOfBirth = new Date(year, month, date)
    }
  

}

const contentToggler = () =>{
    updateAge();
    if(dateOfBirth){
        initialTextEl.classList.add("hide");
        afterDOBButtonTxtEl.classList.remove("hide");      
    }
    else{
        initialTextEl.classList.remove("hide");
        afterDOBButtonTxtEl.classList.add("hide");
    }
}

const DOBHandler = () =>{

    const dateString = dobInputEl.value;

    dateOfBirth = dateString ? new Date(dateString) : null;

    
    console.log("DOB : ",dateOfBirth);
    if(dateOfBirth){
        
        localStorage.setItem("year", dateOfBirth.getFullYear());
        localStorage.setItem("month", dateOfBirth.getMonth());
        localStorage.setItem("date", dateOfBirth.getDate())

        
    }
    contentToggler();
    setInterval(() => {
        updateAge()
    }, 1000);
}

localStorageGetter();
contentToggler();

settingIconEl.addEventListener("click",toggleDOBSelector);
dobButtonEl.addEventListener("click",DOBHandler);