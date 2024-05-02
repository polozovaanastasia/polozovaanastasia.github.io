export const Player = (number) => {
    // create elements:
    const containerElement = document.createElement("div");
    const googleElement = document.createElement("img");

    containerElement.classList.add("target");
    googleElement.src = `../../assets/images/player${number}.png`;

    // appends elements:
    containerElement.append(googleElement);

    return containerElement;
};
