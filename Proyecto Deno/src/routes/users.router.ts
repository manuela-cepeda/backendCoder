import {Router} from 'npm:express'
import usersController from '../controllers/users.controller.ts';

const router = Router();

router.get('/', usersController.getUsers)

export default router;