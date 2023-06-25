import * as bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import common_routes from '../../api';
import config from '../config';
import statusCode from '../utils/StatusCodes';

export default ({ app }) => {

    /* Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
    It shows the real origin IP in the heroku or Cloudwatch logs */
    app.enable('trust proxy');

    /* The magic package that prevents frontend developers going nuts
      Alternate description: Enable Cross Origin Resource Sharing to all origins by default */
    app.use(cors());

    /* Middleware that transforms the raw string of req.body into json */
    app.use(bodyParser.json({ limit: '50mb' }));
    /* support parsing of application/x-www-form-urlencoded post data */
    app.use(
        bodyParser.urlencoded({
            limit: '150mb',
            extended: true,
            parameterLimit: 500000000
        })
    );

    app.set('views', 'src/views');
    app.set('view engine', 'ejs');

    // Load API routes
    app.use(config.API_PREFIX, common_routes());

    app.use((err: any, req: any, res: any, next: any) => {
        // if (isCelebrateError) { //if joi produces an error, it's likely a client-side problem
        //     if (err.details.get('body')) {

        //         const errorBody = err.details.get('body'); // 'details' is a Map()
        //         let { details } = errorBody;
        //         details = details[0];
        //         return res.status(statusCode.BAD_REQUEST).json({ status: statusCode.BAD_REQUEST, message: details.message });

        //     } else if (err.details.get('query')) {

        //         const errorBody = err.details.get('query'); // 'details' is a Map()
        //         let { details } = errorBody;
        //         details = details[0];
        //         return res.status(statusCode.BAD_REQUEST).json({ status: statusCode.BAD_REQUEST, message: details.message });

        //     } else if (err.details.get('params')) {

        //         const errorBody = err.details.get('params'); // 'details' is a Map()
        //         let { details } = errorBody;
        //         details = details[0];
        //         return res.status(statusCode.BAD_REQUEST).json({ status: statusCode.BAD_REQUEST, message: details.message });

        //     } else if (err.details.get('headers')) {

        //         const errorBody = err.details.get('headers'); // 'details' is a Map()
        //         let { details } = errorBody;
        //         details = details[0];
        //         return res.status(statusCode.BAD_REQUEST).json({ status: statusCode.BAD_REQUEST, message: details.message });
        //     }
        // }
        next(err);
    });

    /* Catch 404 and forward to error handler */
    app.use((req, res, next) => {
        const err = new Error('Route Not Found');
        err['status'] = statusCode.NOTFOUND;
        next(err);
    });

    /* Error handlers */
    app.use((err: any, req: any, res: any, next: any) => {
        /* Handle 401 thrown by express-jwt library */
        if (err.name === 'UnauthorizedError') {
            return res.status(err.status).send({ message: err.message }).end();
        }
        return next(err);
    });
    app.use((err: any, req: any, res: any, next: any) => {
        res.status(err.status || statusCode.INTERNAL_SERVER_ERROR);
        res.json({ errors: { message: err.message } });
    });
};
