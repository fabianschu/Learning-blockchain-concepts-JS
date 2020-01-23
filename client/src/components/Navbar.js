import React, { useState, useEffect } from "react";
import Initiate from "./Initiate";
import ShowKeys from "./ShowKeys";
import CreateKeys from "./CreateKeys";

const Navbar = props => {
    console.log(props.isInitiated);
    return(
        <div className="navbar">
            <div className="cockpit-container">
            {props.isInitiated === false && < Initiate 
            setIsInitiated={props.setIsInitiated}
            setChain={props.setChain}
            />}
            </div>
            <div className="key-container">
            < ShowKeys keys={props.keys}/>
            < CreateKeys setKeys={props.setKeys}/>
            </div>
        </div>
    )
}

export default Navbar;