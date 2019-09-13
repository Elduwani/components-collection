import React, { useReducer } from 'react';
import { useAuth } from "../auth/use-auth.js";


const Task = () => {
    const [items, dispatch] = useReducer((state, action) => {
        switch (action) {
            case "add":
                return state + 1
            case "reduce":
                return state <= 0 ? state : state - 1
            case "clear":
                return 0
            default:
                return state
        }
    }, [])
    return (
        <div>
            <ul>
                {
                    items.map((item, i) => {
                        return (
                            <li key={i}>{item.name}</li>
                        )
                    })
                }
            </ul>
            <button onClick={() => dispatch("add")}>Increment</button>
            <button onClick={() => dispatch("reduce")}>Decrement</button>
            <button onClick={() => dispatch("clear")}>Clear</button>
        </div>
    );
}

export default Task;
