// import filterrange from './filter.js';
import products from './data.json' with { type: "json" }
import cats from './cat.json' with { type: "json" }


// Filter prices
let inputLeft = document.querySelector('#input-left');
let inputRight = document.querySelector('#input-right');

// Get filter-price [range] elements
let thumbLeft = document.querySelector('.slider > .thumb.left');
let thumbRight = document.querySelector('.slider > .thumb.right');
let range = document.querySelector('.slider > .range');
// Get all color filer btns
let filterColor = document.querySelectorAll('.filter_colorBtn');
let filterCats = document.querySelectorAll('.filter_btn');
let activeFilterRow = document.querySelector('.activeFilterRow');

// Nav menu
(function navMenu() {
    let mobileBtn = document.querySelector('.mobile_menu');
    let navMenu = document.querySelector('.menu_lists');
    
    mobileBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileBtn.classList.toggle('active');
    
        if(mobileBtn.classList.contains('active')) {
            setTimeout(() => {
                mobileBtn.innerHTML = 'X';
            }, 300);
        } else {
            mobileBtn.innerHTML = '<i class="fa-solid fa-bars-staggered"></i>';
        }
    });
})();

// render products
let productsRow = document.querySelector('.productsRow');

function renderProducts(products) {
    if (products.length) {
        productsRow.innerHTML = products.map((product) => {
            let price = '';
            let discount = '';
            let priceDiscounted = '';
            
            if(product.discount > 0) {
                priceDiscounted = product.price - (product.price * product.discount / 100);

                price = ` <del>цена: $${product.price}</del> <p class="price">цена: $${priceDiscounted.toFixed(2)}</p>`;
                discount = `<div class="discount">${product.discount}%</div>`;

            } else {
                price = `<p>цена: $${product.price}</p>`;
                discount = ``;
            }
            return `
                <div class="p-card">
                    ${discount}
                    <div class="color"></div>
                    <div class="character">
                        <a href="">
                            <img src="" alt="">
                        </a>
                        <a href="">
                            <img src="" alt="">
                        </a>
                        <a href="">
                            <img src="" alt="">
                        </a>
                    </div>
                    <div class="vendor_code">Арт. ${product.vendor_code}</div>
                    <a href="">
                        <img src="./images/${product.img}" alt="${product.name}">
                    </a>
                    <h5 class="title">${product.name}</h5>
                    <!-- price list -->
                    <div class="col">
                        ${price}
                    </div>
                    <div class="col">
                        <p class="qty">количество: (${product.qty}) </p>
                        <div class="btns">
                            <button class="add-to-card">
                                <i class="fa-solid fa-bag-shopping"></i>
                            </button>
                            <button class="add-to-fav">
                                <i class="fa-regular fa-heart"></i>
                            </button>
                        </div>
                    </div>
        
                    <p class="text">${product.descr}</p>
                </div>
                `;
        }).join("");
    } else {
        productsRow.innerHTML = 'not found';
    }
}

// finds the products with the minimal price
function findProductByMinPrice(price) {
    let findProd = products.filter(product => product.price >= price);
    renderProducts(findProd);
}

// finds the products with the maximum price
function findProductByMaxPrice(price) {
    let findProd = products.filter(product => product.price <= price);
    renderProducts(findProd);
}
function findProductByColor(color) {
    let findProd = products.filter(product => product.colors.includes(color));
    renderProducts(findProd);
}

// Set minimal filter range value
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
    findProductByMinPrice(_this.value);

}

// Set maximal filter range value
function setMaxValue() {
    let _this = inputRight; // Corrected from inputLeft to inputRight
    let min = parseInt(_this.min);
    let max = parseInt(_this.max); 

    _this.value = Math.max(parseInt(_this.value), parseInt(inputLeft.value) + 1); // Corrected from inputLeft to inputRight
    let percent = ((_this.value - min) / (max - min)) * 100;
    
    thumbRight.style.right = (100 - percent) + '%';
    range.style.right = (100 - percent) + '%';

    document.querySelector('.max-num').innerHTML = _this.value;
    findProductByMaxPrice(_this.value);
}

// Call functions
renderProducts(products);
setMinValue();
setMaxValue();

inputLeft.addEventListener('input', setMinValue);
inputRight.addEventListener('input', setMaxValue);

// Assuming filterColor is an array of buttons

filterColor.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const color = btn.id; // Get the color value from the button
        findProductByColor(color); // Render filtered products
    });
});

// 

let filterCatList = document.querySelector('.filter_list');

function renderFiterCat(cats) {
    if (cats.length) {
        filterCatList.innerHTML = cats.map((cat) => {
            return `<button class="filter_btn" id="">${cat.name}</button>`;
        }).join("");
    } else {
        filterCatList.innerHTML = '';
    }
}

renderFiterCat(cats);