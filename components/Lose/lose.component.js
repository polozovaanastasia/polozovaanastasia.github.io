import { getMissCount, start } from "../../data.js";
import { Button } from "../Button/button.component.js";

export const Lose = () => {
    // create elements:
    const containerElement = document.createElement("div");
    const contentElement = document.createElement("div");
    const headerElement = document.createElement("div");
    const titleElement = document.createElement("h1");
    const subTitleElement = document.createElement("h2");
    const resultStatisticElement = document.createElement("div");

    // add class names:
    containerElement.classList.add("result__container");
    contentElement.classList.add("result__content", "lose");
    resultStatisticElement.classList.add("result__statistic");

    // set inner text:
    titleElement.innerText = "You lose!";
    subTitleElement.innerText = "You'll be lucky next time";
    resultStatisticElement.innerHTML = `<span>Miss:</span>
                                        <span>${getMissCount()}</span>`;

    // appends elements:
    headerElement.append(titleElement, subTitleElement);
    contentElement.append(
        headerElement,
        resultStatisticElement,
        Button("Play again", "click", start)
    );
    containerElement.append(contentElement);

    return containerElement;
};
