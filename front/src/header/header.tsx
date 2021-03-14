import React from "react";
import { AutoComplete } from "./autocomplete/autocomplete";
import './header.scss'


export class Header extends React.Component {

    cities = ['Zaragoza', 'Madrid', 'Valencia', 'Granada'];
    render() {
        return <header className="header">
            <div className="searcher">
                <div className="searcher-container">
                    <AutoComplete cities={this.cities} />
                </div>

                <span>Escriba una ciudad</span>
            </div>

        </header>;
    }
}
