import React from 'react';
import Modal from './Modal';
import ReactAnimatedWeather from 'react-animated-weather';
import Weekly from './Weekly';
import Loader from './Loader';
import {extractDate} from '../Date';
import { Setbg } from '../Setbg';


class Weather extends React.Component{

    constructor(props){
        super(props);
        this.state={
            isModalOpen:false,
            current:0
        }
    }


    changeCurrent=(value) => {
        this.setState({current:value},() => console.log(this.state.current));
    }

    componentDidUpdate(prevProps){
       if(prevProps.location!=this.props.location) this.setState({current:0});
    }


    toggleModal=() => {
        this.setState({isModalOpen:!this.state.isModalOpen},() => {
            if(this.state.isModalOpen) document.body.style.overflowY='hidden';
            else{
                document.body.style.overflowY='auto';
                this.props.clear();
            }
        });
    }

    setModal=() => {
        return(
            <Modal toggle={this.toggleModal} forecast={this.props.forecast} search={this.props.search} places={this.props.places} err={this.props.geoErr} loading={this.props.loading} />
        )
    }

    

    render(){
        const {forecastData:forecast}=this.props;
        const {current}=this.state;

        if(!forecast){
            return(
                <Loader />
            )
        }

        return(
            <React.Fragment>
                <div className="mt-5">
                    <div className="parent-con">
                        <div className="child-con">
                            <div className="forecast-con">
                                <div className="current-con" style={Setbg(forecast.length!=0 ? forecast[current].icon : 'CLEAR_DAY')} >
                                    <div className="current-info">
                                        <div className="forecast-date">
                                            { forecast.length!=0 ? extractDate(forecast[current].time,'full') : null}
                                        </div>
                                        <h4 className='location'>
                                            <span className="fa fa-map-marker"></span>
                                        <span className="ml-2">{this.props.location!='' ? this.props.location : 'location'}</span>
                                        </h4>
                                        <div className="current-forecast">
                                            <div className="current-skycon">
                                              <ReactAnimatedWeather color='floralWhite'  icon={forecast.length!=0 ? forecast[current].icon : 'CLEAR_DAY'} size={100} animate={true} /> 
                                            </div>
                                            <div className="current-temp display-4">{ forecast.length!=0? Math.round((forecast[current].temperatureHigh+forecast[current].temperatureLow)/2) : '21'}°C</div>
                                            <div className="current-text">
                                                { forecast.length!=0 ? forecast[current].summary : null}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="weekly-con">
                                    <div className="weekly-info">
                                        <div className="details">
                                            <ul className="list-unstyled">
                                                <li className="detail">
                                                    <div>PRECIPITATION</div>
                                                    <div>{forecast.length!=0 ? (forecast[current].precipProbability*100).toPrecision(2) : 0}%</div>
                                                </li>
                                                <li className="detail">
                                                    <div>HUMIDITY</div>
                                                <div>{forecast.length!=0 ? (forecast[current].humidity*100).toPrecision(2) : 0}%</div>
                                                </li>
                                                <li className="detail">
                                                    <div>WIND</div>
                                                    <div>{ forecast.length!=0 ? (forecast[current].windSpeed*3.6).toPrecision(2) : 0}km/h</div>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="weekly-forecast">
                                            <div className="weekly-box">
                                                {forecast.map(day => {
                                                
                                                        var classStr,color;
                                                        if(day.id === current){
                                                            classStr='daily-forecast active';
                                                            color='#505050';
                                                        }
                                                        else{
                                                            classStr='daily-forecast';
                                                            color='floralwhite';
                                                        }
                    
                                                        return(
                                                            <Weekly click={this.changeCurrent} key={day.time} day={day} color={color} classStr={classStr} />
                                                        )
                                                    
                                                })}
                                            </div>
                                        </div>
                                        <div className="change-loc">
                                            <a className="change-btn" onClick={this.toggleModal}>
                                                    <span className="fa fa-map-marker"></span>
                                                    <span className="ml-2">Change location</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {this.state.isModalOpen ? this.setModal() : null}
            </React.Fragment>
        )
    }

}

export default Weather;