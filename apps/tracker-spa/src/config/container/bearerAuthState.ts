import type { Ctx } from "./types";


export interface BearerAuthState {
  isAuthenticated(): Promise<boolean>;
  getAccessToken(): Promise<string>;
  expiresAt: Date;
}

export interface MockAuthBride{
  isAuth: boolean;
  bearerToken?: string;
}

declare module './types.ts' {
  export interface GlobalServices{
    bearerAuthState: BearerAuthState;
    mockAuthBridgeClient: MockAuthBride
  }
}

export default function plugin(ctx: Ctx){
  ctx.bind('bearerAuthState', {
    provider() {
      throw new Error();
    },
  })
}

if(import.meta.env.DEV)
  plugin.mock = (ctx: Ctx)=>{
    ctx
      .bind('mockAuthBridgeClient', {
        scope: "singleton",
        provider(){
          return {
            isAuth: false,
            bearerToken: ''
          }
        }
      })
      .bind('bearerAuthState', {
        resolveDependencies(ctx) {
          return ctx.get('mockAuthBridgeClient')
        },
        provider(dep){
          return {
            expiresAt: new Date(),
            async getAccessToken() {
              return dep.bearerToken ?? ''
            },
            async isAuthenticated() {
              return dep.isAuth
            },
          }
        }
    })
  }