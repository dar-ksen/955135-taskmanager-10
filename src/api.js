import TaskModel from './models/task-model';

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

  getTask() {
    return this._load({ url: `tasks` })
      .then((response) => response.json())
      .then(TaskModel.parseTasks);
  }

  createTask(task) {
  }

  updateTask(id, data) {
  }

  deleteTask(id) {
  }

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
