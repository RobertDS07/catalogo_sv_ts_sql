export const schema = `
type Mutation {
    createUser(data: createUserInput) : Token!
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