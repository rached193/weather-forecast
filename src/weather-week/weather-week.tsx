import React from 'react';
import { Subscription } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { map, switchMap } from 'rxjs/operators';
import { header$ } from '../header/header.store';
import { DetailDay } from './detail-day/detail-day';
import './weather-week.scss'
import { WeekCard, WeekCardModel } from './week-card/week-car';





export class WeatherWeek extends React.Component<{}, { dataWeek: WeekCardModel[], selectedDay: number, city: string }> {

    suscription!: Subscription;

    constructor(props: { dataWeek: WeekCardModel[] }) {
        super(props);
        this.state = {
            dataWeek: [],
            selectedDay: 0,
            city: ''
        };
    }

    componentDidMount() {
        const currentDate = new Date();
        this.suscription = header$.pipe(
            switchMap(city => fromFetch(`/find?city=${city}&date=${currentDate.toISOString()}`, {
                selector: response => response.json()
            }).pipe(map(res => [res, city]))
            )
        ).subscribe(([res, city]) => {
            this.setState({ dataWeek: res, selectedDay: 0, city: city })
        });
    }

    componentWillUnmount() {
        this.suscription.unsubscribe();
    }

    changeDay(newSelected: number) {
        this.setState({ selectedDay: newSelected })
    }

    render() {

        return (
            <div className="container-week">
                <h1>{this.state.city}</h1>
                <div className="week">
                    {this.state.dataWeek.map((x, i) =>
                        <div className="week-day-container" onClick={() => { this.changeDay(i) }}>
                            <WeekCard key={x.date} data={x} active={this.state.selectedDay === i} ></WeekCard>
                        </div>
                    )}
                </div>
                <DetailDay hours={this.state.dataWeek[this.state.selectedDay]?.temperatureHours}></DetailDay>
                {this.state.dataWeek.length === 0 &&
                <h1>Seleccione una ciudad para comenzar</h1>
                }
            </div>
        );
    }
}


