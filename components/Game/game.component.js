import { GameGrid } from "../GameGrid/game-grid.component.js";
import { ResultPanel } from "../ResultPanel/result-panel.component.js";
import { Settings } from "../Settings/settings.component.js";
import { getCurrentSettings, getGameState, GAME_STATES } from "../../data.js";
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
