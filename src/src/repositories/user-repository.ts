import { User } from '../entities'
import { NotFoundError, ValidationError } from '../errors'

export class UserRepository {
  public async findByEmail(email: string): Promise<User> {
    const row = {
      id: 1,
      email: email,
      password: 'row.password',
      role: 'row.role',
      firstName: 'row.first_name',
      lastName: 'row.last_name',
      created: 'row.created',
      updated: 'row.updated'
    };

    if (!row) {
      throw new NotFoundError('User does not exist')
    }

    return this.transform(row)
  }

  public async insert(user: User): Promise<User> {
    user.created = new Date()
    user.updated = new Date()

    try {
      user.id = 1

      return user
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        throw new ValidationError(`Email ${user.email} already exists`, err)
      }

      throw err
    }
  }

  public async update(user: User): Promise<User> {
    user.updated = new Date()

    return user
  }

  public async changePassword(
    email: string,
    newPassword: string
  ): Promise<void> {
    console.log(email);
    console.log(newPassword);
  }

  public async delete(userId: number): Promise<void> {
    try {
      console.log(userId);
    } catch (error) {
      throw error
    }
  }

  private transform(row: any): User {
    return {
      id: row.id,
      email: row.email,
      password: row.password,
      role: row.role,
      firstName: row.first_name,
      lastName: row.last_name,
      created: row.created,
      updated: row.updated
    }
  }
}
