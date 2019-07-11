import React from 'react';
import Snake from './Snake';
import KeyboardEventHandler from 'react-keyboard-event-handler';

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
            score: 0, 
            running: false,
            alive: true,
            speed: 1,
            food:{}
          },
          display: '0'
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

        // for (var vertical = cellSize; vertical < boardSize; vertical += cellSize){
        //   ctx.beginPath(); // start to draw line
        //   ctx.moveTo(vertical, 0); 
        //   ctx.lineTo(vertical, boardSize); // draw vertical lines
        //   ctx.stroke(); // display lines
        // }
      
        // for (var horizontal = cellSize; horizontal < boardSize; horizontal += cellSize){
        //   ctx.beginPath();
        //   ctx.moveTo(0, horizontal);
        //   ctx.lineTo(boardSize ,horizontal); // draw horizontal lines
        //   ctx.stroke();
        // }
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
          this.drawFood();
        }) // as soon as setstate is done, do drawgrid
      }

      drawFood () {
        const {ctx, snake} = this.state;
        ctx.fillStyle = 'purple';
        var position = {
          x: Math.floor(Math.random() * 30),
          y: Math.floor(Math.random() * 30)
        }
        while (this.exists(position)) {
          position.x = Math.floor(Math.random() * 30);
          position.y = Math.floor(Math.random() * 30);
        }
        snake.food = position;
        this.setState({
          snake: snake
        })
        this.drawRect(position.x, position.y,1,1);
      }

      exists(point) {
        const {snake} = this.state;
      
        for (var cord in snake.body) {
          if (point.x === cord.x && point.y === cord.y) {
            return true
          }
        }
        return false
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

      addBody() {
        const {snake} = this.state
        var newTail = {}
        switch(snake.direction){
          case 'w':
            newTail = {x: snake.tail.x, y: snake.tail.y - 1}
            break;
          case 's':
            newTail = {x: snake.tail.x, y: snake.tail.y + 1}
            break;
          case 'a':
            newTail = {x: snake.tail.x - 1, y: snake.tail.y}
            break;
          case 'd':
            newTail = {x: snake.tail.x + 1, y: snake.tail.y}
            break;
          default:
            break;
        }
        snake.body.push(newTail)
        snake.tail = newTail
      }

      addScore(){
        let newState = Object.assign({}, this.state);
        newState.snake.score = newState.snake.score + 1;
        newState.display = newState.snake.score;
        this.setState(newState);
      }

      canvasMoveSnake(){
        const {ctx, snake} = this.state;
        ctx.fillStyle = '#cee5b3';
        this.drawRect(snake.tail.x,snake.tail.y,1,1);
        ctx.fillStyle = 'grey';
        this.drawRect(snake.head.x,snake.head.y,1,1);

        if (snake.head.x === snake.food.x && snake.head.y === snake.food.y) {
          this.addBody();
          this.addScore();
          this.drawFood();
        }

        if (snake.alive === false && snake.running === false){
          this.endGame();
        }
      }

      drawRect(x, y, l, h) {
        const {ctx} = this.state;
        ctx.fillRect(x * cellSize, y * cellSize, l * cellSize, h * cellSize);
      }


      speedUp(){
        let newState = Object.assign({}, this.state);
        newState.snake.speed = this.state.snake.speed + 1;        
        this.setState(newState);
    }

      speedDown(){
        let newState = Object.assign({}, this.state);
        if(this.state.snake.speed >= 1){
          newState.snake.speed = this.state.snake.speed - 1;
        } else {
          newState.snake.speed = this.state.snake.speed;
          alert("You have reached the minimum speed.")
        }       
        this.setState(newState);
    } 

    resetBoard(){
      this.setState({
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
          speed: 1,
          food:{}
        }})
        this.drawBoard();
      }


      endGame() {
        const {ctx} = this.state
      
        let newState = Object.assign({}, this.state);
        newState.snake.running = false;
        newState.snake.alive = false;
        this.setState(newState);
      
        //Horizonal Lines
        ctx.fillStyle = 'white';
        this.drawRect(5,9,4,1);
        this.drawRect(5,13,4,1);
        this.drawRect(11,9,2,1);
        this.drawRect(11,12,2,1);
        this.drawRect(22,9,3,1);
        this.drawRect(22,11,3,1);
        this.drawRect(22,13,3,1);
        this.drawRect(6,16,2,1);
        this.drawRect(6,20,2,1);
        this.drawRect(16,16,4,1);
        this.drawRect(16,18,4,1);
        this.drawRect(16,20,4,1);
        this.drawRect(21,16,4,1);
        this.drawRect(21,18,4,1);
        this.drawRect(23,20,2,1);
      
        //Vertical Lines
        this.drawRect(5,10,1,3);
        this.drawRect(10,10,1,4);
        this.drawRect(13,10,1,4);
        this.drawRect(15,9,1,5);
        this.drawRect(19,9,1,5);
        this.drawRect(21,9,1,5);
        this.drawRect(5,17,1,3);
        this.drawRect(8,17,1,3);
        this.drawRect(10,16,1,3);
        this.drawRect(14,16,1,3);
        this.drawRect(16,16,1,5);
        this.drawRect(21,16,1,5);
        this.drawRect(24,16,1,3);
      
        //Dots
        this.drawRect(7,11,1,1);
        this.drawRect(8,12,1,1);
        this.drawRect(16,10,1,1);
        this.drawRect(17,11,1,1);
        this.drawRect(18,10,1,1);
        this.drawRect(11,19,1,1);
        this.drawRect(12,20,1,1);
        this.drawRect(13,19,1,1);
        this.drawRect(22,19,1,1);
      }


    render(){
        return (
            <div id = 'gameContainer' className = 'container-fluid' >
              {this.state.display}
                <canvas id='gameBoard' ref="gameBoard" width={boardSize} height={boardSize} />
                <KeyboardEventHandler
                  handleKeys={['r', 'esc', '[', ']']}
                  onKeyEvent={(key, e) => {
                  if(key === 'r'){
                    this.resetBoard();
                  } else if(key === 'esc'){
                    this.endGame();
                  } else if(key === ']'){
                    this.speedUp();
                  } else if(key === '['){
                    this.speedDown();
                  }
                }} />
                <Snake snake={this.state.snake}
                changeDirection={this.changeDirection.bind(this)}
                endGame={this.endGame.bind(this)}
           />
            </div> // need to return the whole div    
        )
    }
}

export default Board;