const chalk = require("chalk");
const fs = require("fs");

const getNotes = () => {
  return "Your notes...";
};

// Add ne note to the list
const addNote = (title, body) => {
  // load existing notes
  const notes = loadNotes();

  // Check for duplicate note
  const duplicateNote = notes.find(note => note.title === title);
  
  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    });
    saveNodes(notes);
    console.log("New note added!");
  } else {
    console.log("Note title taken!");
  }
};

// Remove note
const removeNote = (title) => {
  const notes = loadNotes();
  const notesToKeep = notes.filter(note => note.title !== title)

  if(notes.length > notesToKeep.length){
    console.log(chalk.green.inverse('Note removed!'))
    saveNodes(notesToKeep)
  }else{
    console.log(chalk.red.inverse('No note found!'))
  }
};

// Save notes to file
const saveNodes = function (notes) {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

// Load notes functions
// If there is notes return JSON.parse(dataJson) else return empty array
const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (error) {
    return [];
  }
};

// List nodes
const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.inverse('Your notes'))
  notes.forEach(note => console.log(chalk.blue(note.title)));
}

// Read Notes
const readNotes = (title) => {
  const notes = loadNotes();
  const findNote = notes.find(note => note.title === title);
  
  if(findNote){
    console.log(`Title: ${findNote.title}`)
    console.log(`Body: ${findNote.body}`)
  }else{
    console.log(chalk.red('No note found!'))
  }
}

// Exports functions
module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNotes: readNotes
};
