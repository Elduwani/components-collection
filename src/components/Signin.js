import React, { useState } from 'react';
import { useAuth } from "../auth/use-auth"

const Signin = () => {
    const auth = useAuth()
    const [password, setPassword] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        auth.signin(password)
        console.log(password);
    }

    return (
        <div>
            Welcome to sign in page
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </form>
        </div>
    );
}

export default Signin;
