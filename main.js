
// Ensure use of Airbnb Javascript style guide.
// Follows Airbnb JavaScript style guide

const intro = document.getElementById('intro');
const introForm = document.getElementById('intro-form');
const welcomePage = document.getElementById('welcome-page');
const introFormInput = document.getElementById('introForm-input');
const matrix = document.getElementById('matrix');
const header = document.getElementById('header')
const categoryPage = document.getElementById('category-page')
const checklistPage = document.getElementById('checklist-page')

matrix.style.display = 'none';
header.style.display = 'none';
categoryPage.style.display = 'none';
checklistPage.style.display = 'none';
// const userName = localStorage.getItem('name');

document.addEventListener('click', (e) => {
  if (e.target.id === 'start-btn') {
    welcomePage.style.display = 'none';
    introForm.style.display = 'block';
  } else if (e.target.id === 'decline-btn') {
    introForm.style.display = 'none';
    welcomePage.style.display = 'none';
    introFormInput.value = '';
    matrix.style.display = 'block';
    header.style.display = 'block';
  }
  else if (e.target.id === "categories-btn"){
    matrix.style.display = 'none';
    header.style.display = 'none';
    categoryPage.style.display = 'block';
  }

  else if (e.target.id === "checklist-btn"){
    matrix.style.display = 'none';
    header.style.display = 'none';
    checklistPage.style.display = 'block';
    //to render the Checklist page when the button is clicked
    renderChecklist()
  }

  else if (e.target.id === "back-btn"){
    matrix.style.display = 'block';
    header.style.display = 'block';
    categoryPage.style.display = 'none';
    checklistPage.style.display = 'none';
  }
});

introForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const introFormData = new FormData(introForm);
  const inputValue = introFormData.get('user');

  localStorage.setItem('name', inputValue);

  introFormInput.value = '';
  intro.style.display = 'none';
  matrix.style.display = 'block';
});

/* activate toggle menu */
document.addEventListener("DOMContentLoaded", function () {
    let navToggle = document.querySelector(".nav-toggle");
    let navMenu = document.getElementById("nav-menu");

    navToggle.addEventListener("click", function () {
       navMenu.classList.toggle("active");
    });
 });

 /* search functionality */
 document.getElementById('searchInput').addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
      event.preventDefault(); 
      performSearch();
  }
});

function performSearch() {
  let query = document.getElementById('searchInput').value;
  console.log('Searching for:', query);
}


const date = new Date();
const jsonObj = [
  {
    categoryName: 'Routine activities',
    activityTypes: [
      {
        activityName: 'Projects',
        Tasks: [
          {
            taskName: 'Ontrack',
            taskDescription: 'Create json data handling',
            days: [
              '25/01/2024',
              '23/01/2024',
              '22/01/2024',
            ],
            completion: [
              '23/01/2024',
              '22/01/2024',
            ],
          },
        ],
      },
    ],
  },
  {
    categoryName: 'Studying',
    activityTypes: [
      {
        activityName: 'Node js course',
        Tasks: [
          {
            taskName: 'Read bookmarked article',
            taskDescription: 'Go through all articles in bookmark',
            days: [
              'Monday',
              '02/02/2024',
            ],
            completion: [],
          },
        ],
      },
    ],
  },
];

// Convert date object to DD/MM/YYYY string format
function dateFormat(fDate) {
  const dd = String(fDate.getDate()).padStart(2, '0');
  const mm = String(fDate.getMonth() + 1).padStart(2, '0');
  const yyyy = fDate.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

// Update the name of month in dropdown box whenever week change results in month change
function setMonthName(mDate) {
  const months = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December',
  ];

  const monthIndex = mDate.getMonth();
  // Drop down box
  document.getElementById('month-name').innerHTML = `${months[monthIndex]}`;
}

// Return day of DD/MM/YYYY
function giveDay(iDate) {
  const dateComponents = iDate.split('/');

  const formattedDate = `${dateComponents[1]}/${dateComponents[0]}/${dateComponents[2]}`;

  const d = new Date(formattedDate);
  const dayIndex = d.getDay();

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return daysOfWeek[dayIndex];
}

// To open task description page when task element is clicked on
// eslint-disable-next-line no-unused-vars
function openDetail(id) {
  if (document.getElementById('detailed-desc') == null) {
    // id format -> taskDate-taskName
    const taskDate = id.slice(0, 10);

    const taskName = id.slice(11);

    // To check for due date with day as well
    const day = giveDay(taskDate);

    let taskCat = ''; let taskAct = ''; let taskDesc = ''; let taskDays = '';

    jsonObj.forEach((category) => {
      category.activityTypes.forEach((activityType) => {
        activityType.Tasks.forEach((task) => {
          if (task.taskName === taskName) {
            // Prevents same task name mismatch
            if (task.days.includes(taskDate) || task.days.includes(day)) {
              taskDesc = task.taskDescription;
              taskCat = category.categoryName;
              taskAct = activityType.activityName;
              taskDays = task.days;
            }
          }
        });
      });
    });

    const overlayDesc = document.createElement('div');
    // Class overlays on top of all elements
    overlayDesc.classList.add('overlay');
    overlayDesc.setAttribute('id', 'detailed-desc');

    // Days go as separate widgets to the task description window with button to remove them
    let htmlAdd = '';

    taskDays.forEach((taskDay) => {
      htmlAdd += `
          <div id="${id}-deadline-${taskDay}-div" class="day-widget">
            <span id="${id}-deadline-${taskDay}" class="desc-element date-widget">${taskDay}</span>
            <button id="${id}-deadline-${taskDay}-button" onclick="deleteDate('${id}-deadline-${taskDay}-div')">x</button>
          </div>
      `;
    });

    // On clicking any of the attributes in the description, give id (name and date) to editDesc
    overlayDesc.innerHTML = `
      <div id="back-n-day">
        <img src="images/back.png" id="back-img" onclick="backFromDesc()">

        <span id="desc-day">${day} (${taskDate})</span>
      </div>

      <div id="task-desc">
        <div id="name-desc" class="desc-item">Task name : 
          <span id="${id}-name" class="desc-element" onclick="editDesc('${id}', 'name')"> ${taskName}</span>
        </div>
        <div id="deadline-desc" class="desc-item">Deadline : 
          <div id="task-days" class="task-days">
            ${htmlAdd}
          </div>
          <div id="add-day">
            <button id="add-day-button" onclick="addDay('${id}')"> + </button>
          </div>
        </div>
        <div id="category-desc" class="desc-item">Category : 
            <span id="${id}-category" class="desc-element" onclick="editDesc('${id}', 'category')"> ${taskCat}</span>
        </div>
        <div id="activity-desc" class="desc-item">Activity : 
            <span id="${id}-activity" class="desc-element" onclick="editDesc('${id}', 'activity')"> ${taskAct}</span>
        </div>
        <div id="detail-desc" class="desc-item">Description : 
            <span id="${id}-description" class="desc-element" onclick="editDesc('${id}', 'description')">${taskDesc}</span>
        </div>

        <div id="save-button-div" class="desc-item">
          <button id=save-button onclick="saveDesc('${id}')">Save</button>
        <div>
      </div>
    `;
    document.getElementById('matrix').appendChild(overlayDesc);
  }
}

// Open entry box for date when + is clicked on
// eslint-disable-next-line no-unused-vars
function addDay(id) {
  const addDayDiv = document.getElementById('add-day');
  addDayDiv.innerHTML = `
    <input id="date-entry" type="date" class="add-day-element">
    <button id="add-day-submit" onclick="addDaySubmit('${id}')" class="add-day-element">Add</button>
    <button id="add-day-cancel" onclick="addDayCancel('${id}')" class="add-day-element">Cancel</button>
    <button id="show-day-dropdrown" onclick="showDayDropDown('${id}')" class="add-day-element">Add day</button>
  `;
}

// Show drop down menu when Add day button is clicked
// eslint-disable-next-line no-unused-vars
function showDayDropDown(id) {
  const addDayDiv = document.getElementById('add-day');
  addDayDiv.innerHTML = `
    <select id="day-dropdown" class="add-day-element">
        <option value="Sunday">Sunday</option>
        <option value="Monday">Monday</option>
        <option value="Tuesday">Tuesday</option>
        <option value="Wednesday">Wednesday</option>
        <option value="Thursday">Thursday</option>
        <option value="Friday">Friday</option>
        <option value="Saturday">Saturday</option>
    </select>
    <button id="add-day-submit" onclick="addDaySubmit('${id}')" class="add-day-element">Add</button>
    <button id="add-day-cancel" onclick="addDayCancel('${id}')" class="add-day-element">Cancel</button>
  `;
}

// Remove entry box and add button when cancel is clicked on
// eslint-disable-next-line no-unused-vars
function addDayCancel(id) {
  const addDayDiv = document.getElementById('add-day');
  addDayDiv.innerHTML = `
    <button id="add-day-button" onclick="addDay('${id}')"> + </button>  
  `;
}

// Create widget for newly created date and it's removal button
// eslint-disable-next-line no-unused-vars
function addDaySubmit(id) {
  const addDayDiv = document.getElementById('add-day');

  const inputDateEntry = document.getElementById('date-entry');
  const inputDayEntry = document.getElementById('day-dropdown');

  // const inputDate = inputDateEntry.value;
  // const inputDayEntry inputDayEntry.value;

  let addedDate = null;

  // Date entry box will not exist is day is added (vice versa)
  if (inputDateEntry) {
    const inputDate = inputDateEntry.value;
    const dateComp = inputDate.slice(8);
    const monthComp = inputDate.slice(5, 7) - 1;
    const yearComp = inputDate.slice(0, 4);

    const dateObj = new Date(yearComp, monthComp, dateComp);
    addedDate = dateFormat(dateObj);
  } else if (inputDayEntry) {
    const inputDay = inputDayEntry.value;
    addedDate = inputDay;
  } else {
    // Don't accept if field is empty.
    return;
  }

  const deadlineDiv = document.getElementById('task-days');
  const dayDiv = document.createElement('div');
  dayDiv.setAttribute('id', `${id}-deadline-${addedDate}-div`);
  dayDiv.classList.add('day-widget');

  dayDiv.innerHTML = `
    <span id="${id}-deadline-${addedDate}" class="desc-element date-widget">${addedDate}</span>
    <button id="${id}-deadline-${addedDate}-button" onclick="deleteDate('${id}-deadline-${addedDate}-div')">x</button>
  `;

  // Delete entry boxes and refresh + button
  addDayDiv.innerHTML = `
    <button id="add-day-button" onclick="addDay('${id}')"> + </button>  
  `;

  deadlineDiv.appendChild(dayDiv);
}

// Remove date widget when it's removal button (x) is clicked on
// eslint-disable-next-line no-unused-vars
function deleteDate(id) {
  const dateWidget = document.getElementById(id);
  dateWidget.remove();
}

// Click on task description items to edit them using entry boxes and date inputs
// eslint-disable-next-line no-unused-vars
function editDesc(id, element) {
  let boxId = id;
  let textBox = null;

  // Find the element that was clicked on
  switch (element) {
    case 'name':
      boxId = `${id}-name`;
      textBox = document.getElementById(boxId);
      break;

    case 'deadline':
      boxId = `${id}-deadline`;
      textBox = document.getElementById(boxId);
      break;

    case 'category':
      boxId = `${id}-category`;
      textBox = document.getElementById(boxId);
      break;

    case 'activity':
      boxId = `${id}-activity`;
      textBox = document.getElementById(boxId);
      break;

    case 'description':
      boxId = `${id}-description`;
      textBox = document.getElementById(boxId);
      break;

    default:
      textBox = '';
      break;
  }

  // Entry box to replace the text
  const entryBox = document.createElement('input');
  entryBox.setAttribute('id', `edit-entry-${element}`);
  entryBox.type = 'text';
  entryBox.value = textBox.textContent;

  textBox.parentNode.replaceChild(entryBox, textBox);

  // On clicking away from the box, change entry box to text
  entryBox.addEventListener('blur', () => {
    textBox = document.createElement('span');
    textBox.setAttribute('id', boxId);
    textBox.onclick = editDesc.bind(null, id, element);

    textBox.textContent = entryBox.value;

    entryBox.parentNode.replaceChild(textBox, entryBox);
  });

  entryBox.focus();
}

// Set onclick functions to each task element
function setListen() {
  document.querySelectorAll('.task-element').forEach((element) => {
    const id = element.id.replace('-ele', '');
    element.addEventListener('click', () => openDetail(id));
  });
}

// Delete overlay element when back button is pressed
// eslint-disable-next-line no-unused-vars
function backFromDesc() {
  const descWin = document.getElementById('detailed-desc');
  descWin.remove();
}

function loadMatrix(matDate) {
  setMonthName(matDate);
  const dayNum = matDate.getDay();

  // Set date to the last Sunday to build day elements from the top
  matDate.setDate(matDate.getDate() - dayNum);

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const daysContainer = document.getElementById('mobile-table');
  daysContainer.innerHTML = '';

  daysOfWeek.forEach((day) => {
    const dayDiv = document.createElement('div');

    // Division for all components of the day
    dayDiv.classList.add('days');

    const dayHeader = document.createElement('div');

    // Division for day name, date and add task button
    dayHeader.classList.add('day-header');

    const fDate = dateFormat(matDate);

    dayHeader.innerHTML = `
            <button type="button">+</button>
            <span class="day-name">${day} (${fDate})</span>
        `;

    matDate.setDate(matDate.getDate() + 1);

    const taskList = document.createElement('div');

    // Division for task name and checkbox
    taskList.classList.add('task-list');

    /*
      Find each task's day in json and check if it is same as the day of element under construction.
      If it is, add the task name under the constructed header.
    */
    const boxToTick = [];
    jsonObj.forEach((category) => {
      category.activityTypes.forEach((activityType) => {
        activityType.Tasks.forEach((task) => {
          task.days.forEach((dayN) => {
            if (dayN === day || dayN === fDate) {
              const id = `${fDate}-${task.taskName}`;

              taskList.innerHTML = `
                <div id="${id}-ele" class="task-element">
                  <label class="checkbox-label" for="${id}-checkbox"${id}-task"> ${task.taskName} </label>
                  <input type="checkbox" id="${id}-checkbox" name="task-checkbox" value="checked" onchange="checkboxStore('${id}')">
                </div>
              `;

              // Get id of checkboxes to be ticked
              if (task.completion.includes(fDate)) {
                boxToTick.push(`${id}-checkbox`);
              }
            }
          });
        });
      });
    });

    dayDiv.appendChild(dayHeader);
    dayDiv.appendChild(taskList);

    daysContainer.appendChild(dayDiv);

    // Tick all checkboxes that have a completion date in json.
    boxToTick.forEach((boxId) => {
      document.getElementById(`${boxId}`).checked = true;
    });
  });
  setListen();
}

// eslint-disable-next-line no-unused-vars
function saveDesc(id) {
  const taskDate = id.slice(0, 10);
  const taskName = id.slice(11);
  const day = giveDay(taskDate);

  // Get all id of the respective element spans (they're to be clicked on and edited)
  const nameId = `${id}-name`;
  const categoryId = `${id}-category`;
  const activityId = `${id}-activity`;
  const descId = `${id}-description`;

  const updatedName = document.getElementById(nameId).textContent;
  const updatedcategory = document.getElementById(categoryId).textContent;
  const updatedactivity = document.getElementById(activityId).textContent;
  const updateddesc = document.getElementById(descId).textContent;

  const datesList = [];
  const dateWidgets = Array.from(document.querySelectorAll('.date-widget'));
  dateWidgets.forEach((element) => {
    datesList.push(document.getElementById(element.id).textContent);
  });

  jsonObj.forEach((category) => {
    category.activityTypes.forEach((activityType) => {
      activityType.Tasks.forEach((task) => {
        if (task.taskName === taskName) {
          // Prevents same task name mismatch
          if (task.days.includes(taskDate) || task.days.includes(day)) {
            /* eslint-disable no-param-reassign */
            task.taskName = updatedName;
            task.days = datesList;
            task.taskDescription = updateddesc;
            category.categoryName = updatedcategory;
            activityType.activityName = updatedactivity;
            /* eslint-enable no-param-reassign */
          }
        }
      });
    });
  });
  // Place matrix on the task that was cliked on
  const dateComponents = taskDate.split('/');

  const formattedDate = `${dateComponents[1]}/${dateComponents[0]}/${dateComponents[2]}`;
  const d = new Date(formattedDate);

  loadMatrix(d);

  document.getElementById('detailed-desc').remove();
}

document.addEventListener('DOMContentLoaded', () => {
  loadMatrix(date);
});

/*  When the checkbox is clicked, identify the checkbox using it's id
    which is in the format <date-taskName-checkbox>.
    Match the task name of the checkbox to the one in json
    if checkbox ticked -> add the date of checkbox to json
    if checkbox unticked -> remote date from json

    Date stored in json will identify which checkboxes needs to be ticked
    Prevents other checkboxes from updating when a checkbox belonging to
    same day is updated.
*/

// eslint-disable-next-line no-unused-vars
function checkboxStore(id) {
  const boxDate = id.slice(0, 10);
  const boxName = id.slice(11, -9);

  jsonObj.forEach((category) => {
    category.activityTypes.forEach((activityType) => {
      activityType.Tasks.forEach((task) => {
        if (task.taskName === boxName) {
          const index = task.completion.indexOf(boxDate);
          if (index !== -1) {
            task.completion.splice(index, 1);
          } else {
            task.completion.push(boxDate);
          }
        }
      });
    });
  });
  localStorage.setItem('tasksJson', JSON.stringify(jsonObj));
  // console.log(jsonObj);
}

// Clear the matrix table when changing week/month
function deleteChild() {
  const table = document.getElementById('mobile-table');
  while (table.firstChild) {
    table.removeChild(table.lastChild);
  }
}

// eslint-disable-next-line no-unused-vars
function prevMonth() {
  deleteChild();
  /*
    Set the date to the previous week and load matrix
    Creating the matrix puts the date on next Sunday
    so decrement 8 to get to previous week
  */
  date.setDate(date.getDate() - 8);

  loadMatrix(date);
}

// eslint-disable-next-line no-unused-vars
function nextMonth() {
  deleteChild();
  // Don't have to increment date as creating matrix puts date on next week

  loadMatrix(date);
}

// Click to display dropdown
// eslint-disable-next-line no-unused-vars
function changeMonth() {
  const dropdown = document.getElementById('months-dropdown');
  if (dropdown.style.display === 'block') {
    dropdown.style.display = 'none';
  } else {
    dropdown.style.display = 'block';
  }
}

// Select month and load matrix
// eslint-disable-next-line no-unused-vars
function goToMonth(month) {
  document.getElementById('months-dropdown').style.display = 'none';
  deleteChild();
  date.setMonth(month);
  loadMatrix(date);
}
// 1. Adding the category
let categoryIdCounter = 1; 

function addCategory() {
    // Create input for new category name
    const categoryInputHtml = `
        <input type="text" id='new-category-name' placeholder="Category name"> 
        <button onclick="submitCategoryName()">Add</button>
    `;
    document.getElementById('category-entry').innerHTML = categoryInputHtml;
}

function submitCategoryName() {
    const categoryName = document.getElementById('new-category-name').value;
    if (categoryName.trim() === '') {
        alert('Category name cannot be empty');
        return;
    }
    
    // Create new category div
    const newCategoryDiv = document.createElement('div');
    newCategoryDiv.id = `category-${categoryIdCounter}`; // Assign a unique ID
    newCategoryDiv.classList.add('category');
    
    // HTML for new category
    newCategoryDiv.innerHTML = `
        <button input="button" onclick="toggleCategory(${categoryIdCounter})">&gt;</button>
        <span id="category-text-${categoryIdCounter}">${categoryName}</span>
        <button input="button" onclick="addActivity(${categoryIdCounter})"> + </button>
        <div id="activities-container-${categoryIdCounter}"></div> 
    `;
    
    // Add new category to the container
    document.getElementById('categories-container').appendChild(newCategoryDiv); 

    document.getElementById('category-entry').innerHTML = '';
    
    categoryIdCounter++;
}


function toggleCategory(categoryId) {
    console.log(`Toggle category ID: ${categoryId}`);

}



// 2. Adding the activity
function addActivity(categoryId) {
    const categoryDiv = document.getElementById(`category-${categoryId}`);
    const existingInput = categoryDiv.querySelector('.activity-input');
    if (existingInput) {
        return;
    }

    // Create input for new activity name
    const activityInputHtml = `
        <div class="activity-input">
            <input type="text" id='new-activity-name-${categoryId}' class="new-activity-name" placeholder="Activity name"> 
            <button onclick="submitActivityName(${categoryId})">Add</button>
        </div>
    `;
    
    // Insert the input field into the category div
    categoryDiv.insertAdjacentHTML('beforeend', activityInputHtml);
}

function submitActivityName(categoryId) {
    const activityNameInput = document.getElementById(`new-activity-name-${categoryId}`);
    const activityName = activityNameInput.value;
    if (activityName.trim() === '') {
        alert('Activity name cannot be empty');
        return;
    }

    const activitiesContainer = document.getElementById(`activities-container-${categoryId}`);
    // Calculate new activity ID based on existing activities
    const existingActivities = activitiesContainer.getElementsByClassName('activity');
    const activityNumber = existingActivities.length + 1;
    const activityId = `${categoryId}-${activityNumber}`;

    // Create new activity div
    const newActivityDiv = document.createElement('div');
    newActivityDiv.id = `activity-${activityId}`;
    newActivityDiv.classList.add('activity');

    // HTML for new activity
    newActivityDiv.innerHTML = `
        <button input="button" onclick="toggleActivity('${activityId}')">&gt;</button>
        <span id="activity-text-${activityId}">${activityName}</span>
        <button input="button" onclick="addTask('${activityId}')"> + </button>
        <div id="tasks-container-${activityId}"></div> <!-- This will hold the tasks for this activity -->
    `;

    // Add new activity to the container
    activitiesContainer.appendChild(newActivityDiv);

    // Remove the input field after adding the activity
    activityNameInput.parentElement.remove();
}


function toggleActivity(activityId) {
    console.log(`Toggle activity ID: ${activityId}`);
}



// 3. Adding the task
function addTask(activityId) {
    const activityDiv = document.getElementById(`activity-${activityId}`);
    const existingInput = activityDiv.querySelector('.task-input');
    if (existingInput) {
        return;
    }

    // Create input fields for new task
    const taskInputHtml = `
        <div class="task-input">
            <input type="text" id='new-task-name-${activityId}' class="new-task-name" placeholder="Task name">
            <input type="text" id='new-task-desc-${activityId}' class="new-task-desc" placeholder="Description">
            <input type="text" id='new-task-date-${activityId}' class="new-task-date" placeholder="Due dates" onfocus="(this.type='date')">
            <button onclick="submitTaskName('${activityId}')">Add</button>
        </div>
    `;
    
    // Insert the input fields into the activity div
    activityDiv.insertAdjacentHTML('beforeend', taskInputHtml);
}

function submitTaskName(activityId) {
    const taskNameInput = document.getElementById(`new-task-name-${activityId}`);
    const taskDescInput = document.getElementById(`new-task-desc-${activityId}`);
    const taskDateInput = document.getElementById(`new-task-date-${activityId}`);
    const taskName = taskNameInput.value;
    const taskDesc = taskDescInput.value;
    let taskDate = taskDateInput.value;

    if (taskName.trim() === '' || taskDesc.trim() === '' || taskDate.trim() === '') {
        alert('Task name, description, and due date cannot be empty');
        return;
    }

    // Convert date from yyyy-mm-dd to dd/mm/yyyy format
    if (taskDate) {
        const dateParts = taskDate.split('-'); 
        taskDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`; 
    }

    const tasksContainer = document.getElementById(`tasks-container-${activityId}`);
    // Calculate new task ID based on existing tasks
    const existingTasks = tasksContainer.getElementsByClassName('task');
    const taskNumber = existingTasks.length + 1;
    const categoryId = activityId.split('-')[0];
    const taskId = `${activityId}-${taskNumber}`;

    // Create new task div
    const newTaskDiv = document.createElement('div');
    newTaskDiv.id = `task-${taskId}`;
    newTaskDiv.classList.add('task');

    // HTML for new task
    newTaskDiv.innerHTML = `
        <span id="task-name-${taskId}">${taskName}</span>
        <span id="task-desc-${taskId}">${taskDesc}</span>
        <span id="task-date-${taskId}">${taskDate}</span>
    `;

    // Add new task to the container
    tasksContainer.appendChild(newTaskDiv);

    // Get the tasks added to the category page to the local storage
    getTasksTochecklist(taskName, taskDate, taskId)

    // Remove the input fields after adding the task
    taskNameInput.parentElement.remove();
}

// the button will render the new tasks added to local storage from the category page on the checklist page
document.getElementById("checklist-add-btn").addEventListener('click', () => {
    renderTasksToChecklist()
})



//to get the current date and day to be displayed the Today's Checklist page
function getChecklistDay() {
    const dayIndex = String(date.getDay())
    const checklistDate = dateFormat(date)
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return ` <h2 class="checklist-day">${daysOfWeek[dayIndex]}(${checklistDate})</h2>`;
}

const today = getChecklistDay()

//to render the Checklist page with the current date and day plus the tasks added to the local storage
function renderChecklist() {
    const checklistDate = document.getElementById('checklist-date')
    checklistDate.innerHTML = `${today}`
    renderTasksToChecklist()
}


function dateFormat(date) {
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  }
  

// get the tasks added to the category page to the local storage to be used in the checklist page
function getTasksTochecklist(taskName, taskDate, taskId) {
    const checklistItems = JSON.parse(localStorage.getItem('checklistItems') || "[]");
    const checklistObj = {
        name: taskName,
        date: taskDate,
        id: Math.random().toString(16).slice(2),
    }
    checklistItems.push(checklistObj)
    localStorage.setItem('checklistItems', JSON.stringify(checklistItems))
}


const todaysDate = dateFormat(date)

// get the tasks from the local storage to the checklist page

function renderTasksToChecklist() {
    const savedTasks = JSON.parse(localStorage.getItem('checklistItems') || "[]");
    const checklistContainer = document.getElementById('checklist-container')
    let checklistHtml = savedTasks.map(task => {
        // only show today's tasks
        if (task.date === todaysDate) {
            return `
            <div class="checklist-task">
            <label for="${task.id}" class="checklist-name">${task.name}</label>
            <input type="checkbox" id="${task.id}" name="${task.name}" />
            </div>
            `
        }
    }).join('');
    checklistContainer.innerHTML = checklistHtml
    const checkboxes = document.querySelectorAll('.checklist-container input[type="checkbox"]');
    checkboxes.forEach(checkbox => checkbox.addEventListener('click', handleCheck));
}


function handleCheck(e) {
    const savedTasks = JSON.parse(localStorage.getItem('checklistItems') || "[]");
    // if the checkbox is checked then the task will be removed from the local storage and the checklist page 
    if (document.getElementById(e.target.id).checked) {
        savedTasks.filter(x => x.id === e.target.id).map(tasks => {
            savedTasks.pop(tasks)
            return savedTasks
        })
    }
    localStorage.setItem('checklistItems', JSON.stringify(savedTasks))
    location.reload();
}