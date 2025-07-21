// --------------- Main Process - START --------------------------
let activityContainer = document.getElementById('activityContainer');
let navElement = document.querySelector('.c-profile__nav > ul');
let dashboardData = '';

const INTERVALS = [
  {name: 'daily', text: 'Day'},
  {name: 'weekly', text: 'Week'},
  {name: 'monthly', text: 'Month'}
];

// Load activities data from json file, then update view
fetch('./data.json').then((res) => {
  if (!res.ok) return console.log('Something went wrong.')

  return res.json();
}).then((data) => {
  dashboardData = data;
  updateactivityContainer(0);
});

// --------------- Main Process - END --------------------------

// --- Update activities view
function updateactivityContainer(intervalIndex) {
  if (!dashboardData || intervalIndex >= INTERVALS.length) return console.log('Something went wrong.');

  activityContainer.innerHTML = '';
  let intervalName = INTERVALS[intervalIndex].name;
  let intervalText = INTERVALS[intervalIndex].text;
  dashboardData.forEach((item) => {
    // item.title
    const card = document.createElement('div')
    card.dataset.cardTitle = item.title;

    item.timeframes[intervalName].current;
    item.timeframes[intervalName].previous;
    
    const cssClass = item.title.replace(/ /g, "-").toLowerCase();

    card.innerHTML = `
      <article class="c-activity activity-${cssClass}">
        <div class="c-activity__logo"></div>
        <div class="c-activity__content">
          <header class="c-activity__content__header">
            <h3 class="activity__title">${item.title}</h3>
            <img
              alt="Options"
              width="21"
              height="5"
              src="./images/icon-ellipsis.svg"
            />
          </header>
          <div class="c-activity__content__details">
            <span class="activity__current">${item.timeframes[intervalName].current}hrs</span>
            <span class="activity__previous">Last ${intervalText} - ${item.timeframes[intervalName].previous}hrs</span>
          </div>
        </div>
      </article>
    `;

    activityContainer.appendChild(card);
  });

}

// --- Handler for navigation buttons's onclick event
function handleNavBtnClick(btnIndex) {

  // Remove 'active' class from all nav buttons
  Array.from(navElement.children).forEach((li) => {
    li.classList.remove('active');
  })

  // Add 'active' class to the clicked nav button
  let clickedLiElement = navElement.children[btnIndex].classList.add('active');
  updateactivityContainer(btnIndex);
}

