import * as vscode from 'vscode';



export function highlightlines(message) {
    // Regular expression pattern to match "_LINE_NO_" followed by numbers
    let pattern = /_LINE_NO_ = (\d+)/g;

    // Array to store line numbers
    let lineNumbers = [];

    // Find all matches
    let match;
    while ((match = pattern.exec(message)) !== null) {
        // Extract the line number and add it to the array
        lineNumbers.push(match[1]);
    }

    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        return;
    }

    const ranges = [];
    for (const lineNumber of lineNumbers) {
        // Convert 1-based line number to 0-based index
        const lineIndex = lineNumber - 1;

        // Ensure the line number is within the document's range
        if (lineIndex >= 0 && lineIndex < editor.document.lineCount) {
            const range = new vscode.Range(lineIndex, 0, lineIndex, editor.document.lineAt(lineIndex).text.length);
            ranges.push(range);
        }
    }

    var decorationType = vscode.window.createTextEditorDecorationType({
        isWholeLine: true,
        backgroundColor: 'rgba(144, 238, 144, 0.15)'
    });

    
    editor.setDecorations(decorationType, ranges);

    // Dispose the decoration type when done
    setTimeout(() => {
        decorationType.dispose();
    }, 10000);

    // ######highight by Selection line##############################################
    // let input = lineNumbers.join(' ');
    // if (vscode.window.activeTextEditor) {
    //     if (input) {
    //         const lineNumbersToSelect = input
    //             .split(' ')
    //             .map(lineNumber => parseInt(lineNumber.trim(), 10))
    //             .filter(lineNumber => !isNaN(lineNumber));

    //         const selections = lineNumbersToSelect.map(lineNumber => {
    //             const startPosition = new vscode.Position(lineNumber - 1, 0);
    //             const endPosition = new vscode.Position(lineNumber, 0);
    //             return new vscode.Selection(startPosition, endPosition);
    //         });

    //         vscode.window.activeTextEditor.selections = selections;
    //     }
    // }

}
export function dehighlight(){
    var decorationType = vscode.window.createTextEditorDecorationType({
        isWholeLine: true,
        backgroundColor: 'rgba(144, 238, 144, 0.15)'
    });
    decorationType.dispose();
}