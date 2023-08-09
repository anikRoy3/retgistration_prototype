import React, { createContext, useEffect, useState } from 'react';


export const contextProvider = createContext(null);

const Provider = ({ children }) => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(false);
  const userId = localStorage.getItem('userId');
  const [cart, setCart] = useState(localStorage.getItem('cartItems'));
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (userId) {
      setLoading(true);
      fetch(`http://localhost:5000/user/${userId}`)
        .then(res => res.json())
        .then(data => {
          if (data.status === 200) {
            setEmail(data.user.email);
            setRole(data.user.role);
            setUser(data.user);
          }
        })
        .catch(error => {
          console.error("Error fetching user data:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [userId]);


  const userInfo = {
    email,
    setEmail,
    loading,
    cart,
    setCart,
    role,
    user
  };

  return (
    <contextProvider.Provider value={userInfo}>
      {loading ? (
        // Show the loading spinner here (you can use any loading spinner component or library)
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        // Render the actual content when not loading
        children
      )}
    </contextProvider.Provider>
  );
};

export default Provider;
