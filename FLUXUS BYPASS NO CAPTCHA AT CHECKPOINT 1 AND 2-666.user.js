// ==UserScript==
// @name         FLUXUS BYPASS NO CAPTCHA AT CHECKPOINT 1 AND 2
// @namespace    http://tampermonkey.net/
// @version      666
// @description  Hi
// @author       Vixer
// @icon         https://i.ibb.co/nMBgVNz/skull.png
// @match        https://keysystem.fluxteam.net/android/checkpoint/start.php?HWID=*
// @match        https://fluxteam.net/android/checkpoint/check1.php
// @match        https://linkvertise.com/580726/fluxus1
// @match        https://linkvertise.com/580726/fluxus
// @match        https://fluxteam.net/android/checkpoint/main.php
// @grant        GM_setClipboard
// @downloadURL https://update.greasyfork.org/scripts/488192/FLUXUS%20BYPASS%20NO%20CAPTCHA%20AT%20CHECKPOINT%201%20AND%202.user.js
// @updateURL https://update.greasyfork.org/scripts/488192/FLUXUS%20BYPASS%20NO%20CAPTCHA%20AT%20CHECKPOINT%201%20AND%202.meta.js
// ==/UserScript==

(function() {
    'use strict';

    const warningMessage = "Trying to bypass the Fluxus key system will get you banned from using Fluxus!!";

    function showOnlyRefreshButton() {
        const refreshButton = document.createElement('button');
        refreshButton.textContent = 'Only Refresh when you see "Trying to bypass the Fluxus key system will get you banned from using Fluxus!!"';
        refreshButton.style.position = 'fixed';
        refreshButton.style.top = '20px';
        refreshButton.style.right = '20px';
        refreshButton.style.backgroundColor = 'yellow';
        refreshButton.style.color = 'black';
        refreshButton.style.padding = '10px';
        refreshButton.style.border = 'none';
        refreshButton.style.borderRadius = '5px';
        refreshButton.style.cursor = 'pointer';

        document.body.appendChild(refreshButton);

        refreshButton.addEventListener('click', () => {
            window.location.reload();
        });
    }

    if (document.body.textContent.includes(warningMessage)) {
        showOnlyRefreshButton();
    }

    if (window.location.href.includes('start.php?HWID=')) {
        window.location.replace('https://linkvertise.com/580726/fluxus1');
    } else if (window.location.href.includes('check1.php')) {
        window.location.replace('https://linkvertise.com/580726/fluxus');
    } else if (window.location.href.includes('linkvertise.com/580726/fluxus1')) {
        window.location.href = 'javascript:(function() { window.location.href = "https://fluxteam.net/android/checkpoint/check1.php"; })();';
    } else if (window.location.href.includes('linkvertise.com/580726/fluxus')) {
        window.location.href = 'javascript:(function() { window.location.href = "https://fluxteam.net/android/checkpoint/main.php"; })();';
    } else if (window.location.href.includes('fluxteam.net/android/checkpoint/main.php')) {
        const notification1 = document.createElement('div');
        notification1.textContent = 'Please do the captcha if it shows in main.php';
        notification1.style.fontSize = '24px';
        notification1.style.fontWeight = 'bold';
        notification1.style.color = 'red';
        document.body.appendChild(notification1);

        const notification2 = document.createElement('div');
        notification2.textContent = ' And Close Chrome and click the bypass link again';
        notification2.style.fontSize = '24px';
        notification2.style.fontWeight = 'bold';
        notification2.style.color = 'red';
        document.body.appendChild(notification2);

        const indicator = document.createElement('div');
        indicator.textContent = '(+) added auto copy';
        indicator.style.position = 'fixed';
        indicator.style.top = '20px';
        indicator.style.left = '20px';
        indicator.style.fontSize = '24px';
        indicator.style.fontWeight = 'bold';
        indicator.style.color = 'green';
        indicator.style.zIndex = '9999';
        document.body.appendChild(indicator);

        let copyKeyButton = document.querySelector('body > main > div > a > button:nth-child(2)');

        if (copyKeyButton) {
            copyKeyButton.style.fontSize = '16px';
            copyKeyButton.style.padding = '8px 12px';
        } else {
            console.error('Could not find the Copy Key button');
        }

        const keyElement = document.querySelector('code.aos-init');

        if (keyElement) {
            const key = keyElement.textContent.trim();
            GM_setClipboard(`.Your Key: ${key}`);
        }
    }
})();