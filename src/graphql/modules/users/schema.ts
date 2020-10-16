export const schema = `
type Query {
    login(data: loginInput): Token
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
`