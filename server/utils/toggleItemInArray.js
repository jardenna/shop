function toggleItemInArray(arr, item) {
  const itemStr = item.toString();
  console.log(itemStr);

  return arr.some((i) => i.toString() === itemStr)
    ? arr.filter((i) => i.toString() !== itemStr)
    : [...arr, itemStr];
}

export { toggleItemInArray };
