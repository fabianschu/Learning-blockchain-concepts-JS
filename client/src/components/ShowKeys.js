import React, {useState, useEffect} from 'react';

const ShowKeys = props => {
  
    console.log(props.keys);
    return(
    <div>
        {props.keys.private
        ? 
        <>
        <p>Private key: {props.keys.private}</p>
        <p>Public key: {props.keys.public}</p>
        </>
        :
        (
        <p>No keys </p>
        )
        }
    </div>
    )
}

export default ShowKeys;