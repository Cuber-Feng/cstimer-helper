// ==UserScript==
// @name         csTimer Helper
// @namespace    https://github.com/Cuber-Feng
// @version      1.0
// @description  some quick operation
// @author       Maple Feng (2017FENG35)
// @match        https://cstimer.net/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let autoOpenExport = false;

    function showErrorPopup() {
        const popup = document.createElement('div');
        popup.innerHTML = `
            <div style="
                position:fixed;
                top:20%;
                left:50%;
                transform:translateX(-50%);
                background:#fff;
                padding:20px;
                border:2px solid #444;
                box-shadow:0 0 10px rgba(0,0,0,0.3);
                z-index:9999;
                font-family:sans-serif;
                width:300px;
                text-align:center;
                font-size: 1.2rem;
            ">
                <strong style='font-size: 1.5rem;'>Unknown Error 😢</strong><br><br>
                You can report to me: <br>
                <input type="text" value="https://space.bilibili.com/1035959192"
                       style="width:100%;margin-top:10px;" onclick="this.select()"><br><br>
                <button onclick="this.parentElement.remove(); window.open('https://space.bilibili.com/1035959192','_blank');" style="
                     background-color:#007bff;color:white;border:none;padding:8px 12px;border-radius:4px;cursor:pointer;font-size:14px;">
                     Report</button>
                <button onclick="this.parentElement.remove()" style="
                     background-color:#6c757d;color:white;border:none;padding:8px 12px;border-radius:4px;cursor:pointer;font-size:14px;margin-left:10px;">
                     Ignore</button>
            </div>
        `;
        document.body.appendChild(popup);
    }

    if(autoOpenExport){
        window.addEventListener('load', function() {
            const expBtn = document.querySelector('.mybutton.c2');

            if (expBtn) {
                expBtn.click();
                console.log('open expBtn successfully');

            } else {
                showErrorPopup();
            }
        });
    }

    const isReload = performance.navigation.type === 1;

    if (!isReload) {
        window.addEventListener('beforeunload', function (e) {
            e.preventDefault();
            e.returnValue = '';
        });
    }

    // create button container
    const bar = document.createElement('div');
    bar.style.position = 'fixed';
    bar.style.bottom = '5px';
    bar.style.left = '50%';
    bar.style.transform = 'translateX(-50%)';
    bar.style.backdropFilter = 'blur(6px)';
    bar.style.color = '#fff';
    bar.style.padding = '10px 20px';
    bar.style.borderRadius = '8px';
    bar.style.display = 'flex';
    bar.style.justifyContent = 'center';
    bar.style.gap = '10px';
    bar.style.zIndex = '9999';
    //bar.style.boxShadow = '0 2px 8px rgba(0,0,0,0.3)';
    bar.style.fontFamily = 'sans-serif';
    bar.style.maxWidth = '90vw';
    bar.style.flexWrap = 'wrap';

    // create button
    function createButton(text, onClick, color = '#007bff') {
        const btn = document.createElement('button');
        btn.textContent = text;
        btn.style.background = color;
        btn.style.color = '#fff';
        btn.style.border = 'none';
        btn.style.padding = '8px 12px';
        btn.style.borderRadius = '4px';
        btn.style.cursor = 'pointer';
        btn.style.fontSize = '14px';
        btn.addEventListener('click', onClick);
        return btn;
    }


    function switchTimer(value){
        const setBtn = document.querySelector('.mybutton.c1');

        if (setBtn) {
            console.log('open setBtn successfully');
            setBtn.click();
            const optBtn = document.querySelector('.dialog.dialogoption .options td .tab:nth-child(4)');
            if(optBtn){
                optBtn.click();
                const timerTr = document.querySelector('.opttable tbody tr:nth-child(50)');
                timerTr.style.backgroundColor = 'yellow';
                const select = timerTr.querySelector('select[name="input"]');
                select.value = value;
                select.dispatchEvent(new Event('change'));

            }else{
                showErrorPopup();
            }

        } else {
            showErrorPopup();
        }

        const okButton = document.querySelector('input.buttonOK[value="OK"]');
        if (okButton) okButton.click();
    };
    // Use keyboard timer
    bar.appendChild(createButton('Timer', () => {
        switchTimer('t')
    }, '#B8001F'));

    // Use manual input
    bar.appendChild(createButton('Input', () => {
        switchTimer('i')

    }, '#006A67'));

    // Use bluetooth timer
    bar.appendChild(createButton('Bluetooth', () => {
        switchTimer('b')
    }, '#384B70'));

    document.body.appendChild(bar);
})();
