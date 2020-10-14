export const schema = `
type Query {
    login(data: loginInput): Token
}

input loginInput{
    email: String!
    password: String!
}

type Token {
    token: String!
}
`