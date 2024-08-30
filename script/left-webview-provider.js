// const highlightlines = await import('../src/highlightlines.ts');

(function () {
    const vscode = acquireVsCodeApi();
    document.getElementById(ELEMENT_IDS.button1).addEventListener('click', () => {
        document.getElementById(ELEMENT_IDS.button1).disabled = true;
        vscode.postMessage({
            action: GAMBIT_ACTION.SHOW_LOG1,
            data: {
                message: "Gambit is Active"
            }
        });
    });

    document.getElementById(ELEMENT_IDS.panel).addEventListener('submit', (event) => {
        event.preventDefault();

        // highlightlines("");

        var button = document.getElementById('submitBtn'); // disable btn after click
        button.disabled = true;

        const formData = new FormData(document.getElementById(ELEMENT_IDS.panel));
        const input = formData.get("query");
        const dropdown1_input = formData.get("dropdown1");
        const dropdown2_input = formData.get("dropdown2");

        var loader = document.getElementById("loader");
        loader.style.display = "block";

        vscode.postMessage({

            action: GAMBIT_ACTION.SHOW_LOG3,

            data: {
                fme1: input,
                fme2: dropdown1_input,
                fme3: dropdown2_input

            }
        });
    });

    const dropdown1 = document.getElementById('dropdown1');
    const dropdown2 = document.getElementById('dropdown2');
    const submitBtn = document.getElementById('submitBtn');

    function updateButtonState() {
        const option1Selected = dropdown1.value !== '';
        const option2Selected = dropdown2.value !== '';
        submitBtn.disabled = !option1Selected || !option2Selected;
    }
    // Initial button state (disabled)
    updateButtonState();

    dropdown1.addEventListener('change', updateButtonState);
    dropdown2.addEventListener('change', updateButtonState);

    window.addEventListener('message', event => {
        const message = event.data;
        document.getElementById(ELEMENT_IDS.outputbox).value = message;

        var button = document.getElementById('submitBtn'); // disable btn after click
        button.disabled = false;

        //stop loader , docker gets output
        var loader = document.getElementById("loader");
        loader.style.display = "none";
    });
}());

