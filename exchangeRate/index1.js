/***
 * 节选自:https://www.eveningwater.com/my-web-projects/
 * github:https://github.com/eveningwater/my-web-projects/tree/master/js/4
 * author:eveningwater
 * date:2020/7
 */

function $(selector) {
    return document.querySelector(selector);
}
function $$(selector) {
    return document.querySelectorAll(selector);
}
//添加原型方法，判断是否有类名
HTMLElement.prototype.hasClass = function (className) {
    return new RegExp(" " + className + " ").test(' ' + this.className + ' ');
}
//判断状态向下，则传入false，否则传入true
let showSelect = function (el, bool) {//el传入select-title
    if (bool) {
        if (el.lastElementChild.hasClass('select-down')) {//el-lastElementChild
            el.lastElementChild.classList.replace('select-down', 'select-up');
        } else {
            el.lastElementChild.classList.add('select-up');
        }
        el.nextElementSibling.style.display = "block";
    } else {
        if (el.lastElementChild.hasClass('select-up')) {
            el.lastElementChild.classList.replace('select-up', 'select-down');
        } else {
            el.lastElementChild.classList.add('select-down');
        }
        el.nextElementSibling.style.display = "none";
    }
}
let rateData = null;
/**
 * 下拉逻辑
 */
function selectHandle(selectContainer) {
    let selectArr = [].slice.call(selectContainer);//继承selectContainer？
    // console.log(selectArr);
    selectArr.forEach((item) => {
        showSelect(item.firstElementChild, false);//item.firstElementChild = select-title
        item.firstElementChild.onclick = function () {
            selectArr.forEach((sel) => {
                showSelect(sel.firstElementChild, false);
            })
            showSelect(this,true);
        };
    })
}
/**
 * 加载下拉列表
 * @param {*} data 
 * @param {*} selectContainer 
 */
function loadSelectOption(data, selectContainer) {
    Object.keys(data.rates).forEach((item) => {
        var li = document.createElement('li');
        li.classList.add('select-option');
        li.setAttribute('data-value', item);
        li.innerHTML = item;
        selectContainer.lastElementChild.appendChild(li);
    });
    let selectOptionArr = [].slice.call(selectContainer.lastElementChild.children);//存放li
    selectOptionArr.forEach((item) => {
        item.onclick = function () {
            let select_content = this.dataset.value;
            this.parentElement.previousElementSibling.firstElementChild.innerHTML = select_content;
            selectOptionArr.map((opt) => {
                opt.classList.remove('select-this');
            });
            this.classList.add('select-this');
            loadData();
            showSelect(this.parentElement.previousElementSibling, false);
        }
    });
    selectContainer.firstElementChild.firstElementChild.onblur = function () {
        setTimeout(() => {
            showSelect(this.parentElement, false);
        }, 200)
    };
}
/**
 * 设置汇率
 */
function loadData() {
    // 数据请求
    fetch("https://api.exchangerate-api.com/v4/latest/" + $('.currency-one .select-content').innerHTML).then((res) => {
        return res.json();
    }).then((data) => {
        // console.log(data);
        loadSelectOption(data, $('.currency-one'));
        loadSelectOption(data, $('.currency-two'));
        let firstValue = $('.currency-one .select-content').innerHTML;
        let secondValue = data.rates[$('.currency-two .select-content').innerHTML];
        $('#rate').innerHTML = `1 ${firstValue} = ${secondValue} ${$('.currency-two .select-content').innerHTML}`;
        $('#amount-number-two').value = ($('#amount-number-one').value * secondValue).toFixed(2);
    });
}
//初始化页面
window.onload = function () {
    selectHandle($$('.select-container'));
    loadData();
    $('#amount-number-one').addEventListener('change', loadData);
    $('#amount-number-two').addEventListener('change', loadData);
    $('#swap').onclick = function () {
        let value = $('.currency-one .select-content').innerHTML;
        $('.currency-one .select-content').innerHTML = $('.currency-two .select-content').innerHTML;
        $('.currency-two .select-content').innerHTML = value;
        loadData();
    }
}