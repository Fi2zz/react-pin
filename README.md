
# React Pin 

![](timg.jpg)

React pin can be used in React Native and web


## props

size   => size of input box ,default to `6`

onFill => trigger when all input box filled 

onBackspacePress =>  trigger when  `backspace` key pressed

## How to use


```javascript
   import ReactPin from './src/ReactPin'
   class App extends React.Component{
        state={
                pin:""
        }
        render(){
            return <ReactPin
                    size={6}
                    onFill={pin=>this.setState({pin})}
                    onBackspacePress={()=>{ console.log("BackSpace pressed")}}
            />
        }
   }

```
