import {SendMessageCommand, SQSClient} from "@aws-sdk/client-sqs";
import {MutantQueueService} from "./mutant-queue-service";
import {injectable} from "inversify";

@injectable()
export class MutantQueueServiceImpl implements MutantQueueService {

    private client: any = new SQSClient({region: process.env.SQS_REGION});

    private params: any = {
        DelaySeconds: 10,
        QueueUrl: process.env.SQS_URL
    };

    async executeSendMessage(dna: string[], isMutant: boolean): Promise<any> {
        try {
            const data = this.client.send(new SendMessageCommand({
                ...this.params,
                MessageBody: {
                    dna: dna.join(''),
                    isMutant: isMutant
                },
                MessageAttributes: {
                    dna: {
                        DataType: "String",
                        StringValue: dna.join(''),
                    },
                    isMutant:{
                        DataType: "String",
                        StringValue: isMutant,
                    }
                },
            }));
        } catch (e) {
            console.error('Error in send queue: ', e)
        }
    }

}