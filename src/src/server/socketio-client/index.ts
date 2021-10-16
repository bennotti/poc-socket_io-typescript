import * as Koa from 'koa'
import * as Router from 'koa-router'
import { SocketIoClientController } from './controller'

export function init(server: Koa) {
  const router = new Router({ prefix: '/socketio-client' })
  const controller = new SocketIoClientController()

  router.get(
    '/',
    controller.get.bind(controller)
  )

  server.use(router.routes())
}
