import { mergeTypeDefs } from '@graphql-tools/merge'
import { loadFilesSync } from '@graphql-tools/load-files'
import { buildSchema, print } from 'graphql'
import path from 'path'

const schemasArry = loadFilesSync(path.join(__dirname, 'modules', '**', 'schema.*'))

const schemasMerged = mergeTypeDefs(schemasArry)
const convertToString = print(schemasMerged)

const schema = buildSchema(convertToString)

export default schema