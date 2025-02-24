import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getDatabase,
         ref,
         push,
         onValue,
         remove } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js"

const firebaseConfig = {
    databaseURL: "https://leads-tracker-app-56e75-default-rtdb.firebaseio.com/"
}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const referenceInDB = ref(database, "leads")

const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        let url = leads[i].trim();

        // Check if the URL contains 'http://' or 'https://', if not, add 'https://'
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://' + url; // Add 'https://' if missing
        }

        listItems += `
            <li>
                <a target='_blank' href='${url}'>
                    ${url}
                </a>
            </li>
        `;
    }
    ulEl.innerHTML = listItems;
}


onValue(referenceInDB, function(snapshot) {
    const snapshotDoesExist = snapshot.exists()
    if (snapshotDoesExist) {
        const snapshotValues = snapshot.val()
        const leads = Object.values(snapshotValues)
        render(leads)
    }
})

deleteBtn.addEventListener("dblclick", function() {
    remove(referenceInDB)
    ulEl.innerHTML = ""
})

inputBtn.addEventListener("click", function() {
    push(referenceInDB, inputEl.value)
    inputEl.value = "" 
})