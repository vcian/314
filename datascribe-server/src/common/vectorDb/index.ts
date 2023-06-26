export const getVectorDbClass = () => {
  const { Pinecone } = require('../vectorDbProviders/pinecone');
  // import {Pinecone} from "../vectorDbProviders/pinecone"
  const vectorSelection = 'pinecone';
  switch (vectorSelection) {
    case 'pinecone':
      return Pinecone;
    default:
      throw new Error('ENV: No VECTOR_DB value found in environment!');
  }
};

export const toChunks = (arr, size) => {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_v, i) =>
    arr.slice(i * size, i * size + size),
  );
};

export const curateSources = (sources = []) => {
  const knownDocs = [];
  const documents = [];
  for (const source of sources) {
    const { metadata = {} } = source;
    if (
      Object.keys(metadata).length > 0 &&
      !knownDocs.includes(metadata.title)
    ) {
      documents.push({ ...metadata });
      knownDocs.push(metadata.title);
    }
  }

  return documents;
};
