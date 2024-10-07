
import { PinataSDK } from "pinata-web3";
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT!,
  pinataGateway: process.env.PINATA_GATEWAY!,
});

async function testUpload() {
  try {
    // Create a test file
    const filePath = path.join(__dirname, 'assets', 'test-image.jpeg');
    const file = new File([fs.readFileSync(filePath)], "test-image.jpeg", { type: "image/jpeg" });
    
    const upload = await pinata.upload.file(file);
    console.log("Upload result:", upload);

    // Retrieve the uploaded file
    const data = await pinata.gateways.get(upload.IpfsHash);
    console.log("Retrieved data:", data);
  } catch (error) {
    console.error("Error:", error);
  }
}

testUpload();
