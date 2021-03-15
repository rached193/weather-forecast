import { throws } from "node:assert";
import React from "react";
import { header$ } from "../header.store";
import "./autocomplete.scss";

export type AutocompleteModel = {
    cities: string[]
}

export class AutoComplete extends React.Component<AutocompleteModel, { active: boolean, cities: string[], value: string }> {

    constructor(props: AutocompleteModel) {
        super(props);
        this.state = { active: false, cities: props.cities, value: '' };
    }


    componentDidUpdate(prevProbs: AutocompleteModel) {
        if (this.props.cities !== prevProbs.cities) {
            this.setState({ cities: this.props.cities });
        }
    }


    render() {

        return (
            <div className="input-container">
                <input onFocus={this.showOptions} onInput={(event) => this.filterOptions(event)} onBlur={this.outInput} value={this.state.value}></input>
                {this.state.active &&
                    <div className="comboBox">
                        {this.state.cities.length === 0 && <div className="selectOption">No se han encontrado resultados</div>}
                        {this.state.cities.map((cities) =>
                            <div key={cities.toString()} className="selectOption" onMouseDown={() => this.clickOption(cities)} >{cities}</div>
                        )}
                    </div>
                }
            </div>
        );
    }

    showOptions = () => {
        this.setState({ active: true });
    }
    clickOption(value: string) {
        header$.next(value);
        const filteredValues = this.props.cities.filter(x => x.toLowerCase().includes(value.toLowerCase()));
        this.setState({ active: false, value: value, cities: filteredValues });
    }
    outInput = () => {
        this.setState({ active: false });
    }

    filterOptions(event: React.FormEvent<HTMLInputElement>) {
        const input = event.target as HTMLInputElement;
        const filteredValues = this.props.cities.filter(x => x.toLowerCase().includes(input.value.toLowerCase().trim()));
        this.setState({ cities: filteredValues, value: input.value });
    }

}
