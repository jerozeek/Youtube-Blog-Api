import { Router } from 'express';
import blogController from '../controllers/blogController';
import {throttle} from "../middlewares/throttle";
import {verifyToken} from "../middlewares/verifyToken";
const router = Router();

router.get('/all', [verifyToken, throttle(60,1)], blogController.getAll);
router.post('/create', [verifyToken, throttle(60,1)], blogController.createBlog);
router.delete('/delete', [verifyToken, throttle(60,1)], blogController.deleteBlog);

export = router