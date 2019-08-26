import React from 'react'

class ComponentA extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            display: 'Hello World!',
            toggle: true
        }
        this.clickHandler = this.clickHandler.bind(this)
    }

    clickHandler(){
        let newState = Object.assign({},this.state)
        if(newState.toggle){
            newState.display = 'Goodbye World!'
        } else {
            newState.display = 'Hello World!'
        }
        newState.toggle = !newState.toggle
        this.setState(newState)
    }
    render(){
        return(
            <div className='componentA'>
                {this.state.display}
                <button onClick={this.clickHandler}>
                    {this.state.toggle ? 'True' : 'False'}
                </button>
            </div>
        )
    }
}

export default ComponentA;