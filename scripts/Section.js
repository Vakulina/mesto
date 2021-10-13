export default class Section {
  constructor({items, renderer}, containerSelector){
    this._renderer= renderer;
    this._renderedItems = data;
    this._container = document.querySelector(containerSelector);

  }
  addItem(element) {
    this._container.append(element);
  }
  renderItems() {

    this._renderedItems.forEach((item) => {
      this._renderer(item);
    });
  } 
 /* - Содержит публичный метод, который отвечает за отрисовку всех элементов. Отрисовка каждого отдельного элемента должна осуществляться функцией `renderer`.
  - Содержит публичный метод `addItem`, который принимает DOM-элемент и добавляет его в контейнер.*/
}