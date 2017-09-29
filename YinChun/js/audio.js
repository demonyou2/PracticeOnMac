(function () {
    window.onload = function () {
        var page1 = document.getElementById('page1');
        var page2 = document.getElementById('page2');
        var page3 = document.getElementById('page3');
        var music = document.getElementsByClassName('music')[0];
        var audio = document.getElementsByTagName('audio')[0];
        music.addEventListener('touchstart',function (evnet) {
            if(audio.paused){
                audio.play();
                this.childNodes[3].className = "play";

            }else{
                audio.pause();
                this.childNodes[3].className = "";
            }
        },false);
        audio.addEventListener('ended',function (event) {
            music.childNodes[3].className = "";
        },false);
        page1.addEventListener('touchstart',function (event) {
            this.style.display = "none";
            page2.style.display = "block";
            page3.style.display = "block";
            page3.style.top = "100%";
            setTimeout(function () {
                page2.setAttribute('class','page fadeOut');
                // page3.setAttribute('class','page fadeIn');
                page3.style.top = "0";
            },4000);
        },false)
    }
})()