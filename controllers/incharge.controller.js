import { catchAsync } from "../helpers/helper.js";
import { InchargeService } from "../services/index.js";


const all = catchAsync(async (req, res) => {
    const result = await InchargeService.getAll(req.body);
    await res.status(result.status).send(result)
});

const getBydId = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await InchargeService.getBydId(id);
    await res.status(result.status).send(result)
});

const create = catchAsync(async (req, res) => {
    const result = await InchargeService.create(req.body);
    await res.status(result.status).send(result)
});

const update = catchAsync(async (req, res) => {
    const result = await InchargeService.update(req.body);
    await res.status(result.status).send(result)
});

const remove = catchAsync(async (req, res) => {
    console.log(req.body);
    const result = await InchargeService.remove(req.body);
    await res.status(result.status).send(result)
});

const getAllSimpleIncharge = catchAsync(async (req, res) => {
    const result = await InchargeService.getAllSimpleIncharge(req.body);
    await res.status(result.status).send(result)
});

export default {
    all,
    getBydId,
    create,
    update,
    remove,
    getAllSimpleIncharge
}