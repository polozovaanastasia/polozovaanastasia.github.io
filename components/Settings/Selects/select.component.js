import { getGameState } from "../../../data.js";

export const Select = (data) => {
    // create elements:
    const selectContainerElement = document.createElement("label");
    const selectTitleElement = document.createElement("h4");
    const selectElement = document.createElement("select");

    const gameState = getGameState();

    if (gameState === "in_progress") {
        selectContainerElement.classList.add(
            "set-settings__select-container_disabled"
        );
        selectElement.disabled = true;
    }
    // add class names:
    selectContainerElement.classList.add("set-settings__select-container");
    selectElement.classList.add("set-settings__select");

    selectTitleElement.innerText = data.name;

    data.options.map((option, index) => {
        const optionElement = document.createElement("option");
        optionElement.innerText = option.innerText;
        optionElement.value = index;
        selectElement.append(optionElement);
    });

    // add event handler
    selectElement.addEventListener("change", (event) => {
        const selectedId = event.currentTarget.value;
        data.onChangeHandler(selectedId);
    });

    // appends elements:
    selectContainerElement.append(selectTitleElement, selectElement);

    return selectContainerElement;
};
