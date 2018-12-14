/* techdegree project 2 - List Pagination and Filtering  */
/* December 12, 2018					 */
/*                                                       */
/* Using HTML5, CSS, and Javascript to create a webpage  */
/* that divides one list into digestible chunks.         */
/* #Extra Credit */
   
/*** 
   Add your global variables that store the DOM elements you will 
   need to reference and/or manipulate. 
   
   But be mindful of which variables should be global and which 
   should be locally scoped to one of the two main functions you're 
   going to create. A good general rule of thumb is if the variable 
   will only be used inside of a function, then it can be locally 
   scoped to that function.
***/
const studentList = document.querySelector('.student-list').children;
const entriesPerPage = 10;
const numberOfPages = Math.ceil(studentList.length / entriesPerPage);

/*const hideList = function(){
  let i = 0;

  while (studentList[i]){
    studentList[i].style.display = 'none';
    i++;
  }
}*/

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

  /*
  if (page >= numberOfPages){ //Unique Conditional: if the last page is selected, display the last page
    let i = pageFloor;
    while (studentList[i]){
      studentList[i].style.display = '';
      i++;
    }
  }else{
    for (let i = pageFloor; i < pageCeiling; i++){
      studentList[i].style.display = '';
    }
  }
  */

  //let i = pageFloor;
  while (studentList[pageFloor] && pageFloor < pageCeiling){ //Conditional that makes sure the loop doesn't access
    studentList[pageFloor].style.display = '';               //out of bound array && doesn't overshoot number of entries
    pageFloor++;
  } 

}

const pagination = () => {
  const pageDiv = document.querySelector('.page');
  const div_pagination = manipulateEl.create('div', 'className', 'pagination');
  const ul_pagination = manipulateEl.create('ul');

  manipulateEl.append(ul_pagination, div_pagination);
  manipulateEl.append(div_pagination, pageDiv);

  for (let i = 1; i <= numberOfPages; i++){
    let li = manipulateEl.create('li');
    let a = manipulateEl.create('a', 'href', '#');

    a.textContent = i;
    manipulateEl.append(manipulateEl.append(a, li), ul_pagination);
  }
  document.querySelectorAll('div[class="pagination"] ul li')[0].firstElementChild.className = 'active'; //Turning first button "blue"
}

pagination();
showPage(studentList, 1);




/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/





