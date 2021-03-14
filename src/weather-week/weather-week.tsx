import React from 'react';
import { Subscription } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { switchMap } from 'rxjs/operators';
import { header$ } from '../header/header.store';
import { DetailDay } from './detail-day/detail-day';
import './weather-week.scss'
import { WeekCard, WeekCardModel } from './week-card/week-car';





export class WeatherWeek extends React.Component<{}, { dataWeek: WeekCardModel[], selectedDay: number }> {

    suscription!: Subscription;

    constructor(props: { dataWeek: WeekCardModel[] }) {
        super(props);
        this.state = {
            dataWeek: [],
            selectedDay: 0
        };
    }

    componentDidMount() {
        const currentDate = new Date();
        this.suscription = header$.pipe(
            switchMap(x => fromFetch(`/find?city=${x}&date=${currentDate.toISOString()}`, {
                selector: response => response.json()
            }))
        ).subscribe(res => {
            this.setState({ dataWeek: res, selectedDay: 0 })
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
                <div className="week">
                    {this.state.dataWeek.map((x, i) =>
                        <div className="week-day-container" onClick={() => { this.changeDay(i) }}>
                            <WeekCard key={x.date} data={x} active={this.state.selectedDay === i} ></WeekCard>
                        </div>
                    )}
                </div>
                <DetailDay hours={this.state.dataWeek[this.state.selectedDay]?.temperatureHours}></DetailDay>
            </div>
        );
    }
}


