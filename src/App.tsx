import React from 'react';
import './App.css';
import classnames from "classnames";
import 'bulma/css/bulma.css';
import mock from "./mock.json";
import StatePage from "./components/StatePage";
import InputComponent from "./components/InputComponent";

interface Props {

}

interface State {
    query: string,
    listOfUSAStates: Array<USAStateData>,
    indexOfSelected: number,
    indexOfClickedItem: number | null
}

export interface USAStateData {
    nameOfState: string,
    code: string,
    index: number
}

class App extends React.Component<Props, State> {

    state: State = {
        query: '',
        listOfUSAStates: [],
        indexOfSelected: 0,
        indexOfClickedItem: null
    };

    constructor(props: Props) {
        super(props);

        this.onQueryChange = this.onQueryChange.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
        this.backToHomePage = this.backToHomePage.bind(this);
    }

    // When query changes a new list is filtered
    onQueryChange: (event: React.FormEvent<HTMLInputElement>) => void = (event: React.FormEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value;

        const allStatesList: Array<USAStateData> = new Array<USAStateData>();

        mock.forEach(function (stateObject) {
            const {state: stateName, code: codeName} = stateObject;
            allStatesList.push({nameOfState: stateName, code: codeName, index: mock.indexOf(stateObject)});
        });

        const filteredListOfStates = allStatesList.filter(state => {
            const upperName = state.nameOfState.toUpperCase();
            const upperQuery = value.toUpperCase();

            return upperName.includes(upperQuery);
        });


        this.setState({
            ...this.state,
            query: value,
            listOfUSAStates: filteredListOfStates
        });
    };

    // Keyboard support
    onKeyUp = (event: React.KeyboardEvent<HTMLElement>) => {
        const {key} = event;
        const {indexOfSelected, listOfUSAStates} = this.state;

        if (key === 'ArrowUp') {
            if (indexOfSelected !== 0) {
                this.setState({
                    ...this.state,
                    indexOfSelected: indexOfSelected - 1
                })
            }
        }

        if (key === 'ArrowDown') {
            if (listOfUSAStates.length - 1 > indexOfSelected) {
                this.setState({
                    ...this.state,
                    indexOfSelected: indexOfSelected + 1
                })
            }
        }

        if (key === 'Enter') {
            this.setState({
                ...this.state,
                indexOfClickedItem: indexOfSelected
            })
        }
    };

    backToHomePage = () => {
        this.setState({
            ...this.state,
            query: '',
            listOfUSAStates: [],
            indexOfClickedItem: null
        })
    };

    render() {
        const {query, listOfUSAStates, indexOfSelected, indexOfClickedItem} = this.state;

        if (indexOfClickedItem !== null) {
            return (
                <StatePage
                    stateIndex={listOfUSAStates[indexOfClickedItem].index}
                    backToHomePage={this.backToHomePage}
                />
            );
        }

        return (
            <div className='app'>
                <p>Please feel free to learn more about the US states</p>
                <div className="dropdown is-active">
                    <InputComponent
                        query={query}
                        onQueryChange={this.onQueryChange}
                        onKeyUp={this.onKeyUp}
                    />
                    {listOfUSAStates.length > 0 && (
                        <div className='dropdown-menu' id='dropdown-menu' role='menu'>
                            <div className="dropdown-content">
                                {listOfUSAStates.map((value: USAStateData, index: number) => {
                                    return (
                                        <a
                                            href='# '
                                            key={value.code}
                                            className={classnames('dropdown-item', {
                                                'is-active': indexOfSelected === index
                                            })}
                                            onClick={() => this.setState({...this.state, indexOfClickedItem: index})}
                                        >
                                            {value.nameOfState}
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default App;
