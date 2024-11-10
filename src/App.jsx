import React ,{useEffect ,useState} from 'react'
import { BASEURL ,WEATHER_API_KEY } from './config'
import './assets/fontawesome/css/all.css'
import './assets/styles/styles.css'

const App = () => {

    const [location ,setLocation] = useState('')
    const [result ,setResult] = useState(null)
    const [loading ,setLoading] = useState(false)
    const [error ,setError] = useState('')


    const searchWeather =async(e)=>{
        e.preventDefault()
        setLoading(true)
        setError('')
        setResult(null)

        try{
            const response = await fetch(`${BASEURL}/data/2.5/weather?q=${location}&appid=${WEATHER_API_KEY}&units=${'metric'} `)
            const data = await response.json()
            console.log(data)
            if(response.ok){
                setResult(data)
            }else{
                setError(data.message)
            }
        }
        catch(e){
            setError('Connection problem ')

        }finally{
            setLoading(false)
        }

        
    }

    function getWeatherImage(condition){
        let result
        let colour
        switch(condition){
            case 'Rain':
                result = 'fas fa-cloud-rain'
                colour='dimgrey'
                break;
            case 'Clouds':
                result = 'fas fa-cloud'
                colour='grey'
                break;
            case 'Clear':
                result = 'fas fa-sun'
                colour='orange'
                break;
            case 'Snow':
                result = 'fas fa-snowflake'
                colour='skyblue'
                break;
            case 'Haze':
                result = 'fas fa-wind'
                colour='grey'
                break;

        }
        return {icon:result ,color:colour}
    }

    return (
        <React.Fragment>
            <form onSubmit={(e)=>searchWeather(e)} >
                <div className='search-bar'>
                    {/* <label htmlFor='location' >Location</label> */}
                    <input 
                        type='text' 
                        id='location' 
                        value={location} 
                        onChange={(e)=>setLocation(e.target.value)} 
                        placeholder='Location name. ex: London'
                    />
                </div>

                <button disabled={loading}>
                    <i className='fas fa-search'></i>
                </button>

            </form>
            {
                loading && <div style={{textAlign:'center' ,padding:'50px'}}>
                    <img src={require('../src/assets/loading.gif')} width={'50px'} /><br/>
                    searching...
                </div>
            }


            {
                error && 
                <div style={{textAlign:'center' ,padding:'50px' ,color:'crimson',fontWeight:'bold'}} >
                    {error.toUpperCase()}
                </div>
            }

            {
                result && 
                <div className='main-container' >
                    <h1 style={{display:'flex' ,alignItems:'center'}}>
                        {result.weather[0].description.charAt(0).toUpperCase() + result.weather[0].description.slice(1) }
                        <img src={`https://openweathermap.org/img/wn/${result.weather[0].icon}.png`}/>
                    </h1>

                    <div>
                        <h3>Atmospheric Conditions</h3>
                        <ul style={{lineHeight:'25px'}} >
                            <li>Pressure : <b> {result.main.pressure}  <i>hPa</i> </b>  </li>
                            <li>Humidity :  <b> {result.main.humidity}  <i>%</i> </b>  </li>
                            <li>Temperature : <b> {result.main.temp} <i>deg celsius</i> </b> </li>
                            <li>Wind-speed : <b> {result.wind.speed} <i>m/s</i> </b> </li>
                        </ul>
                    </div>

                    <div>
                        <h3>Geographics</h3>
                        <ul style={{lineHeight:'25px'}} >
                            <li>Latitude : <b> {result.coord.lat}  </b>  </li>
                            <li>Longitude :  <b> {result.coord.lon}   </b>  </li>
                            <li>Ground-level : <b> {result.main.grnd_level}  </b> </li>
                            <li>Sea-level : <b> {result.main.sea_level}  </b> </li>
                        </ul>
                    </div>

                    <div className='weather-icon' title={result.weather[0].main} >
                       <i 
                        className={getWeatherImage(result.weather[0].main).icon}
                        style={{
                            color:getWeatherImage(result.weather[0].main).color
                        }}
                       ></i>
                    </div>

                </div>
            }

            {
                !result && !loading && !error && 
                <div className='main-container' >
                     <div className='weather-conditions' >
                         <i className='fas fa-cloud'  ></i>
                         <i className='fas fa-sun' style={{color:'orange'}} ></i>
                         <i className='fas fa-cloud-rain' style={{color:'dimgrey'}} ></i>
                         <i className='fas fa-snowflake' style={{color:'skyblue'}} ></i>
 
                     </div>
                 </div>
            }



        </React.Fragment>
    )
}

export default App