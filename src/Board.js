import React from 'react';
import Snake from './Snake';

const boardSize = 720;
const cellSize = boardSize / 30;

class Board extends React.Component{
    constructor(props){
        super(props);

        this.state = {
          snake: {
            head: {
              x: 15,
              y: 15
            },
            tail: {
              x: 15,
              y: 15
            },
            direction: '',
            body: [{x:15,y:15}],
            running: false,
            alive: true,
            speed: 1
          }
      }
    }

    drawGrid() {
        const {ctx} = this.state;
      
        ctx.strokeStyle = 'grey'; // strokestyle is a field of ctx, filling shapes' outline
        
        // create and set gradient
        // var gradient = ctx.createLinearGradient(0, 0, boardSize, 0);
        // gradient.addColorStop("0.1", "#e91e63");
        // gradient.addColorStop("0.3", "#FFC107");
        // gradient.addColorStop("0.5", "#8bc34a");
        // gradient.addColorStop("0.7", "#03a9f4");
        // gradient.addColorStop("0.9", "#ba68c8");
        // ctx.fillstyle = gradient;

        ctx.fillStyle = "#cee5b3"; // filling shapes
        ctx.fillRect(0, 0, boardSize, boardSize); // fillrect is a function of ctx, draw rec

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

      drawSnake(){
        const {ctx, snake} = this.state
        ctx.fillStyle = 'grey';
        snake.body.forEach(cord => { // for loop, loop through snake body, fill rect
          ctx.fillRect(cord.x * cellSize, cord.y * cellSize, 1 * cellSize, 1 * cellSize);
        })
      }


    drawBoard(){
        const canvas = this.refs.gameBoard
        this.setState({
          canvas: canvas,
          ctx: canvas.getContext('2d')
        }, function () {
          this.drawGrid();
          this.drawSnake();
        }) // as soon as setstate is done, do drawgrid
      }

      

      componentDidMount () {
        this.drawBoard();
      } // as soon as the component is created, do drawboard

      
      changeDirection (direction) {
        let newState = Object.assign({}, this.state);
        newState.snake.direction = direction;
        this.setState(newState);
        this.canvasMoveSnake();
      }

      canvasMoveSnake(){
        const {ctx, snake} = this.state;
        ctx.fillStyle = 'black';
        this.drawRect(snake.tail.x,snake.tail.y,1,1);
        ctx.fillStyle = 'grey';
        this.drawRect(snake.head.x,snake.head.y,1,1);
      }

      drawRect(x, y, l, h) {
        const {ctx} = this.state;
        ctx.fillRect(x * cellSize, y * cellSize, l * cellSize, h * cellSize);
      }
    

    render(){
        return (
            <div id = 'gameContainer' className = 'container-fluid' >
                <canvas id='gameBoard' ref="gameBoard" width={boardSize} height={boardSize} />
                
                <Snake snake={this.state.snake}
                changeDirection={this.changeDirection.bind(this)}
           />
            </div> // need to return the whole div    
        )
    }
}

export default Board;