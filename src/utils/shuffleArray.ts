import { IChoice } from "../types";

/**
 * @param {Array} array An array containing the items.
 */
const shuffleArray = (array: IChoice[]): IChoice[] =>
  [...Array(array.length)]
    .map((...args) => Math.floor(Math.random() * (args[1] + 1)))
    .reduce((a, rv, i) => ([a[i], a[rv]] = [a[rv], a[i]]) && a, array);

export default shuffleArray;
