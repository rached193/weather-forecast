import React from "react";
import './detail-day.scss';

export class DetailDay extends React.Component<{ hours: number[] }> {

    hours_label = ['8AM', '9AM', '10AM', '11AM', '12AM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM', '9PM', '10PM', '11PM'];

    render() {
        return (
            <div className="hours-container">
                {this.props.hours?.length > 0 &&
                    this.hours_label.map((x, i) =>
                        <div key={x} className="row-hour">
                            <div className="hour-label">{x}</div>
                            <div className="hour-value">{this.props.hours[i]}°C</div>
                        </div>)
                }
            </div>);
    }


}