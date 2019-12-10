import AbstractComponent from './abstract-component';

const getTaskListTemplate = () => {
  return (`
    <div class="board__tasks js-board__tasks"></div>
  `);
};

export default class TaskList extends AbstractComponent {
  getTemplate() {
    return getTaskListTemplate();
  }
}
