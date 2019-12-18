import MenuComponent from './components/menu';
import FilterComponent from './components/filter';

import BoardComponent from './components/board';
import BoardController from './controllers/board';

import { tasks } from './mock/task.js';
import { generateFilters } from './mock/filter';
import { renderComponent } from './utils/render';

const $siteMain = document.querySelector(`.js-main`);
const $siteMainControl = $siteMain.querySelector(`.js-main__control`);

renderComponent($siteMainControl, new MenuComponent());

const filters = generateFilters(tasks);
renderComponent($siteMain, new FilterComponent(filters));

const boardComponent = new BoardComponent();
renderComponent($siteMain, boardComponent);

const boardController = new BoardController(boardComponent);

boardController.render(tasks);

