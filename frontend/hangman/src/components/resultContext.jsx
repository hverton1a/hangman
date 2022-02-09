import {useState, createContext, ReactChild} from 'react';

export const ResultContext = createContext();

export const ResultProvider = ({children}) => {
    const [result, setResult] = useState ('');

    return (
    <ResultContext.Provider 
            value={{
                result,
                setResult
            }}>
        {children}
    </ResultContext.Provider>
);}


