
export const storeInLs = (token, dataKey) => {
  localStorage.setItem(dataKey, token);
};

export const getFromLs = dataKey => localStorage.getItem(dataKey);

export const delFromLs = (dataKey) => {
  localStorage.removeItem(dataKey);
};
