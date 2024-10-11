import { app } from './app';
import { uploadPhoto } from './controllers/photoController';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const run = async () => {
  // Read test data from JSON file
  const testDataPath = path.join(__dirname, 'test', 'test-data.json');
  const testData = JSON.parse(fs.readFileSync(testDataPath, 'utf-8'));

  // Register a new user
  const user = await app.services.auth.register(testData.user.email, testData.user.password);
  console.log('Registered user:', user);

  // Upload test photo
  const photoMeta = {
    title: testData.photo.title,
    description: testData.photo.description,
  };
  const additionalViewerEmail = testData.photo.additionalViewerEmail;
  const photoPath = testData.asset.path;

  const { ipfsHash, supabasePhoto, supabasePhotoViewer } = await uploadPhoto(user.id, photoMeta, photoPath, additionalViewerEmail);
  console.log('IPFS Hash:', ipfsHash);
  console.log('Supabase photo:', supabasePhoto);
  console.log('Supabase photo viewer:', supabasePhotoViewer);
};

run().catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});
