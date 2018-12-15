/* techdegree project 2 - List Pagination and Filtering  */
/* December 12, 2018					 */
/*                                                       */
/* Using HTML5, CSS, and Javascript to create a webpage  */
/* that divides one list into digestible chunks.         */

const studentList = document.querySelector('.student-list').children;
const entriesPerPage = 10;
const numberOfPages = Math.ceil(studentList.length / entriesPerPage);

const manipulateEl = {
  create : (element, property, value) => {
    let tempEl = document.createElement(element);

    tempEl[property] = value;
    return tempEl;
  },
  append : (element, destination) => {
    destination.appendChild(element);
    return destination;
  }
}
    
function hideList(){
  let i = 0;

  while (studentList[i]){
    studentList[i].style.display = 'none';
    i++;
  }
}

const showPage = (list, page) => {
  let pageCeiling = page * entriesPerPage;
  let pageFloor = pageCeiling - entriesPerPage;

  //Clear the list from the page
  hideList();

  while (studentList[pageFloor] && pageFloor < pageCeiling){ //Conditional that makes sure the loop doesn't access
    studentList[pageFloor].style.display = '';               //out of bound array && doesn't overshoot number of entries
    pageFloor++;
  } 

}

const appendPageLinks = () => {
  const pageDiv = document.querySelector('.page');
  const div_pagination = manipulateEl.create('div', 'className', 'pagination');
  const ul_pagination = manipulateEl.create('ul');
  let currentPage = 0;

  manipulateEl.append(ul_pagination, div_pagination);
  manipulateEl.append(div_pagination, pageDiv);

  for (let i = 1; i <= numberOfPages; i++){
    let li = manipulateEl.create('li');
    let a = manipulateEl.create('a', 'href', '#');

    a.textContent = i;
    manipulateEl.append(manipulateEl.append(a, li), ul_pagination);
  }
  ul_pagination.children[0].firstElementChild.className = 'active'; //Turning first navigation link 'blue'
  
  //Activate a listener for the navigation links
  ul_pagination.addEventListener('click', (e) => {
    showPage(studentList, e.target.textContent);
    e.target.className = 'active';
    ul_pagination.children[currentPage].firstElementChild.className = ''; //Turning current navigation link 'colorless'
    currentPage = (e.target.textContent - 1);
  });
}

appendPageLinks();
showPage(studentList, 1);

