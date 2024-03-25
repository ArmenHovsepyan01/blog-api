export function sort(items: any) {
  if (!Array.isArray(items)) {
    throw new Error('Input is not an array');
  }

  items.sort((a, b) => {
    const first_id = Number(a.id);
    const second_id = Number(b.id);

    if (first_id < second_id) {
      return -1;
    }
    if (first_id > second_id) {
      return 1;
    }
    return 0;
  });

  return items;
}
