import Model from './model/Model.js';
import View from './view/View.js';

import Controller from './controller/Controller.js';

let model = new Model();
let view = new View(model);

let controller = new Controller(model, view);
