"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    "testEnvironment": 'node',
    "roots": [
        "<rootDir>/src"
    ],
    "testMatch": [
        "**/__tests__/**/*.+(ts|tsx|js)",
        "**/?(*.)+(spec|test).+(ts|tsx|js)"
    ],
    "transform": {
        "^.+\\.(ts|tsx)$": "ts-jest"
    },
};
exports.default = config;
