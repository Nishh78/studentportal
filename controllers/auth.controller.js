import { catchAsync } from "../helpers/helper.js";
import { AuthService } from "../services/index.js";


const login = catchAsync(async (req, res) => {
    try {
        const response = await AuthService.login(req.body);
        return res.status(response.status).send(response)
    } catch (error) {
        console.log(error);
    }
});

export default {
    login
}