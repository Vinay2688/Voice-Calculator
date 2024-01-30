let v=document.getElementById('res')
function Solve(val){
    v.value+=val
}
function Clear(){
    v.value=''
}
function Back(){
    v.value=v.value.slice(0,-1)
}
function Result(){
    let p=eval(v.value)
    v.value=p
}
let speech=new SpeechSynthesisUtterance();
let mic=document.getElementById('mic')
let im=document.getElementById('im')
mic.onclick=function(){
    im.classList.add("record");
    let rec=new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
    rec.lang = 'en-US'
    rec.start();
    operations={
        "plus":"+",
        "minus":"-",
        "multiply":"*",
        "multiplied":"*",
        "divided":"/",
        "divide":"/",
        "modulus":"%",
        "into":"*",
        "X":"*",
        "x":"*"

    };
    rec.onresult = (event) => {
        let input = event.results[0][0].transcript;
        for(i in operations){
            input=input.replace(i,operations[i]);
        }
        v.value=input;
        setTimeout(() => {
            evaluate(input);
        }, 2000);
        im.classList.remove("record");
      };
}
function evaluate(input){
    let r=eval(input);
    v.value=r;
    speech.text=r;
    window.speechSynthesis.speak(speech);
}
