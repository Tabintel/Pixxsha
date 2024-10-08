import express from 'express';
import { supabaseAuth } from './auth/supabase-auth';
import { pinataService } from './pinata/pinata-service';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Routes will be added here

app.listen(port, () => {
  console.log(`TypeScript service running on port ${port}`);
});
