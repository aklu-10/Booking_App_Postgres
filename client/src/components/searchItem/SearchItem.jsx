import { Link } from "react-router-dom";
import "./searchItem.css";

const SearchItem = ({ hotel }) => {
  return (
    <div className="searchItem">
      <img
        src={hotel.photos[0]}
        alt=""
        className="siImg"
      />
      <div className="siDesc">
        <h1 className="siTitle">{hotel.name}</h1>
        <span className="siDistance">500m from center</span>
        <span className="siTaxiOp">Free airport taxi</span>
        <span className="siSubtitle">
          Studio Apartment with Air conditioning
        </span>
        <span className="siFeatures">
          Entire studio • 1 bathroom • 21m² 1 full bed
        </span>
        <span className="siCancelOp">Free cancellation </span>
        <span className="siCancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="siDetails">
        <div className="siRating">
          <span>Excellent</span>
          <button>{hotel.rating || 9.6}</button>
        </div>
        <div className="siDetailTexts">
          <span className="siPrice">₹{hotel.cheapest_price}</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <Link to={`/hotels/${hotel.gh_id}`}>
            <button className="siCheckButton">See availability</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
