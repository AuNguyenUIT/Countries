import React, { useState } from 'react';
import { Provider } from "react-redux";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import "../../assets/styles/_base.scss";
import "../../assets/styles/_variables.scss";
import Header from '../../components/Header';
import configureStore from "../../redux/configureStore";
import CountryList from '../CountryList';
import DetailCountry from '../DetailCountry';
import './App.scss';

 const store = configureStore();

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
   <Provider store={store}>
     <Router>
     <div className="wrapper App">
      <Header onChangeMode={onChangeMode} mode={mode}/>
    </div>
    <Switch>
        <Redirect from="/" to="/countries" exact/>
        <Route  path="/countries" exact component={CountryList}/>
        <Route  path="/detail/:code" component={DetailCountry}/>
      </Switch>
     </Router>
   </Provider>
  );
}

export default App;
