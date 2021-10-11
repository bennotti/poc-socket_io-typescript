import { Logger } from 'pino'
import { Authenticator, JWTAuthenticator } from './lib/authentication'
import { BCryptHasher, Hasher } from './lib/hasher'
import { HealthMonitor } from './lib/health'

export interface ServiceContainer {
  health: HealthMonitor
  logger: Logger
  lib: {
    hasher: Hasher
    authenticator: Authenticator
  }
}

export function createContainer(logger: Logger): ServiceContainer {
  const hasher = new BCryptHasher()
  const authenticator = new JWTAuthenticator()
  const healthMonitor = new HealthMonitor()

  return {
    health: healthMonitor,
    logger,
    lib: {
      hasher,
      authenticator
    }
  }
}
