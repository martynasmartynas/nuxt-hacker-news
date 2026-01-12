/**
 * Sorts an array of objects based on a specified key in ascending or descending order.
 *
 * @template T - The type of objects in the array.
 * @param {T[]} arr - The array of objects to sort.
 * @param {keyof T} path - The key of the object to sort by.
 * @param {'asc' | 'desc'} [order='asc'] - The order to sort the array ('asc' for ascending, 'desc' for descending).
 * @returns {T[]} - The sorted array of objects.
 */

export default function sortData<T>(
  arr: T[] | null | undefined = [],
  path: string,
  order: 'asc' | 'desc' = 'asc'
): T[] {
  // eslint-disable-next-line
  const getValue = (obj: any, path: string) => path.split('.').reduce((o, k) => o?.[k], obj)

  const list = Array.isArray(arr) ? [...arr] : []

  return list.sort((a, b) => {
    const valA = getValue(a, path)
    const valB = getValue(b, path)
    if (valA < valB) return order === 'asc' ? -1 : 1
    if (valA > valB) return order === 'asc' ? 1 : -1
    return 0
  })
}
