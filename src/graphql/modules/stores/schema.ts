import { buildSchema } from "graphql";

export const schema = buildSchema(`
type Query {
    storeNamesToLink: [StoreName!]!
    storeInfo(storeName: String!): Store!
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
`)