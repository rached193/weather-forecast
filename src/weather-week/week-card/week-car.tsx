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
    date: string,
    state: climateState,
    max: number,
    min: number,
    temperatureHours: number[]
}


export class WeekCard extends React.Component<{ data: WeekCardModel, active: boolean }> {

    daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
    monthsOfYear = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']

    constructor(probs: { data: WeekCardModel, active: boolean }) {
        super(probs);
    }


    getLabel(currentDate: string): string {
        return this.daysOfWeek[new Date(currentDate).getDay()];
    }
    getSubLabel(currentDate: string): string {
        const localDate = new Date(currentDate);
        return localDate.getDate() + ' ' + this.monthsOfYear[localDate.getMonth()]
    }

    getIconWeather(currentState: number): string {
        switch (currentState) {
            case 0:
                return 'day-icon sunny';
            case 1:
                return 'day-icon cloudy';
            case 2:
                return 'day-icon rainy';
            case 3:
                return 'day-icon stormy';
            case 4:
                return 'day-icon snowy';
            default:
                return '';
        }
    }

    render() {

        return (
            <div className={'week-day ' + (this.props.active ? 'active' : '')} >
                <div className="day-label">
                    <div className="label">{this.getLabel(this.props.data.date)}</div>
                    <div className="sub-label">{this.getSubLabel(this.props.data.date)}</div>
                </div>
                <div className={this.getIconWeather(this.props.data.state)}></div>
                <div className="day-temperature">
                    <div className="max">{this.props.data.max}°C</div>
                    <div className="min">{this.props.data.min}°C</div>
                </div>
            </div>
        );

    }
}
