import type { LoginCtx } from "./types";


export interface LoginService {
  sendEmailForOTP(email: string): Promise<number>;
  //TODO: this is a problem, this interface do not get the user from a specific place but is stateless
  // is this the correct design?
  loginWithOTP(otp: string, email?: string): Promise<{userName?: string; email?: string}>;
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
            async loginWithOTP(){
              dep.isAuth = true;

              return {
                userName: 'Shadow'
              }
            },
            async sendEmailForOTP() {
              return 20000
            },
          }
        }
      })
  }
}