
class artfront{
    constructor(){
        this.mrexpander = document.querySelector('.more');
        this.mrcloser = document.querySelector('.close');
        this.mrcontent  = document.querySelector('.morecontent');

    }

    clickEvents(){
        this.mrexpander.onclick = ()=>{this.expander()}
        this.mrcloser.onclick = ()=>{this.expander()}

    }

    expander(){
        if(!this.mrcontent.classList.contains('expand')){
            this.mrcontent.classList.add('expand');
        }else{
            this.mrcontent.classList.add('closer');
            setTimeout(()=>{this.mrcontent.classList.remove('expand')},500)
            setTimeout(()=>{this.mrcontent.classList.remove('closer')},500)
        }
    }
}

const artfrnt = new artfront();
artfrnt.clickEvents();