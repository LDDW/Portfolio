/**
 * 
 * ==================== Variables ====================
 * 
 */
let cube = document.querySelector('.preview_cube');
let input = document.querySelectorAll('input');
let inputRange = document.querySelectorAll('input[type="range"]');
let inputColorBox = document.getElementById('inputColorBox');
let inputColorShadow = document.getElementById('inputColorShadow');
let inputRangeOpacity = document.getElementById('inputRangeOpacity');
let inputRangeX = document.getElementById('inputRangeX');
let inputRangeY = document.getElementById('inputRangeY');
let inputRangeBlur = document.getElementById('inputRangeBlur');
let inputRangeSpread = document.getElementById('inputRangeSpread');
let inputCheckInset = document.getElementById('inputCheckInset');
let pBgCode = document.querySelector('.bg_code');
let color = document.querySelectorAll('.color');
let insetSwitchBtn = document.querySelector('.switch_btn');
let tabElements = [inputColorBox, inputColorShadow, inputRangeOpacity, inputRangeX, inputRangeY, inputRangeBlur, inputRangeSpread, insetSwitchBtn];
let tabInitialValueSettings = ["#8e91fb", "#000000", 100, 0, 0, 0, 0, false];
let tabCodeCssPattern = [inputRangeX, inputRangeY, inputRangeBlur, inputRangeSpread, ];



/** 
 * ==================== Activ functions ==================== 
 */

initialSettings(tabElements, tabInitialValueSettings);
refreshCodeCss();


/** 
 * 
 * 
 * ==================== EVENTS ==================== 
 * 
 * 
 */

// ========== > Refresh value of input range when the value change
inputRange.forEach(element => {
    element.addEventListener('input', () => {
        if (element.id === "inputRangeOpacity") {
            inputRangeOpacity.nextElementSibling.textContent = inputRangeOpacity.value + "%";
        } else {
            element.nextElementSibling.textContent = element.value + "px";
        }

        refreshCodeCss();
    })
});


// ========== > box color 
inputColorBox.addEventListener('input', () => {
    cube.style.background = inputColorBox.value;
});


// ========== > Refresh shadow color 
inputColorShadow.addEventListener('input', () => {
    refreshCodeCss();
})


// ========== > Refresh inset value
insetSwitchBtn.addEventListener('click', () => {
    if (insetSwitchBtn.value) {
        insetSwitchBtn.value = false;
    } else {
        insetSwitchBtn.value = true;
    }
    insetSwitchBtn.classList.toggle('active');
    refreshCodeCss();
});


// ========== > Copy event
let btnCopyCss = document.querySelector('.btn_copy_css');
btnCopyCss.addEventListener('click', () => {
    // ========== > aesthetic
    if (btnCopyCss.textContent == "copy css") {

        btnCopyCss.textContent = "Copied !";
        btnCopyCss.classList.add('copied');
        copyCss();

        setTimeout(function() {

            btnCopyCss.textContent = "copy css";
            btnCopyCss.classList.remove('copied');

        }, 5000);
    }
});


// ========== > reset event
document.querySelector('.btn_reset').addEventListener('click', () => {
    initialSettings(tabElements, tabInitialValueSettings);
    refreshCodeCss();
    insetSwitchBtn.classList.remove('active');
});

/** 
 * 
 * 
 * ==================== FUNCTIONS ==================== 
 * 
 * 
 */

// ========== > Refresh css code in textarea 
function refreshCodeCss() {
    let cssValues = codeCss(tabCodeCssPattern);
    let line1 = codeCssPattern("-webkit-", cssValues);
    let line2 = codeCssPattern("-moz-", cssValues);
    let line3 = codeCssPattern("", cssValues);

    pBgCode.innerHTML = line1 + "\r" + line2 + "\r" + line3;
    cube.style.boxShadow = cssValues;
}


// ========== > Initial settings of inputs (use to reset)
function initialSettings(element, value) {
    if (element && value) {
        for (let i = 0; i < element.length; i++) {
            element[i].value = value[i];
            if (element[i].id == "inputRangeOpacity") {
                inputRangeOpacity.nextElementSibling.textContent = inputRangeOpacity.value + "%";
            }
            if (i > 2 && i < 7) {
                element[i].nextElementSibling.textContent = element[i].value + "px";
            }
        }
    }
    //refresh ccs color on the cube
    cube.style.background = inputColorBox.value;
}


// ========== > Change hex value to rgb or rgba value
function hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)

    let valueOpacity = inputRangeOpacity.value / 100;

    if (inputRangeOpacity.value != 100) {
        return "rgba(" + [r, g, b, valueOpacity] + ")";
    }

    return "rgb(" + [r, g, b] + ")";

}


// ========== > Display code in textarea 
function codeCssPattern(kit, css) {
    let line = "";

    if (kit != "") {
        line += kit;
    }

    line += "box-shadow: " + css + ";";
    return line;
}


// ========== > Make css shadow on a cube 
function codeCss(array) {
    let line = "";

    if (insetSwitchBtn.value) {
        line += "inset ";
    }

    for (let i = 0; i < array.length; i++) {
        line += array[i].value + "px ";
    }

    line += hexToRgb(inputColorShadow.value);
    return line;
}


// ========== > Copy css code of textarea 
function copyCss() {
    try {
        navigator.clipboard.writeText(pBgCode.value);
        console.log('CSS copied !');
    } catch {
        console.log('Error !');
    }

}