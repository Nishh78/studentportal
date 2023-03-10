import { catchAsync } from "../helpers/helper.js";
import { StudentService } from "../services/index.js";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const all = catchAsync(async (req, res) => {
    const result = await StudentService.getAll(req.query);
    await res.status(result.status).send(result)
});

const getBydId = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await StudentService.getBydId(id);
    await res.status(result.status).send(result)
});

const create = catchAsync(async (req, res) => {
    const result = await StudentService.create(req.body);
    await res.status(result.status).send(result)
});

const update = catchAsync(async (req, res) => {
    const result = await StudentService.update(req.body);
    await res.status(result.status).send(result)
});

const remove = catchAsync(async (req, res) => {
    const result = await StudentService.remove(req.body);
    await res.status(result.status).send(result)
});

const getALlStudentByIncharge = catchAsync(async (req, res) => {
    const result = await StudentService.getALlStudentByIncharge(req.query);
    await res.status(result.status).send(result)
});

const addStudentResult = catchAsync(async (req, res) => {
    const result = await StudentService.addStudentResult(req.body);
    await res.status(result.status).send(result)
});

const updateStudentResult = catchAsync(async (req, res) => {
    const result = await StudentService.updateStudentResult(req.body);
    await res.status(result.status).send(result)
});

const getStudentInfo = catchAsync(async (req, res) => {
    console.log(req.query);
    const result = await StudentService.getStudentInfo(req.query);
    await res.status(result.status).send(result)
});

const generateStudentResultPdf = catchAsync(async (req, res) => {
    console.log(req.body);
    const result = await StudentService.generateStudentResultPdf({ ...req.body });
    if (result.data) {
        var fullUrl = req.protocol + '://' + req.get('host') + '/docs/' + result.data;
        await res.status(result.status).send({ ...result, data: fullUrl })
    } else {
        await res.status(result.status).send(result)
    }

});

export default {
    all,
    getBydId,
    create,
    update,
    remove,
    getALlStudentByIncharge,
    addStudentResult,
    updateStudentResult,
    getStudentInfo,
    generateStudentResultPdf
}