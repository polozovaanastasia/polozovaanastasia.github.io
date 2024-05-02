import { isAudioEnabled, setAudioEnabled, toggleAudio } from "../../../data.js";

export const Toggle = (musicEnabledStatus, onToggleHandler) => {
    // create elements:
    const checkBoxContainerElement = document.createElement("label");
    const checkBoxTitleElement = document.createElement("h4");

    const toggleContainerElement = document.createElement("div");
    const toggleWrapperElement = document.createElement("div");
    const toggleElement = document.createElement("div");
    const checkBoxElement = document.createElement("input");

    checkBoxContainerElement.classList.add("set-settings__checkbox-container");
    toggleContainerElement.classList.add("set-settings__toggle-container");
    toggleWrapperElement.classList.add("set-settings__toggle-wrapper");
    toggleElement.classList.add("set-settings__toggle");

    checkBoxTitleElement.innerText = "Sound on";
    checkBoxElement.type = "checkbox";

    musicEnabledStatus
        ? (checkBoxElement.checked = true)
        : checkBoxElement.checked;

    checkBoxElement.addEventListener("change", () => {
        onToggleHandler();
    });

    toggleWrapperElement.append(checkBoxElement, toggleElement);
    toggleContainerElement.append(toggleWrapperElement);
    checkBoxContainerElement.append(
        checkBoxTitleElement,
        toggleContainerElement
    );

    return checkBoxContainerElement;
};
