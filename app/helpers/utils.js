export function orderArrayAscendingById(array) {
  try {
    return [].concat(array).sort((a, b) => a.id - b.id);
  } catch (e) {
    return array;
  }
}

export function orderArrayDescendingById(array) {
  try {
    return []
      .concat(array)
      .sort((a, b) => a.id - b.id) // a['id']
      .reverse();
  } catch (e) {
    return array;
  }
}
