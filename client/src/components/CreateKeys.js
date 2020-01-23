import React, {useState} from 'react';
import {createKeys} from "../services/keygenerator";

const CreateKeys = props => {
    

    const handleClick = event => {
        const keys = createKeys();
        props.setKeys(keys);
    }

    return(
        <button onClick={handleClick}>Create Keys</button>
    )
}

export default CreateKeys;