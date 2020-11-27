import React, {FormEvent} from 'react';

interface Props {
    query: string,

    onQueryChange(event: FormEvent<HTMLInputElement>): void,

    onKeyUp(event: React.KeyboardEvent<HTMLElement>): void
}

interface State {

}

class InputComponent extends React.Component<Props, State> {

    render() {
        const {query, onQueryChange, onKeyUp} = this.props;
        return (
            <div className="dropdown-trigger">
                <input
                    value={query}
                    onChange={onQueryChange}
                    className='input'
                    type='text'
                    placeholder='Search USA State...'
                    onKeyUp={onKeyUp}
                />
            </div>
        );
    }
}

export default InputComponent;