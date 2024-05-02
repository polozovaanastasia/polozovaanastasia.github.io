import { addEventListener, movePlayer, MOVING_DIRECTIONS } from "./data.js";
import { Game } from "./components/Game/game.component.js";

const rerender = () => {
    const rootElement = document.getElementById("root");
    rootElement.innerHTML = "";

    const gameElement = Game();
    rootElement.append(gameElement);
};

document.addEventListener("keyup", (event) => {
    switch (event.code) {
        case "ArrowUp": {
            movePlayer(MOVING_DIRECTIONS.UP);
            break;
        }
        case "ArrowDown": {
            movePlayer(MOVING_DIRECTIONS.DOWN);
            break;
        }
        case "ArrowLeft": {
            movePlayer(MOVING_DIRECTIONS.LEFT);
            break;
        }
        case "ArrowRight": {
            movePlayer(MOVING_DIRECTIONS.RIGHT);
            break;
        }
        default:
            throw new Error("No supported key");
    }
});

rerender();

addEventListener(rerender); // addEventListener - observable (наблюдаемый), subjeсt (субъект), издатель   rerender - observer
