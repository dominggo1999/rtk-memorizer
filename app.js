const $ = (selector) => {
  return document.querySelector(selector);
};

const $all = (selector) => {
  return document.querySelector(selector);
}

const char = $(".character");
const form = $("#form");
const o = $(".order");
const y = $(".list");
const meaning = $(".meaning");
const toggleMeaning = $("#toggleMeaning");
let isSubmit = false;

// initial value
let list = data;
let order = 0;
let s = 0;
let f = 3031;
char.innerHTML = list[0].kanji;

const chooseList = (s, f) =>{
  if(s && f &&  s<f && s>0 && f<=3031){
    //Pilih list antara s dan f
    list = (data.slice(s-1, f));
    order = 0;
    char.innerHTML = list[order].kanji;
    meaning.innerHTML= list[order].meaning;
    o.innerHTML=order+1;
    y.innerHTML=list.length;
  }
}

form.addEventListener("submit", (e)=>{
  e.preventDefault();
  isSubmit=true;
  const start = $("#start").value;
  const finish = $("#finish").value;

  s = parseInt(start,10);
  f = parseInt(finish,10);

  chooseList(s,f);
})



// Pilih karakter dari list 
const next = $("#next");

const chooseChar = () =>{
  const delta = f-s;

  order++;
  if(order===delta+1){
    order=0;
  }

  char.innerHTML = list[order].kanji;
  meaning.innerHTML= list[order].meaning;
  o.innerHTML=order+1;
  meaning.classList.remove("display");
}

next.addEventListener("click",(e)=>{
    chooseChar();
})

//Randomize 
const random = () =>{
  let newList = [];
  const l = list.length;

  while(list.length > 0){
    const x = Math.floor(Math.random() * list.length);

    newList.push(list.splice(x,1)[0]);
  }

  list=newList;
  order = 0;
  o.innerHTML=order+1;
  char.innerHTML = list[order].kanji;
  meaning.innerHTML= list[order].meaning;
}

const randomBtn = $("#random");
randomBtn.addEventListener("click",(e)=>{
  if(isSubmit){
    random();
  }
})

const toggleMeaningDisplay = () =>{
  meaning.classList.toggle("display");
}


// Keys
window.addEventListener("keydown", (e)=>{
  const k = e.key;

  if(k==="n"){
    chooseChar();
  } else if(k==="r"){
    if(isSubmit){
      random();
    }
  } else if(k==="m"){
    toggleMeaningDisplay();
  }
})



toggleMeaning.addEventListener("click",(e)=>{
  if(isSubmit){
   toggleMeaningDisplay();
  }
})

