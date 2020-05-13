import React, { useState } from 'react';
import './App.scss';
import "./assets/styles/_base.scss";
import "./assets/styles/_variables.scss";
import Header from './components/Header';

function App() {
  let dark =localStorage.getItem("dark") || false;
  let initialMode =dark==="true"?true:false;
  let [mode,setMode]=useState(initialMode);
  const onChangeMode=(data)=>{
    setMode(data);
    localStorage.setItem("dark", data)
  } 
  let html =document.getElementsByTagName("html");
  if(mode){
    html[0].setAttribute("data-theme", "dark");
  }
  else{
    html[0].setAttribute("data-theme", "");
  }


  return (
    <div className="wrapper">
      <Header onChangeMode={onChangeMode} mode={mode}/>
    </div>
  );
}

export default App;
