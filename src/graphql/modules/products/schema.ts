import { buildSchema } from "graphql";

const schema = buildSchema(`
    type Mutation {
        createProduct(storeName: String! token: String! data: createProductInput): Boolean!
    }

    input createProductInput {
        fotourl: String!
        name: String!
        size: String!
        category: String!
        price: Float!
        description: String
    }
`)