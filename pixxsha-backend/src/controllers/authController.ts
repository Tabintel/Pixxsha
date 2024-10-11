import { Request, Response } from 'express';
import { createClient } from '@supabase/supabase-js';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';

const supabase = createClient(config.supabaseUrl!, config.supabaseKey!);

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const { user, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const { user, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    const token = jwt.sign({ userId: user.id }, config.jwtSecret!, { expiresIn: '1d' });

    res.json({ token, user });
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
};
