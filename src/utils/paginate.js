import _ from 'lodash';

export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize; // (9 - 1) *  4= 3 sidor (4, 4, 1)
  return _(items)
    .slice(startIndex)
    .take(pageSize)
    .value();
}
//paginating the data in client server
