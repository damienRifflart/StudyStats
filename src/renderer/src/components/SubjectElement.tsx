import { Data } from "src/main/types";

interface Props {
  subject: Data;
}

export default function SubjectElement({ subject }: Props) {
  return (
    <div>
      <p className="text-lg ml-3 mt-3">
        <strong>{subject.title}</strong>: <span className='text-indigo-400'>{subject.class}</span> cours dont <span className='text-indigo-400'>{subject.time}</span>
      </p>
    </div>
  );
}
