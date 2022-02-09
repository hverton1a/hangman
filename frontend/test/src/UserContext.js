import { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({children})=>{
    const [name, setName] = useState('Heverton');
    const [location, setLocation] = useState('Mars');

    return (
        <UserContext.Provider
            value={{
                name,
                setName,
                location,
                setLocation
            }}>
                {children}
            </UserContext.Provider>
    );
};