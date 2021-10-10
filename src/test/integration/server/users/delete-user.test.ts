import { expect } from 'chai'
import * as supertest from 'supertest'
import {
  createTaskTest,
  createUserTest,
  getLoginToken,
  testServer
} from '../../server-utils'

describe('DELETE /api/v1/users/:id', () => {
  it('Should delete a user', async () => {
    await createUserTest({
      email: 'god@gmail.com',
      firstName: 'Jesus',
      lastName: 'Christ',
      password: 'godmode'
    })

    const adminToken = await getLoginToken('god@gmail.com', 'godmode')

    const user = await createUserTest({
      email: 'user@gmail.com',
      firstName: 'super',
      lastName: 'test',
      password: 'test'
    })

    const userToken = await getLoginToken('user@gmail.com', 'test')
    await createTaskTest(
      {
        name: 'Do Something',
        description: 'Some random description'
      },
      userToken
    )

    await createTaskTest(
      {
        name: 'Do Something',
        description: 'Some random description'
      },
      userToken
    )

    await supertest(testServer)
      .delete(`/api/v1/users/${user.id}`)
      .set('Authorization', adminToken)
      .expect(204)

    expect(0).eql(0)
  })

  it('Should return not allowed error', async () => {
    await createUserTest({
      email: 'god@gmail.com',
      firstName: 'Jesus',
      lastName: 'Christ',
      password: 'godmode'
    })

    const user = await createUserTest({
      email: 'dude@gmail.com',
      firstName: 'super',
      lastName: 'test',
      password: 'test'
    })

    const token = await getLoginToken('god@gmail.com', 'godmode')

    await supertest(testServer)
      .delete(`/api/v1/users/${user.id}`)
      .set('Authorization', token)
      .expect(403)
  })

  it('Should return unauthorized when token is not valid', async () => {
    const res = await supertest(testServer)
      .delete('/api/v1/users/${user.id}')
      .set('Authorization', 'wrong token')
      .expect(401)

    expect(res.body.code).equals(30002)
  })

  it('Should return unauthorized when token is missing', async () => {
    const res = await supertest(testServer)
      .delete('/api/v1/users/1')
      .expect(401)

    expect(res.body.code).equals(30002)
  })
})
