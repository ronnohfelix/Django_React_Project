import { useState, useEffect } from "react";
import api from "../api";
function Home() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = () => {
    api
      .get("/api/notes/")
      .then((res) => res.data)
      .then((data) => {
        setNotes(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  };

  const deleteNote = (id) => {
    api
      .delete(`/api/notes/${id}/`)
      .then((res) => {
        if (res.status === 204) alert ("Note deleted successfully");
        else alert("Failed to delete note");
        getNotes();
        })
      .catch((error) => alert(error));
  };

  const createNote = (e) => {
    e.preventDefault();
    api
      .post("/api/notes/", { title, content })
      .then((res) => {
        if (res.status === 201) alert("Note created successfully");
        else alert("Failed to create note");
        getNotes();
      })
      .catch((error) => alert(error));
  }
  return <div>
    <div className="row">
      <div className="col">
        <h2>Create Note</h2>
        <form onSubmit={createNote}>
          <div className="form-group">
            <label>Title</label>
            <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Content</label>
            <textarea className="form-control" value={content} onChange={(e) => setContent(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-primary">Create</button>
        </form>
      </div>
      <div className="col">
        <h2>Notes</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Content</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {notes.map((note) => (
              <tr key={note.id}>
                <td>{note.title}</td>
                <td>{note.content}</td>
                <td>
                  <button className="btn btn-danger" onClick={() => deleteNote(note.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>;
}

export default Home;
