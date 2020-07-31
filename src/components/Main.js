import React,{Component} from 'react';
import {fetchPlaces,forecast,postWeather,loadWeather} from '../Fetch';
import Header from './Header';
import Weather from './Weather';

class Main extends Component{

    constructor(props){
        super(props);
        this.state={
            places:[],
            geoCodeErr:null,
            weatherForecast:null,
            forecastErr:null,
            selectedLoc:'',
            isForecastLoading:false
        };
    }

    componentDidMount(){
       loadWeather()
       .then(result => {
           if(result) this.setState({selectedLoc:result.location,weatherForecast:result.forecast});
           else this.setState({selectedLoc:'',weatherForecast:[]});
       })
       .catch(err => console.log(err))
    }


    searchLocation=(location) => {
       fetchPlaces(location)
       .then(places => {
          this.setState({places,geoCodeErr:null,isForecastLoading:false});
       })
       .catch(err => {
           this.setState({places:[],geoCodeErr:err,isForecastLoading:false},() => console.log(err));
       })
    }

    fetchWeather=(latitude,longitude,location) => {
        this.setState({isForecastLoading:true})
        forecast(latitude,longitude)
        .then(result => {
            this.setState({weatherForecast:result,forecastErr:null,selectedLoc:location,isForecastLoading:false},() => {
                postWeather(this.state.selectedLoc,this.state.weatherForecast);
            })
        })
        .catch(err => this.setState({weatherForecast:[],forecastErr:err,selectedLoc:'',isForecastLoading:false}))
    }

    clearList=() => {
        this.setState({places:[],geoCodeErr:null});
    }

    render(){
        return(
            <React.Fragment>
               <Header />
               <Weather search={this.searchLocation} clear={this.clearList} places={this.state.places} geoErr={this.state.geoCodeErr} forecast={this.fetchWeather} forecastData={this.state.weatherForecast} forcastErr={this.state.forcastErr} location={this.state.selectedLoc} loading={this.state.isForecastLoading}  />
            </React.Fragment>
        )
    }



}

export default Main;