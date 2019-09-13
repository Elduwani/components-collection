import React from 'react';
import { Link } from "react-router-dom"
import { useAuth } from "../auth/use-auth.js";

const Navbar = () => {
    // Get auth state and re-render anytime it changes
    const auth = useAuth();

    return (
        <div>
            {
                auth.user ? (
                    <>
                        <Link to="/tasks">Tasks</Link>
                        <button onClick={() => auth.signout()}>Signout</button>
                    </>
                ) : (
                        <Link to="/account">Sign in</Link>
                    )
            }
        </div>
    )
}

export default Navbar;
