import type { Ctx } from "./types";

export interface Workspace {
  getName(): Promise<string>;
  getId(): Promise<string>;
  getIcon(): Promise<string>;
  getColor(): Promise<string>;
}

declare module './types.ts' {
  export interface GlobalServices{
    workspace: Workspace;
  }
}

export default function plugin(ctx: Ctx){
  ctx.bind('workspace', {
    provider() {
      throw new Error();
    },
  })
}

if(import.meta.env.DEV)
  plugin.mock = (ctx: Ctx)=>{
    ctx.bind('workspace', {
      provider() {
        return {
          async getId() {
            return ''
          },
          async getName() {
            return ''
          },
        }
      },
    })
  }