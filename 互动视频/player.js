//获取播放器元素
let player = document.getElementById("player");
//视频地址数组
let checkAddress = ["./video/wrong.mp4","./video/right.mp4"];
let questionAddress = ["./video/q1.mp4"];
let Answer = [0];//记录答案
let explainAddress = ["./video/ex.mp4"];
let questionIndex = 0;//记录问题的序号
let index = 0;//用于记录视频的播放状态，0为背景，1为问题，2为结果，3为解释

//页面初始化
window.onload = function() {
  player.src = "./video/bac.mp4"; 
}

player.onended = function() {
  //处理背景视频
  if(index == 0) {
    let container = document.getElementById("container2");
    container.style.display = "flex";
    let btn = container.children;
    btn[0].onclick = function() {
      player.src = questionAddress[0];
      container.style.display = "none";
    }
    index ++;
  } else if(index == 1) { //处理问题
    let container = document.getElementById("container1");
    container.style.display = "flex";
    let btn = container.children;
    let ans = Answer[questionIndex];//获取答案对应的按钮
    console.log(ans);
    console.log(btn);
    //为答案按钮绑定事件
    //答对了
    btn[ans].onclick = function() {
      container.style.display = "none";
      player.src = checkAddress[1];
      index++;
      questionIndex++;
    }
    //答错了
    for(let i = 0; i < btn.length; i++) {
      if(i != ans) {
        btn[i].onclick = function() {
          container.style.display = "none";
          player.src = checkAddress[0];
          index++;
          questionIndex++;
        }
      }
    }
  } else if(index == 2) {//处理答对或者答错
    let container = document.getElementById("container2");
    container.style.display = "flex";
    let btn = container.children;
    btn[0].innerHTML = "查看解释";
    btn[0].onclick = function() {
      player.src = explainAddress[0];
      container.style.display = "none";
    }
    index++;
  }
}

