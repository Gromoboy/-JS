// TODO:
// 2. Создать модуль сбора отзывов:
// a) модуль может выводить отзывы (пока из json-заглушки);
// b) модуль может добавлять отзывы;
// c) модуль может одобрять отзывы;
// d) модуль может удалять отзывы;
class Post {
  constructor(source, containerSelector = '.feedback-group') {
    this.posts = [];
    this.source = source;
    this.containerSel = containerSelector;
    this._init();
  }
  _init() {
    fetch(this.source)
      .then(response => response.json())
      .then(posts => {
        posts.forEach(post => {
          this.posts.push(post);
          this._renderPost(post);
        })
      });
  }
  _renderPost(post) {
    const $container = $(this.containerSel);
    $container.append($(
      `
      <div class="feedback ${post.isApproved ? 'approved' : 'disapproved'}" id="${post.id}">
        <div class="title">${post.autor}
          <span class="btn-approve">${post.isApproved ? '' : 'Одобрить'}</span>
          <span class="btn-close">&times;</span> 
        </div>
        <div class="message">${post.text}</div>
      </div>
      
      `
    ));
    const $feedbackEl = $(`#${post.id}`);
    $feedbackEl.on('click',  function (e) {
      if(e.target.classList.contains('btn-approve') ) {
        post.isApproved = true;
        this.classList.remove('disapproved');
        e.target.innerHTML = '';
      } else if (e.target.classList.contains('btn-close')) {
        this.remove();
      }

    })
  }

 add(formSelector) {
    let $form = $(formSelector);
    let post = {
      id: this.posts.length,
      autor: $form.find('#autor').value,
      text: $form.find('#post').value,
      isApproved: false
    };

    this._renderPost(post);
 }
}

const feedbacks = new Post('feedback.json');
$('#send-feedback').click( (e) => {
  feedbacks.add('#post-feedback');
});
