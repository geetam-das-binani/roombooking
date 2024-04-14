import express from 'express'
import {verifyToken,authorizeRoles} from '../middlewares/auth.middleware.mjs'
import { getStats } from '../controllers/stat.controllers.mjs'
const router = express.Router()

router.get('/stats',verifyToken,authorizeRoles,getStats)




export {router}