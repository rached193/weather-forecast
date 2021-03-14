import React from "react";
import './detail-day.scss';

export class DetailDay extends React.Component<{ hours: number[] }> {

    hours = ['8AM', '9AM', '10AM', '11AM', '12AM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM', '9PM', '10PM', '11PM'];

    render() {
        return (
            <div className="hours-container">
                {this.hours.map(x =>
                    <div key={x} className="row-hour">
                        <div className="hour-label">{x}</div>
                        <div className="hour-value">15.2ºC</div>
                    </div>)}
            </div>);
    }


}