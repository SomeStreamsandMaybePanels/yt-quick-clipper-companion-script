// ==UserScript==
// @name         Capture Video Time with Hotkey
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Capture the current time in seconds on a video using a hotkey and copy it to clipboard as an object
// @author       Your Name
// @match        https://www.youtube.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    window.onload = function() {
        console.log('Window fully loaded.');

        // Find the first video element on the page
        let video = document.querySelector('video');

        if (!video) {
            console.log('No video element found on this page.');
            return;
        }

        console.log('Video element found.');

        // Listen for the hotkey combination (Alt + C)
        document.addEventListener('keydown', function(event) {
            if (event.altKey && event.key === 'c') {
                console.log('Alt+C pressed.');

              // Capture the current time and URL of the video
                let currentTime = video.currentTime;
                let totalSeconds = Math.ceil(currentTime - 17, 0);
                let minutes = Math.floor(totalSeconds / 60);
                let seconds = totalSeconds % 60;
                let videoUrl = window.location.href;
                let clipInfo = {
                    "Start_Time": `${minutes}:${seconds.toString().padStart(2, '0')}`,
                    "End_Time": `${Math.floor(currentTime / 60)}:${Math.floor(currentTime % 60).toString().padStart(2, '0')}`,
                    "URL": videoUrl
                };

                console.log('Captured clip info:', clipInfo);

                // Convert the clip info object to a JSON string
                let clipInfoText = JSON.stringify(clipInfo, null, 2);

                // Copy the clip info object to clipboard
                navigator.clipboard.writeText(clipInfoText).then(() => {
                    console.log('Clip info copied to clipboard.');

                    // Display the "clip times copied to clipboard" graphic
                    let message = document.createElement('div');
                    message.textContent = 'Clip times copied to clipboard';
                    message.style.position = 'fixed';
                    message.style.top = '50%';
                    message.style.left = '50%';
                    message.style.transform = 'translate(-50%, -50%)';
                    message.style.padding = '10px 20px';
                    message.style.backgroundColor = '#000';
                    message.style.color = '#fff';
                    message.style.fontSize = '20px';
                    message.style.zIndex = '9999';
                    message.style.borderRadius = '5px';
                    document.body.appendChild(message);

                    // Remove the message after 2 seconds
                    setTimeout(() => {
                        document.body.removeChild(message);
                    }, 2000);
                }).catch(err => {
                    console.error('Failed to copy text: ', err);
                });
            }
        });
    };
})();
