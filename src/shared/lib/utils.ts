export const DeleteFieldsFromObj = (
  obj: Record<string, any>,
  fields: string[],
) => {
  fields.forEach((f) => {
    delete obj[f];
  });

  return obj;
};
export const isRequired = (key: string, keysArr: string[]) => {
  return keysArr.includes(key);
};
