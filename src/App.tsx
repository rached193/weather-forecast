import React from "react";
import { Header } from './header/header';
import { WeatherWeek } from './weather-week/weather-week';

export class App extends React.Component {

    render() {
        return (
            <div className="wrapper">
                <Header></Header>
                <WeatherWeek></WeatherWeek>
            </div>
        )
    }
}
