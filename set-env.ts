const { writeFile } = require('fs');

require('dotenv').config();

const isProduction = process.env['NODE_ENV'] === 'production';

const targetPth = isProduction
  ? './src/app/env/env.prod.ts'
  : './src/app/env/env.ts';

const envFileContent = `
export const envirnoment = {
    production: ${isProduction},
    BASE_URL: '${process.env['BASE_URL']}',
  };
  
`;
writeFile(targetPth, envFileContent, (err: any) => {
  if (err) {
    throw console.error(err);
  }
});
