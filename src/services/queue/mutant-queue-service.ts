
export interface MutantQueueService{
    executeSendMessage(dna: string[], isMutant:boolean): Promise<any>;
}