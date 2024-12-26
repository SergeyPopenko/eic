const cookie = {
    selectors: {
        window: window,
        document: document,
        cookieConteiner: document.getElementById('cookieConsentContainer'),
        acceptCookieBtn: document.getElementById('acceptCookieBtn'),
        declineCookieBtn: document.getElementById('declineCookieBtn'),

    },

    init() {
        this.selectors.window.onload = () => {
            if(!this.checkCookie() && !this.checkSessionStorageCookie()) {
                this.showCookieContainer();
            }
        }
    },

    checkCookie() {
        return this.getCookie("userConsent") === "accepted";
    },

    checkSessionStorageCookie() {
        return sessionStorage.getItem("shownCookieBanner");
    },

    showCookieContainer() {
        this.selectors.cookieConteiner.style.display = "block";
        this.initListeners();
    },

    getCookie(name) {
        let nameEQ = name + "=";
        let ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    },

    setCookie(name, value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "")  + expires + "; path=/";
    },

    initListeners() {
        this.selectors.acceptCookieBtn.addEventListener('click', () => {
            this.setCookie("userConsent", "accepted", 365);
            this.hideCookieContainer();
        });

        this.selectors.declineCookieBtn.addEventListener('click', () => {
            this.setCookie("userConsent", "declined", 365);
            this.hideCookieContainer();
        });
    },

    hideCookieContainer() {
        this.selectors.cookieConteiner.style.display = "none";
        sessionStorage.setItem("shownCookieBanner", "true");
    }
};

cookie.init();
