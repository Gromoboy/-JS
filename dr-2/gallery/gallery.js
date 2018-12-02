// 3. Создать функционал фотогалереи. Имеется статичный json-набор миниатюр,
//   на основании которого строится сетка изображений со ссылками на полноразмерные картинки.
class Gallery {
  constructor(previwContainerClass){
    this.previewContainer = document.querySelector(previwContainerClass);
    this._render();
  }
  _render() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'galleryImgs.json', true);

    xhr.onreadystatechange = () => {
      if (xhr.readyState !==4) return;

      if (xhr.status !== 200 ) {
        console.log("can't load images");
      }
      else  {
        let imgSources = JSON.parse(xhr.responseText),
            htmlString = '';

        imgSources.forEach(el => {
          htmlString += `<a href="${el.srcMax}" target="_blank"> <img src="${el.src}" alt="${el.alt}"></a>`;
        });
        this.previewContainer.innerHTML = htmlString;
      }
    };

    xhr.send();
  }
}