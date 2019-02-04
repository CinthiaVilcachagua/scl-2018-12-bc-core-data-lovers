const btnSectores = document.getElementById('btn-sectores');
const btnSectoresPage = document.getElementById('sectores-page');
document.getElementById('page2').setAttribute('class', 'ocultar');
document.getElementById('page3').setAttribute('class', 'ocultar');
const btnIndicator = document.getElementById('btn-indicators');

/* -- DOM DE LA PAGINA 1 -- */
const loadIndicators = () => {
    document.getElementById('page1').setAttribute('class', 'ocultar');
    document.getElementById('page-buscador').setAttribute('class', 'ocultar');
    document.getElementById('page2').setAttribute('class', 'visible');
 };
 /* -- DOM DE LA PAGINA 2 -- */
 btnIndicator.addEventListener('click', () => {
    const country = document.getElementById('select-pais').value;
    const sector = document.getElementById('select-sector');
    const sectorName = sector.value
    const dataIndicator = WORLDBANK[country].indicators;
    const data = window.worldbank.filterData(dataIndicator, sectorName);
    //insertar el nombre de los sectores.
    const nameSector = document.getElementById('name-sector');
    nameSector.innerHTML = sector.selectedOptions[0].text;
    //llamar al id donde esta el div.
    const listIndicators = document.getElementById('list-indicator');
    let indicatorsList = '';
    data.forEach((newArray) => {
       const dataIndicator = ` 
               <ul>
                <li><a> ${newArray.indicatorName} </a></li>
               </ul> 
           `;
         indicatorsList += dataIndicator;
    });
    listIndicators.innerHTML = indicatorsList;
 });
 btnSectores.addEventListener('click',loadIndicators);
 btnSectoresPage.addEventListener('click', loadIndicators);