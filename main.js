const {Skolengo} = require('scolengo-api')
const { writeFileSync, writeFile } = require('node:fs')
const config = require('./config');

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

function count(subject, text) {
  var matches = text.match(new RegExp(`DESCRIPTION:${subject}`, 'g'));
  return matches ? matches.length : 0;
}

Skolengo.fromConfigObject(config).then(async user => {
  const startDate = new Date(new Date()).toISOString().split('T')[0];
  const endDate = new Date(new Date(startDate).setDate(new Date(startDate).getDate() + 99)).toISOString().split('T')[0];

  const infoUser = await user.getUserInfo()
  const agenda = await user.getAgenda(infoUser.id, startDate, endDate, 100)
  const agendaText = agenda.toICalendar()

  writeFileSync('export.ics', agenda.toICalendar())

  subjects.forEach((subjectName) => {
    console.log(subjectName + ": " + count(subjectName, agendaText));
  });
})