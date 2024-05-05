import { GameGrid } from "./GameGrid/game-grid.component.js";
import { ResultPanel } from "../ResultPanel/result-panel.component.js";
import { Settings } from "../Settings/settings.component.js";
import {
    getCurrentSettings,
    getGameState,
    GAME_STATES,
    MOVING_DIRECTIONS,
    movePlayer,
} from "../../data.js";
import { SetSettings } from "../Settings/set-settings.component.js";
import { Win } from "../Win/win.component.js";
import { Lose } from "../Lose/lose.component.js";

export const Game = () => {
    const gameElement = document.createElement("div");

    gameElement.classList.add("game");

    const gameState = getGameState();

    switch (gameState) {
        case GAME_STATES.SETTINGS:
            gameElement.append(SetSettings());
            break;
        case GAME_STATES.IN_PROGRESS:
            gameElement.append(
                Settings(getCurrentSettings()),
                ResultPanel(),
                GameGrid()
            );
            break;
        case GAME_STATES.WIN:
            gameElement.append(Win());
            break;
        case GAME_STATES.LOSE:
            gameElement.append(Lose());
            break;
        default:
            throw new Error("No supported state");
    }
    return gameElement;
};

document.addEventListener("keyup", (event) => {
    console.log(event.code);
    switch (event.code) {
        case "ArrowUp": {
            movePlayer(2, MOVING_DIRECTIONS.UP);
            break;
        }
        case "ArrowDown": {
            movePlayer(2, MOVING_DIRECTIONS.DOWN);
            break;
        }
        case "ArrowLeft": {
            movePlayer(2, MOVING_DIRECTIONS.LEFT);
            break;
        }
        case "ArrowRight": {
            movePlayer(2, MOVING_DIRECTIONS.RIGHT);
            break;
        }
        default:
            throw new Error("No supported key");
    }
});
