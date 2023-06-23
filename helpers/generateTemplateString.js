const generateTemplateString = (arr) => {
  console.log("--arr--", arr);

  const template = arr
    .map((item) => `${item.key} = '${item.value}'`)
    .join(" AND ");
  return template;
};

const generateQueryString = (table, obj) => {
  console.log("--obj--", obj);

  const templateString = obj.condition
    .map((item) => `${item.key} = '${item.value}'`)
    .join(" AND ");

  const dynamicQuery = `SELECT * FROM ${table} WHERE ${templateString}`;
  return dynamicQuery;
};

module.exports = { generateTemplateString, generateQueryString };
