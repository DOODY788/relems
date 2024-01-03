// Definer

class FRONT {
    constructor() {
        this.body = document.body;
        this.header = document.querySelector('.header');
        this.postcards = document.querySelectorAll('.postcard');
        this.formelem = document.querySelectorAll('.formelem');
        this.copystat = document.querySelector('.cop');
        window.onload = ()=>{
            this.loadposts();
        }
    }

    onscrollevent() {
        this.animelems(this.postcards).then(this.animelems(this.formelem));
        this.animelem(this.copystat);
        if (window.scrollY >= 555) {
            this.header.style.backgroundColor = 'var(--background)';
            return true;
        }
        else if (window.screenY == 0) {
            this.header.style.backgroundColor = 'transparent';
            return true;
        }

    }

    async animelems(variable) {
        const observer = new IntersectionObserver((Elems) => {
            Elems.forEach((elem) => {
                if (elem.isIntersecting) {
                    elem.target.classList.add('slidein');
                } else {
                    elem.target.classList.remove('slidein')
                }
            })
        })

        variable.forEach((u) => observer.observe(u));
    }

    async animelem(variable) {
        const observer = new IntersectionObserver((Elems) => {
            Elems.forEach((elem) => {
                if (elem.isIntersecting) {
                    elem.target.classList.add('fadein');
                } else {
                    elem.target.classList.remove('fadein')
                }
            })
        })

        observer.observe(variable);
    }

    async loadposts(){
        const response = await fetch('/loadposts',{
            method:'post'
        }).then((result)=>{
            const index = ['1','2','3','4'];
            const i = 0;
            result.forEach((eff)=>{
                const element = document.getElementById('recent_post_'+index[i]);
                console.log(eff);
                i+=1;
            })
        })
    }
}


// Runner
const front = new FRONT();
document.body.onscroll = function () { front.onscrollevent(); }
