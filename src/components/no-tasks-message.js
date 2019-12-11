import AbstractComponent from './abstract-component';

const getNoTasksMessageTemplate = () => {
  return (`
    <p class="board__no-tasks">
      Click «ADD NEW TASK» in menu to create your first task
    </p>
  `);
};

export default class NoTasksMessage extends AbstractComponent {
  getTemplate() {
    return getNoTasksMessageTemplate();
  }
}
