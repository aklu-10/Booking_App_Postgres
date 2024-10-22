import { useEffect, useState } from "react";
import "./featured.css";
import axios from "axios";

const Featured = () => {

  const [countByCities, setCountByCities] = useState({
    lucknow: 0,
    kanpur: 0
  });

  useEffect(()=>{

    (async ()=>{

      let {data, status} = await axios.get('http://localhost:4000/api/hotels/countbycity?cities=lucknow, kanpur')

      if(status === 200){
        let base = {};
        data.map(item=>{
          base[item.city] = item.city_count;  
        })
        setCountByCities(base)
      }

    })();

  }, []);
  

  return (
    <div className="featured">
      <div className="featuredItem">
        <img
          src="https://plus.unsplash.com/premium_photo-1661964071015-d97428970584?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Lucknow</h1>
          <h2>{countByCities.lucknow} properties</h2>
        </div>
      </div>
      
      <div className="featuredItem">
        <img
          src="https://plus.unsplash.com/premium_photo-1661964071015-d97428970584?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Kanpur</h1>
          <h2>{countByCities.kanpur} properties</h2>
        </div>
      </div>
      {/* <div className="featuredItem">
        <img
          src="https://plus.unsplash.com/premium_photo-1661964071015-d97428970584?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Austin</h1>
          <h2>532 properties</h2>
        </div>
      </div> */}
    </div>
  );
};

export default Featured;
