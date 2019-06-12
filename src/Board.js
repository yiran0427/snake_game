import React from 'react';

const boardSize = 720;
const cellSize = boardSize / 30;

class Board extends React.Component{
    constructor(props){
        super(props);
    }

    drawGrid() {
        const {ctx} = this.state
      
        ctx.strokeStyle = 'grey'; // strokestyle is a field of ctx
        ctx.fillRect(0, 0, boardSize, boardSize) // fillrect is a function of ctx
        for (var vertical = cellSize; vertical < boardSize; vertical += cellSize){
          ctx.beginPath(); // start to draw line
          ctx.moveTo(vertical, 0); 
          ctx.lineTo(vertical, boardSize); // draw vertical lines
          ctx.stroke(); // display lines
        }
      
        for (var horizontal = cellSize; horizontal < boardSize; horizontal += cellSize){
          ctx.beginPath();
          ctx.moveTo(0, horizontal);
          ctx.lineTo(boardSize ,horizontal); // draw horizontal lines
          ctx.stroke();
        }
      }

    drawBoard(){
        const canvas = this.refs.gameBoard
        this.setState({
          canvas: canvas,
          ctx: canvas.getContext('2d')
        }, function () {
          this.drawGrid();
        }) // as soon as setstate is done, do drawgrid
      }

    componentDidMount () {
        this.drawBoard();
      } // as soon as the component is created, do drawboard

    render(){
        return (
            <div id = 'gameContainer' className = 'container-fluid' >
                <canvas id='gameBoard' ref="gameBoard" width={boardSize} height={boardSize} />
            </div> // need to return the whole div
        )
    }
}

export default Board;