import React from 'react';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import _ from 'lodash';

class Snake extends React.Component{

  constructor(props){
    super(props);
  }

  selfCollide() {
    const snake = this.props.snake;
    return snake.body.some(cord => _.isEqual(cord, snake.head)) || _.isEqual(snake.head, snake.tail)
  }

  run() {
    this.props.snake.running = true;
    var running = setInterval(() => {
        const snake = this.props.snake;

        switch(snake.direction){
            case 'w':
              snake.head.y -= 1;
              break;
            case 's':
              snake.head.y += 1;
              break;
            case 'a':
              snake.head.x -= 1;
              break;
            case 'd':
              snake.head.x += 1;
              break;
            default:
            break;
        }

        if(this.props.snake.running === false){
            clearInterval(running);
        }
        
        // end game
        if (snake.head.x > 29 || snake.head.y > 29 || snake.head.x < 0 || snake.head.y < 0 || this.selfCollide()) {
          snake.running = false
          snake.alive = false
          clearInterval(running);
        }

        var newCell = {
          x: snake.head.x,
          y: snake.head.y
        }
        
        snake.body.push(newCell)
        snake.tail.x = snake.body[0].x;
        snake.tail.y = snake.body[0].y;
        snake.body.splice(0,1);

        this.props.changeDirection(snake.direction);
      
    }, 200 / this.props.snake.speed);
}

    render(){
       return(
           <div id="Snake">
           <KeyboardEventHandler
                  handleKeys={['w', 's', 'a', 'd', 'left', 'up', 'right', 'down']}
                  onKeyEvent={(key, e) => {
                  if ((key === 'w' || key === 'up') && (this.props.snake.direction === 'w' || this.props.snake.direction === 's')) {
                    return
                  } else if ((key === 's' || key === 'down')  && (this.props.snake.direction === 's' || this.props.snake.direction === 'w')) {
                    return
                  } else if ((key === 'a' || key === 'left')  && (this.props.snake.direction === 'a' || this.props.snake.direction === 'd')) {
                    return
                  } else if ((key === 'd' || key === 'right')  && (this.props.snake.direction === 'd' || this.props.snake.direction === 'a')) {
                    return
                  }

                  if (this.props.snake.alive === false && this.props.snake.running === false){
                    this.props.endGame();
                  }
                  if (!this.props.snake.running && this.props.snake.alive ){
                    this.run();
                  }
                this.props.changeDirection(key)
                }} />
           </div>
       );
   }
}

export default Snake;