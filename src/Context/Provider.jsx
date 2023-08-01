import React, { createContext, useEffect, useState } from 'react'



export const contextProvider = createContext(null)

const Provider = ({ children }) => {

    const [email, setEmail] = useState('')
    const [loading, setLaoding] = useState(false)
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        setLaoding(true);
        if (userId) {
            fetch('http://localhost:5000/user', {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ id: userId })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.status === 200) {
                        setEmail(data.user.email)
                    }
                })
            }
            setLaoding(false)
    }, [email])



    const userInfo = {
        email,
        setEmail,
        loading
    }

    return (
        <contextProvider.Provider value={userInfo}>{children}</contextProvider.Provider>
    )
}

export default Provider;