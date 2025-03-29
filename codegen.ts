import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: process.env.APP_GRAPHQL_ENDPOINT,
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
