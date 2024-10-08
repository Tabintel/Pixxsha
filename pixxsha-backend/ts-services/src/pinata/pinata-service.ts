import { PinataSDK } from "pinata-web3";
import { PINATA_JWT, PINATA_GATEWAY } from "../config/env";

const pinata = new PinataSDK({
  pinataJwt: PINATA_JWT,
  pinataGateway: PINATA_GATEWAY,
});

export const pinataService = {
  uploadFile: async (file: File) => {
    try {
      const upload = await pinata.upload.file(file);
      return upload;
    } catch (error) {
      console.error("Error uploading file to Pinata:", error);
      throw error;
    }
  },

  retrieveFile: async (ipfsHash: string) => {
    try {
      const data = await pinata.gateways.get(ipfsHash);
      return data;
    } catch (error) {
      console.error("Error retrieving file from Pinata:", error);
      throw error;
    }
  }
};
