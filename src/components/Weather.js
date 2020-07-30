import React from 'react';
import Modal from './Modal';
import Skycons from 'react-skycons';


class Weather extends React.Component{

    constructor(props){
        super(props);
        this.state={
            isModalOpen:false,
            current:0
        }
    }


    changeCurrent=(value) => {
        this.setState({current:value});
    }

    componentDidUpdate(){
        console.log('updated');
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

    extractDate=(time,type) => {
        let unixTime,date;
        switch(type){
            case 'full':
                unixTime=time*1000;
                date=new Date(unixTime).toLocaleString('en-US',{day:'numeric',year:'numeric',month:'short',weekday:'long'});
                let dateArr=date.split(',');
                
                return (
                    <React.Fragment>
                       <span className="full-day">{dateArr[0]}</span>
                       <br/>
                       <span>{dateArr[1]},{dateArr[2]}</span>
                    </React.Fragment>
                );
            case 'shortDay':
                unixTime=time*1000;
                date=new Date(unixTime).toLocaleString('en-US',{weekday:'short'});
                return(
                    <div className="short-day text-center">{date}</div>
                )
        }
    } 


    render(){
        const {forecastData:forecast}=this.props;
        const {current}=this.state;
        console.log('rendering');
        return(
            <React.Fragment>
                <div className="mt-5">
                    <div className="parent-con">
                        <div className="child-con">
                            <div className="forecast-con">
                                <div className="current-con">
                                    <div className="current-info">
                                        <div className="forecast-date">
                                            { forecast.length!=0 ? this.extractDate(forecast[current].time,'full') : null}
                                        </div>
                                        <h4 className='location'>
                                            <span className="fa fa-map-marker"></span>
                                        <span className="ml-2">{this.props.location!='' ? this.props.location : 'location'}</span>
                                        </h4>
                                        <div className="current-forecast">
                                            <div className="current-skycon" style={{width:'160px',height:'80px'}}>
                                              <Skycons color='floralWhite'  icon={forecast.length!=0 ? forecast[current].icon : 'CLEAR_DAY'} autoplay={true} /> 
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
                                                    <div>{forecast.length!=0 ? forecast[current].precipProbability*100 : 0}%</div>
                                                </li>
                                                <li className="detail">
                                                    <div>HUMIDITY</div>
                                                <div>{forecast.length!=0 ? forecast[current].humidity*100 : 0}%</div>
                                                </li>
                                                <li className="detail">
                                                    <div>WIND</div>
                                                    <div>{ forecast.length!=0 ? (forecast[current].windSpeed*3.6).toPrecision(2) : 0}km/h</div>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="weekly-forecast">
                                            <div className="weekly-box">
                                                {forecast.map((day,index) => {
                                                
                                                        var classStr,color;
                                                        if(index === current){
                                                            classStr='daily-forecast active';
                                                            color='#505050';
                                                        }
                                                        else{
                                                            classStr='daily-forecast';
                                                            color='red';
                                                        }
                                                        // console.log(color);
                                                        return(
                                                            <div onClick={() => this.changeCurrent(index)} className={classStr} key={day.time}>
                                                                <div className="skycon d-flex justify-content-center" style={{width:'100px',height:'45px'}}>
                                                                    <Skycons color={color}  icon={day.icon} autoplay={true} />
                                                                </div>
                                                                {this.extractDate(day.time,'shortDay')}
                                                                <div className="daily-temp text-center">
                                                                    {Math.round((day.temperatureHigh+day.temperatureLow)/2)}°C
                                                                </div>
                                                            </div>
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