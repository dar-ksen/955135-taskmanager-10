import AbstractComponent from './abstract-component';

const getBoardTemplate = () => {
  return (`
    <section class="board container js-board"></section>
  `);
};


export default class Board extends AbstractComponent {
  getTemplate() {
    return getBoardTemplate();
  }
}
