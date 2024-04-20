import { Data } from "src/main/types";

interface Props {
  subject: Data;
}

export default function SubjectElement({ subject }: Props) {
  return (
    <div>
      <p className="text-lg ml-3 mt-3">
        <strong>{subject.title}</strong>: {subject.class} cours dont {subject.time}
        {subject.totalTime}
      </p>
    </div>
  );
}
