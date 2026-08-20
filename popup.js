const countElement = document.getElementById("count");
const limitInput = document.getElementById("limit");
const saveButton = document.getElementById("save");
const statusElement = document.getElementById("status");

function getToday() {
    return new Date().toLocaleDateString("en-CA");
}

async function loadSettings() {
    const result = await chrome.storage.local.get(["date", "count", "limit"]);

    countElement.textContent = 
        result.date === getToday() ? (result.count ?? 0) : 0;

    limitInput.value = result.limit ?? 20;
}

saveButton.addEventListener("click", async () =>{
    const limit = Number(limitInput.value);

    if (!Number.isInteger(limit) || limit < 1) {
        statusElement.textContent = "Enter correct limit";
        return;
    }

    await chrome.storage.local.set({ limit });
    statusElement.textContent = "Saved";
})

loadSettings();

