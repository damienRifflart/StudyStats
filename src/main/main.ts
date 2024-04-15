import { Skolengo } from 'scolengo-api';
import config from './config';
import moment from 'moment'; 
import { Subject } from './types';

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
  for (let i = 0; i < lines.length; i++) {
    buffer.push(lines[i]);

    if (lines[i].includes(subject)) {
      if (buffer.length >= 3) {
        let time1 = buffer[buffer.length - 3].slice(8);
        let time2 = buffer[buffer.length - 2].slice(6);
        let moment1 = moment(time1);
        let moment2 = moment(time2);
        const diff = moment2.diff(moment1, "minutes");
        diffs.push(diff);
      }
      buffer = [];
    }
  }
  let mins = diffs.reduce((acc, curr) => acc + curr, 0);
  let hours = `${Math.floor(mins / 60)} heures ${mins % 60} minutes`;
  return hours;
}

// 
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
  const user = await Skolengo.fromConfigObject(config);
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