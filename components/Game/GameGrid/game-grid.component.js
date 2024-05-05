import {
    getGoogleCoords,
    getGridSize,
    getPlayer1Coords,
    getPlayer2Coords,
    movePlayer,
} from "../../../data.js";
import { Google } from "./Google/google.component.js";
import { Player } from "./Player/player.component.js";

export const GameGrid = () => {
    const gridElement = document.createElement("table");
    const gridSize = getGridSize();

    gridElement.classList.add("game-grid");

    for (let y = 0; y < gridSize.y; y++) {
        const row = document.createElement("tr");
        for (let x = 0; x < gridSize.x; x++) {
            const cell = document.createElement("td");
            if (x === getGoogleCoords().x && y === getGoogleCoords().y) {
                cell.append(Google());
            }
            if (x === getPlayer1Coords().x && y === getPlayer1Coords().y) {
                cell.append(Player(1));
            }
            if (x === getPlayer2Coords().x && y === getPlayer2Coords().y) {
                cell.append(Player(2));
            }
            row.append(cell);
        }
        gridElement.append(row);
    }

    return gridElement;
};
