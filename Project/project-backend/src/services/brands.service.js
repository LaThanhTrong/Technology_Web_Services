const knex = require('../database/knex');

function makeBrandsService() {
    async function getManyBrands(query) {
        if (!query) return knex('brand').select('*');
        const { name } = query;
        return knex('brand').where((builder) => {
            if (name) {
                builder.where('bname', 'like', `%${name}%`);
            }
        }).select('*');
    }

    async function getBrandsByName(name) {
        return knex('brand').where('bname', '=', name).select('*').first();
    }

    async function getBrandsById(id) {
        return knex('brand').where('bid', '=', id).select('*').first();
    }

    return {
        getManyBrands,
        getBrandsByName,
        getBrandsById,
    }
}

module.exports = makeBrandsService;