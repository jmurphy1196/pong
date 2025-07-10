import { useEffect, useState, useRef  } from "react";
import Player from "../../models/Player";
import Ball from "../../models/Ball";

export default function Game() {
  const canvasRef = useRef(null);
  const [gameSettings, setGameSettings] = useState({
    canvasWidth: 800,
    canvasHeight: 400,
    player1Score: 0,
    player2Score: 0,
  });
  const [gameLoop, setGameLoop] = useState(null);
  const [eventListeners, setEventListeners] = useState([]);
  const {width: playerWidth, height: playerHeight} = Player.getPaddleDimmensions(gameSettings);
  console.log("Player dimensions", playerWidth, playerHeight);

  const player1 = new Player("Player 1", "white", playerWidth, playerHeight, 1);
  const player2 = new Player("Player 2", "white", playerWidth, playerHeight, 2);
  Player.setPlayerPositions([player1, player2], gameSettings);

  const ball = new Ball(gameSettings.canvasWidth, gameSettings.canvasHeight);



  const activePlayer = player1;

  const drawPlayers = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const players = [player1, player2];
    players.forEach((player) => {
      ctx.fillStyle = player.color;
      ctx.fillRect(player.x, player.y, player.width, player.height);
    });
  };
  const drawBall = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();
  };
  const clearCanvas = () => {
    // clear canvas
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const moveBall = () => {
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
  };

  const checkBallCollision = () => {
    if (
      ball.y + ball.radius > gameSettings.canvasHeight ||
      ball.y - ball.radius < 0
    ) {
      ball.velocityY = -ball.velocityY;
    }
    if (
      ball.x + ball.radius > gameSettings.canvasWidth ||
      ball.x - ball.radius < 0
    ) {
      ball.velocityX = -ball.velocityX;
    }
    // check player1 collision
    if (
      ball.x - ball.radius < player1.x + player1.width &&
      ball.y > player1.y &&
      ball.y < player1.y + player1.height
    ) {
      ball.velocityX = -ball.velocityX;
    }
    // check player2 collision
    if (
      ball.x + ball.radius > player2.x &&
      ball.y > player2.y &&
      ball.y < player2.y + player2.height
    ) {
      ball.velocityX = -ball.velocityX;
    }
    // check if ball is behind player1
    if (ball.x < player1.x) {
      ball.x = gameSettings.canvasWidth / 2;
      ball.y = gameSettings.canvasHeight / 2;
      setGameSettings((prev) => ({
        ...prev,
        player2Score: prev.player2Score + 1,
      }));
    }
    //  check if ball is behind player2
    if (ball.x > player2.x) {
      ball.x = gameSettings.canvasWidth / 2;
      ball.y = gameSettings.canvasHeight / 2;
      setGameSettings((prev) => ({
        ...prev,
        player1Score: prev.player1Score + 1,
      }));
    }
  };

  const handlePlayerMovement = (e) => {
    console.log(activePlayer.y);
    if (e.key === "w") {
      if (activePlayer.y > 0) {
        activePlayer.y -= 10;
      } else if (activePlayer.y <= 0) {
        activePlayer.y = gameSettings.canvasHeight;
      }
    } else if (e.key === "s") {
      if (activePlayer.y < gameSettings.canvasHeight - activePlayer.height) {
        activePlayer.y += 10;
      } else if (
        activePlayer.y >=
        gameSettings.canvasHeight - activePlayer.height
      ) {
        activePlayer.y = 0 - activePlayer.height;
      }
    }
  };

  useEffect(() => {
    const keyEventListener = window.addEventListener("keypress", (e) => {
      handlePlayerMovement(e);
    });
    const loop = setInterval(() => {
      clearCanvas();
      drawPlayers();
      moveBall();
      checkBallCollision();
      drawBall();
    }, 1000 / 60);

    setGameLoop(loop);
    setEventListeners([...eventListeners, keyEventListener]);

    return () => {
      for (const eventListener of eventListeners) {
        window.removeEventListener("keypress", eventListener);
      }
      clearInterval(gameLoop);
    };
  }, []);
  return (
    <div className='game'>
      <h3>SCORE</h3>
      <div className="scores" style={{width: gameSettings.canvasWidth}}>
        <div className="score score__player1">{ gameSettings.player1Score }</div>
        <div className="score score__player2">{ gameSettings.player2Score }</div>
      </div>
      <canvas
        ref={canvasRef}
        width={gameSettings.canvasWidth}
        height={gameSettings.canvasHeight}
      ></canvas>
    </div>
  );
}
