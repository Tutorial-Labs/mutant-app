import {Container} from "inversify";
import "reflect-metadata";
import {MutantController} from "./controller/mutant-controller";
import {MutantValidationService} from "./services/validation/mutant-validation-service";
import {APPLICATION} from "./types/types";
import {MutantValidationServiceImpl} from "./services/validation/mutant-validation-service-impl";
import {MutantQueueService} from "./services/queue/mutant-queue-service";
import {MutantQueueServiceImpl} from "./services/queue/mutant-queue-service-impl";

export const AppContainer = new Container();

/* Component */
AppContainer.bind<MutantController>(MutantController).to(MutantController);
AppContainer.bind<MutantValidationService>(APPLICATION.MutantValidationService).to(MutantValidationServiceImpl);
AppContainer.bind<MutantQueueService>(APPLICATION.MutantQueueService).to(MutantQueueServiceImpl);
