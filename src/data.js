const filterData = (data, condition) => {
  return data.filter(element => (element.indicatorCode.indexOf(condition) !== -1));
};

window.worldbank = {
  filterData,
};