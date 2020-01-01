import MenuComponent, { MenuItem } from './components/menu';
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

renderComponent($siteMainControl, menuComponent);

const taskModel = new TaskModel();
taskModel.setTasks(tasks);

const dateTo = new Date();
const dateFrom = (() => {
  const d = new Date(dateTo);
  d.setDate(d.getDate() - 7);
  return d;
})();
const statisticsComponent = new StatisticsComponent({ tasks: taskModel, dateFrom, dateTo });

const filterController = new FilterController($siteMain, taskModel);
filterController.render();

const boardComponent = new BoardComponent();
renderComponent($siteMain, boardComponent);
renderComponent($siteMain, statisticsComponent);
statisticsComponent.hide();

menuComponent.setOnChange((menuItem) => {
  switch (menuItem) {
    case MenuItem.NEW_TASK:
      menuComponent.setActiveItem(MenuItem.TASKS);
      statisticsComponent.hide();
      boardController.show();
      boardController.createTask();
      break;
    case MenuItem.STATISTICS:
      boardController.hide();
      statisticsComponent.show();
      break;
    case MenuItem.TASKS:
      statisticsComponent.hide();
      boardController.show();
      break;
  }
});

const boardController = new BoardController(boardComponent, taskModel);

boardController.render(tasks);

