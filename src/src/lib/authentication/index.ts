import * as jwt from 'jsonwebtoken'
import { UnauthorizedError } from '../../errors'

export interface AuthUser {
  id: number
  email: string
}

export enum Role {
  user = 'user',
  admin = 'admin'
}

export interface Authenticator {
  validate(token: string): Promise<AuthUser>
  authenticate(user: AuthUser): string
}

export class JWTAuthenticator implements Authenticator {
  private secret: string

  constructor() {
    this.secret = process.env.SECRET_KEY || 'secret'
  }

  public async validate(token: string): Promise<AuthUser> {
    try {
      const decode: any = jwt.verify(token, this.secret)

      return {
        id: 0,
        email: decode.email
      }
    } catch (err) {
      throw new UnauthorizedError(err)
    }
  }

  public authenticate(user: AuthUser): string {
    return jwt.sign(
      { id: user.id, email: user.email },
      this.secret,
      {
        expiresIn: 60 * 60
      }
    )
  }
}
