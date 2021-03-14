import React from 'react';

import './week-card.scss'

enum climateState {
    SUN = 0,
    CLOUD = 1,
    RAIN = 2,
    STORM = 3
}

export type WeekCardModel = {
    city: string,
    date: Date,
    state: climateState,
    max: number,
    min: number,
    temperatureHours: number[]
}


export class WeekCard extends React.Component<{ data: WeekCardModel }> {

    daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
    monthsOfYear = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']

    constructor(probs: { data: WeekCardModel }) {
        super(probs);
    }


    getLabel(): string {
        return this.daysOfWeek[new Date(this.props.data.date).getDay()];
    }
    getSubLabel(): string {
        const localDate = new Date(this.props.data.date);
        return localDate.getDate() + ' ' + this.monthsOfYear[localDate.getMonth()]
    }


    render() {

        return (
            <div className="week-day">
                <div className="day-label">
                    <div className="label">{this.getLabel()}</div>
                    <div className="sub-label">{this.getSubLabel()}</div>
                </div>
                <div className="day-icon sunny"></div>
                <div className="day-temperature">
                    <div className="max">{this.props.data.max}°C</div>
                    <div className="min">{this.props.data.min}°C</div>
                </div>
            </div>
        );

    }
}
