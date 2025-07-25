import { useCallback, useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

// as soon as anyone changes any of the input the field we shall evaluate our current state and generate a new password to be rendered
function App() {
  const [length, setLength] = useState(8);
  const [digit, setDigit] = useState(false);
  const [sc, setSc] = useState(false);
  const [password, setPassword] = useState("SHivansH")
  const [copy, setCopy] = useState("copy");
  // now the code is correct and is working but we are i=one state behind because useState is asynchronous in nature and this since it is not a promise we cannot even use promises.
  // hence this brings useEffect into play

  const toggleDigit = () =>{
    setDigit(((digit==false)?true:false))
   //useEffect(() => passwordGenerator(), [digit]) // if digit parameter changes then run this code ie effect will be shown based on given event
  }
  const toggleSc = () =>{
    setSc(((sc==false)?true:false))
    
  }

  const toggleCopy = () =>{
    if(copy=="copied") return ; // if already copied then no need to copy
    setCopy(((copy==="copy") ? "copied" : "copy")); // e;se toggle it 
  }
  const passwordRef = useRef(null); // stores the refernce of password and we can use it to make some changes without the need of re rendering
  const copyPass = () => {
    
    window.navigator.clipboard.writeText(password);
    passwordRef.current.select();
  }


  const toggleLenght = (e)=>{ // callback with a target to set the value
    setLength(e.target.value);
     //useEffect(() => passwordGenerator(), [length])
  }
   useEffect(() => passwordGenerator(), [sc,length,digit])
  const passwordGenerator = useCallback(() =>{
    let field = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
    console.log(field.length,digit,sc);
    let newPassword="";
    let newField = field.substring(0,52);
    if(digit) newField = newField + field.substring(52,62);
    if(sc) newField=newField + field.substring(62);
    console.log(newField);
    for (let i = 0; i < length; i++) {
      newPassword=newPassword+newField[(Math.floor(Math.random()*newField.length))]
    }
    setPassword(newPassword);
    setCopy("copy"); // if password is changed then need to be switch to copy and since inside useeffect will do the task

    
  },[sc, digit, length, setPassword])

  return (
    <div className="bg-stone-600 text-center w-full h-100 rounded-3xl p-2 m-3 border-3 ">
      <header className="block">Password Generator</header>
      <input className="bg-orange-300 text-black rounded-xl m-auto my-4 w-100 p-2 " ref={passwordRef} value={`${password}`} readOnly/>
      <button className="bg-blue-400 p-2 rounded-xl w-20 mx-2 hover:bg-blue-600 cursor-pointer" onClick={() => { copyPass();  toggleCopy();}}>
        {copy}
      </button>
      <br />
      <input id="range" type="range" value={length} min={4} max={24} onChange={toggleLenght}/>
      <label htmlFor="range" className="p-1">Length({length})</label>
      <input id="digit" type="checkbox" onChange={toggleDigit} />
      <label htmlFor="digit" className="p-1">Digit</label>
      <input id="sc" type="checkbox" onChange={toggleSc}/>
      <label htmlFor="sc" className="p-1">Special Characters</label>
    </div>
  );
}

export default App;
