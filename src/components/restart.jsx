import React from "react";
import {restart} from '../actions/restart';
import { useDispatch, useSelector } from 'react-redux';

export function Restart() {
    const isFreePlay = useSelector(state => state.BoardReducer.freePlay);
    const dispatch = useDispatch();

    function handleClick() {
        //window.localStorage.clear();
        dispatch(restart(isFreePlay));

    }
    return (
        <button onClick={handleClick}>Restart</button>
    )
}

export default Restart;