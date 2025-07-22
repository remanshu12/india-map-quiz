const states=document.querySelectorAll('svg path');
//console.log(states);
const questionBox=document.getElementById('question');


// ---------------------state names
const stateNames=Array.from(states).map(state=>state.getAttribute('name'));
//console.log(stateNames);

// ---------------------remaining states
let remainingStates=[...stateNames];

// ---------------------random state
function getRandomState(){
    const randomIndex=Math.floor(Math.random()*remainingStates.length);
    return remainingStates[randomIndex];
}

// ---------------------remove state
function removeStates(stateName){
    remainingStates=remainingStates.filter(name=> name!==stateName);
}

// ---------------------question
let currentState=null;
function askNextQuestion(){
    if(remainingStates.length>0){
        currentState=getRandomState();
     //  currentState=currentState.style.fontWeight='bold';
        questionBox.textContent=`Click the correct state: ${currentState}`;
        removeStates(currentState);
    }else{
        questionBox.textContent='You have guessed all states!';
    }
}


// ---------------------state click what happens

const correctState=new Set();
states.forEach(state =>{

    state.addEventListener('mouseover',()=>{
        if(!correctState.has(state.getAttribute('name'))){
            state.style.fill='skyblue';
        }     
    });

    state.addEventListener('mouseleave',()=>{
        if (!correctState.has(state.getAttribute('name'))) {
        state.style.fill='#6f9c7c';
    }
    });

    state.addEventListener('click',()=>{
        if(!currentState){
            return;
        }

        if(state.getAttribute('name')===currentState){
            state.style.fill='orange';
            correctState.add(currentState);
            askNextQuestion();     
        }
        else{
            state.style.fill='red';
            setTimeout(()=>{
                if (!correctState.has(state.getAttribute('name'))) {
                state.style.fill='#6f9c7c';
            }
            },1000);        
        }
    });

});




// ---------------------timer
const timerBox=document.getElementById('timers');
let timeLeft=90;
let timerInterval=null;

function startTimer(){
    timerBox.textContent=`Time Left: ${timeLeft}s`;
    timerInterval=setInterval(()=>{
        timeLeft--;
        timerBox.textContent = `Time Left: ${timeLeft}s`;
        if(timeLeft<=0){
            clearInterval(timerInterval);
            timerBox.textContent='Time is up!';
            endQuiz();
        }
    },1000);
}

function endQuiz(){
    questionBox.textContent='Quiz is over!';
    currentState=null;
}

askNextQuestion();
startTimer();

const resetBtn = document.getElementById('resetBtn');

resetBtn.addEventListener('click', () => {
    // Reset timer
    clearInterval(timerInterval);
    timeLeft = 90;
    timerBox.textContent = `Time Left: ${timeLeft}s`;
    startTimer();

    // Reset remaining states
    remainingStates = [...stateNames];
    currentState = null;
    questionBox.textContent = '';

    // Reset correct states
    correctState.clear();

    // Reset all state colors
    states.forEach(state => {
        state.style.fill = '#6f9c7c';
    });

    // Start new question
    askNextQuestion();
});

