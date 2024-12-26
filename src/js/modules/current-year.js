const currentYear = {
    elements: {
        currentYear: document.querySelector('#currentyear'),
    },

    init() {
        this.elements.currentYear.textContent = new Date().getFullYear();
    },
};

currentYear.init();
