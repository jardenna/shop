function toggleItemInArray(arr, item) {
  const itemStr = item.toString();

  return arr.some((i) => i.toString() === itemStr)
    ? arr.filter((i) => i.toString() !== itemStr)
    : [...arr, itemStr];
}

export { toggleItemInArray };
