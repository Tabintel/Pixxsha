import { PinataSDK } from 'pinata-web3';
import fs from 'fs/promises';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Initialize Pinata SDK with the correct environment variables
const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT!,
  pinataGateway: process.env.PINATA_GATEWAY!
});

// Define the photo data structure
interface PhotoData {
  id: string;
  user_id: string;
  ipfs_hash: string;
  metadata: Record<string, unknown>;
}

// In-memory stores for managing links
const viewOnceLinks = new Set(); // Store used view once links
const restrictedLinks = new Map(); // Map of restricted links with user access

// Base IPFS gateway URL
const baseGatewayURL = 'https://gateway.pinata.cloud/ipfs/';

// Generate public and view once links
function generateLinks(ipfsHash: string, userId: string) {
  const publicLink = `${baseGatewayURL}${ipfsHash}`;

  // View once link logic
  const viewOnceLink = () => {
    if (!viewOnceLinks.has(ipfsHash)) {
      viewOnceLinks.add(ipfsHash);
      return `${baseGatewayURL}${ipfsHash}?view=once`;
    } else {
      throw new Error('This view once link has already been used.');
    }
  };

  return { publicLink, viewOnceLink: viewOnceLink() };
}

// Check if a user has access to a restricted link
function hasAccessToRestrictedLink(ipfsHash: string, userId: string) {
  const allowedUsers = restrictedLinks.get(ipfsHash) || [];
  return allowedUsers.includes(userId);
}

// Example function to simulate the Pixxsha flow
async function simulatePixxsha() {
  try {
    // Load test data from a file
    const testData = JSON.parse(await fs.readFile(path.join(__dirname, '../test/test-data.json'), 'utf-8'));

    // Read the file from the test assets folder
    const filePath = path.join(__dirname, '../test/assets', testData.photo.filename);
    const fileContent = await fs.readFile(filePath);

    // Upload the file to Pinata IPFS
    const file = new File([fileContent], testData.photo.filename, { type: 'image/jpeg' });
    const uploadResult = await pinata.upload.file(file);
    console.log('Photo uploaded to IPFS:', uploadResult);

    // Generate links
    const { publicLink, viewOnceLink } = generateLinks(uploadResult.IpfsHash, testData.user.id);
    console.log('Public Link:', publicLink);
    console.log('View Once Link:', viewOnceLink);

    // Example of restricted link logic
    const restrictedLinkHash = uploadResult.IpfsHash; // Use the same IPFS hash for this example
    restrictedLinks.set(restrictedLinkHash, [testData.user.id]); // Allow only this user
    if (hasAccessToRestrictedLink(restrictedLinkHash, testData.user.id)) {
      console.log(`Restricted Link: ${publicLink}?restricted=true`);
    } else {
      console.log('You do not have permission to access this restricted link.');
    }

    console.log('Simulation completed successfully!');
  } catch (error) {
    console.error('Simulation failed:', error);
  }
}

simulatePixxsha();
