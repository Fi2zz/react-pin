import React from "react";
import {View, TextInput, StyleSheet, Text, Keyboard, Platform} from "react-native";
const cellSize = Platform.OS === "android" ? 56 : 44;
const style = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%"
    },
    cell: {
        textAlign: "center",
        fontSize: 16,
        width: cellSize,
        height: cellSize,
        fontWeight: "500",
        borderWidth: 1,
        borderColor: "#ccc",
        color: "#333",
        backgroundColor: "rgba(0,0,0,0)",
        padding: 0
    }
});


const SIZE = 6;


export default class ReactNativePin extends React.Component {
    onChangeText = (text, index) => {
        let nextIndex = index + 1;
        let lastIndex = (this.props.size || SIZE) - 1;
        if (text) {
            let position = index;
            let values = this.state.values;
            values[position] = text;
            if (nextIndex <= lastIndex) {
                this.refsMap[nextIndex].focus();
                this.setState({values});
            }
            if (index === lastIndex) {
                let value = Object.keys(values)
                    .map(item => values[item])
                    .join("");
                this.props.onFill(value);
                Keyboard.dismiss();
            }
        }
    };
    state = {
        values: {}
    };
    refsMap = {};
    onKeyPress = (e, index) => {
        if (e.nativeEvent.key === "Backspace") {
            let values = this.state.values;



            this.setState({
                values: {
                    ...values,
                    [index]: ""
                }
            });

            if(typeof this.props.onBackspacePress ==="function"){

                this.props.onBackspacePress();
            }


            if (!values[index]) {
                const nextIndex = index > 0 ? index - 1 : 0;
                this.refsMap[nextIndex].focus();
            }
        }
    };

    render() {
        let {size, ...rest} = this.props;

        let List = [];
        for (let i = 0; i < ( SIZE || size); i++) {
            let id = i;
            List.push(
                <TextInput
                    key={i}
                    {...rest}
                    onChangeText={text => this.onChangeText(text, i)}
                    maxLength={1}
                    style={[style.cell]}
                    ref={ref => (this.refsMap[id] = ref)}
                    onKeyPress={e => this.onKeyPress(e, id)}
                    keyboardType={Platform.OS === "android" ? "numeric" : "number-pad"}
                    underlineColorAndroid={"rgba(0,0,0,0)"}
                    textAlignVertical="center"
                />
            );
        }
        return <View style={style.container}>{List}</View>;
    }
}
