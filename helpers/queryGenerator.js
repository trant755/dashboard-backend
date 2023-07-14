const queryGenerator = {
  query: "",

  typeofDataTransformer(operator, data) {
    let string = "";

    if (typeof data === string) {
      string = `${operator} ${data}`;
    }

    if (typeof data === object && Array.isArray(data)) {
      string = `${operator} ${data.join(", ")}`;
    }

    if (typeof data === object && !Array.isArray(data)) {
      string = `${operator} ${Object.values(data).join(", ")}`;
    }

    return string;
  },

  select(column) {
    let string = "";

    if (typeof column === string) {
      string = `SELECT ${column}`;
    }

    if (typeof column === object && Array.isArray(column)) {
      string = `SELECT ${column.join(", ")}`;
    }

    if (typeof column === object && !Array.isArray(column)) {
      string = `SELECT ${Object.values(column).join(", ")}`;
    }

    return string;
  },

  where(condition) {
    const conditionsAnd = condition
      .map((item) => `${item[0]} = '${item[1]}'`)
      .join(" AND ");

    const string = `WHERE ${conditionsAnd}`;
    return string;
  },

  from(table) {
    let string = "";

    if (typeof table === string) {
      string = `FROM ${table}`;
    }

    if (typeof table === object && Array.isArray(table)) {
      string = `FROM ${table}`;
    }

    if (typeof table === object && !Array.isArray(table)) {
      string = `FROM ${table}`;
    }

    return string;
  },

  as(alias) {
    let string = "";

    if (typeof alias === string) {
      string = `AS ${alias}`;
    }

    if (typeof alias === object && Array.isArray(alias)) {
      string = `AS ${alias}`;
    }

    if (typeof alias === object && !Array.isArray(alias)) {
      string = `AS ${alias}`;
    }

    return string;
  },

  groupBy(column) {
    let string = "";

    if (typeof column === string) {
      string = `GROUP BY ${column}`;
    }

    if (typeof column === object && Array.isArray(column)) {
      string = `GROUP BY ${column}`;
    }

    if (typeof column === object && !Array.isArray(column)) {
      string = `GROUP BY ${column}`;
    }

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
