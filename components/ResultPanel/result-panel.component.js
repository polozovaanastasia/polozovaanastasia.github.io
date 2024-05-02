import { getCatchCount, getMissCount } from "../../data.js";

export const ResultPanel = () => {
    // create elements:
    const resultPanelElement = document.createElement("div");
    const catchElement = document.createElement("span");
    const missElement = document.createElement("span");
    const catchCountElement = document.createElement("span");
    const missCountElement = document.createElement("span");

    // add class names:
    resultPanelElement.classList.add("result-panel");
    catchElement.classList.add("result-panel__catch");
    missElement.classList.add("result-panel__miss");
    catchCountElement.classList.add("count");
    missCountElement.classList.add("count");

    // set inner text:
    catchCountElement.innerText = getCatchCount();
    missCountElement.innerText = getMissCount();
    catchElement.innerText = "Catch: ";
    missElement.innerText = "Miss: ";

    // appends elements:
    catchElement.append(catchCountElement);
    missElement.append(missCountElement);
    resultPanelElement.append(catchElement, missElement);

    return resultPanelElement;
};
