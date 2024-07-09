import { Router } from "express";
import controllers from "../controllers/controlleurs";
const profile = Router()


profile.get('/', controllers.getALLUser)
profile.get('/:id', controllers.getOneUser)
profile.post('/', controllers.postuser)
profile.put('/:id', controllers.putUser)
profile.delete('/:id', controllers.deleteUser)
profile.delete('/', controllers.deleteAllUser)

export default profile