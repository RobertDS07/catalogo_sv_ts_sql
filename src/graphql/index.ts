import { buildSchema } from 'graphql'

export const schema = buildSchema(`
    type Query {
        hello: String!
    }
`)

export const resolvers = {
    hello: 'hello'
}