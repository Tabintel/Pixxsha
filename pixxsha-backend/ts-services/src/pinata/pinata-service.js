"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pinataService = void 0;
const pinata_web3_1 = require("pinata-web3");
const env_1 = require("../config/env");
const pinata = new pinata_web3_1.PinataSDK({
    pinataJwt: env_1.PINATA_JWT,
    pinataGateway: env_1.PINATA_GATEWAY,
});
exports.pinataService = {
    uploadFile: (file, title, userId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const upload = yield pinata.upload.file(file);
            const ipfsUrl = `https://gateway.pinata.cloud/ipfs/${upload.IpfsHash}`;
            const metadata = yield sendMetadataToGoService(userId, title, ipfsUrl);
            return { ipfsHash: upload.IpfsHash, ipfsUrl, metadata };
        }
        catch (error) {
            console.error("Error uploading file to Pinata:", error);
            throw error;
        }
    }),
    retrieveFile: (ipfsHash) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = yield pinata.gateways.get(ipfsHash);
            return data;
        }
        catch (error) {
            console.error("Error retrieving file from Pinata:", error);
            throw error;
        }
    })
};
function sendMetadataToGoService(userId, title, ipfsUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:8080/photos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_id: userId, title, url: ipfsUrl }),
        });
        return response.json();
    });
}
