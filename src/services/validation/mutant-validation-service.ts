import * as express from "express";

export interface MutantValidationService {
    executeMutantService(req: express.Request): Promise<any>;
}