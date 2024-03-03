const makeShoesService = require('../services/shoes.service');
const ApiError = require('../api-error');

async function getShoesByFilter(req, res, next) {
    let shoes = [];
    try {
        const shoesService = makeShoesService();
        shoes = await shoesService.getManyShoes(req.query);
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, 'An error occurred while retrieving shoes')
        );
    }
    return res.send(shoes);
}

async function getShoeById(req, res, next) {
    try {
        const shoesService = makeShoesService();
        const shoe = await shoesService.getShoeById(req.params.id);
        if (!shoe) {
            return next(new ApiError(404, 'Shoe not found'));
        }
        return res.send(shoe);
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500,
                `Error retrieving shoe with id ${req.params.id}`
            )
        );
    }
}

async function updateShoeById(req, res, next) {
    if (!req.session.user) return next(new ApiError(401, 'Unauthorized'));
    else if (Object.keys(req.body).length === 0) return next(new ApiError(400, 'Data to update can not be empty'));
    try {
        const shoesService = makeShoesService();
        const updated = await shoesService.updateShoeById(req.params.id, req.body);
        if (!updated) {
            return next(new ApiError(404, 'Shoes not found'));
        }
        return res.send({ message: 'Shoes updated successfully' });
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, `Error updating shoes with id ${req.params.id}`)
        );
    }
}

async function createShoe(req, res, next) {
    if (!req.session.user) return next(new ApiError(401, 'Unauthorized'));
    else if (!req.body) return next(new ApiError(400, 'Shoe data to create can not be empty'));
    try {
        const shoesService = makeShoesService();
        const shoe = await shoesService.createShoe(req.body);
        return res.send(shoe);
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, 'Error creating shoe'));
    }
}

async function deleteShoeById(req, res, next) {
    if (!req.session.user) return next(new ApiError(401, 'Unauthorized'));
    try {
        const shoesService = makeShoesService();
        const deleted = await shoesService.deleteShoeById(req.params.id);
        if (!deleted) {
            return next(new ApiError(404, 'Shoe not found'));
        }
        return res.send({ message: 'Shoe deleted successfully' });
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, `Error deleting shoe with id ${req.params.id}`)
        );
    }
}

async function deleteAllShoes(req, res, next) {
    if (!req.session.user) return next(new ApiError(401, 'Unauthorized'));
    try {
        const shoesService = makeShoesService();
        const deleted = await shoesService.deleteAllShoes();
        return res.send({ message: `${deleted} shoes deleted successfully` });
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, 'Error deleting all shoes'));
    }
}

module.exports = {
    getShoesByFilter,
    getShoeById,
    createShoe,
    updateShoeById,
    deleteShoeById,
    deleteAllShoes,
}
