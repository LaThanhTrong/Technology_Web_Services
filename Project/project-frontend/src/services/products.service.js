function makeProductsService() {
    const baseUrl = '/api/shoes'
    const headers = {
        'Content-Type': 'application/json',
    };

    async function getProducts(page, limit, search = "", brand = "") {
        let url = `${baseUrl}`;
        if (page && limit) {
            if (search.length > 0 && brand.length === 0) {
                url = `${baseUrl}?name=${search}`;
            }
            else if (search.length === 0 && brand.length > 0) {
                url = `${baseUrl}?page=${page}&limit=${limit}&brand=${brand}`;
            }
            else if (search.length > 0 && brand.length > 0) {
                url = `${baseUrl}?name=${search}&brand=${brand}`
            }
            else {
                url = `${baseUrl}?page=${page}&limit=${limit}`;
            }
        }
        return await fetch(url).then((res) => res.json());
    }

    async function getProductById(id) {
        return await fetch(`${baseUrl}/${id}`).then((res) => res.json());
    }

    async function createProduct(data) {
        return await fetch(baseUrl, {
            method: 'POST',
            headers,
            body: JSON.stringify(data),
        }).then((res) => res.json());
    }

    async function updateProduct(data) {
        return await fetch(`${baseUrl}/${data.id}`, {
            method: 'PUT',
            headers,
            body: JSON.stringify(data),
        }).then((res) => res.json());
    }

    async function deleteProduct(id) {
        return await fetch(`${baseUrl}/${id}`, {
            method: 'DELETE',
        }).then((res) => res.json());
    }

    async function deleteAllProducts() {
        return await fetch(baseUrl, {
            method: 'DELETE',
        }).then((res) => res.json());
    }

    return {
        getProducts,
        getProductById,
        createProduct,
        updateProduct,
        deleteProduct,
        deleteAllProducts,
    }
}

export default makeProductsService();