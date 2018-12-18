/* techdegree project 2 - List Pagination and Filtering  */
/* December 12, 2018					 */
/*                                                       */
/* Using HTML5, CSS, and Javascript to create a webpage  */
/* that divides one list into digestible chunks.         */

//Operators for manipulating HTML nodes
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
    
const pageDiv = document.querySelector('.page');
const studentListParent = document.querySelector('.student-list');
const studentList = studentListParent.children;
const entriesPerPage = 10;


//Setting up the skeleton for the "No matches found..." scenario...
const searchNotFound = manipulateEl.create('p', 'textContent', 'No matches found...');
searchNotFound.style.display = 'none';
pageDiv.insertBefore(searchNotFound, studentListParent);


//Sets the css 'display' property to 'none' for all list entries
function hideList(list) {
  let i = 0;

  while (list[i]){
    list[i].style.display = 'none';
    i++;
  }
}

//Sets the css 'display' property to show for all appropriate entries
const showPage = (list, page) => {
  let pageCeiling = page * entriesPerPage;
  let pageFloor = pageCeiling - entriesPerPage;

  hideList(studentList);
  searchNotFound.style.display = 'none';

  while (list[pageFloor] && pageFloor < pageCeiling){ //Conditional that makes sure the loop doesn't access
    list[pageFloor].style.display = '';               //out of bound array && doesn't overshoot number of entries per page
    pageFloor++;
  } 

}

//Dynamically creates navigation links for the student list, then sets a 'click' listener to wait for page navigation
const appendPageLinks = (list) => {
  const node_paginationDIV = manipulateEl.create('div', 'className', 'pagination');
  const node_paginationUL = manipulateEl.create('ul');
  const numberOfPages = Math.ceil(list.length / entriesPerPage);
  let currentPage = 0;

  //Setting up the skeleton for page navigation links
  manipulateEl.append(node_paginationUL, node_paginationDIV);
  manipulateEl.append(node_paginationDIV, pageDiv);

  //Adding the appropriate number of page links
  for (let i = 1; i <= numberOfPages; i++){
    let li = manipulateEl.create('li');
    let a = manipulateEl.create('a', 'href', '#');

    a.textContent = i;
    manipulateEl.append(manipulateEl.append(a, li), node_paginationUL);
  }
  node_paginationUL.children[0].firstElementChild.className = 'active'; //Turning first navigation link 'blue'
  
  //Activate a listener for the navigation links
  node_paginationUL.addEventListener('click', (e) => {
    showPage(list, e.target.textContent);
    if (e.target.className != 'active'){
      e.target.className = 'active'; //Turning the current page link 'blue'
      node_paginationUL.children[currentPage].firstElementChild.className = ''; //Turning the previous page link "colorless"
      currentPage = (e.target.textContent - 1);
    }
  });
}

const appendSearchResultsLinks = () => {
}

const searchFunction = () => {
  const studentListNames = document.querySelectorAll('div[class=student-details] h3');
  const studentListEmails = document.querySelectorAll('div[class=student-details] span[class=email]');

  //Setting up the skeleton for the search functionality...
  const pageHeaderDiv = document.querySelector('.page-header.cf');
  const searchButton = manipulateEl.create('Button', 'textContent', 'Search');
  const searchInput = manipulateEl.create('Input', 'placeholder', 'Search for students...');
  const searchDiv = manipulateEl.create('div', 'className', 'student-search');
  manipulateEl.append(searchInput, searchDiv);
  manipulateEl.append(searchButton, searchDiv);
  manipulateEl.append(searchDiv, pageHeaderDiv);

  searchButton.addEventListener('click', (e) => {
    const userSearch = searchInput.value.toLowerCase();
    const searchResultsList = new Array(studentList.length);
    let currentOpenIndex = 0;
    let found = false;

    hideList(studentList);

    for (let i = 0; i < studentList.length; i++){
      let studentName = studentListNames[i].textContent.toLowerCase();
      let studentEmail = studentListEmails[i].textContent.toLowerCase();
  
      if (studentName.includes(userSearch) || studentEmail.includes(userSearch)){
	found = true;
	searchNotFound.style.display = 'none';
	searchResultsList[currentOpenIndex] = studentList[i];
	currentOpenIndex++;
      }
    }
    if (!found){
      searchNotFound.style.display = '';
    }else{
      showPage(searchResultsList, 1);
      appendSearchResultsLinks(); 
    }
  });
  
  searchInput.addEventListener('keyup', (e) => {
    const userSearch = searchInput.value.toLowerCase();
    const searchResultsList = new Array(studentList.length);
    let currentOpenIndex = 0;
    let found = false;

    hideList(studentList);

    for (let i = 0; i < studentList.length; i++){
      let studentName = studentListNames[i].textContent.toLowerCase();
      let studentEmail = studentListEmails[i].textContent.toLowerCase();
  
     // if (userSearch[userSearch.length-1] === studentName[userSearch.length-1]){
      if (studentName.includes(userSearch)){
	found = true;
	searchNotFound.style.display = 'none';
	searchResultsList[currentOpenIndex] = studentList[i];
	currentOpenIndex++;
      }
    }
    if (!found){
      searchNotFound.style.display = '';
    }else{
      showPage(searchResultsList, 1);
      appendSearchResultsLinks(); 
    }
  });
}

showPage(studentList, 1);
appendPageLinks(studentList);
searchFunction();

