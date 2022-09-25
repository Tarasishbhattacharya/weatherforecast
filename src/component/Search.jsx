import axios from 'axios';
import React, { useEffect, useState } from 'react'
import "../App.css"
const Search = ({option}) => {

    const[city,setCity]=useState("Kolkata");
    const [show, setShow] = useState(false);
    const[data,setData]=useState("");
   const[forecastdata,setForecastdata]=useState([]);
//    const[length,setLength]=useState(0)

    const handlechange=(e)=>{
        setCity(e.target.value)
    }
   

    const suggestions=option.filter(op=>op.toLowerCase().includes(city.toLowerCase()));
    const days=["Mon","Tue","Wed","Thu","fri","sat","sun","Mon"];
    //  forecastdata=forecastdata.slice(0,forecastdata.length)

    const handlesuggestion=(elem)=>{
        setCity(elem);
        setShow(false)
    }

   useEffect(()=>{
      var timer=setTimeout(()=>{
        loaddata()
      },1000)
      return ()=>clearTimeout(timer)
   },[city])
   const loaddata=async()=>{
    let res=await  axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2c8b2234e3f77782aebe2aae1472cbe9&units=metric`)
    const dt=res.data;
    var lat=dt.coord.lat;
    var lon=dt.coord.lon
    setData(dt)
    forecast(lat,lon)
    
   }
   const forecast=async(lat,lon)=>{
    let weather_dt=await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,current&appid=2c8b2234e3f77782aebe2aae1472cbe9&units=metric`);
    var forecast_dt=weather_dt.data.daily;
    setForecastdata(forecast_dt)
   }
    
    // fetch('https://wft-geo-db.p.rapidapi.com/v1/geo/cities', options)
    //     .then(response => response.json())
    //     .then(response => console.log(response))
    //     .catch(err => console.error(err));

    // const handlechange=(e)=>{
    //     setCity(e.target.value)
    //     fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities&namePrefix=kolkata`, options)
    //     .then(response => response.json())
    //     .then(response => console.log(response))
    //     .catch(err => console.error(err));
    // }
    // useEffect(()=>{
    //    var timer=setTimeout(()=>{
    //     loaddata()
    //    },1000)

    //    return ()=>clearTimeout(timer)
    // },[city])
    // const loaddata=async()=>{
    //     await fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities&namePrefix=${city}`, options)
    //     .then(response => response.json())
    //     .then(response => console.log(response))
    //     .catch(err => console.error(err));
    // }
  return (
    <div className="container">
        <div className='search_container'>
            <input  type="text" placeholder="Enter something" value={city} onChange={handlechange}
            onFocus={()=>setShow(true)} 
            />
            <div className='daily_forecast'>
                { forecastdata.map((elem,ind)=>{
                    return <div>
                        <p>{days[ind]}</p>
                        <p>{elem.temp.max}</p>
                        <p>{elem.temp.min}</p>
                        <img src={`http://openweathermap.org/img/wn/${elem.weather[0].icon}@2x.png`} alt="icon"/>
            
                    </div>
                })}
            </div>
            {show && (
                <ul className="suggestions">
                    {suggestions.map(elem => (
                        <li  key={elem} onClick={()=>handlesuggestion(elem)}>
                            {elem}
                        </li>
                    ))}
                </ul>
            )}


            {data && <div className='temp'>
                <div className='degree'>{`${data.main.temp}°c`}</div>
                <div>
                    <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="icon"/>
                </div><br></br>
            </div>
            }
            {
                data&& <div className='pressure_humidity'>
                    <div className='pressure'>
                        <p>{"pressure"}</p>
                        <p>{`${data.main.pressure}hpa`}</p>
                    </div>
                    <div className='humidity'>
                        <p>{"Humidity"}</p>
                        <p>{`${data.main.humidity}%`}</p>
                    </div>
                </div>
            }
        </div>
    </div>
  )
}

export default Search