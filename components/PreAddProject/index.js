import { useState } from "react";
import styled from "styled-components";
export default function PreAddProject({ onCancel, handlePreAddSubmit }) {
  const [inputName, setInputName] = useState("");

  return (
    <AddProjectNameForm onSubmit={(e) => handlePreAddSubmit(e)}>
      <label htmlFor="name">Add the Project Name</label>
      <input
        maxLength="30"
        name="name"
        value={inputName}
        onChange={(e) => setInputName(e.target.value)}
      />
      <div>
        <button type="cancel" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit">Create</button>
      </div>
    </AddProjectNameForm>
  );
}

const AddProjectNameForm = styled.form`
  position: fixed;
  bottom: 15rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 20rem;
  height: 15rem;
  background-color: #fff8de;
  align-items: center;
  border-radius: 2rem;
  z-index: 99;
`;
