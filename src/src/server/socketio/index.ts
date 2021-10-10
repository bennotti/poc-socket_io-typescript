import * as Koa from 'koa'
import * as Router from 'koa-router'
import { SocketIoController } from './controller'

export function init(server: Koa) {
  const router = new Router({ prefix: '/socketio-teste' })
  const controller = new SocketIoController()

  router.get(
    '/',
    controller.get.bind(controller)
  )

  server.use(router.routes())
}
