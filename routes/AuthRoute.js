import express from 'express';
import {
    Login,
    Me,
    logOut
} from './../controllers/Auth.js'

const router = express.Router();

router.post('/login', Login);
router.get('/status', Me);
router.delete('/logout/:id', logOut);

export default router;