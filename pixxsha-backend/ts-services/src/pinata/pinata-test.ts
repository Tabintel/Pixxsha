import { pinataService } from './pinata-service';
import fs from 'fs';
import path from 'path';

async function testPinataService() {
  try {
    // Create a test file
    const filePath = path.join(__dirname, '..', 'assets', 'test-image.jpeg');
    const file = new File([fs.readFileSync(filePath)], "test-image.jpeg", { type: "image/jpeg" });
    
    // Test file upload
    const uploadResult = await pinataService.uploadFile(file);
    console.log("Upload result:", uploadResult);

    // Test file retrieval
    const retrieveResult = await pinataService.retrieveFile(uploadResult.IpfsHash);
    console.log("Retrieve result:", retrieveResult);

  } catch (error) {
    console.error("Test failed:", error);
  }
}

testPinataService();
