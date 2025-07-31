// --------------- Main Process - START --------------------------
let challengeContainer = document.querySelector('.challenge-wrapper');
let dataChallenges = '';


// Load activities data from json file, then update view
fetch('./data-challenges.json').then((res) => {
  if (!res.ok) return console.log('Something went wrong.')

  return res.json();
}).then((data) => {
  dataChallenges = data;
  updateChallengeContainer(0);
});

// --------------- Main Process - END --------------------------

// --- Update Challenges view
function updateChallengeContainer() {
  if (!dataChallenges) return console.log('Something went wrong.');

  dataChallenges.forEach((item) => {

    const section = document.createElement('section');

    const header = document.createElement('h2')
    header.innerHTML = item.category;
    section.appendChild(header);

    const listChallenges = document.createElement('ul');
    item.challenges.forEach(challenge => {
      const challengeElement = document.createElement('li');
      challengeElement.innerHTML = `
        <a href="./${item.category}/${challenge.folder}/index.html">${challenge.name}${challenge.note ? ` (${challenge.note})` : ""}</a>
      `;

      listChallenges.appendChild(challengeElement);
    });
    section.appendChild(listChallenges);


    challengeContainer.appendChild(section);
  });

}