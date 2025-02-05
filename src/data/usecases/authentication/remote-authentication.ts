import { HttpPostClient } from "@/data/protocols/http/http-post-client";
import { HttpStatusCode } from "@/data/protocols/http/http-response";
import { InvalidCredentialsError } from "@/domain/errors/invalid-credential-error";
import { UnexpectedError } from "@/domain/errors/unexpected-error";
import { AccountModel } from "@/domain/model/account-model";
import { AuthenticationParams } from "@/domain/usecases/authentication";


export class RemoteAuthentication {
    constructor(
        private readonly url: string,
        private readonly httpPostClient: HttpPostClient<AuthenticationParams, AccountModel>
    ) { }

    async auth(params: AuthenticationParams): Promise<void> {
        const httpResponse = await this.httpPostClient.post({
            url: this.url,
            body: params
        })
        switch (httpResponse.statusCode) {
            case HttpStatusCode.ok:

                break;
            case HttpStatusCode.unathorized:
                throw new InvalidCredentialsError()
                break;
            default:
                throw new UnexpectedError()
        }
    }
}