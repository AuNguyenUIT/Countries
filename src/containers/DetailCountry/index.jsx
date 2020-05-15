import PropTypes from "prop-types";
import React, { useEffect } from "react";
import NumberFormat from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchBorderCountry, getCountry } from "../../actions/country";
import "./style.scss";

DetailCountry.propTypes = {
  country: PropTypes.object,
  listBorders: PropTypes.array,
  match :  PropTypes.object
};
DetailCountry.propTypesDefault = {
  country: {},
  listBorders:[],
  match : {}
};

function DetailCountry({ match, history,location }) {
  let languages;
  let currencies;
  let borderCountries;
  let country = useSelector((state) => state.country.viewCountry);
  let listBorders = useSelector((state) => state.country.borderCountries);
  if (country.languages) {
    let temp = country.languages.map((language) => {
      return language.name;
    });
    if (temp) {
      languages = temp.join(", ");
    }
  }
  if (country.currencies) {
    let temp = country.currencies.map((currency) => {
      return currency.name;
    });
    if (temp) {
      currencies = temp.join(", ");
    }
  }

  if (country.borders) {
    borderCountries = country.borders.join(";");
  }
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(getCountry(match.params.code));
  }, [ dispatch,match.params.code]);
  useEffect(() => {
    dispatch(fetchBorderCountry(borderCountries));
  }, [dispatch,borderCountries]);

  const renderBorderCountries=()=>{
    let result=null;
    if(listBorders && listBorders.length>0){
      result= listBorders.map(country=>{
      return <Link className="btn border__item" key={country.alpha3Code} to={`${country.alpha3Code}`}>{country.name}</Link>
      })
    }
    else{
      return <p>&nbsp;No have borders</p>
    }
    return result;
  }
  let url=history.createHref(location);
  return (
    <div className="detail">
      <div className="container">
        <Link to={`${url}`} className="back btn"  onClick={()=>history.go(-1)}>
          &larr; Back
        </Link>
        <div className="detail__inner">
          <img src={country.flag} alt="" className="detail__flag" />
          <div className="detail__info">
            <h2 className="detail__info-name">{country.name}</h2>
            <div className="detail__info-orther">
              <div className="detail__info-orther-item">
                <p>
                  <span>Native Name: </span> {country.nativeName}
                </p>
                <p>
                  <span>Population : </span>
                  <NumberFormat
                    value={country.population}
                    displayType={"text"}
                    thousandSeparator={true}
                    renderText={(value) => (
                      <React.Fragment>{value}</React.Fragment>
                    )}
                  />
                </p>
                <p>
                  <span>Region: </span> {country.region}
                </p>
                <p>
                  <span>Sub Region: </span> {country.subregion}
                </p>
                <p>
                  <span>Capital: </span> {country.capital}
                </p>
              </div>
              <div className="detail__info-orther-item">
                <p>
                  <span>Top Level Domain: </span> {country.topLevelDomain}
                </p>
                <p>
                  <span>Currencies: </span> {currencies}
                </p>
                <p>
                  <span>Languages: </span> {languages}
                </p>
              </div>
            </div>
            <div className="detail__border">
              <p>Borders:</p>
                <div className="detail__border-list">{renderBorderCountries()}</div>
              </div>   
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailCountry;
