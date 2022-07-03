// ==UserScript==
// @name         Spotify Background Changer
// @namespace    http://tampermonkey.net/
// @source       https://github.com/Glaceon575/SpotifyBackgroundSwitcher
// @version      0.1.3
// @description  Changes the background of Spotify playlists and albums in a rainbow pattern
// @author       Isaac Shoebottom
// @updateURL    https://raw.githubusercontent.com/Glaceon575/SpotifyBackgroundSwitcher/master/script.js
// @downloadURL  https://raw.githubusercontent.com/Glaceon575/SpotifyBackgroundSwitcher/master/script.js
// @match        https://open.spotify.com/*
// @grant        none
// ==/UserScript==

"use strict";

let background;
let colorInterval;

const selector = ".gHImFiUWOg93pvTefeAD.xYgjMpAjE5XT05aRIezb";
const timer = 16; //in milliseconds
const probeTimer = 500 //in milliseconds, timer for checking for selector
const difference = 60; //delta between the top and bottom

probeBackground();

const start = {
    intensity: 235,
    darkness: 75,
};

// [r, g, b]
const color = [start.intensity, start.darkness, start.darkness];

let isIncrease = true;
let currentColor = 2;

function changeColor() {
    if (color[currentColor] === (isIncrease ? start.intensity : start.darkness)) {
        isIncrease = !isIncrease;
        currentColor = (currentColor + 1) % 3;
    } else {
        color[currentColor] += isIncrease ? 1 : -1;
    }

    background.style.background = `linear-gradient(rgb(${color.join(",")}),rgba(${color.map(c => c - difference).join(",")}, 0.5)),var(--background-noise)`;
}


function probeBackground() {
    console.log("Probing for background");
    setInterval(() => {
        const newBackground = document.querySelector(selector);
        if (!newBackground) {
            return;
        }
        if (newBackground !== background) {
            clearInterval(colorInterval);
            colorInterval = setInterval(changeColor, timer)
            background = newBackground;
        }
    }, probeTimer);
}