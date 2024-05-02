export const GAME_STATES = {
    SETTINGS: "settings",
    IN_PROGRESS: "in_progress",
    WIN: "win",
    LOSE: "lose",
};

export const MOVING_DIRECTIONS = {
    UP: "up",
    DOWN: "down",
    LEFT: "left",
    RIGHT: "right",
};
const _data = {
    gameState: GAME_STATES.SETTINGS,
    currentSettings: {
        gridSize: { x: 2, y: 2 },
        pointsToWin: 2,
        missToLose: 3,
        isAudioOn: false,
    },
    catch: 0,
    miss: 0,
    // time: new Date(),
    heroes: {
        google: {
            x: 0,
            y: 0,
        },
        player1: {
            x: 1,
            y: 1,
        },
    },
    audio: new Audio("./assets/audio/family.mp3"),
};

const settings = {
    gridSize: [
        { x: 2, y: 2 },
        { x: 4, y: 4 },
        { x: 5, y: 5 },
        { x: 6, y: 6 },
        { x: 10, y: 10 },
    ],
    pointsToWin: [2, 5, 10],
    missToLose: [2, 10, 20],
    isAudioOn: false,
};

const defaultSettings = {
    gridSize: { x: 2, y: 2 },
    pointsToWin: 2,
    missToLose: 5,
};

// observer:
let observer = () => {};

export const addEventListener = (subscriber) => {
    observer = subscriber;
};

// getters:
export const getCatchCount = () => {
    return _data.catch;
};

export const getMissCount = () => {
    return _data.miss;
};

export const getGoogleCoords = () => {
    return { ..._data.heroes.google };
};

export const getPlayer1Coords = () => {
    return { ..._data.heroes.player1 };
};

export const getGridSize = () => {
    return { ..._data.currentSettings.gridSize };
};

export const getGameState = () => {
    return _data.gameState;
};

export const getDataSettings = () => {
    return { ...settings };
};

export const getCurrentSettings = () => {
    return { ..._data.currentSettings };
};

export const isAudioEnabled = () => {
    return _data.currentSettings.isAudioOn;
};

// setters:
export const setGridSize = (id) => {
    const newGridSize = settings.gridSize[id];

    if (newGridSize.x < 1) throw new Error("Incorrect x grid size settings");
    if (newGridSize.y < 1) throw new Error("Incorrect y grid size settings");

    _data.currentSettings.gridSize = {
        x: newGridSize.x,
        y: newGridSize.y,
    };
};

export const setPointsToWin = (id) => {
    const newPointsToWin = settings.pointsToWin[id];
    _data.currentSettings.pointsToWin = newPointsToWin;
};

export const setMissToLose = (id) => {
    const newMissToLose = settings.missToLose[id];
    _data.currentSettings.missToLose = newMissToLose;
};

export const setAudioEnabled = (isAudioEnabled) => {
    settings.isAudioOn = isAudioEnabled;
};

// game:
export const start = () => {
    changeGoogleCoords();
    _data.catch = 0;
    _data.miss = 0;
    _data.gameState = GAME_STATES.IN_PROGRESS;
    runGoogleJumpInterval();
    observer();
};

export const goToSetSettings = () => {
    _data.gameState = GAME_STATES.SETTINGS;
    resetSettingsToDefault();
    observer();
};

export const catchGoogle = () => {
    _data.catch++;
    stopGoogleJumpInterval();

    if (_data.catch >= _data.currentSettings.pointsToWin) {
        _data.gameState = GAME_STATES.WIN;
    } else {
        changeGoogleCoords();
        runGoogleJumpInterval();
    }
    observer();
};

export const movePlayer = (directions) => {
    const newCoords = { ..._data.heroes.player1 };

    switch (directions) {
        case MOVING_DIRECTIONS.UP: {
            newCoords.y--;
            break;
        }
        case MOVING_DIRECTIONS.DOWN: {
            newCoords.y++;
            break;
        }
        case MOVING_DIRECTIONS.LEFT: {
            newCoords.x--;
            break;
        }
        case MOVING_DIRECTIONS.RIGHT: {
            newCoords.x++;
            break;
        }
        default:
            throw new Error("No supported state");
    }

    const isValidCoords = checkIsCoordInValidRange(newCoords);
    if (!isValidCoords) return;
    _data.heroes.player1 = newCoords;
    // если игроком попадаем в ячейку с гугл
    if (
        _data.heroes.google.x === _data.heroes.player1.x &&
        _data.heroes.google.y === _data.heroes.player1.y
    ) {
        catchGoogle();
    }
    observer();
};

export const toggleAudio = () => {
    const audio = _data.audio;

    if (audio.paused) {
        audio.play();
        _data.currentSettings.isAudioOn = true;
        setAudioEnabled(true);
    } else {
        audio.pause();
        audio.currentTime = 0;
        _data.currentSettings.isAudioOn = false;
        setAudioEnabled(false);
    }
};

// границы для игрока
const checkIsCoordInValidRange = (coords) => {
    const xIsCorrect =
        coords.x >= 0 && coords.x < _data.currentSettings.gridSize.x;
    const yIsCorrect =
        coords.y >= 0 && coords.y <= _data.currentSettings.gridSize.y;

    return xIsCorrect && yIsCorrect;
};

const changeGoogleCoords = () => {
    let newX, newY;
    do {
        newX = getRandomInt(_data.currentSettings.gridSize.x);
        newY = getRandomInt(_data.currentSettings.gridSize.y);
    } while (
        (_data.heroes.google.x === newX && _data.heroes.google.y === newY) ||
        (_data.heroes.player1.x === newX && _data.heroes.player1.y === newY)
    );
    _data.heroes.google.x = newX;
    _data.heroes.google.y = newY;
};

const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
};

const resetSettingsToDefault = () => {
    _data.currentSettings.gridSize = defaultSettings.gridSize;
    _data.currentSettings.pointsToWin = defaultSettings.pointsToWin;
    _data.currentSettings.missToLose = defaultSettings.missToLose;
};

let jumpIntervalId;

const runGoogleJumpInterval = () => {
    jumpIntervalId = setInterval(() => {
        changeGoogleCoords();
        _data.miss++;
        if (_data.miss === _data.currentSettings.missToLose) {
            stopGoogleJumpInterval();
            _data.gameState = GAME_STATES.LOSE;
        }
        observer();
    }, 2000);
};

const stopGoogleJumpInterval = () => {
    clearInterval(jumpIntervalId);
};
