
class postLoader{
    constructor(){
        this.lstpost = document.querySelector('.postdiv');
        this.pst = document.querySelectorAll('.psts');
    }
    
    loadLatest(){
        const post = `
        <div class="psts">
            <img src="https://c4.wallpaperflare.com/wallpaper/178/411/657/sunset-mountains-landscape-himalayas-wallpaper-preview.jpg" alt="something">
            <h3>Pakapak</h3>
            <p class="font-main-light">Sub title</p>
            <div class="ratediv font-main-light flex-row" >
              <span>Likes: 455</span><span>Clicks: 1k</span>
            </div>
            <form action="/posts/articlename" class="flex-row btnform">
              <input type="submit" value="Read" class="defbutton">
            </form>
          </div>
        `
        this.lstpost.insertAdjacentHTML('beforeend',post);
    }
}
const psloader = new postLoader();