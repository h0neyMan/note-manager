import { normalize, schema } from 'normalizr';

const directory = new schema.Entity('directories');
const directoryListSchema = new schema.Array(directory);

export default (entities) => {
    return normalize(entities, directoryListSchema);
};
