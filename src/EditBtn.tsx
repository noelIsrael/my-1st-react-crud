import type { User } from "./userList";

import { Link } from "react-router-dom";

function EditBtn({ human }: { human: User }) {
  return (
    <Link to={`/users/${human.id}`}>
      Edit
    </Link>
  );
}

export default EditBtn;
