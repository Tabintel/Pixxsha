import { app } from './app';
import { config } from './config/config';

const PORT = config.port || 3000;

app.listen(PORT, () => {
  console.log(`Pixxsha server running on port ${PORT}`);
});
