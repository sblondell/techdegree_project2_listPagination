/* techdegree project 2 - List Pagination and Filtering  */
/* December 12, 2018					 */
/*                                                       */
/* Using HTML5, CSS, and Javascript to create a webpage  */
/* that divides one list into digestible chunks.         */

const pageDiv = document.querySelector('.page');
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
    
//Sets the css 'display' property to 'none' for all student entries
function hideList() {
  let i = 0;

  while (studentList[i]){
    studentList[i].style.display = 'none';
    i++;
  }
}

//Sets the css 'display' property to show for all appropriate entries
const showPage = (list, page) => {
  let pageCeiling = page * entriesPerPage;
  let pageFloor = pageCeiling - entriesPerPage;

  hideList();

  while (studentList[pageFloor] && pageFloor < pageCeiling){ //Conditional that makes sure the loop doesn't access
    studentList[pageFloor].style.display = '';               //out of bound array && doesn't overshoot number of entries per page
    pageFloor++;
  } 

}

//Dynamically creates navigation links for the student list, then sets a 'click' listener to wait for page navigation
const appendPageLinks = () => {
  const div_pagination = manipulateEl.create('div', 'className', 'pagination');
  const ul_pagination = manipulateEl.create('ul');
  let currentPage = 0;

  //Setting up the skeleton for page navigation links
  manipulateEl.append(ul_pagination, div_pagination);
  manipulateEl.append(div_pagination, pageDiv);

  //Adding the appropriate number of page links
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
    e.target.className = 'active'; //Turning the current page link 'blue'
    ul_pagination.children[currentPage].firstElementChild.className = ''; //Turning the previous page link "colorless"
    currentPage = (e.target.textContent - 1);
  });
}

const searchFunction = () => {
  const pageHeaderDiv = document.querySelector('.page-header.cf');
  const searchButton = manipulateEl.create('Button', 'textContent', 'Search');
  const searchInput = manipulateEl.create('Input', 'placeholder', 'Search for students...');
  const searchDiv = manipulateEl.create('div', 'className', 'student-search');
  const studentListNames = document.querySelectorAll('div[class=student-details] h3');
  const studentListEmails = document.querySelectorAll('div[class=student-details] span[class=email]');
  const studentListParent = document.querySelector('.student-list');
  
  manipulateEl.append(searchInput, searchDiv);
  manipulateEl.append(searchButton, searchDiv);
  manipulateEl.append(searchDiv, pageHeaderDiv);
  let searchNotFound = manipulateEl.create('p', 'textContent', 'No matches found...');
  searchNotFound.style.display = 'none';
  pageDiv.insertBefore(searchNotFound, studentListParent);

  searchButton.addEventListener('click', (e) => {
    let userSearch = searchInput.value.toLowerCase();
    let found = false;

    hideList();

    for (let i = 0; i < studentList.length; i++){
      let studentName = studentListNames[i].textContent.toLowerCase();
      let studentEmail = studentListEmails[i].textContent.toLowerCase();
  
      if (userSearch === studentName || studentEmail.includes(userSearch)){
	found = true;
	searchNotFound.style.display = 'none';
	studentList[i].style.display = '';
      }
    }
    if (!found){
      searchNotFound.style.display = '';
    }
  });
}

appendPageLinks();
showPage(studentList, 1);
searchFunction();

