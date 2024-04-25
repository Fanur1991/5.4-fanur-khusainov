import * as queries from './getQueries.js';

const queryMapping = {};

Object.keys(queries)
  .sort()
  .forEach((key) => {
    const queryNumber = key.split('_')[1];
    queryMapping[`query_${queryNumber}`] = queries[key];
  });

const selectedQuery = process.argv[2];
const queryFunction = queryMapping[selectedQuery];

if (queryFunction) {
  queries
    .executeQuery(queryFunction)
    .then(() => console.log('Query executed successfully'))
    .catch((err) => console.error('Error executing the query:', err));
} else {
  console.log('Query not found');
}
