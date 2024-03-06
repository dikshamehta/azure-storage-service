const { BlobServiceClient, StorageSharedKeyCredential } = require("@azure/storage-blob");

function createBlobService(accountName, accessKey){
    const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accessKey);
    const blobService = new BlobServiceClient(
        `https://${accountName}.blob.core.windows.net`,
        sharedKeyCredential);
    return blobService;
}


async function getTheImage(accountName, accessKey, imagePath) {
    const blobService = createBlobService(accountName, accessKey);
    const containerName = "philosophers";
    const containerclient = blobService.getContainerClient(containerName);
    const blobClient = containerclient.getBlobClient(imagePath);

    const properties = await blobClient.getProperties();
    const response = await blobClient. download();
    return [response, properties];
}

module.exports = { getTheImage }