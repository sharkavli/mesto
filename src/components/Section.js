export default class Section {
  // constructor({ items, renderer }, selector) {
  //   this._items = items; - было так 1.0
  constructor(renderer, selector) {
    this._renderer = renderer;
    this._selector = selector;
    this._container = document.querySelector('.elements');
  }

  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(card) {
    this._container.prepend(card);
  }
}
