import cloudy from './shared/images/cloudy.jpg';
import rain from './shared/images/rain.jpg';
import snow from './shared/images/snow.jpg';
import windy from './shared/images/windy.jpg';
import foggy from './shared/images/foggy.jpg';
import clear_day from './shared/images/clear_day.jpg';
import clear_night from './shared/images/clear_night.jpg';
import partly_cloudy_night from  './shared/images/partly_cloudy_night.jpg';
import partly_cloudy_day from './shared/images/partly_cloudy_day.jpg'


export function Setbg(icon){
    let background;
   switch(icon){
       case 'CLOUDY':
           return ({
               backgroundImage: `url(${cloudy})`,
               color:'floralwhite'
           })
        case 'RAIN':
           return ({
                backgroundImage: `url(${rain})`,
                color:'floralwhite'
            })
        case 'SNOW':
            return ({
                backgroundImage: `url(${snow})`,
                color:'#505050'
            })
        case 'WINDY':
            return({
                backgroundImage: `url(${windy})`,
                color:'floralwhite'
            })
        case 'CLEAR_DAY':
            return ({
                backgroundImage: `url(${clear_day})`,
                color:'floralwhite'
            })
        case 'CLEAR_NIGHT':
            return ({
                backgroundImage: `url(${clear_night})`,
                color:'floralwhite'
            })
        case 'PARTLY_CLOUDY_NIGHT':
            return ({
                backgroundImage: `url(${partly_cloudy_night})`,
                color:'floralwhite'
            })
        case 'PARTLY_CLOUDY_DAY':
            return ({
                backgroundImage: `url(${partly_cloudy_day})`,
                color:'floralwhite'
            })
        default:
            return ({
                backgroundImage: `url(${clear_day})`,
                color:'floralwhite'
            })

   }
}