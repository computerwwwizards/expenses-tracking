import type { LoginCtx } from "./types";


export interface LoginService {
  sendEmailForOTP(email: string): Promise<number>;
  loginWithOTP(otp: string): Promise<void>;
}


declare module './types.ts'{
  export interface LoginContainerServices{
    loginService: LoginService
  }
}

export default function plugin(ctx: LoginCtx){
  ctx.bind('loginService', {
    provider(){
      throw new Error();
    }
  })
}

if(import.meta.env.DEV){
  plugin.mock = function(ctx: LoginCtx){
    ctx
      .bind('loginService', {
        resolveDependencies(ctx){
          return ctx.get('mockAuthBridgeClient')
        },
        provider(dep){
          return {
            async loginWithOTP(_otp){
              dep.isAuth = true
            },
            async sendEmailForOTP(_email) {
              return 20000
            },
          }
        }
      })
  }
}