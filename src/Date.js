import React from 'react';


export const extractDate=(time,type) => {
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
