const makeBrandsService = require('../services/brands.service');
const ApiError = require('../api-error');

async function getManyBrands(req, res, next) {
    let brands = [];
    try {
        const brandsService = makeBrandsService();
        brands = await brandsService.getManyBrands(req.query);
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, 'An error occurred while retrieving brands')
        );
    }
    return res.send(brands);
}

async function getBrandsByName(req, res, next) {
    try {
        const brandsService = makeBrandsService();
        brand = await brandsService.getBrandsByName(req.params.name);
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, 'An error occurred while retrieving brand name')
        );
    }
    return res.send(brand);
}

async function getBrandsById(req, res, next) {
    try {
        const brandsService = makeBrandsService();
        brand = await brandsService.getBrandsById(req.params.id);
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, 'An error occurred while retrieving brand id')
        );
    }
    return res.send(brand);
}

module.exports = {
    getManyBrands,
    getBrandsByName,
    getBrandsById,
}