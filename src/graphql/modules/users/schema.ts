export const schema = `
type Query {
    login(data: loginInput): Token
    verifyToken(storeName: String, token: String!): VerifyToken
}

type Mutation {
    createUser(data: createUserInput) : Token!
}

input loginInput{
    email: String!
    password: String!
}

input createUserInput {
    name: String!
    email: String!
    password: String!
}

type Token {
    token: String!
}

type VerifyToken {
    admin: Boolean!
}
`