class runner {
    constructor() {
        this.txteditor = document.querySelector('#blogcont');
        this.boldbtn = document.querySelector('#bold');
        this.container = document.querySelectorAll('.container');
        this.tabs = document.querySelectorAll('.btn')
        this.addwidcheck = document.querySelector('#cnt-txt');
        this.ad_prs_info_btn = document.querySelector('#admin-pers-info-btn');
        this.abt_cont = document.querySelector('#abt-cont');
        this.func = {
            'ad-per-info': this.ad_prs_info,
            'ad-per-abt': this.ad_prs_abt,
            'close-ad-pr': this.close_ad_pr,
            'close-ad-abt': this.close_ad_abt,
            'sv-user-dt': this.sv_user_dt,
            'sv-user-adt': this.sv_user_adt,
            'view-act-wid': this.view_act_div
        }
    }

    clickEvent(elem) {
        var type = elem.getAttribute('data-btn');
        if (type == 'tabbtn') {
            this.container.forEach((y) => { y.style.display = 'none' })
            this.tabs.forEach((y) => { y.style.backgroundColor = 'var(--background)'; y.style.color = 'var(--cover)' })
            document.querySelector('.' + elem.getAttribute('data-container')).style.display = 'block';
            elem.style.backgroundColor = 'var(--primary)';
            elem.style.color = 'var(--secondary)';
            this.blockinit(document.querySelector('.' + elem.getAttribute('data-container')));
        }
        if (type == 'n-btn') {
            elem.onclick = () => { this.func[elem.getAttribute('data-for')](elem); }
        }

        if (type == 'expander') {
            elem.onclick = () => { this.view_act_div(elem) };

        }
    }

    blockinit(elem) {
        if (elem.classList.contains('addwidget')) {
            if (this.addwidcheck.value) {
                document.querySelector('.cnt-img').style.display = 'none';
            }
        }
        if (elem.classList.contains('logout')) {
            var i = 0;
            setInterval(() => {
                document.querySelector('.logout').style.boxShadow = `0px 0px ${i}px var(--primary) inset`;
                i += 10;
            }, 50);
        }
    }

    checkConfig(elem) {
        if (elem.getAttribute('data-child') == 'addwidget') {
            if (elem.value == 'on') {
                document.querySelector('.cnt-img').style.display = 'block';
                elem.value = 'off'
            } else {
                document.querySelector('.cnt-img').style.display = 'none';
                elem.value = 'on'
            }
        }
    }

    reinit(elem) {
        if (elem.getAttribute('data-type') == 'select' || elem.getAttribute('data-child') == 'addwidget') {
            if (elem.value == 'none') {
                document.querySelector('.lnkinp').style.display = 'none';
            } else {
                document.querySelector('.lnkinp').style.display = 'block';
            }
        }
    }

    setNtfyAnimation(elem) {
        if (elem.value == 'settime') {
            const chunk = `    
            <div class='backframe fadein'>
            <div class="popup font-main-light fadein" data-child='backframe'>
                <span onclick='run.closepopup(this)' data-child='backframe'>X</span>
                <h3 class="heading">Set your timeout in seconds</h3>
                <form action="" class="flex-column font-main-light">
                    <input type="number" name="sttime" id="sttime" class="definp"  min="3" max="1000">
                    <input type="button" name="stbut" id="stbut" class="defbutton" value="Set time">
                </form>
            </div>
            <div>`
            document.body.insertAdjacentHTML('afterend', chunk);
        }
    }

    setFedPage() {
        const chunk = `    
        <div class='backframe fadein'>
        <div class="popup font-main-light fadein" data-child='backframe'>
            <span onclick='run.closepopup(this)' data-child='backframe'>X</span>
            <h3 class="heading">Set your custom page</h3>
            <form action="" class="flex-column font-main-light">
                <input type="text" name="fedpg" id="fedpg" class="definp" placeholder='Enter the (Title) of your post'>
                <input type="button" name="stbut" id="stbut" class="defbutton" value="Add feedback">
            </form>
        </div>
        <div>`
        document.body.insertAdjacentHTML('afterend', chunk);
    }

    closepopup(elem) {
        document.querySelector('.' + elem.getAttribute('data-child')).remove();
    }

    ad_prs_info(elem) {
        this.ad_name = document.getElementById('admin_name');
        this.ad_prof = document.querySelector('#admin-prof');
        this.ad_name.readOnly = false;
        this.ad_prof.readOnly = false;
        this.ad_name.select();
        this.ad_name.focus()
        elem.style.display = "none";
        const chunk = `
        <div class="mainsc">
        <div class="socio-edit flex-row centerY centerX">
        <div class="socio flex-row centerY centerX sclink">
        <span class="fa fa-facebook fadein"></span>
        <input type="text" name="fb-link" id="fb-link" class="definp fadein">
        </div>
        <div class="socio flex-row centerY sclink">
            <span class="fa fa-pinterest fadein"></span>
            <input type="text" name="pin-link" id="pin-link" class="definp fadein">
        </div>
        <div class="socio flex-row centerY sclink">
        <span class="fa fa-instagram fadein"></span>
        <input type="text" name="in-link" id="in-link" class="definp fadein">
        </div>
        <div class="socio flex-row centerY sclink">
        <span class="fa fa-twitter fadein"></span>
        <input type="text" name="tw-link" id="tw-link" class="definp fadein">
        </div>
        <div class="socio flex-row centerY sclink">
        <span class="fa fa-linkedin fadein"></span>
        <input type="text" name="li-link" id="li-link" class="definp fadein">
        </div>
        </div> 
        <div class='fadein flex-row centerX centerY cnt-cnt'>
        <button class="defbutton cn-bt" data-for="close-ad-pr" onclick="run.clickEvent(this)"  data-btn="n-btn">Cancel</button>
        <button class="defbutton" data-for='sv-user-dt' data-btn='n-btn' onclick=(run.clickEvent(this))>Save</button>
        </div>
        </div>
        
        `
        document.querySelector('.editor').insertAdjacentHTML('afterend', chunk)
    }
    ad_prs_abt() {
        const chunk = `
        <button class="defbutton cn-bt" data-for="close-ad-abt" onclick="run.clickEvent(this)"  data-btn="n-btn">Cancel</button>
        <button class="defbutton" data-for='sv-user-adt' data-btn='n-btn' onclick=(run.clickEvent(this))>Save</button>
        </div>
        </div>
        `
        const dom = document.querySelector('.edt-abt');
        dom.innerHTML = '';
        dom.insertAdjacentHTML('afterbegin', chunk);

        run.abt_cont.readOnly = false;
        run.abt_cont.style.color = 'var(--cover)';
        run.abt_cont.style.boxShadow = '0 0 80px var(--boxshadow)';
    }

    close_ad_pr() {
        document.querySelector('.mainsc').remove();
        document.querySelector('.ad-per-info-btn').style.display = 'block';
    }

    close_ad_abt() {
        document.querySelector('.edt-abt').innerHTML = '<button class="defbutton" id="admin-pers-abt-btn" data-btn="n-btn" data-for="ad-per-abt" onclick="run.clickEvent(this)">Edit</button>'
        run.abt_cont.readOnly = true;
        run.abt_cont.style.color = 'var(--subtext)';
        run.abt_cont.style.boxShadow = '0 0 25px var(--boxshadow)';
    }

    async sv_user_dt() {
        var dom = document.querySelector('.mainsc');
        dom.classList.add('sinkout');
        const fb = document.getElementById('fb-link').value;
        const pin = document.getElementById('pin-link').value;
        const insta = document.getElementById('in-link').value;
        const twit = document.getElementById('tw-link').value;
        const link = document.getElementById('li-link').value;

        const updata = await fetch(`/up-social`, {
            method: "post",
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
            }),
            body: `fb=${fb}&pin${pin}&insta=${insta}&twit=${twit}&link=${link}`
        });

        setTimeout(() => {
            dom.remove();
            run.pushNotification('Success!', "Your data has been updated!", 'exe');
            document.querySelector('.ad-per-info-btn').style.display = 'block';
        }, 550);
    }

    sv_user_adt() {
        run.close_ad_abt();
        run.pushNotification('Success!', 'Your about page is updates.', 'exe');
    }

    pushNotification(title, subtext, type) {
        const chunk = `
        <div class="slidein_rhs nt_div flex-column">
            <div class="nt_title"><h3 class="font-main-regular ${type}">${title}</h3></div>
            <div class="nt_subtxt"><p class="font-main-light">${subtext}</p></div>
        </div>
        `
        document.querySelector('.backfilter').insertAdjacentHTML('afterbegin', chunk);
        setTimeout(() => {
            document.querySelector('.slide_rhs').remove();
        }, 6000);
    }

    view_act_div(elem) {
        var stat = elem.getAttribute('data-status');
        if (stat != 'on') {
            elem.style.transform = 'rotate(-180deg)';
            elem.setAttribute('data-status', 'on');
            document.querySelector('.' + elem.getAttribute('data-parent')).style.height = 'max-content';
        }
        else {
            elem.style.transform = 'rotate(0deg)';
            elem.setAttribute('data-status', 'off');
            document.querySelector('.' + elem.getAttribute('data-parent')).style.height = '4rem ';
        }
    }
}

const run = new runner();
function txteditor(elem) {
    text = document.getSelection().toString();
    text.bold();
}
