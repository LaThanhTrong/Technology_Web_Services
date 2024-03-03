const knex = require('../database/knex');
const Paginator = require('./paginator');

function makeShoesService() {

    function readShoes(payload) {
        const contact = {
            pname: payload.pname,
            bid: payload.bid,
            description: payload.description,
            price: payload.price,
            pimage: payload.pimage,
            created_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
            updated_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
        };
        Object.keys(contact).forEach(
            (key) => contact[key] === undefined && delete contact[key]
        );
        return contact;
    }

    async function getManyShoes(query) {
        const { name, brand, page = 1, limit = 4 } = query;
        const paginator = new Paginator(page, limit);
        let queryBuilder = knex('product').join('brand', 'product.bid', '=', 'brand.bid')
            .where((builder) => {
                if (brand && name) {
                    builder.where('product.pname', 'like', `%${name}%`).andWhere('brand.bid', '=', `${brand}`);
                }
                else if (brand && !name) {
                    builder.where('brand.bid', '=', `${brand}`);
                }
                else if (name) {
                    builder.where('product.pname', 'like', `%${name}%`);
                }
            })
            .select(
                knex.raw('count(id) OVER() AS recordsCount'),
                'product.id',
                'product.pname',
                'product.bid',
                'product.description',
                'product.price',
                'product.pimage',
                'product.created_at',
                'product.updated_at',
                'brand.bname',
            );

        if (Object.keys(query).length !== 0 && !name) {
            queryBuilder = queryBuilder.limit(paginator.limit).offset(paginator.offset);
        }

        let results = await queryBuilder;

        if (Object.keys(query).length === 0) {
            return results
        }
        let totalRecords = 0;
        results = results.map((result) => {
            totalRecords = result.recordsCount;
            delete result.recordsCount;
            return result;
        });

        return {
            metadata: paginator.getMetadata(totalRecords),
            shoes: results,
        }
    }

    async function getShoeById(id) {
        return knex('product').join('brand', 'product.bid', '=', 'brand.bid').where({ id }).select('*').first();
    }

    async function createShoe(payload) {
        const shoe = readShoes(payload);
        delete shoe.updated_at;
        const [id] = await knex('product').insert(shoe);
        return { id, ...shoe };
    }

    async function updateShoeById(id, payload) {
        const update = readShoes(payload);
        delete update.created_at;
        return knex('product').where('id', id).update(update);
    }

    async function deleteShoeById(id) {
        return knex('product').where('id', id).del();
    }

    async function deleteAllShoes() {
        return knex('product').del();
    }

    return {
        getManyShoes,
        getShoeById,
        createShoe,
        updateShoeById,
        deleteShoeById,
        deleteAllShoes,
    }
}

module.exports = makeShoesService;