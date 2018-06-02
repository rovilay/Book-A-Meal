
export const storeInLs = (dataKey, item) => {
  localStorage.setItem(dataKey, JSON.stringify(item));
};

export const getFromLs = dataKey => JSON.parse(localStorage.getItem(dataKey));

export const delFromLs = (dataKey) => {
  localStorage.removeItem(dataKey);
};
