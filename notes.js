let notesData = [
	{
	  id: 1,
	  time: new Date("2023-07-24T12:00:00"),
	  content:
		"I'm gonna have a dentist appointment on the 3/5/2021, I moved it from 5/5/2021",
	  category: "Task",
	},
  ];
  
  function renderNotesTable() {
	const notesTableBody = document.getElementById("notesTableBody");
	notesTableBody.innerHTML = "";
  
	const activeNotes = notesData.filter((note) => !note.archived);
	activeNotes.forEach((note) => {
	  const datesMentioned = extractDatesFromNoteContent(note.content);
	  const datesColumn = datesMentioned.join(", ");
  
	  const row = `
		<tr>
		  <td>${note.time.toLocaleString()}</td>
		  <td>${note.content}</td>
		  <td>${note.category}</td>
		  <td>${datesColumn}</td>
		  <td>
			<button onclick="editNote(${note.id})">Edit</button>
			<button onclick="archiveNote(${note.id})">Archive</button>
			<button onclick="removeNote(${note.id})">Remove</button>
		  </td>
		</tr>
	  `;
	  notesTableBody.insertAdjacentHTML("beforeend", row);
	});
  }
  
  function extractDatesFromNoteContent(content) {
	const dateRegex = /\b(\d{1,2}\/\d{1,2}\/\d{4})\b/g;
	return content.match(dateRegex) || [];
  }
  notesData.forEach((note) => {
  
	note.datesMentioned = extractDatesFromNoteContent(note.content);
  });
  function renderSummaryTable() {
	const summaryTableBody = document.getElementById("summaryTableBody");
	summaryTableBody.innerHTML = "";
  
	const categories = ["Task", "Random Thought", "Idea"];
  
	categories.forEach((category) => {
	  const activeNotesCount = notesData.filter(
		(note) => note.category === category && !note.archived
	  ).length;
	  const archivedNotesCount = notesData.filter(
		(note) => note.category === category && note.archived
	  ).length;
  
	  const row = `
		<tr>
		  <td>${category}</td>
		  <td>${activeNotesCount}</td>
		  <td>${archivedNotesCount}</td>
		</tr>
	  `;
	  summaryTableBody.insertAdjacentHTML("beforeend", row);
	});
  }
  
  const addNoteForm = document.getElementById("addNoteForm");
  addNoteForm.addEventListener("submit", (event) => {
	event.preventDefault();
  
	const noteContent = document.getElementById("noteContent").value;
	const noteCategory = document.getElementById("noteCategory").value;
  
	const newNote = {
	  id: notesData.length + 1,
	  time: new Date(),
	  content: noteContent,
	  category: noteCategory,
	  archived: false,
	};
	notesData.push(newNote);
  
	renderNotesTable();
	renderSummaryTable();
  
	addNoteForm.reset();
  });
  
  function editNote(noteId) {
	const noteToEdit = notesData.find((note) => note.id === noteId);
  
	document.getElementById("noteContent").value = noteToEdit.content;
	document.getElementById("noteCategory").value = noteToEdit.category;
  
	notesData = notesData.filter((note) => note.id !== noteId);
  
	renderNotesTable();
	renderSummaryTable();
  }
  
  function archiveNote(noteId) {
	const noteToArchive = notesData.find((note) => note.id === noteId);
  
	noteToArchive.archived = true;
  
	noteToArchive.datesMentioned = extractDatesFromNoteContent(noteToArchive.content);
	
	renderNotesTable();
	renderSummaryTable();
  }
  
  function removeNote(noteId) {
	notesData = notesData.filter((note) => note.id !== noteId);
  
	renderNotesTable();
	renderSummaryTable();
  }
  
  const showArchivedButton = document.getElementById("showArchivedButton");
  showArchivedButton.addEventListener("click", () => {
	const modal = document.getElementById("archivedNotesModal");
	modal.style.display = "block";
  
	const archivedNotesTable = document.getElementById("archivedNotesTable");
	archivedNotesTable.innerHTML = "";
  
	const archivedNotes = notesData.filter((note) => note.archived);
  
	archivedNotes.forEach((note) => {
	  const row = `
		<tr>
		  <td>${note.time.toLocaleString()}</td>
		  <td>${note.content}</td>
		  <td>${note.category}</td>
		  <td>${note.datesMentioned.join(", ")}</td>
		  <td>
			<button onclick="unarchiveNote(${note.id})">Unarchive</button>
		  </td>
		</tr>
	  `;
	  archivedNotesTable.insertAdjacentHTML("beforeend", row);
	});
  });
  
  function unarchiveNote(noteId) {
	const noteToUnarchive = notesData.find((note) => note.id === noteId);
  
	
	noteToUnarchive.archived = false;
  
	
	renderNotesTable();
	renderSummaryTable();
  

	const modal = document.getElementById("archivedNotesModal");
	modal.style.display = "none";
  }
  
  const modalCloseButton = document.getElementsByClassName("close")[0];
  modalCloseButton.addEventListener("click", () => {
	const modal = document.getElementById("archivedNotesModal");
	modal.style.display = "none";
  });
  
  renderNotesTable();
  renderSummaryTable();
  