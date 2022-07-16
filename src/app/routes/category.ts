import { Router } from 'express';
import categoryController from '../controllers/categoryController';
import {throttle} from "../middlewares/throttle";
import {verifyToken} from "../middlewares/verifyToken";
const router = Router();

router.get('/get', [verifyToken, throttle(60,1)], categoryController.fetchAll);

export = router