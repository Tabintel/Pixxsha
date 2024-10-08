  import { PinataService } from './services/PinataService';
  import fs from 'fs';
  import path from 'path';

  async function testPinataService() {
    const pinataService = new PinataService();

    try {
      const filePath = path.join(__dirname, 'assets', 'test-image.jpeg');
      const fileBuffer = fs.readFileSync(filePath);

      const ipfsHash = await pinataService.uploadFile(fileBuffer, "test-image.jpeg");
      console.log("Upload result:", ipfsHash);

      const retrievedFile = await pinataService.getFile(ipfsHash);
      console.log("Retrieved file size:", retrievedFile.byteLength);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  testPinataService();