export const labelLayout = {
  'text-field': ['get', 'name'],
  'text-font': ['Open Sans Regular'],
  'text-size': 20,
  'text-anchor': 'top',
  'text-offset': [0, 1],
}

export const convertToCSV = (objArray, columnHeaders, rowName) => {
  // columnHeaders must be separated by commas
  const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
  let str = columnHeaders ? `${columnHeaders}\r\n` : '';

  for (let i = 0; i < array.length; i++) {
    let line = '';
    for (let index in array[i]) {
      if (line !== '') line += ',';

      const currentPointNum = Number(index )+ 1
      line += `${rowName} ` + currentPointNum + ',' + array[i][index];
      str += line + '\r\n';
      line = '';
    }
  }
  return str;
};