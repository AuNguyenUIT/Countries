import PropTypes from 'prop-types';
import React from 'react';
import NumberFormat from 'react-number-format';
import { Link } from 'react-router-dom';
import "./style.scss";


Country.propTypes = {
    country: PropTypes.object,
    onDetails: PropTypes.func
};
function Country({country,onDetails}) {
    
    return (
        <Link to={`/detail/${country.alpha3Code}`}  className="country__item" onClick={onDetails}>
            <img className="country__flag" src={country.flag} alt =""></img>
            <div className="country__info">
                <h2 className="country__info-name">{country.name}</h2>
                <p className="country__info-orther"><span>Population  :  </span><NumberFormat value={country.population} displayType={'text'} thousandSeparator={true} renderText={value => <React.Fragment>{value}</React.Fragment>}/>  </p>
                <p className="country__info-orther"><span>Region:  </span>{country.region} </p>
                <p className="country__info-orther"><span>Capital:  </span>{country.capital} </p>
            </div>
        </Link>
    );
}

export default Country;