import React, {useState} from 'react';
import {Transaction, Block, Blockchain} from "../services/implementMerkleTree";
import BlockComp from "./BlockComp";

const Chain = props => {
    console.log(props.chain);

    return (   
        <div>
            <p>Difficulty: {props.chain.difficulty}</p>
            <p>Mining reward: {props.chain.miningReward}</p>
            <div>
                {props.chain.chain.map((block, index) => {
                    return (
                        <BlockComp blockInfo={block}/>
                    )
                })}
            </div>
        </div>
    )
}
export default Chain;