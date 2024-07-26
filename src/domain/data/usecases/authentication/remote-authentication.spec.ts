import { RemoteAuthentication } from './remote-authentication';
import { HttpPostClient } from "domain/data/protocols/http/http-post-client"

describe('RemoteAuthentication', () => {
    test('Should call HttpPostClient with corret URL', async () => {
        class HttpPostClientSpy implements HttpPostClient {
            url?: string

            async post(url: string): Promise<void> {
                this.url = url
                return Promise.resolve()
            }
        }
        const url = 'any_url'
        const httpPostClientSpy = new HttpPostClientSpy()
        const sut = new RemoteAuthentication(url, httpPostClientSpy)
        await sut.auth()
        expect(httpPostClientSpy.url).toBe(url)
    })
})