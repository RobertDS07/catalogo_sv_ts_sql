import veirifyData from '../../src/utils/verifyData'
import verifyToken from '../../src/utils/verifyToken'

describe('utils', () => {
    describe('verifyData', () => {
        it('Should return error if the request dont have nothing', () => {
            interface data {
                email: string
                password: string
            }
            const data = {
                email: 'robertdamaceno@gmail.com',
                password: ''
            }
            expect(() => veirifyData<data>(data)).toThrowError(Error('Preencha todo os campos!'))
        })
        it('Should not return a error with same function to verifyData', () => {
            interface data {
                email: string
                password: string
            }
            const data = {
                name: 'robert',
                email: 'robertdamaceno@gmail.com',
                password: '123123'
            }
            expect(veirifyData<data>(data)).toStrictEqual(undefined)
        })
    })

    describe('token', () => {
        it('Should return a true for verified token', async () => {
            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJhZG1pbiI6ZmFsc2V9LCJpYXQiOjE2MDI3MDcyNjMsImV4cCI6MTYzNDI0MzI2M30.WHGk0hdgqNFPpjWrppQ8ZWmCllK8xF9BByxgZx9p3U4'
            expect(await verifyToken(token)).toBeTruthy()
        })
        it('Should return a error for invalid token', async () => {
            const token = 'eyJhbGciOiJIUzI1NiIasInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJhZG1pbiI6ZmFsc2V9LCJpYXQiOjE2MDI3MDcyNjMsImV4cCI6MTYzNDI0MzI2M30.WHGk0hdgqNFPpjWrppQ8ZWmCllK8xF9BByxgZx9p3U4'
            expect(await verifyToken(token)).toBeFalsy()
        })
    })
})