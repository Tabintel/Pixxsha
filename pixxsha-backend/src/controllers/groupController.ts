import { Request, Response } from 'express';
import * as pinataService from '../services/pinataService';

export const createGroup = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const group = await pinataService.createGroup(name);
    res.status(201).json(group);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getGroup = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const group = await pinataService.getGroup(id);
    res.status(200).json(group);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const listGroups = async (req: Request, res: Response) => {
  try {
    const { name, offset, limit } = req.query;
    const groups = await pinataService.listGroups(name as string, Number(offset), Number(limit));
    res.status(200).json(groups);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateGroup = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const group = await pinataService.updateGroup(id, name);
    res.status(200).json(group);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteGroup = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await pinataService.deleteGroup(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addCidsToGroup = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { cids } = req.body;
    await pinataService.addCidsToGroup(id, cids);
    res.status(200).send('CIDs added to group successfully');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const removeCidsFromGroup = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { cids } = req.body;
    await pinataService.removeCidsFromGroup(id, cids);
    res.status(200).send('CIDs removed from group successfully');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
