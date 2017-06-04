import data from 'folktale/core/adt/data';

const AsyncData = data('AsyncData', {
  Empty: () => true,
  Loading: () => true,
  Success: data => ({data}),
  Failure: error => ({error})
})

export default AsyncData;
