import React from "react";
import { of, Subscription } from "rxjs";
import { fromFetch } from "rxjs/fetch";
import { catchError } from "rxjs/operators";
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
        }).pipe(catchError(error => { console.error(error); return of([]) }))
            .subscribe(res => {
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
