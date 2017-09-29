(function () {
    var log = console.log.bind(console);

    function getLength(str) {
       return str.replace(/[^\x00-\xff]/g,"xx").length;
    }
    function issame(str,n) {
        var c = 0;
        for(var i = 0;i < str.length;i++){
            if(str.charAt(i) === n){
                c++;
            }
        }
        return c;
    }
    window.onload = function () {
        var inputs = document.getElementsByTagName('input');
        var msgs = document.getElementsByClassName('msg');
        var count = document.querySelector('.count');
        var ems = document.getElementsByTagName('em');
        //checking name
        inputs[0].addEventListener('focus', function () {
            msgs[0].innerHTML = "<i class='err'></i>请输入5-25个字符，中文占2个字符";
            msgs[0].style.display = "inline-block";
        }, false);

        inputs[0].addEventListener('keyup', function () {
            var le = getLength(this.value);
            count.innerHTML = le + "个字符";
            if (le === 0) {
                count.style.display = "none";
            } else {
                count.style.display = "block";
            }

        }, false);

        inputs[0].addEventListener('blur', function () {
            var re = /[^\w\u4e00-\u9fa5]/g;
            if (re.test(this.value)) {
                msgs[0].innerHTML = "<i class='errs'></i>含有非法字符";
            } else if (this.value === "") {
                msgs[0].innerHTML = "<i class='errs'></i>不能为空";
            } else if (getLength(this.value) > 25) {
                msgs[0].innerHTML = "<i class='errs'></i>超过25个字符了";
            } else if (getLength(this.value) < 6) {
                msgs[0].innerHTML = "<i class='errs'></i>少于6个字符了";
            } else {
                msgs[0].innerHTML = "<i class='ok'></i>OK";
            }
        }, false);
        //checking passwords

        inputs[1].addEventListener('focus', function () {
            msgs[1].innerHTML = "<i class='err'></i>6-16个字符,请使用字母和数字";
            msgs[1].style.display = "inline-block";
        }, false);

        inputs[1].addEventListener('keyup', function () {
            //大于6个字符为中，同时可以开启密码再次确认
            if (getLength(this.value) > 6) {
                ems[1].className = "actived";
                inputs[2].removeAttribute('disabled');
                msgs[2].style.display = "inline-block";
            } else {
                ems[1].className = "";
                inputs[2].setAttribute('disabled','');
                msgs[2].style.display = "none";
            }
            //大于10为强
            if (getLength(this.value) > 10) {
                ems[2].className = "actived";
            } else {
                ems[2].className = "";
            }
        }, false);
        inputs[1].addEventListener('blur',function () {
            if(this.value === ""){
                msgs[1].innerHTML = "<i class='errs'></i>密码不能为空";
            }else if(this.value.length < 6 || this.value.length > 16){
                msgs[1].innerHTML = "<i class='errs'></i>密码应在6-16个字符之间";
            }else if(!(/[^\d]/g).test(this.value)){
                msgs[1].innerHTML = "<i class='errs'></i>不能全是数字";
            }else if(!(/[^a-zA-Z]/g).test(this.value)){
                msgs[1].innerHTML = "<i class='errs'></i>不能全是字母";
            }else if(isFinite(this.value,this.value[0]) === this.value.length ){
                msgs[1].innerHTML = "<i class='errs'></i>密码不能重复";
            }else {
                msgs[1].innerHTML = "<i class='ok'></i>OK";
            }

        },false);
    // 密码确认
        inputs[2].addEventListener('blur',function () {
            if(this.value !== inputs[1].value){
                msgs[2].innerHTML = "<i class='errs'></i>两次密码输入不正确";
            }else{
                msgs[2].innerHTML = "<i class='ok'></i>OK";
            }
        },false);
    }
})()