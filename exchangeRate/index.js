/**
 * 获取选择器
 * @param {*} selector 
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
/** 
*判断状态，展示下拉列表
* @param {*} el select-title
* @param {*} bool boolean,if boolean = true 切换为向上
*/
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
 * @param {[]} selectContainer 传入selectContainer数组
 */
function selectHandle(selectContainer) {
    // let selectArr = [].slice.call(selectContainer);
    let selectArr = [];//数组，用于存放selectContainer节点
    selectContainer.forEach((value) => {
        selectArr.push(value);
    })
    //调用showSelect让icon显示向下
    selectArr.forEach((value) => {
        showSelect(value.firstElementChild, false);//初始化显示
        //绑定事件
        value.firstElementChild.onclick = function() {
            selectArr.forEach((item) => {
                showSelect(item.firstElementChild, false);
            })
            showSelect(this.firstElementChild, true);
        }
    })
}
/**
 * 加载下拉列表
 * @param {*} data 请求页面获得的数据
 * @param {*} selectContainer  单独的一个一个selectContainer
 */
function loadSelectOption(data,selectContainer) {
    //遍历data.rates数组,创建选项
    Object.keys(data.rates).forEach((value) => {
        let li = document.createElement('li')
        li.classList.add('select-option');
        li.setAttribute('data-value',value);
        li.innerHTML = value;
        selectContainer.lastElementChild.appendChild(li);
    });
    let selectOptionArr = [].slice.call(selectContainer.lastElementChild.children);//存放li
    //绑定事件，第一个显示
    selectOptionArr.forEach((value) => {
        value.onclick = function() {
            //第一个显示当前的内容
            let select_content = this.dataset.value;
            //更改第一个显示的内容
            this.parentElement.previousElementSibling.firstElementChild.innerHTML = select_content;
            selectOptionArr.map((opt) => {
                opt.classList.remove('select-this');
            })
            this.classList.add('select-this');
            loadData();
            showSelect(this.parentElement.previousElementSibling, false);
        }
    });
    //鼠标点外面后不展示列表    
    selectContainer.firstElementChild.firstElementChild.onblur = function () {
        setTimeout(() => {
            showSelect(this.parentElement, false);
        }, 200)
    };

}

//加载数据
function loadData() {
    //可更具 + 后面传入的国家字母来返回对应的rates值
    fetch("https://api.exchangerate-api.com/v4/latest/" + $('.currency-one .select-content').innerHTML).then((res) => {
        return res.json();
    }).then((data) => {
        // console.log(data);
        //加载两个部分的选项
        loadSelectOption(data,$('.currency-one'));
        loadSelectOption(data,$('.currency-two'));
        //设置输入框内显示的值
        //获取数值
        let firstValue = $('.currency-one .select-content').innerHTML;
        let secondValue = data.rates[$('.currency-two .select-content').innerHTML];
        //设置内容
        $('#rate').innerHTML = `1 ${firstValue} = ${secondValue} ${$('.currency-two .select-content').innerHTML}`;
        $('#amount-number-two').value = ($('#amount-number-one').value * secondValue).toFixed(2);
    });
}


//页面初始化
window.onload = function() {
    selectHandle($$('.select-container'));
    loadData();
    //两个框框的值是否改变，改变则重新加载数据
    $('#amount-number-one').addEventListener('change', loadData);
    $('#amount-number-two').addEventListener('change', loadData);
    //绑定交换按钮
    $('#swap').onclick = function () {
        let values = $('.currency-one .select-content').innerHTML;
        $('.currency-one .select-content').innerHTML = $('.currency-two .select-content').innerHTML;
        $('.currency-two .select-content').innerHTML = values;
        loadData();
    }
}