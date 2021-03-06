const schema = `
    type Query {
        getProducts(storeName: String! offset: Int! limit: Int! sort: String search: String category: String): Products!
        getProduct(storeName: String! id: Int!): Product!
        getCategories( storeName: String! ): [ProductsOnlyCategories!]!
    }

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

    type Product {
        id: Int
        fotourl: String
        name: String
        size: String
        category: String
        price: Float
        description: String
    }

    type Products {
        count: Int!
        products: [Product!]!
    }

    type ProductsOnlyCategories {
        category: String!
    }
`

export default schema
