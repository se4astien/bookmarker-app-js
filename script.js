const myForm = document.getElementById('myForm');
const siteName = document.getElementById('siteName');
const siteUrl = document.getElementById('siteUrl');
let bookmarksResults = document.getElementById('bookmarksResults');

function saveBookmark(e) {
  validateForm();

  // 2. Create object for bookmark to save into LS
  let bookmark = {
    name: siteName.value,
    url: siteUrl.value,
  };
  // console.log(bookmark);

  /*
    // How do Local Storage work???
    // 1. Save data into LS (key, string or number)
    localStorage.setItem('test', 'Hello world');
    // 2. Fetch data from LS (fetch by key)
    console.log(localStorage.getItem('test')); // Fetch setItem
    // 3. You can remove data from LS (remove by key)
    localStorage.removeItem('test');
    console.log(localStorage.getItem('test'));
  */

  // 3. Check if bookmarks in LS is null
  if (localStorage.getItem('bookmarks') === null) {
    // Init array
    let bookmarks = [];
    // Add bookmark to array
    bookmarks.push(bookmark);
    // Set to LocalStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks)); // return JSON format => string
  } else {
    // Get bookmarks from LS
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks')); // return string => JSON format
    // Add bookmark to array
    bookmarks.push(bookmark);
    // Re-set back to LocalStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }

  // 8. Clear form
  myForm.reset();

  // Re-fetch bookmarks
  fetchBookmarks();

  // 1. Prevent form from submitting
  e.preventDefault();
}

// 5. Delete function
function deleteBookmark(url) {
  //   console.log(url);
  // Get bookmarks from LocalStorage
  let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // Loop through bookmarks
  for (let i = 0; i < bookmarks.length; i++) {
    // Check if url in LocalStorage is equal to url
    if (bookmarks[i].url == url) {
      // Remove from array
      bookmarks.splice(i, 1);
    }
  }
  // Re-set back to LocalStorage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  // Re-fetch bookmarks
  fetchBookmarks();
}

// 4. Display LocalStorage into the DOM
function fetchBookmarks() {
  // Get bookmarks from LS
  let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  console.log(bookmarks);
  // Build output
  bookmarksResults.innerHTML = '';

  // Loop through into bookmarks with for loop
  for (let i = 0; i < bookmarks.length; i++) {
    let name = bookmarks[i].name;
    let url = bookmarks[i].url;

    bookmarksResults.innerHTML +=
      '<div class="newElmt">' +
      '<h2>' +
      name +
      '</h2>' +
      '<button><a href=' +
      url +
      ' target="_blank">Visit</a></button>' +
      '<button class="delete"><a onclick="deleteBookmark(\'' +
      url +
      '\')" href="#">Delete</a></button>' +
      '</div>';
  }
}

function validateForm() {
  // 6. Check if values are empties
  if (!siteName.value || !siteUrl.value) {
    alert('Please fill in form');
    return false;
  }

  // 7. Check if url is valid
  const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  const regex = new RegExp(expression);

  if (!siteUrl.value.match(regex)) {
    alert('Please use a valid url');
    return false;
  }
}

myForm.addEventListener('submit', saveBookmark);
