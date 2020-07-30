import React from 'react';

function Loader(){
    return(
        <div className="overlay">
            <div className="modal-box bg-primary">
                <div className="box-content  text-center">
                    <span className="spinner-border" style={{width:"1.8rem",height:"1.8rem",color:"floralwhite"}}></span>
                    <span className="ml-1" style={{fontSize:"20px",color:"floralwhite"}}>Loading...</span>
                </div>
            </div>
        </div>
    )
}

export default Loader;