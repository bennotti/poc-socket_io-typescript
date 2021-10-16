import { createReadStream } from 'fs';
import { Context } from 'koa'

export class SocketIoClientController {
  public async get(ctx: Context) {
    ctx.type = 'html';
    ctx.body = createReadStream('/app/index.html');
    ctx.status = 200
  }
}
