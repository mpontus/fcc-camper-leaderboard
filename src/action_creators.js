export function sort(column) {
  return {
    type: 'SORT',
    column
  };
}

export function setEntries(entries) {
  return {
    type: 'SET_ENTRIES',
    entries
  };
}
