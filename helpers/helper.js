const catchAsync = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => { console.log('erro in service',err.message); next(err);});
};

const getPaginationData = query => {
    const { page = 1, pageSize = 10 } = query
    const offset = (page - 1) * pageSize

    return { offset, limit: Number(pageSize) }
}

export {
    catchAsync,
    getPaginationData
}