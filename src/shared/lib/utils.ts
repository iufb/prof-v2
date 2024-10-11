export const DeleteFieldsFromObj = (
  obj: Record<string, any>,
  fields: string[],
) => {
  fields.forEach((f) => {
    if (!obj[f]) {
      console.log(`Key ${f} not found.`);
      return;
    }
    delete obj[f];
  });
  return obj;
};
