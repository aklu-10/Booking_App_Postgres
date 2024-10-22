import axios from "axios";
import "./featuredProperties.css";
import { useEffect, useState } from "react";

const FeaturedProperties = () => {

  const [featuredHotels, setFeaturedHotels] = useState([]);

  useEffect(() => {

    (async () => {

      let { data, status } = await axios.get('http://localhost:4000/api/hotels/featured')

      if (status === 200) {
        setFeaturedHotels(data);
      }

    })();

  }, []);

  return (
    <div className="fp">
      {
        featuredHotels.map(hotel => (

          <div className="fpItem">
            <img
              src={hotel.photos[0]}
              alt=""
              className="fpImg"
            />
            <span className="fpName">{hotel.name}</span>
            <span className="fpCity">{hotel.city}</span>
            <span className="fpPrice">{hotel.cheapest_price}</span>
            <div className="fpRating">
              <button>{hotel.rating ?? 9.2}</button>
              <span>Excellent</span>
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default FeaturedProperties;
