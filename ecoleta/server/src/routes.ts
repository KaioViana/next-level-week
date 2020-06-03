import express from 'express';
import PointsController from './controllers/PointsController'
import ItemsController from './controllers/ItemsController';


const routes = express.Router();
const pointsController = new PointsController();
const itemsController = new ItemsController();

// LISTAR ITEMS
routes.get('/items', itemsController.index);
// CRIAR PONTO DE COLETA
routes.post('/points', pointsController.create);
// LISTAR PONTO DE COLETA PELO ID
routes.get('/points/:id', pointsController.show);
//
routes.get('/points', pointsController.index);

export default routes;