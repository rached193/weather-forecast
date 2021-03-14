import React from 'react';
import { Subscription } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { switchMap } from 'rxjs/operators';
import { header$ } from '../header/header.store';
import { DetailDay } from './detail-day/detail-day';
import './weather-week.scss'
import { WeekCard, WeekCardModel } from './week-card/week-car';





export class WeatherWeek extends React.Component<{}, { dataWeek: WeekCardModel[], selectedWeek: number }> {

    suscription!: Subscription;

    constructor(props: { dataWeek: WeekCardModel[] }) {
        super(props);
        this.state = {
            dataWeek: [],
            selectedWeek: 0
        };
    }

    componentDidMount() {
        const currentDate = new Date();
        this.suscription = header$.pipe(
            switchMap(x => fromFetch(`/find?city=${x}&date=${currentDate.toISOString()}`, {
                selector: response => response.json()
            }))
        ).subscribe(res => {
            this.setState({ dataWeek: res, selectedWeek: 0 })
        });
    }

    componentWillUnmount() {
        this.suscription.unsubscribe();
    }

    render() {

        return (
            <div className="container-week">
                <div className="week">
                    {this.state.dataWeek.map(x =>
                        <WeekCard data={x}></WeekCard>
                    )}
                </div>
                <DetailDay hours={this.state.dataWeek[this.state.selectedWeek]?.temperatureHours}></DetailDay>
            </div>
        );
    }
}


