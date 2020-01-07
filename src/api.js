import TaskModel from './models/task';

const METHOD = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

const API = class {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getTasks() {
    return this._load({ url: `tasks` })
      .then((response) => response.json())
      .then(TaskModel.parseTasks);
  }

  /*
  TODO:
  createTask(task) {
  }
  */

  updateTask(id, data) {
    return this._load({
      url: `tasks/${id}`,
      method: METHOD.PUT,
      body: JSON.stringify(data.toRAW()),
      headers: new Headers({ 'Content-Type': `application/json` })
    })
      .then((response) => response.json())
      .then(TaskModel.parseTask);
  }

  /*
   TODO:
  deleteTask(id) {
  }
  */

  _load({ url, method = METHOD.GET, body = null, headers = new Headers() }) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, { method, body, headers })
      .then(checkStatus)
      .catch((err) => {
        throw err;
      });
  }

};

export default API;
