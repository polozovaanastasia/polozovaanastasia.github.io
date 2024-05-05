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
        gridSize: { x: 4, y: 4 },
        pointsToWin: 2,
        missToLose: 3,
        googleJumpInterval: 3000,
        isAudioOn: false,
    },
    catch: 0,
    miss: 0,
    // time: new Date(),
    coords: {
        google: {
            x: 0,
            y: 0,
        },
        players: {
            player1: {
                x: 1,
                y: 1,
            },
            player2: {
                x: 2,
                y: 2,
            },
        },
    },
    audio: new Audio("./assets/audio/family.mp3"),
};

const settings = {
    gridSize: [
        { x: 4, y: 4 },
        { x: 5, y: 5 },
        { x: 6, y: 6 },
        { x: 10, y: 10 },
    ],
    pointsToWin: [2, 5, 10, 50],
    missToLose: [2, 10, 20],
    isAudioOn: false,
};

const defaultSettings = {
    gridSize: { x: 4, y: 4 },
    pointsToWin: 2,
    missToLose: 5,
    coords: {
        player1: {
            x: 1,
            y: 1,
        },
        player2: {
            x: 2,
            y: 2,
        },
    },
};

// observer:
let _observer = () => {};

export const addEventListener = (subscriber) => {
    _observer = subscriber;
};

// getters:
export const getCatchCount = () => {
    return _data.catch;
};

export const getMissCount = () => {
    return _data.miss;
};

export const getGoogleCoords = () => {
    return { ..._data.coords.google };
};

export const getPlayer1Coords = () => {
    return { ..._data.coords.players.player1 };
};

export const getPlayer2Coords = () => {
    return { ..._data.coords.players.player2 };
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
    if (
        _data.gameState !== GAME_STATES.SETTINGS &&
        _data.gameState !== GAME_STATES.LOSE
    ) {
        throw new Error("Game cannot be started from state" + _data.gameState);
    }
    _changeGoogleCoords();
    _data.catch = 0;
    _data.miss = 0;
    _data.gameState = GAME_STATES.IN_PROGRESS;
    _runGoogleJumpInterval();
    _observer();
};

export const goToSetSettings = () => {
    _data.gameState = GAME_STATES.SETTINGS;
    _resetSettingsToDefault();
    _resetPlayersCoordsToDefault();
    _observer();
};

export const catchGoogle = () => {
    _data.catch++;
    _stopGoogleJumpInterval();

    if (_data.catch >= _data.currentSettings.pointsToWin) {
        _data.gameState = GAME_STATES.WIN;
    } else {
        _changeGoogleCoords();
        _runGoogleJumpInterval();
    }
    _observer();
};

export const validatePlayerNumberOrThrow = (playerNumber) => {
    if (![1, 2].some((number) => number === playerNumber)) {
        throw new Error("Incorrect player number");
    }
};

export const movePlayer = (playerNumber, directions) => {
    validatePlayerNumberOrThrow(playerNumber);
    _data.coords.players[`player${playerNumber}`];
    const newCoords = { ..._data.coords.players[`player${playerNumber}`] };

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

    const isValidCoords = _checkIsCoordInValidRange(newCoords);
    if (!isValidCoords) return;

    const isMatchWithOtherPlayer = coordsMatchWithOtherPlayer(
        newCoords,
        playerNumber
    );
    if (isMatchWithOtherPlayer) return;
    _data.coords.players[`player${playerNumber}`] = newCoords;
    const isMatchWithGoogle = coordsMatchWithGoogle(newCoords);
    if (isMatchWithGoogle) catchGoogle();
    _observer();
};

const coordsMatchWithOtherPlayer = (newCoords, currentPlayerNumber) => {
    const currentPlayer = `player${currentPlayerNumber}`;
    for (let player in _data.coords.players) {
        if (player !== currentPlayer) {
            const playerCoords = _data.coords.players[player];
            if (
                playerCoords.x === newCoords.x &&
                playerCoords.y === newCoords.y
            )
                return true;
        }
    }
};

const coordsMatchWithGoogle = (newCoords) => {
    if (
        _data.coords.google.x === newCoords.x &&
        _data.coords.google.y === newCoords.y
    )
        return true;
};

export const toggleAudio = () => {
    const audio = _data.audio;
    audio.loop = true;

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

const _checkIsCoordInValidRange = (coords) => {
    const xIsCorrect =
        coords.x >= 0 && coords.x < _data.currentSettings.gridSize.x;
    const yIsCorrect =
        coords.y >= 0 && coords.y < _data.currentSettings.gridSize.y;

    return xIsCorrect && yIsCorrect;
};

const _changeGoogleCoords = () => {
    let newX, newY;
    do {
        newX = _getRandomInt(_data.currentSettings.gridSize.x);
        newY = _getRandomInt(_data.currentSettings.gridSize.y);

        var newCoordsMathWithCurrentCords =
            _data.coords.google.x === newX && _data.coords.google.y === newY;
        var newCoordsMathWithPlayer1Cords =
            _data.coords.players.player1.x === newX &&
            _data.coords.players.player1.y === newY;
        var newCoordsMathWithPlayer2Cords =
            _data.coords.players.player2.x === newX &&
            _data.coords.players.player2.y === newY;
    } while (
        newCoordsMathWithCurrentCords ||
        newCoordsMathWithPlayer1Cords ||
        newCoordsMathWithPlayer2Cords
    );
    _data.coords.google.x = newX;
    _data.coords.google.y = newY;
};

const _getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
};

const _resetSettingsToDefault = () => {
    _data.currentSettings.gridSize = defaultSettings.gridSize;
    _data.currentSettings.pointsToWin = defaultSettings.pointsToWin;
    _data.currentSettings.missToLose = defaultSettings.missToLose;
};

const _resetPlayersCoordsToDefault = () => {
    const playersCoord = _data.coords.players;
    const defaultCoords = defaultSettings.coords;
    for (let player in playersCoord) {
        playersCoord[player].x = defaultCoords[player].x;
        playersCoord[player].y = defaultCoords[player].y;
    }
};

let jumpIntervalId;

const _runGoogleJumpInterval = () => {
    jumpIntervalId = setInterval(() => {
        _changeGoogleCoords();
        _data.miss++;
        if (_data.miss === _data.currentSettings.missToLose) {
            _stopGoogleJumpInterval();
            _data.gameState = GAME_STATES.LOSE;
        }
        _observer();
    }, _data.currentSettings.googleJumpInterval);
};

const _stopGoogleJumpInterval = () => {
    clearInterval(jumpIntervalId);
};
