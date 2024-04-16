import { Subject } from "src/main/types";

interface Props {
  subject: Subject;
}

export default function SubjectElement({ subject }: Props) {
  return (
    <div>
      <p className="text-lg">
        <strong>{subject.title}</strong>: {subject.class} cours dont {subject.time}
      </p>
    </div>
  );
}
