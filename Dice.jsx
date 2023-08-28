
import React from "react";

export default function Dice(props){
    const bg={
        backgroundColor:"green"
    }
    return (
        <div>
            <button className="diceFace"
            onClick={props.onClick}
            style={props.isHeld?bg:{}}>{props.num}
            </button>
        </div>
    )
}
