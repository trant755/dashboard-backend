const getTemplateString = (array) => {
  console.log("--array--", array);

  const template = array
    .map((item) => `${item.key} = '${item.value}'`)
    .join(" AND ");

  console.log("template:", template);
  return template;
};

const getQueryString = (table, obj) => {
  console.log("--obj--", obj);

  const templateString = obj.condition
    .map((item) => `${item.key} = '${item.value}'`)
    .join(" AND ");

  const dynamicQuery = `SELECT * FROM ${table} WHERE ${templateString}`;
  return dynamicQuery;
};

const getQueryStringSimplified = (table, array) => {
  console.log("--array--", array);

  const templateString = `${array.key} = '${array.value}'`;

  const dynamicQuery = `SELECT * FROM ${table} WHERE ${templateString}`;
  return dynamicQuery;
};

const getQueryStringFromArray = (table, array) => {
  console.log("array", array);
  const templateString = array
    .map((item) => `${item[0]} = '${item[1]}'`)
    .join(" AND ");

  const dynamicQuery = `SELECT * FROM ${table} WHERE ${templateString}`;
  return dynamicQuery;
};

module.exports = {
  getTemplateString,
  getQueryString,
  getQueryStringSimplified,
  getQueryStringFromArray,
};
