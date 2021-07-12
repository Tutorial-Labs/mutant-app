import 'reflect-metadata';
import {InversifyExpressServer} from 'inversify-express-utils';
import actuator from 'express-actuator';
import * as bodyParser from 'body-parser';
import {AppContainer} from "./assembler";

// tslint:disable-next-line:no-var-requires
require('dotenv').config();

const server = new InversifyExpressServer(AppContainer);
const PORT = process.env.PORT || 3000;


server.setConfig((app) => {
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(actuator());
});

const serverInstance = server.build();
serverInstance.listen(PORT, () => {
    console.log('Server running on port %d, version', PORT, process.env.VERSION);
});


