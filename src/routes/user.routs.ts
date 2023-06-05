import { Router } from "express";
import { userController } from "../controllers/user.controller";
const routes = Router()

routes.get('/', userController.index)
routes.post('/', userController.create)
routes.get('/:id', userController.findUniq)
routes.put('/:id', userController.update)
routes.delete('/:id', userController.delete)

export default routes