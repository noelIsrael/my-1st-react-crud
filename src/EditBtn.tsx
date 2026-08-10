import { useState } from "react";
import type { User } from "./userList";

function EditBtn({ id, abilityToRefresh }: { id: string; abilityToRefresh: React.Dispatch<React.SetStateAction<number>> }) {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState("");
    const [salary, setSalary] = useState(0);
    const handleEdit = () => {
        setIsEditing(true);
    }
    const editUser = async ({ updatedUser }: { updatedUser: Partial<User> }) => {
        await fetch(`http://localhost:3000/users/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedUser)
        });
        abilityToRefresh((prev) => prev + 1);
    };

    return (
        <>
            <button onClick={handleEdit}>Edit</button>
            {isEditing && (
                <div>
                    <h1>Edit User</h1>
                    <form>
                        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                        <input type="number" placeholder="Salary" value={salary} onChange={(e) => setSalary(Number(e.target.value))} />
                        <button type="submit" onClick={()=> editUser({ updatedUser: { name, salary } })}>Save</button>
                    </form>
                </div>
            )}
        </>
    )
}

export default EditBtn