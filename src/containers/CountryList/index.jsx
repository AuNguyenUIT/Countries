import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchListCountry } from "../../actions/country";
import Country from "../../components/Country";
import Filter from "../../components/Filter";
import Pagination from "../../components/Pagination";
import "./style.scss";


let regionList=["All","Africa","Americas","Asia","Europe","Oceania" ];
CountryList.propTypes = {
  constryList: PropTypes.array,
  fetchListCountry: PropTypes.func,
};
function CountryList() {
  let [name, setName] = useState("");
  let [region, setRegion] = useState("All");
  const [currentPage, setCurrentPage]=useState(1);
  // setCurrentPage(1);
  // const [totalPages, setTotalPages]=useState(null);
const pageLimit=20;
 
  // let [currentCountry, setCurrentCountry] = useState([]);
  //Dispath các action
  let currentCountry=[];
  let newListCountry=[];
  const countryList = useSelector((state) => state.country.listCountry);
  if (countryList.length > 0) {
    // currentCountry = [...countryList];
  
    // setCurrentCountry(newListCountry);
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
    setCurrentPage(1);
  };
  const changeFilterRegion = (data) => {
    setRegion(data);
    setCurrentPage(1);
  };
 newListCountry = countryList.filter((country) => {
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
  const offset = (currentPage - 1) * pageLimit;
  currentCountry = newListCountry.slice(offset, offset + pageLimit);
// console.log(currentPage)

  const onPageChanged = data => {
    // const { currentPage } = data;
    setCurrentPage(data)
    // setTotalPages(totalPages);
  };


  return (
    <div className="country">
      <div className="container">
        
        <Filter
          changeFilterName={changeFilterName}
          changeFilterRegion={changeFilterRegion}
          regionList={regionList}
        />
  
      <Pagination  totalRecords={newListCountry.length}
                pageLimit={20}
                pageNeighbours={1}
                onPageChanged={onPageChanged} current={currentPage} showPage={currentPage}  />
        <div className="country__list">{renderCountry()}</div>
      </div>
    </div>
  );
}

export default CountryList;
