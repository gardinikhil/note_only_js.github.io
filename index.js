
showNote();
document.getElementById('addNoteBtn').addEventListener('click', () => {

    let notes = localStorage.getItem('notes');
    if (notes == null) {
        noteObj = new Map();
    }
    else {
        noteObj = new Map(JSON.parse(notes));
    }

    let addNote = document.getElementById('note');
    let title = document.getElementById('title');
    if (addNote.value != "" && title.value != "") {
        noteObj.set(title.value, addNote.value)
        localStorage.setItem('notes', JSON.stringify(Array.from(noteObj.entries())));
    }
    addNote.value = "";
    title.value = "";
    showNote();
});

function showNote() {
    let notes = localStorage.getItem('notes');

    if (notes == null) {
        noteObj = new Map();
    }
    else {
        noteObj = new Map(JSON.parse(notes));
    }

    let html = "";
    noteObj.forEach((value, key) => {
        html += `
        <div class="col-sm-4 noteCard">
                <div class="card" >
                    <div class="card-body">
                        <h4 class="card-title">${key}</h4>
                        <p class="card-text">${value}</p>
                        <button class="btn btn-danger" onclick="deleteNote('${key}')">Delete</button>

                        <div class="form-check">
                            <label class="form-check-label">
                            <input type="checkbox" class="form-check-input imp-check-box" onclick="impNote()">Mark as Important
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    console.log(noteObj);

    let showNote = document.getElementById('showNote');
    if (noteObj.size != 0) {
        // showNote.previousElementSibling.innerHTML = "Your Notes";
        showNote.innerHTML = html;
    }
    else {
        showNote.innerHTML = "<p>you dont have any notes...</p>";
    }

}

function impNote()
{
    let impCheckBox = document.getElementsByClassName('imp-check-box');
    Array.from(impCheckBox).forEach((ele)=>{
        if(ele.checked)
        {
            ele.parentElement.parentElement.parentElement.classList.add('bg-warning');
            ele.parentElement.parentElement.parentElement.classList.remove('bg-light');
        }
        else
        {
            ele.parentElement.parentElement.parentElement.classList.add('bg-light');
            ele.parentElement.parentElement.parentElement.classList.remove('bg-warning');
        }
    });
}


function deleteNote(key) {

    let notes = localStorage.getItem('notes');
    if (notes == null) {
        noteObj = new Map();
    }
    else {
        noteObj = new Map(JSON.parse(notes));
    }

    if (confirm('confirm delete...')) {
        noteObj.delete(key);
        localStorage.setItem('notes', JSON.stringify(Array.from(noteObj.entries())));
    }
    showNote();
}


let sText = document.getElementById('sText');
sText.addEventListener('input', () => {
    let inputVal = sText.value;
    let noteCard = document.getElementsByClassName('noteCard');
    Array.from(noteCard).forEach((ele) => {
        let conText = ele.getElementsByTagName('p')[0].innerText;
        if (conText.includes(inputVal)) {
            ele.style.display = 'block';
        }
        else {
            ele.style.display = 'none';
        }
    });

});
