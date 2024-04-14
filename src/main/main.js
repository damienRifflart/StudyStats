import { Skolengo } from 'scolengo-api';
import config from './config';
import moment from 'moment'; 

const subjects = [
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
];

function count(word, text) {
  var matches = text.match(new RegExp(word, 'g'));
  return matches ? matches.length : 0;
}

function fetchData(text, word) {
  var lines = text.split("\n");
  let diffs = [];
  var buffer = [];
  for (var i = 0; i < lines.length; i++) {
    buffer.push(lines[i]);

    if (lines[i].includes(word)) {
      if (buffer.length >= 3) {
        let time1 = buffer[buffer.length - 3].slice(8);
        let time2 = buffer[buffer.length - 2].slice(6);
        let moment1 = moment(time1);
        let moment2 = moment(time2);
        var diff = moment2.diff(moment1, "minutes");
        diffs.push(diff);
      }
      buffer = [];
    }
  }
  let mins = diffs.reduce((acc, curr) => acc + curr, 0);
  let hours = `${Math.floor(mins / 60)} hours ${mins % 60} minutes`;
  return hours;
}

async function getData() {
  const user = await Skolengo.fromConfigObject(config);
  const startDate = new Date().toISOString().split('T')[0];
  const endDate = new Date(new Date(startDate).setDate(new Date(startDate).getDate() + 99)).toISOString().split('T')[0];

  const infoUser = await user.getUserInfo();
  const agenda = await user.getAgenda(infoUser.id, startDate, endDate, 100);
  const agendaText = agenda.toICalendar();

  const data = [];

  for (const subject of subjects) {
    data.push({
      title: subject,
      periods: count(`SUMMARY:${subject}`, agendaText),
      hours: fetchData(agendaText, subject)
    });
  }

  return data;
}

export default getData;
