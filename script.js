const buttons = document.querySelectorAll('.btn');

let data = [];

async function loadData() {
  const response = await fetch('./data.json');
  const fetchedData = await response.json();
  data = fetchedData;
  buttons[1].click();
}

function activateClickOption(btn) {
  buttons.forEach(function(b) {
    b.classList.remove('active')
  });
  btn.classList.add('active');
}

function clearActivity() {
  const activity = document.querySelectorAll('.activity-tracker');

  activity.forEach(function(act) {
    act.remove();
  })
}

function renderCards(clickOption) {

  clearActivity()

  const main = document.querySelector('main');

  function previousTimeframeData(clickOption) {

    if(clickOption === 'daily') {
      return 'Yesterday'
    } else if(clickOption === 'weekly') {
      return 'Last Week'
    } else if(clickOption === 'monthly') {
      return 'Last Month'
    }
  }

  data.forEach(function(activity) {
    const name = activity.title;
    const addActivityClass = name.toLowerCase().replace(' ', '-');
    const dataTimeframe = activity.timeframes[clickOption];
    const previousTimeframe = previousTimeframeData(clickOption);
    
    const section = document.createElement('section');
    section.classList.add('activity-tracker', addActivityClass);

    const injectToString = `
            <div class="activity-img">
                <img src="./images/icon-${addActivityClass}.svg" alt="">
            </div>
            <div class="card">
                <div class="activity-card">
                    <h4 class="activity-name">${name}</h4>
                    <img src="./images/icon-ellipsis.svg">
                </div>
                <div class="time-div">
                    <h3 class="current-time">
                        ${dataTimeframe.current}hrs
                    </h3>
                    <div class="prev-time">
                        <p>
                            ${previousTimeframe} - ${dataTimeframe.previous}hrs
                        </p>
                    </div>
                </div>
            </div>`

    section.innerHTML = injectToString;
    main.append(section)
  })
}

buttons.forEach(function(btn) {
  btn.addEventListener('click', function() {
    activateClickOption(btn);
    const clickOption = btn.dataset.option;
    renderCards(clickOption)
  })
})


loadData();

