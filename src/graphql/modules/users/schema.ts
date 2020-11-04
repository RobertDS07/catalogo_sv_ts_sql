const schema = `
type Query {
    login(data: loginInput): Token
    verifyToken(storeName: String, token: String!): VerifyToken
}

type Mutation {
    createUser(data: createUserInput) : Token!
    createAdmin(data: createAdminInput auth: String!): Boolean!
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

input createAdminInput {
    name: String!
    email: String!
    password: String!
    storeName: String!
}

type Token {
    token: String!
}

type VerifyToken {
    admin: Boolean!
}
`

export default schema
