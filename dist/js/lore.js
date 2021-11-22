// list color
const listcolor = ["#E1341E", "#F6DA09", "#02FD77", "#FC7D03", "#0382FC", "#FC0306", "#4C7157", "#029F90"];

// variables
const windowLore = document.querySelector('.list-contact');
const listLore = document.querySelector('.group-items');
const fromInputs = document.querySelector('#form');
const hero_body = document.querySelector('.hero')

// Navigating between sections
const btnsHead = document.querySelectorAll('.btn-head');
for (let i = 0; i < btnsHead.length; i++) {
    btnsHead[i].onclick = () => {
        const btnactive = document.querySelector('.btn-head.active');
        const sectionactive = document.querySelector('.hero .active');
        btnactive.classList.remove('active');
        btnsHead[i].classList.add('active');
        sectionactive.classList.remove('active');
        document.querySelector(`.${btnsHead[i].getAttribute('linkto')}`).classList.add('active');
    }
}

// Classes: -------------------------
// contact Class: Represents a contact
class contact {
    constructor(title, lore) {
       
        this.title = title;
        this.lore = lore;
    }
}

// UI Class: Handle UI Tasks
class UI {
    static displayLore() {
        const Lore = Store.getcontact();
        Lore.forEach((contact) => UI.Createcontact(contact));
    }
    static Createcontact(contact) {
        const person = document.createElement('div');

        person.classList = 'col-12 justify-content-between align-items-center singal-person';
        person.innerHTML = `
            <div class=" align-items-center name-person" id ="about-b">
            <h2 class="section-title" style="border-bottom: 1px red double; width:33%; margin:auto; margin-bottom: 15px" >${contact.title}</h2>
            <div class="position-relative">
                <i style="float: left" class="fas fa-caret-down" data_click="close"></i>
                <ul class="dots other-actions">               
                    <li class="btn-edit"><i class="bi bi-pencil"></i>Edit</li>
                    <li class="btn-remove"><i class="bi bi-trash"></i>Remove</li>
                </ul>             
            </div>
<div class="bio bg-light">
  <h5 class="about-info">${contact.lore}</h5>
</div>
       `;
        listLore.appendChild(person);

        // Style first letter from full bame
        const indexColor = Math.floor(Math.random() * listcolor.length);
        const first_L = person.querySelector('div div span');

        // Setting
        const btnDots = person.querySelector('.fa-caret-down');
        btnDots.addEventListener('click', (e) => settingContact(e))

       

        // Remove contact
        const btn_remove = person.querySelector('.btn-remove');
        btn_remove.addEventListener('click', (e) => UI.removeItem(e))

        // Edit contact
        const btn_edit = person.querySelector('.btn-edit'); // editItem
        btn_edit.addEventListener('click', (e) => UI.editItem(e))

        // Lore length
        contactsLength()
    }
    static clearFields() {
        const inputsForm = document.querySelectorAll('.input-form');
        for (let i = 0; i < inputsForm.length; i++) {
            inputsForm[i].value = '';
        }
    }
   
    static removeItem(e) {
        const Lore = Store.getcontact();
        const btn_remove = e.target;
        const nem_tel = btn_remove.parentElement.parentElement.previousElementSibling.textContent;

        btn_remove.parentElement.parentElement.parentElement.remove();
        Lore.forEach((contact, index) => {
            if (contact.title === nem_tel) {
                Lore.splice(index, 1)
            }
        });
        localStorage.setItem('Lore', JSON.stringify(Lore));

        Alert("alert-success", "Deleted successfully");

        contactsLength()
    }
    static editItem(e) {
        const edit = e.target;
        const num_tel = edit.parentElement.parentElement.previousElementSibling.textContent;

        const Lore = Store.getcontact();
        Lore.forEach((item, index) => {
            if (item.title === num_tel) {
                formEdit(item, index)
            }
        })

        function formEdit(item, index) {
            const editContact = document.createElement('div');
            editContact.classList = "edit-contact";
            editContact.innerHTML = `
                <div class="row content-edit">
                    <div class="col-xl-10 col-lg-10 col-md-12">
                        <label for="">Lets go with a different name...</label>
                        <input class="inpt-title" type="text" value="${item.title}">
                        <label for="">Now what what that again...</label>
                        <textarea class="inpt-lore" rows="20">${item.lore}</textarea>
                        <button class="btn-save">Save</button>
                        <button class="btn-cancel">cancel</button>
                    </div>
                </div>
            `
            hero_body.appendChild(editContact);

            const btnCancel = editContact.querySelector('.btn-cancel');
            btnCancel.onclick = () => editContact.remove()

            const btnSave = editContact.querySelector('.btn-save');
            btnSave.onclick = () => {
               
                const title = editContact.querySelector('.inpt-title').value;
                const lore = editContact.querySelector('.inpt-lore').value;

                const newEdit = new contact(title, lore)
                Lore.splice(index, 1, newEdit)
                localStorage.setItem('Lore', JSON.stringify(Lore));

                btnCancel.click()
                document.querySelectorAll('.singal-person').forEach(div => div.remove());
                UI.displayLore()
            }
        }
    }
   
}

// Store class: handles contacts from Store
class Store {
    static getcontact() {
        let Lore;
        if (localStorage.getItem('Lore') === null) {
            Lore = [];
        } else {
            Lore = JSON.parse(localStorage.getItem('Lore'));
        }
        return Lore;
    }
    static addcontact(contact) {
        const Lore = Store.getcontact();
        Lore.push(contact);
        localStorage.setItem('Lore', JSON.stringify(Lore));
    }
}

// Events: -------------------------------------
document.addEventListener('DOMContentLoaded', UI.displayLore());

fromInputs.addEventListener('submit', (e) => {
    e.preventDefault()

    // Get form values
    const title = document.querySelector('#lore_title').value;
    const lore = document.querySelector('#lore').value;

    // Push Inputs Value to new object
    const newContact = new contact(title, lore);

    // If the input values true
    if (newContact.title !== "") {

        // Addtrue()
        const Lore = Store.getcontact();
        let T = 0;

        // Verify if the phone number exists
        if (Lore.length === 0) {
            Addtrue()
        } else {
            Lore.forEach(item => { if (item.title === newContact.title) T += 1 })
            if (T === 0) Addtrue()
            else Alert("alert-danger", "The number already exists")
        }
    }
    else {
        Alert("alert-danger", "There is an empty field")
    }

    // Add new contact
    function Addtrue() {
        // Add new info contact to localStirage
        Store.addcontact(newContact);

        // Create new contact
        UI.Createcontact(newContact);

        // Clear from Inputs
        UI.clearFields();

        // display message when Add and Remove
        Alert("alert-success", "Added successfully");
    }

});


// function: --------------
function settingContact(e) {
    const itemBtn = e.target;
    const Dots = itemBtn.nextElementSibling;
    document.onclick = (e) => {
        if (e.target === itemBtn) {
            if (document.querySelector('.dots.view')) {
                document.querySelector('.dots.view').classList.remove('view')
            }
            Dots.classList.toggle('view')
        } else {
            if (document.querySelector('.dots.view')) {
                document.querySelector('.dots.view').classList.remove('view')
            }
        }
    }
}

function contactsLength() {
    const Contacts = Store.getcontact();
    const numContacts = document.querySelector('.btn-list span');
    numContacts.innerHTML = Contacts.length;
}

function Alert(color, text) {
    const modaladd = document.querySelector('.modal-add');
    const Alert = document.createElement('div');

    // Create Alert and display
    Alert.classList = `alert text-center ${color}`;
    Alert.appendChild(document.createTextNode(text));
    modaladd.appendChild(Alert);
    setTimeout(function () { Alert.remove() }, 1500)
}