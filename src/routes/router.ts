import { Router } from 'express';
import { get } from '../controllers/user.controller';

const router = Router();

router.route('/user/:id').get(get);

export default router;
