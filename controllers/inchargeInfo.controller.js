import { catchAsync } from "../helpers/helper.js";
import { InchargeInfoService } from "../services/index.js";


const all = catchAsync(async (req, res) => {
    const result = await InchargeInfoService.getAll(req.body);
    await res.status(result.status).send(result)
});

const getBydId = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await InchargeInfoService.getBydId(id);
    await res.status(result.status).send(result)
});

const create = catchAsync(async (req, res) => {
    const result = await InchargeInfoService.create(req.body);
    await res.status(result.status).send(result)
});

const update = catchAsync(async (req, res) => {
    const result = await InchargeInfoService.update(req.body);
    await res.status(result.status).send(result)
});

const remove = catchAsync(async (req, res) => {
    const result = await InchargeInfoService.remove(req.body);
    await res.status(result.status).send(result)
});

export default {
    all,
    getBydId,
    create,
    update,
    remove
}