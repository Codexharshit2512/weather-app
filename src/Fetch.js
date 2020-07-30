import axios from 'axios';


export const fetchPlaces = async (location) => {
    try{
        const {data:result}=await axios({
            method:'POST',
            url:'http://localhost:5000/weather',
            data:JSON.stringify({place:location}),
            headers:{
                'Content-Type':'application/json'
            }
        });
        if(result.error) throw result.error;
        else{
            return result.places;
        }
    }
    catch(err){
           return Promise.reject(err);
    }
}

export const forecast = async (latitude,longitude) => {
    try{
       const {data}=await axios({
           method:'POST',
           url:'http://localhost:5000/forecast',
           headers:{
               'Content-Type':'application/json'
           },
           data:JSON.stringify({latitude,longitude})

       });
       return data;


    }
    catch(err){
      return Promise.reject(err);
    }
}