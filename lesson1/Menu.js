class Menu {
    constructor(id, className, items) {
        this.id = id;
        this.className = className;
        this.items = items;
    }
    render(){
        let result = `<ul id="${this.id}" class="${this.className}">`;
        for (let i = 0; i < this.items.length; i++){
            if(this.items[i] instanceof MenuItem) {
                result += this.items[i].render();
            }
            //TODO: instanceof SubMenu
        }
        result += `</ul>`;
        return result
    }
    remove(){
        //TODO: удаление меню
    }
}