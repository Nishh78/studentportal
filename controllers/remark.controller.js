import { catchAsync } from "../helpers/helper.js";
import { RemarkService } from "../services/index.js";


const all = catchAsync(async (req, res) => {
    const result = await RemarkService.getAll(req.body);
    await res.status(result.status).send(result)
});


const create = catchAsync(async (req, res) => {
    const result = await RemarkService.create(req.body);
    await res.status(result.status).send(result)
});

const update = catchAsync(async (req, res) => {
    const result = await RemarkService.update(req.body);
    await res.status(result.status).send(result)
});

const remove = catchAsync(async (req, res) => {
    const result = await RemarkService.remove(req.body);
    await res.status(result.status).send(result)
});



export default {
    all,
    create,
    update,
    remove
}