import React, {useState} from 'react';

const BlockComp = props => {
    
    const {timestamp, previousHash, hash, transactions} = props.blockInfo;
    
    const blockStyle = {
        border: "1px solid orange",
        backgroundColor: "yellow"
    }

    return (   
        <div style={blockStyle}>
            <p>Timestamp: {timestamp}</p>
            <p>Previous hash: {previousHash}</p>
            <p>Hash: {hash}</p>
            <p>Number of transactions: {transactions.length}</p>
        </div>
    )
}
export default BlockComp;