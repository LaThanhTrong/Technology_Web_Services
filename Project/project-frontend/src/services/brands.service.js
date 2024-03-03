function makeBrandsService() {
    const baseUrl = '/api/brands'

    async function getBrands(name) {
        let url = `${baseUrl}`;
        if (name) url = `${baseUrl}?name=${name}`;
        else url = `${baseUrl}`;
        return await fetch(url).then((res) => res.json());
    }

    return {
        getBrands,
    }
}

export default makeBrandsService();