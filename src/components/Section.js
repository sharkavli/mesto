export default class Section {
  constructor({ items, renderer }, selector) {
    this._items = items;
    this._renderer = renderer;
    this._selector = selector;
    this._container = document.querySelector('.elements');
  }

  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item);
    });
  }

  // renderItems() {
  //   this._items.forEach((item) => this._renderer(item));
  // }

  addItem(card) {
    // console.log(card);
    this._container.prepend(card);
  }
}
