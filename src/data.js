const filterData = (data, filterBy ,condition) => {
   return data.filter(element => (element[filterBy].indexOf(condition) !== -1));
 };

const sortData = (data, sortBy, sortOrder) => {
  const indicatorsSorts = data.sort((a,b) => { 
    if (a[sortBy] > b[sortBy]) {
       return 1;
    }if (a[sortBy] < b[sortBy]) {
       return -1;
    } else {
       return 0;
    }
   }); 
 if (sortOrder === 'ascendente') {
    return indicatorsSorts;
 } else {
    return indicatorsSorts.reverse();
 }
};

window.worldbank = {
  filterData,
  sortData,
};