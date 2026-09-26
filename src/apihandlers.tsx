import type { employeeSchemaType } from "./schemas";
export async function getData() {
  try {
    const response = await fetch("http://localhost:3000/users");
    if (!response.ok) {
      throw new Error("Failed to fetch data: " + response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
}
export async function getUserById(id: string) {
  try {
    const response = await fetch(`http://localhost:3000/users/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch user: " + response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user: ", error);
  }
}
export async function addUser(newUser: Partial<employeeSchemaType>) {
  try {
    const response = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });
    if (!response.ok) {
      throw new Error("Failed to add user: " + response.statusText);
    } else {
      console.log("User added successfully");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error adding user: ", error);
  }
}
export async function deleteUser(id: string) {
  try {
    const response = await fetch(`http://localhost:3000/users/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete user: " + response.statusText);
    } else {
      console.log("User deleted successfully");
    }
    console.log("response issssss :" + response)
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting user: ", error);
  }
}

export async function editUser(id: string, updatedUser: Partial<employeeSchemaType>) {
  try {
    const response = await fetch(`http://localhost:3000/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    });
    if (!response.ok) {
      throw new Error("Failed to edit user: " + response.statusText);
    } else {
      console.log("User edited successfully");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error editing user: ", error);
  }
}
