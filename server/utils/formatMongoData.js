// Rename _id to id
const formatMongoData = (data) => {
  if (Array.isArray(data)) {
    return data.map(({ _id, ...rest }) => ({
      id: _id,
      ...rest,
    }));
  } else if (data && typeof data === 'object') {
    const { _id, ...rest } = data;
    return { id: _id, ...rest };
  }
  return data; // Return as-is if it's not an object or array
};

export default formatMongoData;
