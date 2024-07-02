import { Router } from "express";
import controllers from "../controllers/controlleurs";
const profile = Router()


profile.get('/', controllers.getALLProjet)
profile.get('/:id', controllers.getAoneProjet)
profile.post('/', controllers.postProjet)
profile.put('/:id', controllers.putProjet)
profile.delete('/:id', controllers.deleteProjet)

export default profile