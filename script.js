let editor;

// Monaco Setup
require.config({ paths: { vs: 'https://unpkg.com/monaco-editor@latest/min/vs' }});

require(['vs/editor/editor.main'], function () {

  editor = monaco.editor.create(document.getElementById('editor'), {
    value: "// Start coding here 🔥",
    language: "javascript",
    theme: "vs-dark",
    fontSize: 14,
    automaticLayout: true
  });

  // ✅ Language Change FIX
  document.getElementById("language").addEventListener("change", function() {
    let lang = this.value;
    monaco.editor.setModelLanguage(editor.getModel(), lang);
  });

});


// Run Code
function runCode() {
  let code = editor.getValue();
  let output = document.getElementById("output");

  let logs = [];
  const originalLog = console.log;

  console.log = function (...args) {
    logs.push(args.join(" "));
  };

  try {
    let result = eval(code);

    if (logs.length > 0) {
      output.innerText = logs.join("\n");
    } else if (result !== undefined) {
      output.innerText = result;
    } else {
      output.innerText = "⚠️ No output";
    }

  } catch (error) {
    output.innerText =
      "❌ " + error.name + "\n" +
      error.message;
  }

  console.log = originalLog;
}


// Clear
function clearCode() {
  editor.setValue("");
  document.getElementById("output").innerText = "";
}