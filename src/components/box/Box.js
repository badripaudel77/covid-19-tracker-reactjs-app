import { Card, CardContent, Typography } from '@material-ui/core';
import React from 'react'

import './Box.css';

export const Box = ({title, cases, total,}) => {
    return (
        <Card className="box">
            <CardContent>
                 <Typography color="textSecondary">{title}</Typography>
                 <Typography><span>Today +<b>{cases}</b></span></Typography>
                <Typography>Total{' '}{total}</Typography>
            </CardContent>
        </Card>
    )
}
