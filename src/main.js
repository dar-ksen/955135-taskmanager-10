import MenuComponent from './components/menu';
import StatisticsComponent from './components/statistics';

import TaskModel from './models/task-model';

import BoardComponent from './components/board';
import BoardController from './controllers/board';
import FilterController from './controllers/filter';

import { tasks } from './mock/task.js';
import { renderComponent } from './utils/render';

const $siteMain = document.querySelector(`.js-main`);
const $siteMainControl = $siteMain.querySelector(`.js-main__control`);

const menuComponent = new MenuComponent();
const statisticsComponent = new StatisticsComponent();

menuComponent.getElement().querySelector(`.control__label--new-task`)
  .addEventListener(`click`, () => {
    boardController.createTask();
  });


renderComponent($siteMainControl, menuComponent);

const taskModel = new TaskModel();
taskModel.setTasks(tasks);

const filterController = new FilterController($siteMain, taskModel);
filterController.render();

const boardComponent = new BoardComponent();
renderComponent($siteMain, boardComponent);
renderComponent($siteMain, statisticsComponent);

const boardController = new BoardController(boardComponent, taskModel);

boardController.render(tasks);

