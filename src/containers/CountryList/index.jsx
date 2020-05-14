import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchListCountry } from "../../actions/country";
import Country from "../../components/Country";
import "./style.scss";
import Filter from "../../components/Filter";

let regionList=["All","Africa","Americas","Asia","Europe","Oceania" ];
CountryList.propTypes = {
  constryList: PropTypes.array,
  fetchListCountry: PropTypes.func,
};
function CountryList() {
  let [name, setName] = useState("");
  let [region, setRegion] = useState("All");
  //Dispath các action
  const countryList = useSelector((state) => state.country.listCountry);
  let currentCountry = [];
  if (countryList.length > 0) {
    currentCountry = [...countryList];
  }
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchListCountry());
  }, [dispatch]);

  const renderCountry = () => {
    if(currentCountry.length>0){
      return currentCountry.map((country) => {
        return <Country country={country} key={country.alpha3Code} />;
      });
    }
    else{
    return   <h2 className="not-data">Opss.Not data............</h2>
    }
  };

  //Lấy giá trị filter


  const changeFilterName = (data) => {
    setName(data);
  };
  const changeFilterRegion = (data) => {
    setRegion(data);
  };
  currentCountry = countryList.filter((country) => {
      let countryName = country.name.trim().toLowerCase();
      let countryCode3 = country.alpha3Code.trim().toLowerCase();
      let countryCode2 = country.alpha2Code.trim().toLowerCase(); 
      // return (country.region===region && (countryName.indexOf(name.trim().toLowerCase())!==-1));
      if(region!=="All"){
        return country.region===region &&( countryName.indexOf(name.trim().toLowerCase())!==-1||countryCode3.indexOf(name.trim().toLowerCase())!==-1||countryCode2.indexOf(name.trim().toLowerCase())!==-1);
      }
      else{
        return   countryName.indexOf(name.trim().toLowerCase())!==-1||countryCode3.indexOf(name.trim().toLowerCase())!==-1||countryCode2.indexOf(name.trim().toLowerCase())!==-1
      }
      

  });
  //Thay đổi giá trị
  console.log(name);


  return (
    <div className="country">
      <div className="container">
        <Filter
          changeFilterName={changeFilterName}
          changeFilterRegion={changeFilterRegion}
          regionList={regionList}
        />
        <div className="country__list">{renderCountry()}</div>
      </div>
    </div>
  );
}

export default CountryList;
