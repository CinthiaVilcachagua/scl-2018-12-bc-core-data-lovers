const btnSectores = document.getElementById('btn-sectores');
const btnSectoresPage = document.getElementById('sectores-page');
const searchPage = document.getElementById('search-page');
document.getElementById('page2').setAttribute('class', 'ocultar');
document.getElementById('page3').setAttribute('class', 'ocultar');
document.getElementById('page-buscador').setAttribute('class', 'ocultar');
const btnIndicator = document.getElementById('btn-indicators');
/* -- DOM DE LA PAGINA 1 -- */

const loadIndicators = () => {
   document.getElementById('page1').setAttribute('class', 'ocultar');
   document.getElementById('page-buscador').setAttribute('class', 'ocultar');
   document.getElementById('page2').setAttribute('class', 'visible');
   document.getElementById('page3').setAttribute('class', 'ocultar');
};
/* -- DOM DE LA PAGINA 3 --*/
//crear foreach para los select con los años.
const functionYearsSelect = (data) => {
         const arrayYears = [];
         for (let i = 1960; i <= 2017; i++) {
         arrayYears.push(i);
         }
         const selectYear1 = document.getElementById('year1');
         const selectYear2 = document.getElementById('year2');
         let yearsListReverse = '';
         let yearsList = '';
         arrayYears.forEach((year) => {
            const yearSelect = ` 
             <option value="${year}"> ${year} </option>
            `;
            if (data[year] !== '') {
               yearsList += yearSelect; //orden
               yearsListReverse = yearSelect + yearsListReverse; //invirtiendo el orden
            } 
         });
         selectYear1.innerHTML = yearsList;
         selectYear2.innerHTML = yearsListReverse;
         
      };

/* -- DOM DE LA PAGINA 2 -- */
btnIndicator.addEventListener('click', () => {
   const selectCountry = document.getElementById('select-pais');
   const country = selectCountry.value;
   const sector = document.getElementById('select-sector');
   const sectorName = sector.value;
   const dataIndicator = WORLDBANK[country].indicators;
   const data = window.worldbank.filterData(dataIndicator, 'indicatorCode' , sectorName);
   //insertar el nombre de los sectores.
   const nameSector = document.getElementById('name-sector');
   nameSector.innerHTML = sector.selectedOptions[0].text;
   
   /* DOM DE LA PAGINA 3 */
   const indicatorSelected = document.getElementById('indicator-selected');
   //insertar el pais en la tabla.
  const countrySelected = document.getElementById('country-selected');
  countrySelected.innerHTML = selectCountry.selectedOptions[0].text;
   //llamar al id donde esta el div.
   const listIndicators = document.getElementById('list-indicator');
   let indicatorsList = '';
   data.forEach((newArray) => {
      const dataIndicator = ` 
              <ul>
               <li> <a href="#page3" data-indicador="${newArray.indicatorName}"> ${newArray.indicatorName} </a> </li>
              </ul> 
          `;
        indicatorsList += dataIndicator;
   });
   listIndicators.innerHTML = indicatorsList;
   //crear un evento para mis <a>.
   listIndicators.querySelectorAll('a[data-indicador]').forEach((element) => {
      element.addEventListener('click', () => {
         document.getElementById('page2').setAttribute('class', 'ocultar');
         document.getElementById('page3').setAttribute('class', 'visible');
         //obtener el nombre del indicador seleccionado
         const indicatorElement = element.dataset.indicador;
         //mostrar el nombre del indicador en la pagina 3
         indicatorSelected.innerHTML = indicatorElement;
         // obtener el objeto con el indicadorName
         const objectIndicator = dataIndicator.find(i => i.indicatorName === indicatorElement);

         functionYearsSelect(objectIndicator.data);
         //dom para guardar la data de los años
         const dataYear1 = document.getElementById('year-data1');
         const dataYear2 = document.getElementById('year-data2');
         const year2 = document.getElementById('year2');
         const year1 = document.getElementById('year1');
         const funcionQueMeGuardeElSelect = () => {
            //guardar información de los años
            const yearSelect = year1.value;
            const yearData1 = objectIndicator.data[yearSelect].toFixed(2);
            dataYear1.innerHTML = yearData1;
         }
         year1.addEventListener('change',funcionQueMeGuardeElSelect);
         const funcionQueMeGuardeElSelect2 = () => {
            //guardar información de los años
            const yearSelect2 = year2.value;
            const yearData2 = objectIndicator.data[yearSelect2].toFixed(2);
            dataYear2.innerHTML = yearData2;
         }
         year2.addEventListener('change',funcionQueMeGuardeElSelect2);

         //GRAFICO 
         const years = Object.keys(objectIndicator.data);
         const yearsFilter = years.filter(element => (objectIndicator.data[element] !== ''));        
         const arrayDataYears = yearsFilter.map(a => objectIndicator.data[a]);
         graphics(yearsFilter, arrayDataYears, indicatorElement );
         
      })
   })
});
btnSectores.addEventListener('click',loadIndicators);
btnSectoresPage.addEventListener('click', loadIndicators);


/* -- DOM DEL BUSCADOR -- */

const btnBuscar = document.getElementById('btn-buscar');
// solo mostrar la opcion buscar

searchPage.addEventListener('click', () =>{
   document.getElementById('page1').setAttribute('class', 'ocultar');
   document.getElementById('page2').setAttribute('class', 'ocultar');
   document.getElementById('page3').setAttribute('class', 'ocultar');
   document.getElementById('page-buscador').setAttribute('class', 'visible');
})


btnBuscar.addEventListener('click', () => {
  const order = document.getElementById('select-order').value;
  const buscador = document.getElementById('buscador').value.toLowerCase();
  const countryData = document.getElementById('select-country').value;
  const dataIndicator = WORLDBANK[countryData].indicators;
  const dataFilter = window.worldbank.filterData(dataIndicator, 'indicatorName' , buscador);
  const dataSearch = window.worldbank.sortData(dataFilter,'indicatorName' ,order);
  //llamar al id donde esta el div.
  const listIndicatorSearch = document.getElementById('indicator-search');
  let indicatorSearch = '';
  dataSearch.forEach((newArray) => {
     const mostrarData = `
            <ul>
              <li> <a> ${newArray.indicatorName} </a> </li>
            </ul>
            `;
         indicatorSearch += mostrarData;
  });
  listIndicatorSearch.innerHTML = indicatorSearch;
});

//crear grafico//
let myChart;
const graphics = (var1, var2, indicador) => {
   const ctx = document.getElementById("myChart").getContext('2d');
   if (myChart) {
      myChart.destroy();
   }
       myChart = new Chart(ctx, {
          type: 'line',
            data: {
             labels: var1,
             datasets: [
               {
              label: indicador,
               data: var2,
               fill: false,
               lineTension: 0.1,
               borderColor: 'red'
               },
             ],
            },
          options: {
           responsive: false,
           scales: {
             yAxes: [{
                ticks: {
                    beginAtZero:true
                }
             }]
            }
          }
        });
}