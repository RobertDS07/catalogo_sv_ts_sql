import express from 'express'
import { graphqlHTTP } from 'express-graphql'

import { schema, resolvers } from './graphql'

const app = express()

app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: true
}))

app.listen(8081, () => console.log('http://localhost:8081/graphql'))