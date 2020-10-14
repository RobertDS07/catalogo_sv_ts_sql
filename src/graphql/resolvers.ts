import { mergeResolvers } from '@graphql-tools/merge'
import { loadFilesSync } from '@graphql-tools/load-files'
import path from 'path'

const resolversArry = loadFilesSync(path.join(__dirname, 'modules', '**', 'resolvers.*'))

const resolvers = mergeResolvers(resolversArry)

export default resolvers