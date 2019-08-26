import React from 'react';

class Panel extends React.Component{

    constructor(props){
        super(props);
      }

    render(){
        return (
            <div className="Panel">
                <div className="Panel-Title">
                    <p>SNAKE</p>
                </div>
                <div className="Panel-Box">
                    <p>Score: {this.props.snake.score}</p>
                    <p>Record: {this.props.snake.record}</p>
                </div>
                <div className="Panel-Box">
                    <p>Speed: {this.props.snake.speed}</p>
                    <button className = "Panel-button"
                    onClick={this.props.speedDown}>-</button>
                    <button className = "Panel-button"
                    onClick={this.props.speedUp}>+</button>
                </div>
                <div className="Panel-Instruction">
                    <p className="Panel-Centered">Instruction & Shortcuts</p>
                    <p>- ARROW keys / WSAD: direction</p>
                    <p>- [ / ]: decrease / increase speed</p>
                    <p>- SPACE: pause</p>
                    <p>- R: restart</p>
                    <p>- ESC: terminate</p>
                    <div className="Panel-Centered">
                        <button className = "Panel-button"
                        onClick={this.props.resetBoard}>restart</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Panel;