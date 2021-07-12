import * as express from 'express';
import {interfaces, controller, httpPost, request, response} from "inversify-express-utils";
import {inject} from "inversify";
import {APPLICATION} from "../types/types";
import {MutantValidationService} from "../services/validation/mutant-validation-service";
import {MutantQueueService} from "../services/queue/mutant-queue-service";

@controller("/")
export class MutantController implements interfaces.Controller {

    constructor(@inject(APPLICATION.MutantValidationService)
                private mutantValidateService: MutantValidationService, @inject(APPLICATION.MutantQueueService)
                private mutantQueueService: MutantQueueService) {
    }

    @httpPost("mutant/")
    public getList(@request() req: express.Request, @response() res: express.Response) {
        return this.mutantValidateService.executeMutantService(req)
            .then(() => {
                this.mutantQueueService.executeSendMessage(req.body.dna, true);
                res.status(200);
                res.send('{}');
                return res;
            })
            .catch(() => {
                this.mutantQueueService.executeSendMessage(req.body.dna, false);
                res.status(403);
                res.send('{}');
                return res;
            });


    }

}

