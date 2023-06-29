const answer = "APPLE";
let attempts = 0;
let index = 0;
let timer;

function appStart() {
  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료되었습니다.";
    div.style =
      "display: flex; justify-content: center; align-items: center; position: absolute; top: 40vh; left: 33.5vw; padding: 20px 70px; color:#fff; background: rgba(0, 0, 0, .8);";
    document.body.appendChild(div);
  };

  const gameover = () => {
    window.removeEventListener("keydown", handleKeydown);
    displayGameover();
    clearInterval(timer);
  };

  const nextLine = () => {
    if (attempts === 6) return gameover();
    attempts += 1;
    index = 0;
  };

  const handleEnterKey = () => {
    let cnt = 0; // 맞은 갯수

    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-column[data-index='${attempts}${i}']`
      );
      const letter = block.innerText; // 입력한 글자;
      const word = answer[i]; // 정답철자
      if (letter === word) {
        cnt += 1;
        block.style.background = "#6AAA64";
      } else if (word.includes(letter)) block.style.background = "#C9B458";
      else block.style.background = "#d3d6da";
      block.style.color = "white";
    }
    if (cnt === 5) gameover();
    else nextLine();
  };

  const handleBackspace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-column[data-index='${attempts}${index - 1}']`
      );
      preBlock.innerText = "";
    }
    if (index !== 0) index -= 1;
  };

  const handleKeydown = (e) => {
    const key = e.key.toUpperCase();
    const keyCode = e.keyCode;
    const thisBlock = document.querySelector(
      `.board-column[data-index='${attempts}${index}']`
    );

    if (e.key === "Backspace") handleBackspace();
    else if (index === 5) {
      if (e.key === "Enter") handleEnterKey();
      else return;
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      index++;
    }
  };

  const startTimer = () => {
    const startTime = new Date(); // 시작시간
    const setTime = () => {
      const nowTime = new Date(); //현재시간
      const pastTime = new Date(nowTime - startTime); //흐른시간
      const min = pastTime.getMinutes().toString().padStart(2, "0"); //분
      const seconds = pastTime.getSeconds().toString().padStart(2, "0"); //초
      const timeDiv = document.querySelector(".time");
      timeDiv.innerText = `${min} : ${seconds}`;
    };
    //주기성
    timer = setInterval(setTime, 1000);
  };
  startTimer();

  window.addEventListener("keydown", handleKeydown);
}

appStart();
