/*
 * Создаем экземпляр класса, передавая ссылку на DOM-элемент.
 * Методы возвращают либо true/false, либо модифицированный DOM-элемент. 
 */

export class Framework {

    constructor(element) {
        this.element = element;
    }

    hasClass(className) {
        return this.element.classList.contains(className);
    }

    addClass(className) {
        this.element.classList.add(className);
        return this.element;
    }

    removeClass(className) {
        this.element.classList.remove(className);
        return this.element;
    }

    toggleClass(className) {
        this.element.classList.toggle(className);
        return this.element;
    }
}
