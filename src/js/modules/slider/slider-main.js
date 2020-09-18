import Slider from "./slider";

export default class MainSlider extends Slider {
    constructor({
        btns,
        prevMain,
        nextMain,
        container
    }) {
        super({
            btns,
            prevMain,
            nextMain,
            container
        });
    }
    showSlides(n) {
        if (n > this.slides.length) {
            this.slideIndex = 1;
        }

        if (n < 1) {
            this.slideIndex = this.slides.length;
        }

        try {
            this.hanson.style.opacity = "0";

            if (n === 3) {
                this.hanson.classList.add("animated");
                setTimeout(() => {
                    this.hanson.style.opacity = "1";
                    this.hanson.classList.add("slideInUp");
                }, 3000);
            } else {
                this.hanson.classList.remove("slideInUp");
            }
        } catch (e) {}

        this.slides.forEach(slide => {
            slide.style.display = "none";
            slide.classList.add("animated");
            slide.classList.remove("slideInLeft", "slideInLeft");

        });

        this.slides[this.slideIndex - 1].style.display = "block";
    }

    plusSlides(n) {
        this.showSlides(this.slideIndex += n);
        this.slides[this.slideIndex - 1].classList.add("slideInUp");
    }

    bindTriggers() {
        this.btns.forEach(item => {
            item.addEventListener('click', () => {
                this.plusSlides(1);
            });
        });

        document.querySelectorAll(".logolink").forEach(logo => {
            logo.addEventListener("click", (e) => {
                e.preventDefault();
                this.slideIndex = 1;
                this.plusSlides(0);
            });
        });

        try {
            this.prevMain.forEach(item => {
                item.addEventListener('click', (e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    this.showSlides(this.slideIndex += -1);
                    this.slides[this.slideIndex - 1].classList.remove("slideInLeft", "slideInUp");
                    this.slides[this.slideIndex - 1].classList.add("slideInRight");
                });
            });


            this.nextMain.forEach(item => {
                item.addEventListener('click', (e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    this.showSlides(this.slideIndex += 1);
                    this.slides[this.slideIndex - 1].classList.remove("slideInRight", "slideInUp");
                    this.slides[this.slideIndex - 1].classList.add("slideInLeft");
                });
            });
        } catch (e) {}


    }

    render() {
        if (this.container) {
            try {
                this.hanson = document.querySelector('.hanson');
            } catch (e) {}

            this.showSlides(this.slideIndex);
            this.bindTriggers();


        }

    }
}