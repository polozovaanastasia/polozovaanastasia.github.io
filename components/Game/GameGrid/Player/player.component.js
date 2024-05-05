import { validatePlayerNumberOrThrow } from "../../../../data.js";

export const Player = (playerNumber) => {
    validatePlayerNumberOrThrow(playerNumber);

    // create elements:
    const containerElement = document.createElement("div");
    const googleElement = document.createElement("img");

    containerElement.classList.add("target");
    googleElement.src = `../../assets/images/player${playerNumber}.png`;

    // appends elements:
    containerElement.append(googleElement);

    return containerElement;
};
