export const errorHandler = (error, req, res, next) => {
    // {
// message: '',
// status: 404
// }
    const status = error.status || 500;
    res.status(status).json({ message: error.message })
}