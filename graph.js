let diagram = new go.Diagram("graph");
class Graph {
  constructor() {
    // Adjacency list, from string to array of strings representing
    // tasks that it has an edge with
    this.adjList = new Map();
  }

  // function to add an edge FROM v TO w
  addEdge(v, w) {
    try {
      if (!this.adjList.get(v).includes(w)) {
          this.adjList.get(v).push(w);
      }
    }
    catch (e) {
      console.warn("addEdge called on undefined successor"); // This is stupid but I genuinely can't figure it out and it works so...
    }
  }
  // Function to add a new vertex to the graph
  addVertex(v) {
    this.adjList.set(v, [])
  }

  // Prints the vertex and adjacency list
  printGraph() {
    // get all the vertices
    const get_keys = this.adjList.keys();

    // iterate over the vertices
    for (const i of get_keys) {
      // get the corresponding adjacency list
      // for the vertex
      let get_values = this.adjList.get(i);
      let conc = "";

      // iterate over the adjacency list
      // concatenate the values into a string
      for (const j of get_values)
        conc += j + " ";

      // print the vertex and its adjacency list, or NULL if it has no outgoing edges
      if (!conc) conc = "NULL"
      console.log(i + " -> " + conc);
    }
  }
}

function newGraph(tableRows) {
  // Initialize an empty graph
  let graph = new Graph();
  // Loop over every row, and add it as a vertex
  for (const i in tableRows) {
    const row = tableRows[i]
    graph.addVertex(row.name);
    // Loop over every successor and attempt to add it as an edge
    for (let s in row.successors) {
      const successor = row.successors[s];
      graph.addEdge(row.name, successor);
    }
    // Loop over every predecessor and attempt to add it as an edge
    for (const p in row.predecessors) {
      const predecessor = row.predecessors[p];
      graph.addEdge(predecessor, row.name);
    }
  }
  return graph
}



// Returns a list of vertices formatted for gojs 
function vertices(arr, display = false) {
  let output = [];
  for (const i in arr) { // Loop through each task
    const currRow = arr[i];
    // Set color to red if the task is on the critical path
    const color = (currRow.slack == 0) ? "#F66" : "#FFF"
    // Set up object for gojs
    //
    const txt = display ? "\n Duration: " + currRow.duration + "\n" + "Slack: " + arr[i].slack.toString() : "";
    const currObj = {key: parseInt(i), text: currRow.name + txt, color: color};
    output.push(currObj); // Add object to list
  }
  return output; // Return the list
}

// Returns a list of edges formatted for gojs
function edges(arr) {
  let output = [];
  const g = newGraph(arr); // Convert arr to a graph to better look at edges
  for (const i in arr) { // Loop through each task
    const successors = g.adjList.get(arr[i].name); // Get its successors
    for (const j in successors) { // Loop through each successor
      const s = successors[j];
      const index = arr.findIndex((elem) => elem.name == s); // Find the successor's index
      const currObj = {from: parseInt(i), to: index, text: "BONES"}; // Format the edge between predecessor and successor properly
      output.push(currObj); // Add object to list
    }
  }
  return output; // Return the list
}

function createGraph(arr, display = false) {
  // the node template describes how each Node should be constructed
  diagram.nodeTemplate =
    new go.Node("Auto")
      .add(  // the Shape will go around the TextBlock
        new go.Shape("RoundedRectangle")
          // Shape.fill is bound to Node.data.color
          .bind("fill", "color"),
        new go.TextBlock({ margin: 8 }) // Specify a margin to add some room around the text
          // TextBlock.text is bound to Node.data.key
          .bind("text")
      );

  // the Model holds only the essential information describing the diagram
  diagram.model = new go.GraphLinksModel(vertices(arr, display), edges(arr));

  // enable Ctrl-Z to undo and Ctrl-Y to redo
  diagram.undoManager.isEnabled = true;
}

function testing() {
  // Initialize table row sample data
  // Change these to user input, this is just a sample for how to use the functions
  const task0 = {
    name: "Task 0",
    predecessors: [],
    successors: ["Task 1"],
    duration: 2,
    slack: 0
  };
  const task1 = {
    name: "Task 1",
    predecessors: ["Task 0"],
    successors: ["Task 2"],
    duration: 5,
    slack: 0,
  };
  const task2 = {
    name: "Task 2",
    predecessors: ["Task 1"],
    successors: [],
    duration: 3,
    slack: 0
  };
  const task3 = {
    name: "Task 3",
    predecessors: ["Task 1"],
    successors: [],
    duration: 2,
    slack: 1,
  }
  const tableRows = [task0, task1, task2, task3]; // Encapsulate in array
  const g = newGraph(tableRows); // Run function
  createGraph(tableRows);
}

//testing(); // Run testing as a script for now