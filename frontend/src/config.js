const dev = {
    baseUrl: "https://localhost:5001/api/DocumentStore",
    uploadEndpoint: "upload",
    listDocuments: 'documents'
}

const prod = {
    baseUrl: "https://localhost:5001/api/DocumentStore",
    uploadEndpoint: "upload",
    listDocuments: 'documents'
}

function getConfig() {
    return dev;
}

export const config = getConfig();


