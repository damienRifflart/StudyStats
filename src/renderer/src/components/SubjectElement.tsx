import { Subject } from "src/main/types";

interface Props {
  subject: Subject;
}

export default function SubjectElement({ subject }: Props) {
  return (
    <div>
      <p>
        {subject.title}: {subject.class} cours dont {subject.time}
      </p>
    </div>
  );
}
