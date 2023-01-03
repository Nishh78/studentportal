import express from "express"
import { authController, inchargeController , studentController, inchargeInfoController, remarkController} from '../controllers/index.js';
import { verifyAccessToken } from "../middlewares/auth.js"
const router = express.Router();

//auth
router.post('/login', authController.login);
//incharge
router.get('/incharge', inchargeController.all);
router.get('/incharge/:id', inchargeController.getBydId);
router.post('/incharge', inchargeController.create);
router.put('/incharge', inchargeController.update);
router.delete('/incharge', inchargeController.remove);
router.get('/inchargeList', inchargeController.getAllSimpleIncharge);
//student
router.get('/student', studentController.all);
router.get('/student/:id', studentController.getBydId);
router.post('/student', studentController.create);
router.put('/student', studentController.update);
router.delete('/student', studentController.remove);
//student-result
router.get('/getALlStudentByIncharge', studentController.getALlStudentByIncharge);
router.post('/addStudentResult', studentController.addStudentResult);
router.put('/updateStudentResult', studentController.updateStudentResult);
router.get('/getStudentInfo', studentController.getStudentInfo);
router.get('/generateStudentResultPdf', studentController.generateStudentResultPdf);
//incharge 
router.get('/inchargeInfo', inchargeInfoController.all);
router.post('/inchargeInfo', inchargeInfoController.create);
router.put('/inchargeInfo', inchargeInfoController.update);
router.delete('/inchargeInfo', inchargeInfoController.remove);
//remark 
router.get('/remark', remarkController.all);
router.post('/remark', remarkController.create);
router.put('/remark', remarkController.update);
router.delete('/remark', remarkController.remove);
export default router;