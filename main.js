const {Skolengo} = require('scolengo-api')
const { writeFileSync } = require('node:fs')
const config = require('./config');

// index: 8= next monday | 9= next tuesday | 10= next wednesday ... 14 = next sunday
// if the nextDay is the current day -> it outputs today
function nextDay(index) {
  var today = new Date();
  var weekday = today.getDay();
  var daysBefore = index - weekday;
  if (daysBefore === 7) {
    return today;
  } else {
    var nextDay = new Date(today.getTime() + daysBefore * 24 * 60 * 60 * 1000);
    return nextDay;
  }
}

subjects = [
  "ENS. MORAL & CIVIQUE",
  "PHYSIQUE-CHIMIE",
  "FRANCAIS",
  "SESA",
  "ANGLAIS",
  "ALLEMAND",
  "HISTOIRE & GEOGRAPHIE",
  "SCIENCES VIE & TERRE",
  "MATHEMATIQUES",
  "SC. ECONO.& SOCIALES",
  "ED .PHYSIQUE & SPORT.",
  "SNT",
]

Skolengo.fromConfigObject(config).then(async user => {
  const startDate = new Date(new Date()).toISOString().split('T')[0];
  const endDate = new Date(new Date(startDate).setDate(new Date(startDate).getDate() + 99)).toISOString().split('T')[0];

  const infoUser = await user.getUserInfo()
  const agenda = await user.getAgenda(infoUser.id, startDate, endDate, 100)
  const agendaText = agenda.toICalendar()

  var count = ((agendaText.match(/MATHEMATIQUES/g) || []).length)/2;
  console.log(count)
})