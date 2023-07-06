const generateTemplateString = (arr) => {
  console.log("--arr--", arr);

  const template = arr
    .map((item) => `${item.key} = '${item.value}'`)
    .join(" AND ");

  console.log("template:", template);
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

const generateQueryStringSimplified = (table, arr) => {
  console.log("--arr--", arr);

  const templateString = `${arr.key} = '${arr.value}'`;

  const dynamicQuery = `SELECT * FROM ${table} WHERE ${templateString}`;
  return dynamicQuery;
};

const generateQueryStringFromArray = (table, arr) => {
  console.log("++arr:", arr);

  const templateString = arr
    .map((item) => `${item[0]} = '${item[1]}'`)
    .join(" AND ");

  console.log("templateString:", templateString);

  const dynamicQuery = `SELECT * FROM ${table} WHERE ${templateString}`;
  return dynamicQuery;
};

module.exports = {
  generateTemplateString,
  generateQueryString,
  generateQueryStringSimplified,
  generateQueryStringFromArray,
};
