import slugify from "slugify";

const createSlug = (label: string) => {
  return label
    ? slugify(label, {
        lower: true,
        replacement: "_",
      })
    : "";
};

const createUniqueID = (label: string, id: number) => {
  return label
    ? slugify(label + id, {
        lower: true,
      })
    : "";
};

export { createSlug, createUniqueID };
