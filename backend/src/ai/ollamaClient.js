import axios from 'axios';
import { env } from '../config/env.js';

const client = axios.create({
  baseURL: env.ollamaBaseUrl,
  timeout: 60000,
});

export const generateWithOllama = async ({ system, prompt, format = 'json' }) => {
  const { data } = await client.post('/api/generate', {
    model: env.ollamaModel,
    prompt,
    system,
    stream: false,
    format,
  });

  if (!data?.response) {
    throw new Error('Ollama returned no response payload');
  }

  return data.response;
};
