class Menu {
  constructor(id, className, items) {
    this.id = id;
    this.className = className;
    this.items = items;
  }
  render() {
    let result = `<ul id="${this.id}" class="${this.className}">`;
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i] instanceof MenuItem || this.items[i] instanceof SubMenu) {
        result += this.items[i].render();
      }
      //TODO: instanceof SubMenu
      // if (this.items[i] instanceof SubMenu){
      //   result = result.slice(0,-5) + this.items[i].render() + result.slice(-5);
      //
      // }
    }
    result += `</ul>`;
    return result
  }
  remove() {
    //TODO: удаление меню
    let menuEl = document.getElementById(this.id);
    if (menuEl) {
      menuEl.parentElement.removeChild(menuEl);
    }

  }
}

class SubMenu extends Menu {
  constructor(href, title, id, className, items) {
    super(id, className, items);
    this.href = href;
    this.title = title;
  }
  render() {
    return `<li><a href="${this.href}">${this.title}</a>${super.render()}</li>`
  }
}