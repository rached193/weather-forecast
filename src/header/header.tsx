import React from "react";
import { Subscription } from "rxjs";
import { fromFetch } from "rxjs/fetch";
import { AutoComplete } from "./autocomplete/autocomplete";
import './header.scss'


export class Header extends React.Component<{}, { cities: string[] }> {


    constructor(probs: {}) {
        super(probs);
        this.state = { cities: [] };
    }

    componentDidMount() {
        fromFetch(`/city`, {
            selector: response => response.json()
        }).subscribe(res => {
            this.setState({ cities: res })
        });
    }

    render() {
        return <header className="header">
            <div className="searcher">
                <div className="searcher-container">
                    <AutoComplete cities={this.state.cities} />
                </div>

                <span>Buscar ciudad</span>
            </div>

        </header>;
    }
}
