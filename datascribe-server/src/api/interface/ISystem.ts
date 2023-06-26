import { Workspace } from '../../common/model';
import status_code from '../../common/utils/StatusCodes';
import * as l10n from 'jm-ez-l10n';
import fs from 'fs';
import path from 'path';
import { cachedVectorInformation } from '../../common/utils/helper';

export default class ISystem {
  static async getLocalFiles() {
    try {
      const folder =
        process.env.NODE_ENV === 'development'
          ? path.resolve(__dirname, `../../storage/documents`)
          : path.resolve(process.env.STORAGE_DIR, `documents`);
      const dirExists = fs.existsSync(folder);
      if (!dirExists) fs.mkdirSync(folder);

      const directory = {
        name: 'documents',
        type: 'folder',
        items: [],
      };

      for (const file of fs.readdirSync(folder)) {
        if (path.extname(file) === '.md') continue;

        const folderPath =
          process.env.NODE_ENV === 'development'
            ? path.resolve(__dirname, `../../storage/documents/${file}`)
            : path.resolve(process.env.STORAGE_DIR, `documents/${file}`);

        const isFolder = fs.lstatSync(folderPath).isDirectory();
        if (isFolder) {
          const subdocs = {
            name: file,
            type: 'folder',
            items: [],
          };
          const subfiles = fs.readdirSync(folderPath);

          for (const subfile of subfiles) {
            if (path.extname(subfile) !== '.json') continue;
            const filePath = path.join(folderPath, subfile);
            const rawData = fs.readFileSync(filePath, 'utf8');
            const cachefilename = `${file}/${subfile}`;
            const { pageContent, ...metadata } = JSON.parse(rawData);

            subdocs.items.push({
              name: subfile,
              type: 'file',
              ...metadata,
              cached: await cachedVectorInformation(cachefilename, true),
            });
          }
          directory.items.push(subdocs);
        }
      }

      // return directory;
      return {
        status: status_code.CREATED,
        message: l10n.t('COMMON_SUCCESS_MESSAGE', {
          key: 'file',
          method: 'get',
        }),
        data: directory,
      };
    } catch (error) {
      console.log(error);
      return {
        status: status_code.INTERNAL_SERVER_ERROR,
        message: l10n.t('SOMETHING_WENT_WRONG'),
      };
    }
  }
}
