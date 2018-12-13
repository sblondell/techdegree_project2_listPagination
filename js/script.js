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

/*const hideList = function(){
  let i = 0;

  while (studentList[i]){
    studentList[i].style.display = 'none';
    i++;
  }
}*/

function hideList(){
  let i = 0;

  while (studentList[i]){
    studentList[i].style.display = 'none';
    i++;
  }
}

const showPage = (list, page) => {
  let pageCeiling = page * 10;
  let pageFloor = pageCeiling - 10;
  let numberOfPages = Math.ceil(studentList.length / 10);

  //Clear the list from the page
  hideList();

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

  /* more condensed way of displaying pages 
  let i = pageFloor;
  while (studentList[i] && i < pageCeiling){
    studentList[i].style.display = '';
    i++;
  } */

}


//showPage(studentList, 3);



/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/





