import * as Generation from '../stability-sdk/generation_pb';
import { GenerationServiceClient } from '../stability-sdk/generation_pb_service';
import { grpc as GRPCWeb } from '@improbable-eng/grpc-web';
import { NodeHttpTransport } from '@improbable-eng/grpc-web-node-http-transport';

GRPCWeb.setDefaultTransport(NodeHttpTransport());

const metadata = new GRPCWeb.Metadata();
metadata.set('Authorization', 'Bearer ' + process.env.STABILITY_API_KEY);

const client = new GenerationServiceClient('https://grpc.stability.ai', {});

export { metadata };
export { client };
