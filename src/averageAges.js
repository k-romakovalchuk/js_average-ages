'use strict';

// write code here
// learn how to use array methods like .filter .map .some .every .find .reduce
// avoid using loop and forEach
// replace `if ()` statement with &&, || or ?:
// without nesting

/**
 * Implement calculateMenAverageAge function
 *
 * Function returns average age of men in array. If `century` is specified then
 * function calculates average age only for men who died in this century
 *
 * To calculate century:
 * Divide year of person's death by 100: Math.ceil(person.died / 100)
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  const filteredNumbers = century === undefined ? (
    people.filter(el => el.sex === 'm')
  ) : (
    people.filter(el =>
      Math.ceil(el.died / 100) === century && el.sex === 'm')
  );

  const total = filteredNumbers.reduce((acc, rec) =>
    acc + (rec.died - rec.born), 0);

  const result = total / (filteredNumbers.length);

  return result;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find the other who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const filteredNumbers = withChildren === undefined ? (
    people.filter(el => el.sex === 'f')
  ) : (
    people.filter((item, i, arr) => {
      return item.sex === 'f' && arr.some(el => el.mother === item.name);
    })
  );

  const total = filteredNumbers.reduce((acc, rec) =>
    acc + (rec.died - rec.born), 0);

  const result = total / (filteredNumbers.length);

  return result;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a mother and her
 * child in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for mothers who have son.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const childs = onlyWithSon
    ? people.filter((item, i, arr) => {
      return item.sex === 'm' && arr.some(el => el.name === item.mother);
    })
    : people.filter((item, i, arr) => arr.some(el => el.name === item.mother));

  return childs.reduce((acc, rec) => {
    const mother = people.find(el => el.name === rec.mother);

    return acc + (rec.born - mother.born);
  }, 0) / childs.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
