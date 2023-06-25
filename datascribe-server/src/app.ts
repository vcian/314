import express from 'express';
import * as path from 'path';
import config from './common/config';
import commonRoutes from './api/index';
import cors from 'cors';
import morgan from 'morgan';
import * as l10n from 'jm-ez-l10n';
import status_code from './common/utils/StatusCodes';
import * as bodyParser from 'body-parser';
import multipart from 'connect-multiparty';
import { isCelebrateError } from 'celebrate';
import connectDB from './common/loaders/database';

async function startServer() {
  const app = express();

  await connectDB();
  app.enable('trust proxy');
  app.use(bodyParser.json({ limit: '50mb' }));

  app.use(express.static(path.join(__dirname, 'public')));
  l10n.setTranslationsFile(
    'en',
    __dirname + '/common/language/translation.en.json',
  );
  app.use(l10n.enableL10NExpress);

  app.use(
    morgan(
      'method: :method :url status: :status :res[content-length] response-time: :response-time ms',
    ),
  );
  app.use(cors());
  app.use(commonRoutes());
  app.use((err: any, req: any, res: any, next: any) => {
    if (isCelebrateError) {
      //if joi produces an error, it's likely a client-side problem
      if (err.details.get('body')) {
        const errorBody = err.details.get('body'); // 'details' is a Map()
        let { details } = errorBody;
        details = details[0];
        return res.status(status_code.BAD_REQUEST).json({
          status: status_code.BAD_REQUEST,
          message: details.message,
        });
      } else if (err.details.get('query')) {
        const errorBody = err.details.get('query'); // 'details' is a Map()
        let { details } = errorBody;
        details = details[0];
        return res.status(status_code.BAD_REQUEST).json({
          status: status_code.BAD_REQUEST,
          message: details.message,
        });
      } else if (err.details.get('params')) {
        const errorBody = err.details.get('params'); // 'details' is a Map()
        let { details } = errorBody;
        details = details[0];
        return res.status(status_code.BAD_REQUEST).json({
          status: status_code.BAD_REQUEST,
          message: details.message,
        });
      } else if (err.details.get('headers')) {
        const errorBody = err.details.get('headers'); // 'details' is a Map()
        let { details } = errorBody;
        details = details[0];
        return res.status(status_code.BAD_REQUEST).json({
          status: status_code.BAD_REQUEST,
          message: details.message,
        });
      }
    }
    next(err);
  });
  app.use((req, res, next) => {
    const err = new Error('Route Not Found');
    err['status'] = status_code.NOTFOUND;
    next(err);
  });
  app.use((err: any, req: any, res: any, next: any) => {
    res.status(err.status || status_code.INTERNAL_SERVER_ERROR);
    res.json({ errors: { message: err.message } });
  });
  // console.log(path.resolve(__dirname, '../collector/hotdir/'));
  // app.use(
  //   multipart({ uploadDir: path.resolve(__dirname, '../collector/hotdir/') }),
  // );

  const server = app.listen(config.PORT, (err?: any) => {
    if (err) {
      process.exit(1);
    }
    console.log(`
		##################################################################
		🛡️  Server listening on port: \x1b[37m\x1b[1m ${config.PORT} \x1b[0m with node version: \x1b[37m\x1b[1m ${process.versions.node} \x1b[0m 🛡️
		##################################################################
		`);
  });
}

startServer();
