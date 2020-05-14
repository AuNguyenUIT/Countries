import React from 'react';
import "./style.scss";
import PropTypes from 'prop-types';

Fillter.propTypes = {
    changeFilterName: PropTypes.func,
    changeFilterRegion: PropTypes.func ,
    regionList:PropTypes.array
};
Fillter.propTypesDefault = {
    changeFilterName: null,
    changeFilterRegion:null,
    regionList:[],
};

function Fillter({changeFilterName, changeFilterRegion,regionList}) {
    let selected=document.querySelector(".selected");
    let optionsContainer=  document.querySelector(".options-container");    
    function handleClickSelected(){
        optionsContainer.classList.toggle("options-container--active");
    }
    let time=null;
    function handleChangeName(e){
        let name=e.target.value;

        clearTimeout(time);
        time=setTimeout(()=>{
            changeFilterName(name);
        },500)
    }
    function handleChangeRegios(value){
        selected.innerHTML = value;
        optionsContainer.classList.toggle("options-container--active");
        changeFilterRegion(value);
    }
    const renderOptions=()=>{
        let result=null;
        result= regionList.map((region,index)=>{
            return(
                <div key={index} className="option">
                        <input type="radio" name="region" id={region} value={region} onClick={()=>handleChangeRegios(region)} />
                        <label htmlFor={region}>{region}</label>
             </div>
            )
        })
        return  result;
    }
    return (
        <div className="filter" >
            <div className="filter__name">
                <label htmlFor="search__name"><i className="fa fa-search" aria-hidden="true"></i></label>
                <input type="text" id="search__name" name="search__name" placeholder="Search for a country" onChange={handleChangeName}/>
            </div>
            <div className="filter__region">
              <div className="select-box">
                  <div className="options-container ">
                    {renderOptions()}
                  </div>
                  <div className="selected" onClick={handleClickSelected}>Filter by region</div>
              </div>
            </div>
        </div>
    );
}

export default Fillter;