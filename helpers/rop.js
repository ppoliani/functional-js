import Result from 'folktale/data/result';

const bind = (f, x) => x.matchWith({
  Ok: ({value}) => f(value),
  Error: ({value}) => Result.Error(value)
})


const doSomething = () => Result.Ok('doSomething');
const doSomethingElse = result => Result.Ok(`${result} and doSomethingElse`);
const doAThirdThing = result => Result.Ok(`${result} and doAThirdThing`);

bind(
  doAThirdThing,
  bind(
    doSomethingElse, doSomething()
  )
).matchWith({
  Ok: ({value}) => console.log(`Ok: ${value}`),
  Error: ({value}) => console.log(`Error: ${value}`)
})


// Imperative way

const doSomethingImp = i => i;
const doSomethingElseImp = i => i;
const doAThridThingImp = i => i;

const f = input => {
  const x = doSomethingImp(input);

  if(x !== null) {
    const y = doSomethingElseImp(x);

    if(y !== null) {
      const z = doAThridThingImp(y);

      if(z !== null) {
        return z;
      }
      else {
        return null;
      }
    }
    else {
      return null;
    }
  }
  else {
    return null;
  }
}

console.log(`Imperative: ${f(10)}`);
