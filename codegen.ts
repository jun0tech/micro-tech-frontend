import { CodegenConfig } from '@graphql-codegen/cli';
import { loadEnv } from 'vite';

const env = loadEnv('', process.cwd(), '');
const apiUrl = env.APP_GRAPHQL_ENDPOINT;
const config: CodegenConfig = {
  // schema: process.env.APP_GRAPHQL_ENDPOINT,
  schema: apiUrl,
  documents: ['src/**/*.{ts,tsx}'],
  generates: {
    "./src/generated/": {
      preset: "client",
      presetConfig: {
        gqlTagName: "gql",
      },
      plugins: [
        'typescript',
        'typescript-operations',
      ],
    },
  },
  ignoreNoDocuments: true,
};

export default config;
