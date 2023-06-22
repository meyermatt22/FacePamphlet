import React, { useEffect, useState } from "react";
import ProfileDeleteModal3 from "../ProfPageDeleteModal/index3";

const SnakeGame = ({ profileId }) => {
  const [x, setX] = useState(100);
  const [y, setY] = useState(100);
  const [keyPressed, setKeyPressed] = useState("none");

  const [foodX, setFoodX] = useState(50);
  const [foodY, setFoodY] = useState(50);
  const [score, setScore] = useState(0);

  const [prevPos, setPrevPos] = useState([]);

  const [highScore, setHighScore] = useState(42);
  const [next, setNext] = useState(false);

  document.addEventListener(
    "keyup",
    (event) => {
      const name = event.key;
      setKeyPressed(name);
    },
    false
  );


  function eatFood() {
    if (
      x >= foodX - 10 &&
      x <= foodX + 10 &&
      y >= foodY - 10 &&
      y <= foodY + 10
    ) {
      return true;
    } else {
      return false;
    }
  }

  const snakeCollide = () => {
    prevPos.forEach((e) => {
      if (e[0] == x && e[1] == y) {
        setScore(0);
        setPrevPos([]);
      }
    });
  };

  useEffect(() => {
    if (eatFood()) {
      setFoodX(Math.round(Math.random() * 39) * 10);
      setFoodY(Math.round(Math.random() * 37) * 10);
      setScore(score + Math.round(Math.random() * 100));
    }

    if (score > 3) {
      setNext(true);
    }

    if (prevPos.length > score) {
      prevPos.splice(0, 1);
    }

    const interval = setInterval(() => {
      setPrevPos((prev) => [...prev, [x, y]]);
      switch (keyPressed) {
        case "ArrowUp":
          setY(y - 10);
          break;
        case "ArrowDown":
          setY(y + 10);
          break;
        case "ArrowLeft":
          setX(x - 10);
          break;
        case "ArrowRight":
          setX(x + 10);
          break;
      }

      if (x > 390) {
        setX(0);
        setScore(0);
      }
      if (x < 0) {
        setX(390);
        setScore(0);
      }
      if (y > 370) {
        setY(0);
        setScore(0);
      }
      if (y < 0) {
        setY(370);
        setScore(0);
      }
    }, 200);
    snakeCollide();

    return () => clearInterval(interval);
  }, [y, x, keyPressed, foodX, foodY, score]);

  return (
    <div>
      <div className="great-grandfather" style={{ margin: "20px", backgroundColor: "rgb(128, 206, 135)" }}>
        <div
          className="grandfather"
          style={{
            backgroundColor: "rgb(128, 206, 135)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontSize: "38px",
            width: "500px",
            height: "500px",
          }}
        >
          <div className="father" caretColor="transparent">
            snake game, score: {score}{" "}
          </div>

          <div
            className="uncle"
            style={{
              position: "relative",
              width: "400px",
              height: "400px",
              border: "2px solid rgb(32, 72, 41)",
              borderRadius: "10px",
              caretColor: "transparent",
            }}
          >
            <div
              className="cousin"
              style={{
                width: "8px",
                height: "8px",
                border: "1px solid rgb(2,2,4)",
                backgroundColor: "rgb(2,2,4)",
                position: "absolute",
                left: x,
                top: y,
                borderRadius: "10px",
              }}
            ></div>
            {prevPos.map((e, index) => (
              <div
                key={index}
                className="cousin-2"
                textDecoration="none"
                style={{
                  width: "8px",
                  height: "8px",
                  border: "1px solid rgb(2,2,4)",
                  backgroundColor: "rgb(2,2,4, .3)",
                  position: "absolute",
                  left: e[0],
                  top: e[1],
                  borderRadius: "10px",
                }}
              ></div>
            ))}
            <div
              className="cousine-3"
              style={{
                width: "8px",
                height: "8px",
                border: "1px solid rgb(32, 72, 41)",
                backgroundColor: "rgb(32, 72, 41)",
                position: "absolute",
                left: foodX,
                top: foodY,
                borderRadius: "10px",
              }}
            ></div>
          </div>
        </div>
      </div>
      <div>{next && <ProfileDeleteModal3 profileId={profileId} />}</div>
      <div>{!next && <p style={{ color: "rgb(146, 229, 161)", display:"flex", justifyContent:"center", height: "120px"}}>
              so you've past the robot test? <br/> do you think that puts you above the rest? <br/>
              it's time to become indy's greatest fear, <br/> Put your snake into solid metal gear
        </p>}</div>
    </div>
  );
};

export default SnakeGame;
