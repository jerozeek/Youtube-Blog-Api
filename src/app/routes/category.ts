import { Router } from 'express';
import categoryController from '../controllers/categoryController';
import {throttle} from "../middlewares/throttle";
const router = Router();

router.get('/get', [ throttle(60,1)], categoryController.fetchAll);
router.post('/create', [ throttle(60,1)], categoryController.createCategory);

export = router