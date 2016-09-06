export function sort(column) {
  return {
    type: 'SORT',
    column
  };
}

export function setLeaders(period, entries) {
  return {
    type: 'SET_ENTRIES',
    period,
    entries
  };
}
