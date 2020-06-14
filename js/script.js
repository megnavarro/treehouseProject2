/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


const listItem = document.getElementsByClassName('student-item'); //stores all list item <li> children of unordered li <ul> with the class name of "student list"
const itemsPerPage = 10; //sets number of list items to be shown per page

/*
* Sets the initial page display to show the first ten list items.
*
* @param {array} list - The list to be parsed
* @param {number} page - Numerical value representing page number
* 
*/
function showPage(list, page) {
   let startIndex = (page * itemsPerPage) - itemsPerPage;
   let endIndex = page * itemsPerPage;

   //loops through each li to determine, based on index number, if item should be shown or hidden using CSS display properties
   for (let i = 0; i < list.length; i++) {
      if (i >= startIndex && i < endIndex) {
         list[i].style.display = 'block';
      } else {
         list[i].style.display = 'none';
      }
   }
}

/*
* Creates the list item links to navigate between all pages.
*/
function createPageLinks() {
   const pageDiv = document.querySelector('.page'); 
   
   //local scope function that creates new elements and sets a property with a value.
   function createElement(elementName, property, propertyValue) {
      const element = document.createElement(elementName);
      element[property] = propertyValue;
      return element;
   }

   const paginationDiv = createElement('div', 'className', 'pagination');
   pageDiv.appendChild(paginationDiv);
   
   const ul = createElement('ul', 'className', 'page-links-ul');
   paginationDiv.appendChild(ul);
}

/*
* Determines the number of page links needed, adds link <a> tags to each,
* appends the links to a list item, and adds event listeners to each.
*
* @param {variable} list - The variable storing the list to be parsed
*/
function appendPageLinks(list){
   const ul = document.querySelector('.page-links-ul');
   ul.innerHTML = '';//clears existing HTML elements to add the appropriate number back

   const pagesNeeded = Math.ceil(list.length / itemsPerPage);
   
   /*
   * Creates each page link based needed, adds <a> and textContent (page number),
   * and adds eventlistener to set active class and show appropriate page.
   */
   for (i = 0; i < pagesNeeded; i++){
      const li = document.createElement('li');
      ul.appendChild(li);
      const a = document.createElement('a');
      a.setAttribute('href', '#');
      a.textContent = i + 1;
      li.appendChild(a);
      if (i === 0) {
        a.className = 'active'; 
      }
      a.addEventListener('click', (e) => {
         clearPageLinkSelect();
         e.target.className = 'active';
         showPage(listItem, e.target.textContent);
      })
   }
}

/*
* Clears active class name from all page links.
*/
function clearPageLinkSelect() {
   const aElements = document.querySelectorAll('a');
   for (let i = 0; i < aElements.length; i++) {
      aElements[i].className = '';
   }
}

/*
* Creates elements for search bar, adds key up and submit event listeners to search bar,
* and creates No Search Results list item to be displayed as needed.
*/
function createSearchBar(){
   const pageHeaderDiv = document.querySelector('.page-header');
   const studentSearchDiv = document.createElement('div');
   studentSearchDiv.className = 'student-search';
   studentSearchDiv.style.float = 'right';
   pageHeaderDiv.appendChild(studentSearchDiv);
   pageHeaderDiv.insertBefore(document.querySelector('h2'), studentSearchDiv);
   const input = document.createElement('input');
   input.placeholder = 'Search for students...';
   studentSearchDiv.appendChild(input);
   const button = document.createElement('button');
   button.textContent = 'search';
   studentSearchDiv.appendChild(button);
   const ul = document.querySelector('ul');
  
   const newLI = document.createElement('li');
   newLI.textContent = 'No Results Found'
   ul.appendChild(newLI);
   newLI.className = 'search-LI';
   newLI.style.display = 'none';

   const searchBar = document.querySelector('input');
   searchBar.addEventListener('keyup', () => {
      filterSearch();
   });
   searchBar.addEventListener('submit', () => {
      filterSearch();
   });
}
/*
* Filters searchBar substring
*/
function filterSearch(){
   const searchBar = document.querySelector('input');
   const filter = searchBar.value.toUpperCase();
   const ul = document.querySelector('ul');
   const li = ul.getElementsByClassName('student-item');
   const names = document.getElementsByTagName('h3');
   
   let searchResultFound = false;
   let searchResults = [];

   for (let i = 0; i < li.length; i++) {
      const namesValue = names[i].textContent;
      /*
      * Searches for a substring within student names that contains the filter in any index.
      * Setting === 0 would search for the substring at the beginning of the student name. 
      */
      if (namesValue.toUpperCase().indexOf(filter) > -1){ 
         li[i].style.display = 'block';
         searchResultFound = true;
         searchResults.push(names[i].parentNode.parentNode);
      } else {
         li[i].style.display = 'none';
      }
   }
   
   //Displays message if no results are found.
   const newLI = document.querySelector('.search-LI');
   if (searchResultFound) {
      newLI.style.display = 'none';
   } else {
      newLI.style.display = '';
   }
   appendPageLinks(searchResults); 
   showPage(searchResults, 1);
}

showPage(listItem, 1);
createSearchBar();
createPageLinks();
appendPageLinks(listItem);
