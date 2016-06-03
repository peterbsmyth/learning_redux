const deepFreeze = require('deep-freeze')
const expect = require('expect')


const addCounter = (list) => {

  /*
* BELOW IS BAD BECAUSE IT MUTATES
* list.push(0);
* return list;
*
* BELOW IS OKAY, BUT CAN BE MORE CONCISE
* return list.concact([0]);
*/
  // Below does not mutate and is concise √√√
  return [...list, 0];
};

const removeCounter = (list, index) => {
  /*
* list.splice(index, 1);
* return list;
*
* return list
*   .slice(0, index)
*   .concat(list.slice(index + 1));
*/
  return [
    ...list.slice(0, index),
    ...list.slice(index + 1)
  ];
};

const incrementCounter = (list, index) => {
  /*
  * list[index]++;
  * return list
  *
  * return list
  *   .slice(0, index)
  *   .concat([list[index] + 1])
  *   .concat(list.slice(index + 1));
  */
  return [
    ...list.slice(0, index),
    list[index] + 1,
    ...list.slice(index + 1)
  ];
};

const testAddCounter = () => {
  const listBefore = [];
  const listAfter = [0];

  deepFreeze(listBefore);

  expect(
    addCounter(listBefore)

  ).toEqual(listAfter);
};

const testRemoveCounter = () => {
  const listBefore = [0,10,20];
  const listAfter = [0,20];

  deepFreeze(listBefore);

  expect(
    removeCounter(listBefore, 1)
  ).toEqual(listAfter);
};

const testIncrementCounter = () => {
  const listBefore = [0, 10, 20];
  const listAfter = [0, 11, 20];

  expect(
    incrementCounter(listBefore, 1)
  ).toEqual(listAfter);
}


testAddCounter();
testRemoveCounter();
testIncrementCounter();
console.log('all tests pass');
