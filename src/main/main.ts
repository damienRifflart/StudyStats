import { Skolengo } from 'scolengo-api';
import moment from 'moment'; 
import { Subject } from './types';
import fs from 'fs';
import { TokenSetParameters } from 'openid-client'
import config from './config.json'

function onTokenRefresh (newTokenSet: TokenSetParameters) {                     
  fs.writeFileSync('./config.json', JSON.stringify({...newTokenSet, school: config.school}, null, 2));
}

// count how many classes in every subject
function countClass(subject: string, text: string): number{
  const matches = text.match(new RegExp(subject, 'g'));
  return matches ? matches.length : 0;
}

// get the time left in every subject
function getTime(subject: string, text: string): string {
  const lines = text.split("\n");
  let diffs: number[] = [];
  let buffer: string[] = [];
  const regex = new RegExp(`\\b${subject}\\b`);

  for (let i = 0; i < lines.length; i++) {
    buffer.push(lines[i]);

    if (regex.test(lines[i])) {
      if (buffer.length >= 3) {
        let time1 = buffer[buffer.length - 3].slice(8);
        let time2 = buffer[buffer.length - 2].slice(6);
        let moment1 = moment(time1);
        let moment2 = moment(time2);
        const diff = moment2.diff(moment1, "minutes");
        diffs.push(diff);
        // remove the exception where there is anglais in another subject
        if (subject === "ANGLAIS" && lines[i].replace(/\([^)]*\)/g, '').trim() === "SUMMARY:SESA-MATHS ANGLAIS") {
          diffs.pop();
        }
      }
      buffer = [];
    }
  }
  let mins = diffs.reduce((acc, curr) => acc + curr, 0);
  let hours = `${Math.floor(mins / 60)} heures ${mins % 60} minutes`;
  return hours;
}

// get a list of the subjects
function parseSubjects(text: string): Set<string> {
  const subjects = new Set<string>();
  const lignes = text.split('\n');

  for (const ligne of lignes) {
    if (ligne.startsWith('DESCRIPTION:')) {
      const subject = ligne.split('DESCRIPTION:')[1].split(' avec')[0];
      // enleve sesa-maths
      if (!subject.includes('SESA-')) {
        subjects.add(subject); 
      }
    }
  };

  return subjects
}

// get subjects titles, classes, and times left
async function getData(): Promise<Subject[]> {
  // get agenda for the next 100 days
  const user = await Skolengo.fromConfigObject(config, {onTokenRefresh});
  const startDate = new Date().toISOString().split('T')[0];
  const endDate = new Date(new Date(startDate).setDate(new Date(startDate).getDate() + 99)).toISOString().split('T')[0];

  const infoUser = await user.getUserInfo();
  const agenda = await user.getAgenda(infoUser.id, startDate, endDate, 100);
  const agendaText = agenda.toICalendar();
  const subjects = parseSubjects(agendaText)

  const data:Subject[] = [];

  for (const subject of subjects) {
    data.push({
      title: subject,
      class: countClass(`SUMMARY:${subject}`, agendaText),
      time: getTime(subject, agendaText),
    });
  }

  return data;
}

export default getData;