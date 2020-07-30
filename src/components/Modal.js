import React,{createRef} from 'react';
import Loader from './Loader';

class Modal extends React.Component{

    constructor(props){
        super(props);
        this.inputRef=createRef();
    }
    

    componentDidUpdate(prevProps){
       if(this.props.loading!==prevProps.loading && !this.props.loading){
          this.props.toggle();
       }
    }

    
    render(){
        if(this.props.loading){
            return(
                <Loader />
            )
        }
        return(
            <React.Fragment>
                <div className="overlay">
                    <div className="modal-box">
                        <div className="box-content">
                                <div className="search-bar">
                                    <input  type="text" ref={this.inputRef} className="plain" />
                                    <span className="fa fa-search fa-lg search-icon" onClick={() => this.props.search(this.inputRef.current.value)}></span>
                                </div>
                                
                                <ul className="list-unstyled places">
                                    {this.props.places.map(place => {
                                        const {place_name,center}=place;
                                        return(
                                            <li key={place_name} onClick={() => this.props.forecast(center.latitude,center.longitude,place_name)} className='place-item'>{place_name}</li>
                                        )
                                    })}
                                    {this.props.err ? <li className="geo-err">{this.props.err}</li> : null}
                                </ul>
                                <div className="close-btn">
                                <a className="btn btn-primary" onClick={this.props.toggle}>Close</a>
                                </div>
                        </div>
                    </div>
                </div>
            
            </React.Fragment>
        )
    }
}

export default Modal;