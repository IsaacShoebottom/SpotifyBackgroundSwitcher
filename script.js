// ==UserScript==
// @name         Spotify Background Changer
// @namespace    http://tampermonkey.net/
// @version      0.0.1
// @description  Changes the background of Spotify playlists and albums in a rainbow pattern
// @author       Isaac Shoebottom
// @updateURL    https://raw.githubusercontent.com/Glaceon575/SpotifyBackgroundSwitcher/master/script.js
// @downloadURL  https://raw.githubusercontent.com/Glaceon575/SpotifyBackgroundSwitcher/master/script.js
// @match        https://open.spotify.com/playlist/*
// @match        https://open.spotify.com/album/*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js
// @grant        none
// @run-at       document-end
// ==/UserScript==

"use strict";

waitForKeyElements(".xYgjMpAjE5XT05aRIezb", changeBackground);

const timer = 50 //in milliseconds

let r1, g1, b1, r2, b2, g2
let topIntensityCutoff = 235
let topDarknessCutoff = 75

const difference = 60 //delta between the top and bottom

let bottomIntensityCutoff = topIntensityCutoff - difference
let bottomDarknessCutoff = topDarknessCutoff - difference

let topIncreaseBlue = true;
let topDecreaseRed = false;
let topIncreaseGreen = false;
let topDecreaseBlue = false;
let topIncreaseRed = false;
let topDecreaseGreen = false;

let bottomIncreaseBlue = true;
let bottomDecreaseRed = false;
let bottomIncreaseGreen = false;
let bottomDecreaseBlue = false;
let bottomIncreaseRed = false;
let bottomDecreaseGreen = false;


function changeBackground() {
    const htmlCollection = document.getElementsByClassName("gHImFiUWOg93pvTefeAD xYgjMpAjE5XT05aRIezb");
    const bg = htmlCollection[0];
    r1 = topIntensityCutoff;
    g1 = topDarknessCutoff;
    b1 = topDarknessCutoff;

    r2 = bottomIntensityCutoff;
    g2 = bottomDarknessCutoff;
    b2 = bottomDarknessCutoff;

    setInterval(changeColor, timer, bg);
}

function changeColor(bg) {
    if (!document.hidden) {
        // Top Half

        //Part 1;
        if (topIncreaseBlue) {
            if (b1 === topIntensityCutoff) {
                topDecreaseRed = true;
                topIncreaseBlue = false;

            } else {
                b1++;
            }
        }
        //Part 2;
        else if (topDecreaseRed) {
            if (r1 === topDarknessCutoff) {
                topIncreaseGreen = true;
                topDecreaseRed = false;

            } else {
                r1--;
            }
        }
        //Part 3
        else if (topIncreaseGreen) {
            if (g1 === topIntensityCutoff) {
                topDecreaseBlue = true;
                topIncreaseGreen = false;

            } else {
                g1++;
            }
        }
        //Part 4
        else if (topDecreaseBlue) {
            if (b1 === topDarknessCutoff) {
                topIncreaseRed = true;
                topDecreaseBlue = false;

            } else {
                b1--;
            }
        }
        //Part 5
        else if (topIncreaseRed) {
            if (r1 === topIntensityCutoff) {
                topDecreaseGreen = true;
                topIncreaseRed = false;

            } else {
                r1++;
            }
        }
        //Part 6
        else if (topDecreaseGreen) {
            if (g1 === topDarknessCutoff) {
                topIncreaseBlue = true;
                topDecreaseGreen = false;

            } else {
                g1--;
            }
        }

        // Bottom Half

        //Part 1;
        if (bottomIncreaseBlue) {
            if (b2 === bottomIntensityCutoff) {
                bottomDecreaseRed = true;
                bottomIncreaseBlue = false;

            } else {
                b2++;
            }
        }
        //Part 2;
        else if (bottomDecreaseRed) {
            if (r2 === bottomDarknessCutoff) {
                bottomIncreaseGreen = true;
                bottomDecreaseRed = false;

            } else {
                r2--;
            }
        }
        //Part 3
        else if (bottomIncreaseGreen) {
            if (g2 === bottomIntensityCutoff) {
                bottomDecreaseBlue = true;
                bottomIncreaseGreen = false;

            } else {
                g2++;
            }
        }
        //Part 4
        else if (bottomDecreaseBlue) {
            if (b2 === bottomDarknessCutoff) {
                bottomIncreaseRed = true;
                bottomDecreaseBlue = false;

            } else {
                b2--;
            }
        }
        //Part 5
        else if (bottomIncreaseRed) {
            if (r2 === bottomIntensityCutoff) {
                bottomDecreaseGreen = true;
                bottomIncreaseRed = false;

            } else {
                r2++;
            }
        }
        //Part 6
        else if (bottomDecreaseGreen) {
            if (g2 === bottomDarknessCutoff) {
                bottomIncreaseBlue = true;
                bottomDecreaseGreen = false;

            } else {
                g2--;
            }
        }

        bg.style.background = "linear-gradient(rgb(" + r1 + ", " + g1 + ", " + b1 + "),rgba(" + r2 + ", " + g2 + ", " + b2 + ", 0.5)),var(--background-noise)";
    }
}


//waitForKeyElements
/*--- waitForKeyElements():  A utility function, for Greasemonkey scripts,
    that detects and handles AJAXed content.

    Usage example:

        waitForKeyElements (
            "div.comments"
            , commentCallbackFunction
        );

        //--- Page-specific function to do what we want when the node is found.
        function commentCallbackFunction (jNode) {
            jNode.text ("This comment changed by waitForKeyElements().");
        }

    IMPORTANT: This function requires your script to have loaded jQuery.
*/
function waitForKeyElements(
    selectorTxt,    /* Required: The jQuery selector string that
                        specifies the desired element(s). */
    actionFunction, /* Required: The code to run when elements are found. It is passed a jNode to the matched
                        element. */
    bWaitOnce,      /* Optional: If false, will continue to scan for new elements even after the first match is
                        found. */
    iframeSelector  /* Optional: If set, identifies the iframe to search. */
) {
    let targetNodes, bTargetsFound;

    if (typeof iframeSelector == "undefined")
        targetNodes = $(selectorTxt);
    else
        targetNodes = $(iframeSelector).contents()
            .find(selectorTxt);

    if (targetNodes && targetNodes.length > 0) {
        bTargetsFound = true;
        /*--- Found target node(s).  Go through each and act if they are new. */
        targetNodes.each(function () {
            const jThis = $(this);
            const alreadyFound = jThis.data('alreadyFound') || false;

            if (!alreadyFound) {
                //--- Call the payload function.
                const cancelFound = actionFunction(jThis);
                if (cancelFound)
                    bTargetsFound = false;
                else
                    jThis.data('alreadyFound', true);
            }
        });
    } else {
        bTargetsFound = false;
    }

    //--- Get the timer-control variable for this selector.
    const controlObj = waitForKeyElements.controlObj || {};
    const controlKey = selectorTxt.replace(/\W/g, "_");
    let timeControl = controlObj [controlKey];

    //--- Now set or clear the timer as appropriate.
    if (bTargetsFound && bWaitOnce && timeControl) {
        //--- The only condition where we need to clear the timer.
        clearInterval(timeControl);
        delete controlObj [controlKey]
    } else {
        //--- Set a timer, if needed.
        if (!timeControl) {
            timeControl = setInterval(function () {
                    waitForKeyElements(selectorTxt,
                        actionFunction,
                        bWaitOnce,
                        iframeSelector
                    );
                },
                300
            );
            controlObj [controlKey] = timeControl;
        }
    }
    waitForKeyElements.controlObj = controlObj;
}