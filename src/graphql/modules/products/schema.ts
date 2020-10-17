import { buildSchema } from "graphql";

const schema = buildSchema(`
    type Mutation {
        createProduct(storeName: String! token: String! data: createProductInput!): Boolean!
        updateProduct(storeName: String! token: String! id:Int! data: updateProductInput!): Boolean!
        deleteProduct(storeName: String! token: String! id:Int!): Boolean!
    }

    input createProductInput {
        fotourl: String!
        name: String!
        size: String!
        category: String!
        price: Float!
        description: String
    }

    input updateProductInput {
        fotourl: String
        name: String
        size: String
        category: String
        price: Float
        description: String
    }
`)