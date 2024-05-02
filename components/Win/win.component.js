import { getCatchCount, goToSetSettings } from "../../data.js";
import { Button } from "../Button/button.component.js";

export const Win = () => {
    // create elements:
    const containerElement = document.createElement("div");
    const contentElement = document.createElement("div");
    const headerElement = document.createElement("div");
    const titleElement = document.createElement("h1");
    const subTitleElement = document.createElement("h2");
    const resultStatisticElement = document.createElement("div");

    // add class names:
    containerElement.classList.add("result__container");
    contentElement.classList.add("result__content", "win");
    resultStatisticElement.classList.add("result__statistic");

    // set inner text:
    titleElement.innerText = "You win!";
    subTitleElement.innerText = "Congratulations!";
    resultStatisticElement.innerHTML = `<span>Catch:</span>
                                        <span>${getCatchCount()}</span>`;

    // appends elements:
    headerElement.append(titleElement, subTitleElement);
    contentElement.append(
        headerElement,
        resultStatisticElement,
        Button("Play again", "click", goToSetSettings)
    );
    containerElement.append(contentElement);

    return containerElement;
};
