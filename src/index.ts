import express from 'express'
import { graphqlHTTP } from 'express-graphql'

import schema from './graphql/schemas'
import resolvers from './graphql/resolvers'

const app = express()

app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: true
}))

// const a = (async () => {
//     try{
//     const userAdmin = await User.create({ storeName: 'loja1', name: 'robert', email: 'robertaaa@gmail.com', password: '123456' })

//     const a = await User.findAll({include: Store})
//     console.log(a);
// } catch(e){
//     console.log(e);
    
// }
// })()

app.listen(8081, () => console.log('http://localhost:8081/graphql'))