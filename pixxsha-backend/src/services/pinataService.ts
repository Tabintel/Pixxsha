import { PinataSDK } from 'pinata-web3';

const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT!,
  pinataGateway: process.env.PINATA_GATEWAY!,
});

// Upload a file to Pinata with optional tags and group assignment
export const uploadFile = async (file: File, tags: Record<string, string>, groupId?: string) => {
  try {
    const upload = await pinata.upload.file(file, {
      metadata: {
        name: file.name,
        keyvalues: tags,
      },
    });

    if (groupId) {
      await pinata.groups.addCids({
        groupId,
        cids: [upload.IpfsHash],
      });
    }

    return upload;
  } catch (error) {
    throw new Error(`Failed to upload file: ${error.message}`);
  }
};

// Retrieve a file from Pinata using its IPFS hash
export const retrieveFile = async (ipfsHash: string) => {
  try {
    const data = await pinata.gateways.get(ipfsHash);
    return data;
  } catch (error) {
    throw new Error(`Failed to retrieve file: ${error.message}`);
  }
};

// Create a new group in Pinata
export const createGroup = async (name: string) => {
  try {
    return await pinata.groups.create({ name });
  } catch (error) {
    throw new Error(`Failed to create group: ${error.message}`);
  }
};

// Get details of a specific group by ID
export const getGroup = async (groupId: string) => {
  try {
    return await pinata.groups.get({ groupId });
  } catch (error) {
    throw new Error(`Failed to get group: ${error.message}`);
  }
};

// List all groups with optional filtering by name, offset, and limit
export const listGroups = async (name?: string, offset?: number, limit?: number) => {
  try {
    const query = pinata.groups.list();
    if (name) query.name(name);
    if (offset) query.offset(offset);
    if (limit) query.limit(limit);
    return await query;
  } catch (error) {
    throw new Error(`Failed to list groups: ${error.message}`);
  }
};

// Update the name of a group
export const updateGroup = async (groupId: string, name: string) => {
  try {
    return await pinata.groups.update({ groupId, name });
  } catch (error) {
    throw new Error(`Failed to update group: ${error.message}`);
  }
};

// Delete a group by ID
export const deleteGroup = async (groupId: string) => {
  try {
    await pinata.groups.delete({ groupId });
  } catch (error) {
    throw new Error(`Failed to delete group: ${error.message}`);
  }
};

// Add CIDs to a group
export const addCidsToGroup = async (groupId: string, cids: string[]) => {
  try {
    await pinata.groups.addCids({ groupId, cids });
  } catch (error) {
    throw new Error(`Failed to add CIDs to group: ${error.message}`);
  }
};

// Remove CIDs from a group
export const removeCidsFromGroup = async (groupId: string, cids: string[]) => {
  try {
    await pinata.groups.removeCids({ groupId, cids });
  } catch (error) {
    throw new Error(`Failed to remove CIDs from group: ${error.message}`);
  }
};
