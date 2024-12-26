const mobileNav = {
    elements: {
        navBtn: document.querySelector('.js-mobile-nav-btn'),
        nav: document.querySelector('.js-mobile-nav'),
        menuIcon: document.querySelector('.js-nav-icon'),
        navList: document.querySelector('.js-mobile-nav-list'),
        body: document.querySelector('body'),
    },
    selectors: {
        navItemLink: 'js-mobile-nav-link',
    },
    modifiers: {
        mobileNavOpen: 'mobile-nav--open',
        navIconActive: 'nav-icon--active',
        noScroll: 'no-scroll'
    },

    init() {
        this.initListeners();
    },

    initListeners() {
		this.elements.navBtn.addEventListener("click", () => { this.handleNav() });
		this.elements.navList.addEventListener("click", (e) => { 
            const targetElement = e.target;

            if (targetElement.classList.contains(this.selectors.navItemLink)) {
                this.elements.navBtn.click();
            }
        });
    },

	handleNav() {
		this.elements.nav.classList.toggle(this.modifiers.mobileNavOpen);
		this.elements.menuIcon.classList.toggle(this.modifiers.navIconActive);
		this.elements.body.classList.toggle(this.modifiers.noScroll);
	}
};

mobileNav.init();
