const { v5: uuidv5 } = require('uuid');
const fs = require('fs');
const path = require('path');
import axios from 'axios';
export const cachedVectorInformation = async (
  filename = null,
  checkOnly = false,
) => {
  try {
    if (!process.env.CACHE_VECTORS)
      return checkOnly ? false : { exists: false, chunks: [] };
    if (!filename) return checkOnly ? false : { exists: false, chunks: [] };

    const digest = uuidv5(filename, uuidv5.URL);
    const file = path.resolve(
      __dirname,
      `../../storage/vector-cache/${digest}.json`,
    );
    const exists = fs.existsSync(file);

    if (checkOnly) return exists;
    if (!exists) return { exists, chunks: [] };

    console.log(
      `Cached vectorized results of ${filename} found! Using cached data to save on embed costs.`,
    );
    const rawData = fs.readFileSync(file, 'utf8');
    return { exists: true, chunks: JSON.parse(rawData) };
  } catch (error) {}
};
const PYTHON_API = 'http://0.0.0.0:5000';

export const checkPythonAppAlive = async () => {
  return await axios
    .get(`${PYTHON_API}`)
    .then((res: any) => true)
    .catch((e) => false);
};

export const processDocument = async (filename = '') => {
  if (!filename) return false;
  return await axios
    .post(
      `${PYTHON_API}/process`,
      { filename },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    .then((res) => {
      return res.data;
    })
    .then((res) => res)
    .catch((e) => {
      return { success: false, reason: e.message };
    });
};

export const fileData = async (filePath = null) => {
  if (!filePath) throw new Error('No docPath provided in request');

  const fullPath = path.resolve(
    __dirname,
    `../../storage/documents/${filePath}`,
  );
  const fileExists = fs.existsSync(fullPath);
  if (!fileExists) return null;

  const data = fs.readFileSync(fullPath, 'utf8');
  return JSON.parse(data);
};

// vectorData: pre-chunked vectorized data for a given file that includes the proper metadata and chunk-size limit so it can be iterated and dumped into Pinecone, etc
// filename is the fullpath to the doc so we can compare by filename to find cached matches.
export const storeVectorResult = async (vectorData = [], filename = null) => {
  if (!process.env.CACHE_VECTORS) return false;
  if (!filename) return false;
  console.log(
    `Caching vectorized results of ${filename} to prevent duplicated embedding.`,
  );
  const folder =
    process.env.NODE_ENV === 'development'
      ? path.resolve(__dirname, `../../storage/vector-cache`)
      : path.resolve(process.env.STORAGE_DIR, `vector-cache`);

  if (!fs.existsSync(folder)) fs.mkdirSync(folder);

  const digest = uuidv5(filename, uuidv5.URL);
  const writeTo = path.resolve(folder, `${digest}.json`);
  fs.writeFileSync(writeTo, JSON.stringify(vectorData), 'utf8');
  return true;
};
