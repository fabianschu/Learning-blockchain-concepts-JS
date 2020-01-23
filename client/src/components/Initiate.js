import React, {useState} from 'react';
import {Transaction, Block, Blockchain} from "../services/implementMerkleTree";

const Initiate = props => {
    
    const handleClick = () => {
        const fabiCoin = new Blockchain();
        console.log(fabiCoin);
        props.setChain(fabiCoin);
        props.setIsInitiated(true);
    }
    
    return (   
        <button onClick={handleClick}>Initiate blockchain</button>
    )
}
export default Initiate;