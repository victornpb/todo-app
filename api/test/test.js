process.env.NODE_ENV = 'test';

const request = require('supertest')
const app = require('../src/server')

// I ran out of time :(
// But the idea is to either spawn a fresh monogodb container
// which should be fine for this project, but for a bigger project,
// it would be smarter to use mongodb-memory-server or mockgoose (deprecated)
// 
// First we make a test connection to the database,
// then we proceed to test business logic
// 

// describe('Post Endpoints', () => {
//   it('should create a new post', async () => {
//     const res = await request(app)
//       .post('/api/posts')
//       .send({
//         userId: 1,
//         title: 'test is cool',
//       })
//     expect(res.statusCode).toEqual(201)
//     expect(res.body).toHaveProperty('post')
//   })
// })