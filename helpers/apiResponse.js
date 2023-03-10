const createResponse = (res, status, message, payload) => {
    return res.status(status).json({
        status: status,
        message: message,
        payload: payload
    });
}

export default createResponse;