import React from "react";
import { nanoid } from "nanoid";
import Dice from "./Dice";
import "./App.css";
import Confetti from "react-confetti";

function App() {

    const [dice,setDice]=React.useState(getDice());
    const [tenzies,setTenzies]=React.useState(false);
    const [moves,setMoves]=React.useState(0);
    const [best,setBest]=React.useState();
   
    function getDice(){
        let myArray=[];
        for(let i=0;i<10;i++){
            myArray.push({value:Math.ceil(Math.random()*6),
                isHeld:false,
                id:nanoid()});
        }
        return myArray;
    }

    const diceElements=dice.map(value=><Dice 
        num={value.value} 
        key={value.id} 
        id={value.id}
        onClick={()=>handleClick(value.id)}
        isHeld={value.isHeld
        }
         />)

         React.useEffect(()=>{
            localStorage.setItem("best",JSON.stringify(Number.MAX_SAFE_INTEGER));
         },[])

         React.useEffect(()=>{
            const firstValue=dice[0].value;
            const allValues=dice.every(dice=>dice.value===firstValue);
            const allHeld=dice.every(dice=>dice.isHeld);
            if(allValues&&allHeld){
                setTenzies(true);
                console.log("You Won");
                const prevBest=JSON.parse(localStorage.getItem("best"))||Number.MAX_SAFE_INTEGER;
                console.log(prevBest)
                if(prevBest>moves){
                    localStorage.setItem("best",JSON.stringify(moves));
                    setBest(moves);
                    console.log(JSON.parse(localStorage.getItem("best")))
                }

            }
         },[dice])
    // function generateDice(){
    //     return{
    //         value:Math.ceil(Math.random()*6),
    //         isHeld:false,
    //         id:nanoid()
    //     }
    // }

    function rollDice(){
        setMoves(prevMove=>prevMove+1);
        setDice(prevDice=>prevDice.map(value=>{
            return value.isHeld?value
            :{value:Math.ceil(Math.random()*6),isHeld:false,id:nanoid()}
        }));
    }

    function handleClick(id){
        setDice(prevDice=>prevDice.map(value=>{
                return value.id===id?{...value,isHeld:!value.isHeld}:value
            })
        )  
    }

    function resetGame(){
        setDice(getDice());
        setTenzies(false);
        setMoves(0);
    }

  return (
    <main className="App">
        {tenzies?<Confetti />:(<div></div>)}
        
        <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        
        <div className="dice">
            {diceElements} 
        </div>
        
        {tenzies?(<div className="won">Congratulations!!</div>):(<div></div>)}
        
        {!tenzies?(<button className="rollDice" onClick={rollDice}>Roll Dice</button>)
        :(<button className="resetGame" onClick={resetGame}>Reset Game</button>)}
        
        <div className="results">
            <div className="moves">Total Moves: {moves}</div>
            <div className="best">Best: {best}</div>
        </div>
    </main>
  );
}

export default App;
