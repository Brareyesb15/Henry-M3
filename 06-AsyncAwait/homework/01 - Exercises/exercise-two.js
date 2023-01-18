"use strict";

let exerciseUtils = require("./utils");

let args = process.argv.slice(2).map(function (st) {
  return st.toUpperCase();
});

module.exports = {
  problemAx: problemA,
  problemBx: problemB,
  problemCx: problemC,
  problemDx: problemD,
};

// corre cada problema dado como un argumento del command-line para procesar
args.forEach(function (arg) {
  let problem = module.exports["problem" + arg];
  if (problem) problem();
});

async function problemA() {
  // callback version
  /*
  exerciseUtils.readFile("poem-one/stanza-01.txt", function (err, stanza) {
    exerciseUtils.blue(stanza);
  });
  exerciseUtils.readFile("poem-one/stanza-02.txt", function (err, stanza) {
    exerciseUtils.blue(stanza);
  }); */

  // async await version
  // Tu código acá:
  /* 
  let result1 = await exerciseUtils.promisifiedReadFile("poem-two/stanza-01.txt")
  let result2 = await exerciseUtils.promisifiedReadFile("poem-two/stanza-02.txt")
  exerciseUtils.blue(result1)
  exerciseUtils.blue(result2)

  console.log("done")*/ 

let poemas = [
  exerciseUtils.promisifiedReadFile("poem-two/stanza-01.txt"),
  exerciseUtils.promisifiedReadFile("poem-two/stanza-02.txt")
]
for (const poem of poemas) {
  const data = await poem;
  exerciseUtils.blue(data)
}

}

async function problemB() {
  let filenames = [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) {
    return "poem-two/" + "stanza-0" + n + ".txt";
  });

  // callback version 
  /* 
  filenames.forEach((filename) => {
    exerciseUtils.readFile(filename, function (err, stanza) {
      exerciseUtils.blue(stanza);
    });
  });
*/
  // async await version
  // Tu código acá:
 for (const poem of filenames) {
  let result = await exerciseUtils.promisifiedReadFile(poem)
  exerciseUtils.blue(result)
 }
 console.log(done)

}

async function problemC() {
  let filenames = [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) {
    return "poem-two/" + "stanza-0" + n + ".txt";
  });

  // callback version
   /* 
  filenames.forEach((filename) => {
    exerciseUtils.readFile(filename, function (err, stanza) {
      exerciseUtils.blue(stanza);
    });
  }); */

  // async await version
  // Tu código acá:
  for (const poem of filenames) {
    let result = await exerciseUtils.promisifiedReadFile(poem)
    exerciseUtils.blue(result)
   }
   console.log(done)
  
  
}

async function problemD() {
  let filenames = [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) {
    return "poem-two/" + "stanza-0" + n + ".txt";
  });
  let randIdx = Math.floor(Math.random() * filenames.length);
  filenames[randIdx] = "wrong-file-name-" + (randIdx + 1) + ".txt";

  // callback version
  /*
  filenames.forEach((filename) => {
    exerciseUtils.readFile(filename, function (err, stanza) {
      exerciseUtils.blue(stanza);
      if (err) exerciseUtils.magenta(new Error(err));
    });
  });
*/ 
  // async await version
  // Tu código acá:
  
    try {
      for (const poem of filenames) {
      let result = await exerciseUtils.promisifiedReadFile(poem)
    exerciseUtils.blue(result)
   } }
   catch (error) {
    exerciseUtils.magenta(error)

   }
   console.log(done)

}