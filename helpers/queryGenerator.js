const queryGenerator = {
  query: "",

  select(column) {
    const string = `SELECT ${column}`;
    return string;
  },
  where(condition) {
    const string = `WHERE ${condition}`;
    return string;
  },
  from(table) {
    const string = `FROM ${table}`;
    return string;
  },
  as(alias) {
    const string = `AS ${alias}`;
    return string;
  },
  groupBy(column) {
    const string = `GROUP BY ${column}`;
    return string;
  },
  sum(column) {
    const string = `SUM(${column})`;
    return string;
  },
  count(column) {
    const string = `COUNT(${column})`;
    return string;
  },
};

module.exports = { queryGenerator };
