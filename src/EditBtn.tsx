import { useState } from "react";
import type { User } from "./userList";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function EditBtn({ id}: { id: string }) {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState("");
    const [salary, setSalary] = useState(0);
    const queryclient = useQueryClient();

    const handleEdit = () => {
        setIsEditing(true);
    }
    const editUserfunction = async ({ updatedUser }: { updatedUser: Partial<User> }) => {
        await fetch(`http://localhost:3000/users/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedUser)
        });
    };

    const editUserMutation = useMutation({
        mutationFn: editUserfunction,
        onSuccess:()=>{
            queryclient.invalidateQueries({ queryKey: ['users'] })
        },
        onError: (error) => {
            console.error('Error editing user:', error);
            //alert("Error editing user")
        },
        retry: 3,
    })

    return (
        <>
            <button onClick={handleEdit}>Edit</button>
            {isEditing && (
                <div>
                    <h1>Edit User</h1>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        editUserMutation.mutate({ updatedUser: { name, salary } });
                        setIsEditing(false);
                    }}>
                        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                        <input type="number" placeholder="Salary" value={salary} onChange={(e) => setSalary(Number(e.target.value))} />
                        <button type="submit">Save</button>
                    </form>
                </div>
            )}
        </>
    )
}

export default EditBtn