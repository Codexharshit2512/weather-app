import React from 'react';
import ReactAnimatedWeather from 'react-animated-weather';
import {extractDate} from '../Date';

function Weekly(props){

   return(
    <div onClick={() => props.click(props.day.id)} className={props.classStr}>
        <div className="skycon d-flex justify-content-center">
            <ReactAnimatedWeather color={props.color} size={50}  icon={props.day.icon} animate={true} />
        </div>
        {extractDate(props.day.time,'shortDay')}
        <div className="daily-temp text-center">
            {Math.round((props.day.temperatureHigh + props.day.temperatureLow)/2)}°C
        </div>
    </div>
   )

}

export default Weekly;