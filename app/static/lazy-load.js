function lazyLoadImgs() {

    const elements = document.querySelectorAll(".lazy-bg");

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            const el = entry.target;

            if (entry.isIntersecting) {

                /* загрузка изображения */

                const img = new Image();
                img.src = el.dataset.bg;

                img.onload = () => {
                    el.style.backgroundImage = `url('${el.dataset.bg}')`;
                    el.classList.add("loaded");
                };

                /* если есть класс video-preview → готовим видео */

                if (el.classList.contains("video-preview")) {

                    const bg = el.dataset.bg;

                    const videoSrc = bg
                        .split('.')
                        .slice(0, -1)
                        .join('.')
                        .toLowerCase() + ".mp4";

                    const video = document.createElement("video");

                    video.src = videoSrc;
                    video.preload = "auto";
                    // video.loop = true;

                    video.muted = true;        // звук выключен
                    video.autoplay = false;    // включим после клика
                    video.playsInline = true;  // корректная работа на мобильных

                    el.dataset.video = videoSrc;
                    el._video = video;

                }

            }

            /* пауза видео если блок ушел из viewport */

            if (!entry.isIntersecting && el._video) {
                el._video.pause();
            }

        });

    }, { rootMargin: "200px" });

    elements.forEach(el => observer.observe(el));
}



function enableVideoClick(el) {

   if (!el._video) return;

    const video = el._video;

    video.autoplay = true;
    video.muted = true;
    video.playsInline = true;

    el.style.backgroundImage = "none";

    if (!el.contains(video)) {
        el.appendChild(video);
    }

    video.play();

}



document.addEventListener("DOMContentLoaded", () => {

    lazyLoadImgs();
});