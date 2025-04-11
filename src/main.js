import "./style.css";
import "./vendor/puck";

/**
 * @param {{
 *  isChecking: boolean
 *  manualColor: 'blue' | 'green' | null,
 *  battery: number} | undefined} state
 */
function render(state) {
  document.querySelector("#app").innerHTML = `
    <div>
      <h1>Wakey Wakey</h1>
      <p><pre class="status">${
        state ? JSON.stringify(state, null, 2) : "not connected"
      }</pre></p>

      <div class="buttons">
        <button onclick="wakeyStatus()">Status</button>
        ${
          state
            ? `

          <button onclick="startWakey()">Start Wakey</button>
          <button onclick="stopWakey()">Stop Wakey</button>
          <button onclick="setManualOn()">Manual On</button>
          
          `
            : ""
        }
      </div>
    </div>
`;
}

window.wakeyStatus = function status() {
  Puck.eval("status()", function (result, err) {
    if (err) {
      alert("status failed!\n" + (err || ""));
      return;
    }

    render(result);
  });
};

window.startWakey = function status() {
  Puck.eval("startWakey()", function (result, err) {
    console.log("startWakey", result);
    if (err) {
      alert("startwakey failed!\n" + (err || ""));
      return;
    }
    window.wakeyStatus();
  });
};

window.stopWakey = function status() {
  Puck.eval("stopWakey()", function (result, err) {
    console.log("stopWakey", result);
    if (err) {
      alert("stopwakey failed!\n" + (err || ""));
      return;
    }
    window.wakeyStatus();
  });
};

window.setManualOn = function () {
  Puck.eval("setManualOn()", function (result, err) {
    console.log("manualOn", result);
    if (err) {
      alert("setmanualOn failed!\n" + (err || ""));
      return;
    }
    window.wakeyStatus();
  });
};

render();
