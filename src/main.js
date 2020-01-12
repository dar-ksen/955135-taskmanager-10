import API from './api';
import MenuComponent, { MenuItem } from './components/menu';
import StatisticsComponent from './components/statistics';
import TasksModel from './models/tasks';
import BoardComponent from './components/board';
import BoardController from './controllers/board';
import FilterController from './controllers/filter';
import { renderComponent } from './utils/render';

const AUTHORIZATION = `Basic dXNlckBwYXNzd29yZA1=`;
const END_POINT = `https://htmlacademy-es-10.appspot.com/task-manager`;

const dateTo = new Date();
const dateFrom = (() => {
  const d = new Date(dateTo);
  d.setDate(d.getDate() - 7);
  return d;
})();

const api = new API(END_POINT, AUTHORIZATION);
const tasksModel = new TasksModel();

const $siteMain = document.querySelector(`.js-main`);
const $siteMainControl = $siteMain.querySelector(`.js-main__control`);
const menuComponent = new MenuComponent();
const statisticsComponent = new StatisticsComponent({ tasksModel, dateFrom, dateTo });

const boardComponent = new BoardComponent();
const boardController = new BoardController(boardComponent, tasksModel, api);
const filterController = new FilterController($siteMain, tasksModel);

renderComponent($siteMainControl, menuComponent);
filterController.render();
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

api.getTasks()
  .then((tasks) => {
    tasksModel.setTasks(tasks);
    boardController.render();
  });
