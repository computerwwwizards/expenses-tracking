import type { Ctx } from "./types";

export interface User {
  getFullName(): Promise<string>;
  getEmail(): Promise<string>;
  id: string;
}

declare module './types.ts' {
  export interface GlobalServices{
    user: User;
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
    ctx.bind('user', {
      provider() {
        return {
          async getEmail() {
            return 'pepito@a.com'
          },
          async getFullName() {
            return 'Pepito gomez'
          },
          id: 'pepito'
        }
      },
    })
  }