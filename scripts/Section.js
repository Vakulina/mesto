export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderer = renderer;
    this._renderedItems = items;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._container.prepend(element);
  }

  renderItems() {
    this._renderedItems.forEach((item) => {
      this._renderer(item);
    });
  }
}