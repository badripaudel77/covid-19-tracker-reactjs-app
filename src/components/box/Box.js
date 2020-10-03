import { Card, CardContent, Typography } from '@material-ui/core';
import React from 'react';
import CountUp from 'react-countup';

import './Box.css';

export const Box = ({title, cases, total,}) => {
    // console.log('cases ? ', cases);
 if(total) {
    return (
        <Card className="box">
            <CardContent className="box__content">
                {/* <CountUp duration = {1} end ={cases} /> */}
                 <Typography color="textSecondary">{title}</Typography>
                 <Typography><span>Today +</span><b><CountUp end={cases} duration={1} /></b></Typography>
                 <Typography><span>Total +</span><CountUp end={total} duration={1} /></Typography>
            </CardContent>
        </Card>
    )
    }
    else {
        return <h3>No Data.</h3>
    }
}
