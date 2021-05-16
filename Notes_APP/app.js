const { strikethrough } = require("chalk");
const chalk = require("chalk");
const yargs = require("yargs");
const notes = require("./notes.js");

// Customize yargs version
yargs.version("1.1.0");

// Create add command
yargs.command({
  command: "add", // this command is for calling in terminal like ex. node app.js add --title="{title}"
  describe: "Add a new note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Body Description",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.addNote(argv.title, argv.body);
  },
});

// Create remove command
yargs.command({
  command: "remove", // this command is for calling in terminal like ex. node app.js remove --title="{title}"
  describe: "Remove a note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true, // option is REQUIRED
      type: "string",
    },
  },
  handler(argv) {
    notes.removeNote(argv.title)
  },
});

// Create list command
yargs.command({
  command: "list", // this command is for calling in terminal like ex. node app.js list
  describe: "List your notes",
  handler(){
    notes.listNotes()
  },
});

//Create read  command
yargs.command({
  command: "read",
  describe: "Read all notes",
  builder:{
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string"
    }
  },
  handler(argv){
    notes.readNotes(argv.title)
  },
});

yargs.parse();
