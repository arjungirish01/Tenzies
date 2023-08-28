import React from "react";
import { nanoid } from "nanoid";
import Dice from "./Dice";
import "./App.css";
import Confetti from "react-confetti";

function App() {
    // console.log(nanoid());
    const [dice,setDice]=React.useState(getDice());
    const [tenzies,setTenzies]=React.useState(false);

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
            const firstValue=dice[0].value;
            const allValues=dice.every(dice=>dice.value===firstValue);
            const allHeld=dice.every(dice=>dice.isHeld);
            if(allValues&&allHeld){
                setTenzies(true);
                console.log("You Won");
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
    console.log(dice);

    function resetGame(){
        setDice(getDice());
        setTenzies(false);
    }

  return (
    <main className="App">
        <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="dice">
            {diceElements} 
        </div>
        {tenzies?(<div className="won">Congratulations!!</div>):(<div></div>)}
        {!tenzies?(<button className="rollDice" onClick={rollDice}>Roll Dice</button>)
        :(<button className="resetGame" onClick={resetGame}>Reset Game</button>)}
        {tenzies?<Confetti />:(<div></div>)}
    </main>
  );
}

export default App;
