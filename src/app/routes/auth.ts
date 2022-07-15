import { Router } from 'express';
import authController from '../controllers/authController';
import {throttle} from "../middlewares/throttle";
import {verifyToken} from "../middlewares/verifyToken";

const router = Router();

router.post('/login',[throttle(60,1)], authController.doLogin);

router.post('/signup',[throttle(60,1)], authController.doSignUp);

router.post('/reset-password',[throttle(60,1)], authController.resetPassword);

router.post('/verify-otp',[throttle(60,1)], authController.verifyOTP);

router.post('/change-password',[throttle(60,1)], authController.updatePassword);

router.get('/me',[verifyToken, throttle(60,1)], authController.middleware);

router.post('/refresh-token',[throttle(60,1)], authController.refreshAppToken);

export = router;