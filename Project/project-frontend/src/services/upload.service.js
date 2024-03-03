function makeUploadService() {
    async function uploadFile(file) {
        const formData = new FormData();
        formData.append('file', file);
        return await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        }).then((res) => res.json());
    }

    return {
        uploadFile,
    }
}

export default makeUploadService();