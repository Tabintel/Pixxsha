import { pinataService } from './pinata-service';
import fs from 'fs';
import path from 'path';
import axios from 'axios';

async function testPinataService() {
  try {
    const filePath = path.join(__dirname, '..', 'assets', 'test-image.jpeg');
    const fileBuffer = fs.readFileSync(filePath);
    const file = new File([fileBuffer], "test-image.jpeg", { type: "image/jpeg" });
    
    const userId = 'test-user-id';
    const title = 'Test Photo';

    console.log('Starting file upload...');
    const result = await pinataService.uploadFile(file, title, userId);
    console.log("Upload result:", result);

  } catch (error: unknown) {
    console.error("Test failed:", error);
    if (axios.isAxiosError(error) && error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
    }
  }
}

testPinataService();
