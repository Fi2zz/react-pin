import React from 'react'

import './style.css'

const SIZE = 6;
export default class ReactPin extends React.Component {
    constructor(props) {
        super(props);
        let size = props.size || SIZE;
        let readOnlyMap = {};
        for (let i = 0; i < size; i++) {
            readOnlyMap[i] = ""
        }
        this.state = {
            values: {},
            readOnly: readOnlyMap
        }
    }

    onChangeText = (event, index) => {
        let nextIndex = index + 1;
        let lastIndex = (this.props.size || SIZE) - 1;
        let text = event.target.value;
        let {values, readOnly} = this.state;
        if (text) {
            let position = index;
            values[position] = text;
            readOnly[position] = true;
            if (nextIndex <= lastIndex) {
                this.refsMap[nextIndex].focus();
                this.setState(
                    {
                        values: values,
                        readOnly
                    }
                );
            }
            if (index === lastIndex) {
                let value = Object.keys(values)
                    .map(item => values[item])
                    .join("");
                this.props.onFill(value)
            }
        }
    };
    refsMap = {};


    onKeyPress = (e, index) => {
        if (e.key === "Backspace") {
            let {values, readOnly} = this.state;


            if(typeof this.props.onBackspacePress ==="function"){
                this.props.onBackspacePress();
            }
            this.setState({
                values: {
                    ...values,
                    [index]: "",
                },
                readOnly: {
                    ...readOnly,
                    [index]: false
                }
            });
            if (!values[index]) {
                const nextIndex = index > 0 ? index - 1 : 0;
                this.refsMap[nextIndex].focus();
            }
        }
    };

    onClick(index) {
        const {values, readOnly} = this.state;
        if (!!values[index]) {
            this.setState({
                readOnly: {
                    ...readOnly,
                    [index]: false
                }
            }, () => {
                this.refsMap[index].focus();
            })
        }
    }

    render() {
        let {size, inputProps} = this.props;
        let {readOnly} = this.state;
        let List = [];
        for (let i = 0; i < (size || SIZE); i++) {
            let id = i;
            List.push(
                <input
                    type="text"
                    key={i}
                    {...inputProps}
                    maxLength={1}
                    ref={ref => (this.refsMap[id] = ref)}
                    onKeyDown={e => this.onKeyPress(e, id)}
                    onInput={e => this.onChangeText(e, i)}
                    onClick={this.onClick.bind(this, i)}
                    readOnly={readOnly[i]}
                />
            );
        }
        return <div className="react-pin"> {List}</div>
    }
}
