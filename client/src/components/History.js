import React, {useState} from 'react';
import {Transaction, Block, Blockchain} from "../services/implementMerkleTree";

const History = props => {

    return (
        <table>
            <thead>
                <tr>
                <th>From</th>
                <th>To</th>
                <th>Amount</th>
                </tr>
            </thead>
        </table>
    )
}

export default History;