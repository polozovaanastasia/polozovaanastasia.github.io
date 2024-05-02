export const Button = (title, eventType, callback) => {
    const buttonElement = document.createElement("button");
    buttonElement.innerText = title;

    buttonElement.addEventListener(eventType, callback);

    return buttonElement;
};
