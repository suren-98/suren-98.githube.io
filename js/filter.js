import findProductByPrice from './app.js';

// Filter prices
let inputLeft = document.querySelector('#input-left');
let inputRight = document.querySelector('#input-right');

let thumbLeft = document.querySelector('.slider > .thumb.left');
let thumbRight = document.querySelector('.slider > .thumb.right');
let range = document.querySelector('.slider > .range');

function setMinValue() {
    let _this = inputLeft;
    // Corrected typo from _this.mix to _this.max
    let min = parseInt(_this.min);
    let max = parseInt(_this.max); 

    _this.value = Math.min(parseInt(_this.value), parseInt(inputRight.value) - 1);
    let percent = ((_this.value - min) / (max - min)) * 100; // Corrected typo in variable name
    thumbLeft.style.left = percent + '%';
    range.style.left = percent + '%';
    document.querySelector('.min-num').innerHTML = _this.value

   findProductByPrice(_this.value);

}
function setMaxValue() {
    let _this = inputRight; // Corrected from inputLeft to inputRight
    let min = parseInt(_this.min);
    let max = parseInt(_this.max); 

    _this.value = Math.max(parseInt(_this.value), parseInt(inputLeft.value) + 1); // Corrected from inputLeft to inputRight
    let percent = ((_this.value - min) / (max - min)) * 100;
    
    thumbRight.style.right = (100 - percent) + '%';
    range.style.right = (100 - percent) + '%';

    document.querySelector('.max-num').innerHTML = _this.value;
    // findProductByPrice(_this.value);
}

setMinValue();
setMaxValue();

inputLeft.addEventListener('input', setMinValue);
inputRight.addEventListener('input', setMaxValue);



export default {setMaxValue, setMaxValue};