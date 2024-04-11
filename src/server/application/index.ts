import { Context } from '~/server/application/context';

export class Application {
  private ctx: Context;

  constructor(...params: Parameters<typeof Context.create>) {
    this.ctx = Context.create(...params);
  }

  get resources() {
    return this.ctx.resources;
  }
}
