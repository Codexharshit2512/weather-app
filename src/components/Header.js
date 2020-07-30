import React from 'react';


function Header(){

    let date=new Date().toLocaleString('en-US',{weekday: 'long', year: 'numeric', month: 'short', day: 'numeric'})

    return(
       <div className="main-header">
           <div className="container">
               <div className="row">
                   <div className="col-12 col-sm-6">
                       <h2 className='logo'>BrightSky</h2>
                   </div>
                   <div className="col-12 col-sm-6">
                       <p className='date'>{date}</p>
                   </div>
               </div>
           </div>
       </div>
    )
}

export default Header;