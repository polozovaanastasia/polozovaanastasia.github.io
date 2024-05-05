import { addEventListener } from "./data.js";
import { Game } from "./components/Game/game.component.js";

const rerender = () => {
    const rootElement = document.getElementById("root");
    rootElement.innerHTML = "";

    const gameElement = Game();
    rootElement.append(gameElement);
};

rerender();

addEventListener(rerender); // addEventListener - observable (наблюдаемый), subjeсt (субъект), издатель   rerender - observer
