import {useState, createContext, ReactChild} from 'react';


export const ResultContext = createContext({result:String,setResult:()=>{}});
/*
interface IResultProvider {
    children: ReactChild;
}
export const ResultProvider = (props: IResultProvider) => {

*/
export const ResultProvider = ({children}) => {
    const [result, setResult] = useState ('');

    return (
    <ResultContext.Provider value={{result,setResult}}>
        {children}
    </ResultContext.Provider>
);}


