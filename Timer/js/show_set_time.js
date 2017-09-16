(function () {
    var log = console.log.bind(console);
    var $ = function(selector,node){
        return (node || document).querySelector(selector);
    };
    /* 显示自定义的时间格式 */
    function padd(num){
        return num < 10 ? '0' + num : '' + num;
    }
    function formate(date){
        return date.getFullYear() + '-' +padd(date.getMonth() + 1) + '-' + padd(date.getDate()) + '   ' + padd(date.getHours()) + ':' + padd(date.getMinutes()) + ':' + padd(date.getSeconds()) ;
    }
    /* 消除打开页面时的onload的延迟 */
    var date = new Date();
    var intime = document.querySelector(".intime");
    intime.innerText = formate(date);
    /* 解决定时器在进程中重复执行 */
    window.onload = setTimeout(function(){
        var date2 = new Date();
        var intime = document.querySelector(".intime");
        intime.innerText = formate(date2);
        setTimeout(arguments.callee,1000);
    },1000);
    /* 按钮换肤 */
    $('.u-bntLichun').addEventListener('click',function(event){
        $('.lixia').className = "g-content lichun";
    });
    $('.u-bntLixia').addEventListener('click',function(event){
        $('.lichun').className = "g-content lixia";
    });
    /* 设置时间（定时提醒功能）秒 */
    var t1;
    var setTime = document.getElementsByClassName('setTime')[0];
    setTime.addEventListener('keydown',function (event) {
        that = this;
        var c = that.value;
        if(event.key === 'Enter'){
            t1 = setInterval(function(){
                c--;
                that.value = c;
                if(c < 0){
                    that.value = 0;
                    alert("时间到了！该休息了！");
                    clearInterval(t1);
                }
            },1000);
        }
    });
    /* 分钟 */
    var t2;
    var setTimeMin = document.querySelector('.minutes');
    setTimeMin.addEventListener('keydown',function (event) {
        that = this;
        var m = that.value;
        if(event.key === 'Enter'){
            t2 = setInterval(function () {
              m--;
              that.value = m;
              if(m < 0){
                  that.value = 0;
                  alert("时间到了！该休息了！");
                  clearInterval(t2);
              }
            },60000);
        }
    });
})();






