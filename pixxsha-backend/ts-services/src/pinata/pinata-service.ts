import { PinataSDK } from "pinata-web3";
import { PINATA_JWT, PINATA_GATEWAY } from "../config/env";
import { photoService } from "./services/photo-service";

const pinata = new PinataSDK({
  pinataJwt: PINATA_JWT,
  pinataGateway: PINATA_GATEWAY,
});

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

async function retryUpload(file: File, retries = 0): Promise<any> {
  try {
    return await pinata.upload.file(file);
  } catch (error) {
    if (retries < MAX_RETRIES) {
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      return retryUpload(file, retries + 1);
    }
    throw error;
  }
}

export const pinataService = {
  uploadFile: async (file: File, title: string, userId: string) => {
    try {
      // Verify Pinata API connection
      await axios.get('https://api.pinata.cloud/data/testAuthentication', {
        headers: { Authorization: `Bearer ${PINATA_JWT}` }
      });

      const upload = await pinata.upload.file(file);
      const ipfsUrl = `https://gateway.pinata.cloud/ipfs/${upload.IpfsHash}`;
      return { ipfsHash: upload.IpfsHash, ipfsUrl, title, userId };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Pinata API connection error:", error.response?.data || error.message);
      } else {
        console.error("Error uploading file to Pinata:", error);
      }
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
