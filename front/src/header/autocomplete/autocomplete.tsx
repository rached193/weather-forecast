import React from "react";
import { header$ } from "../header.store";
import "./autocomplete.scss";

export type AutocompleteModel = {
    cities: string[]
}

export class AutoComplete extends React.Component<AutocompleteModel, { active: boolean }> {

    constructor(props: AutocompleteModel) {
        super(props);
        this.state = { active: false };
    }


    render() {
        const numbers = this.props.cities;
        const listItems = numbers.map((cities) =>
            <div key={cities.toString()} className="selectOption" onMouseDown={() => this.clickOption(cities)} >{cities}</div>
        );

        return (
            <div className="input-container">
                <input onFocus={this.showOptions} onInput={(event) => this.filterOptions(event)} onBlur={this.outInput}></input>
                {this.state.active &&
                    <div className="comboBox">
                        {listItems}
                    </div>
                }
            </div>
        );
    }

    showOptions = () => {
        this.setState({ active: true });
    }
    clickOption(value: string) {
        console.log(value);
        header$.next(value);
        this.setState({ active: false });
    }
    outInput = () => {
        this.setState({ active: false });
    }

    filterOptions(event: React.FormEvent<HTMLInputElement>) {
        const input = event.target as HTMLInputElement;

        console.log(input.value);
    }

}
