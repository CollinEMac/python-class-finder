// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.className', function () {
		// The code that gets executed when the extension is called.

		// Get the active text editor
		let editor = vscode.window.activeTextEditor;

		// Get the document
		let document = editor.document;

		// The highlighted text
		let selection = editor.selection;

		// The text from the beginning to the end of the selectios.
		let rangeUpToSelection = new vscode.Range(document.positionAt(0), selection.end);

		// Get the text from the document as a string over the range
		let text = document.getText(rangeUpToSelection);

		if (text) {
			// Instances of 'class ' at the start of line (python class definition).
			// Execute the regex
			let classDefinitions = text.match(/^class\s.*/gm);

			if (classDefinitions) {
				// The last instance of a class definition match.
				let lastClassDefinition = classDefinitions[classDefinitions.length - 1];

				// Display a message box to the user
				vscode.window.showInformationMessage(lastClassDefinition);
			} else {
				vscode.window.showErrorMessage('No matches!');
			}
		} else {
			vscode.window.showErrorMessage('No text!');
		}
	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
