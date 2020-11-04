const schema = `
type Query {
    storeNamesToLink: [StoreName!]!
    storeInfo(storeName: String!): Store!
}

type Mutation {
    createStore(data: createStoreInput! auth: String!): Boolean!
}

input createStoreInput {
    storeNameToLink: String!
    logoLink: String!
    instaLink: String!
    insta: String!
    whats: String!
    whatsLinkToMsg: String!
}

type StoreName {
    storeNameToLink: String!
}

type Store {
    storeNameToLink: String!
    logoLink: String!
    instaLink: String!
    insta: String!
    whats: String!
    whatsLinkToMsg: String!
}
`

export default schema
