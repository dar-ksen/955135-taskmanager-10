import MenuComponent from './components/menu';

import TasksModel from './models/tasks';

import BoardComponent from './components/board';
import BoardController from './controllers/board';
import FilterController from './controllers/filter';

import { tasks } from './mock/task.js';
import { renderComponent } from './utils/render';

const $siteMain = document.querySelector(`.js-main`);
const $siteMainControl = $siteMain.querySelector(`.js-main__control`);

renderComponent($siteMainControl, new MenuComponent());

const tasksModel = new TasksModel();
tasksModel.setTasks(tasks);

const filterController = new FilterController($siteMain, tasksModel);
filterController.render();

const boardComponent = new BoardComponent();
renderComponent($siteMain, boardComponent);

const boardController = new BoardController(boardComponent, tasksModel);

boardController.render(tasks);

