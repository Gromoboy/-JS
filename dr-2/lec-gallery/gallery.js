class Modal {
  constructor(modal) {
    this.settings = modal;
    this.btn = null;
    this.block = null;
    this.imgWrap = null;
    this._build();
  }
  open(element) {
    console.log(element);
    this._addImage(element.dataset.srcMax, element.alt);
    this.block.classList.toggle('show');
    document.body.classList.toggle('no-scroll');
  }
  _addImage(src, alt) {
    console.log(src);
    this.imgWrap.innerHTML = `<img src="${src}" alt="${alt}">`;
  }
  _build() {
    let template = `
      <div id="${this.settings.id}" class="modal-wrap">
        <div class="top-block">
          <button type="button" class="${this.settings.btn}" aria-label="Close">x</button>
        </div>
        <div class="${this.settings.imgWrap}"></div>
      </div>
    `;
    document.body.innerHTML += template;
    this.imgWrap = document.querySelector(`.${this.settings.imgWrap}`);
    this.block = document.querySelector(`#${this.settings.id}`);
    this._initElements();
  }

  _initElements() {
    this.btn = document.querySelector(`.${this.settings.btn}`);
    this.btn.addEventListener('click', () => {
      this.block.classList.toggle('show');
      document.body.classList.toggle('no-scroll');
    });
  }
}

class Gallery {
  constructor(sourceJson, containerClass  , modal = {id: 'modal', imgWrap:'img-wrap', btn:'close'}) {
    this.container = containerClass;
    this.modal = new Modal(modal);
    this._getData(sourceJson);
  }
  _getData(sourceJson) {
    fetch(sourceJson)
      .then(response => response.json())
      .then(data => this._buildGallery(data))
      .catch(console.log("can't get it"));
  }
  _buildGallery(data) {
    this.container = document.querySelector(this.container);
    for (let imgParams of data) {
      console.log(imgParams);
      this._addImage(imgParams);
    }
    this._initGallery();
  }
    _addImage(imgParams) {
        this.container.innerHTML += `<img src="${imgParams.src}" alt="${imgParams.alt}" data-src-max="${imgParams.srcMax}">`;
    
  }
  _initGallery() {
    this.container.addEventListener('click', e => {
      if (e.target.tagName !== 'IMG') return;
      this.modal.open(e.target);
    })
  }
}