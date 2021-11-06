// list color
const listcolor = ["#E1341E", "#F6DA09", "#02FD77", "#FC7D03", "#0382FC", "#FC0306", "#4C7157", "#029F90"];

// variables
const windowContacts = document.querySelector('.list-contact');
const listContacts = document.querySelector('.group-items');
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
    constructor(pronouns, archetype, description, name, history, charm, cool, sharp, tough, weird, luck, harm, experience) {
        this.pronouns = pronouns;
        this.archetype = archetype;
        this.description = description;
        this.name = name;
        this.history = history;
        this.charm = charm;
        this.cool = cool;
        this.sharp = sharp;
        this.tough = tough;
        this.weird = weird;
        this.luck = luck;
        this.harm = harm;
        this.experience = experience;
    }
}

// UI Class: Handle UI Tasks
class UI {
    static displayContacts() {
        const Contacts = Store.getcontact();
        Contacts.forEach((contact) => UI.Createcontact(contact));
    }
    static Createcontact(contact) {
        const person = document.createElement('div');

        person.classList = 'col-12 justify-content-between align-items-center singal-person';
        person.innerHTML = `
            <h5>${contact.pronouns}</h5>
            <h5>${contact.name}</h5>
            <div class="position-relative">
                <i class="bi bi-three-dots-vertical" data_click="close"></i>
                <ul class="dots other-actions"> 
                    <li class="btn-view"><i class="bi bi-eye"></i>View</li>
                    <li class="btn-edit"><i class="bi bi-pencil"></i>Update</li>
                    <li class="btn-remove"><i class="bi bi-trash"></i>Remove</li>
                </ul> 
            </div>
        `;
        listContacts.appendChild(person);

        // Style first letter from full bame
        const indexColor = Math.floor(Math.random() * listcolor.length);


        // Setting
        const btnDots = person.querySelector('.bi-three-dots-vertical');
        btnDots.addEventListener('click', (e) => settingContact(e))

        // Display contact info 
        const btn_view = person.querySelector('.btn-view');
        btn_view.addEventListener('click', () => {
            const char_name = btn_view.parentElement.parentElement.previousElementSibling.textContent;
            UI.viewItem(char_name)
        })

        // Remove contact
        const btn_remove = person.querySelector('.btn-remove');
        btn_remove.addEventListener('click', (e) => UI.removeItem(e))

        // Edit contact
        const btn_edit = person.querySelector('.btn-edit'); // editItem
        btn_edit.addEventListener('click', (e) => UI.editItem(e))

        // Contacts length
        contactsLength()
    }
    static clearFields() {
        const inputsForm = document.querySelectorAll('.input-form');
        for (let i = 0; i < inputsForm.length; i++) {
            inputsForm[i].value = '';
        }
    }
    static viewItem(numCantact) {
        let Contacts = Store.getcontact()
        let contactInfo = Contacts.filter(contact => contact.name === numCantact);

        const container_info = document.createElement('div');
        container_info.className = "view-contact";
        container_info.innerHTML = `
            <div class="content-view">
                <i class="bi bi-x-lg"></i>
                <h3 style="width:300px; float: left">${contactInfo[0].name}</h3>
                <h4 style="width:300px; float: left">${contactInfo[0].pronouns}</h4>
                <h4>${contactInfo[0].archetype}</h4>
                <h4>${contactInfo[0].description}</h4>
                <h4>${contactInfo[0].history}</h4>
                    <p style="width:75px; float: left">Charm: ${contactInfo[0].charm} </p>
                    <p style="width:75px; float: left">Cool: ${contactInfo[0].cool} </p>
                    <p style="width:75px; float: left">Sharp: ${contactInfo[0].sharp} </p>
                    <p style="width:75px; float: left">Tough: ${contactInfo[0].tough} </p>
                    <p style="width:75px; float: left">Weird: ${contactInfo[0].weird} </p>
                    <p style="width:75px; float: left">Luck: ${contactInfo[0].luck} </p>
                    <p style="width:75px; float: left">Harm: ${contactInfo[0].harm} </p>
                    <p style="width:75px; float: left">Experiene: ${contactInfo[0].experience} </p>
            </div>
        `
        hero_body.appendChild(container_info);
        const liAll = container_info.querySelectorAll('li');
        liAll.forEach(li => { if (li.textContent === "") li.remove() })

        const btnclose = container_info.querySelector('.bi-x-lg');
        btnclose.addEventListener('click', () => btnclose.parentElement.parentElement.remove())
    }
    static removeItem(e) {
        const Contacts = Store.getcontact();
        const btn_remove = e.target;
        const nem_tel = btn_remove.parentElement.parentElement.previousElementSibling.textContent;

        btn_remove.parentElement.parentElement.parentElement.remove();
        Contacts.forEach((contact, index) => {
            if (contact.name === nem_tel) {
                Contacts.splice(index, 1)
            }
        });
        localStorage.setItem('Contacts', JSON.stringify(Contacts));

        Alert("alert-success", "Deleted successfully");

        contactsLength()
    }
    static editItem(e) {
        const edit = e.target;
        const char_name = edit.parentElement.parentElement.previousElementSibling.textContent;

        const Contacts = Store.getcontact();
        Contacts.forEach((item, index) => {
            if (item.name === char_name) {
                formEdit(item, index)
            }
        })

        function formEdit(item, index) {
            const editContact = document.createElement('div');
            editContact.classList = "edit-contact";
            editContact.innerHTML = `
                <div class="row content-edit">
                    <div class="col-xl-6 col-lg-6 col-md-12">
                        <label for=""></label>                    
                        <label for="">Name</label>
                        <input class="inpt-name" type="text" value="${item.name}">
                        <label for="">Pronouns</label>
                        <input class="inpt-pronouns" type="text" value="${item.pronouns}">
                        <label for="">Archetype</label>
                        <input class="inpt-archetype" type="text" value="${item.archetype}">
                        <label for="">description</label>
                        <input class="inpt-description" type="text" value="${item.description}">

                        <label for="">Luck</label>
                        <input class="inpt-luck" type="number" max="7" min="0" value="${item.luck}">

                        <label for="">Harm</label>
                        <input class="inpt-harm" type="number" max="8" min="0" value="${item.harm}">

                        <label for="">Experience</label>
                        <input class="inpt-experience" type="number" max="5" min="0" value="${item.experience}">
                    </div>

                    <div class="col-xl-6 col-lg-6 col-md-12">  
                        <label for="">History</label>
                        <textarea class="inpt-history" rows="4">${item.history}</textarea>

                        <label for="">Charm</label>
                        <input class="inpt-charm" type="number" value="${item.charm}" style="width: 10px">

                        <label for="">Cool</label>
                        <input class="inpt-cool" type="number" value="${item.cool}" style="width: 10px">

                        <label for="">Sharp</label>
                        <input class="inpt-sharp" type="number" value="${item.sharp}" style="width: 10px">

                        <label for="">Tough</label>
                        <input class="inpt-tough" type="number" value="${item.tough}" style="width: 10px">

                        <label for="">Weird</label>
                        <input class="inpt-weird" type="number" value="${item.weird}" style="width: 10px">
 
                        <button class="btn-save">Update</button>
                        <button class="btn-cancel">cancel</button>

                    </div>
                </div>
            `
            hero_body.appendChild(editContact);

            const btnCancel = editContact.querySelector('.btn-cancel');
            btnCancel.onclick = () => editContact.remove()

            const btnSave = editContact.querySelector('.btn-save');
            btnSave.onclick = () => {

                const pronouns = editContact.querySelector('.inpt-pronouns').value;
                const archetype = editContact.querySelector('.inpt-archetype').value;
                const description = editContact.querySelector('.inpt-description').value;
                const name = editContact.querySelector('.inpt-name').value;
                const history = editContact.querySelector('.inpt-history').value;
                const charm = editContact.querySelector('.inpt-charm').value;
                const cool = editContact.querySelector('.inpt-cool').value;
                const sharp = editContact.querySelector('.inpt-sharp').value;
                const tough = editContact.querySelector('.inpt-tough').value;
                const weird = editContact.querySelector('.inpt-weird').value;
                const luck = editContact.querySelector('.inpt-luck').value;
                const harm = editContact.querySelector('.inpt-harm').value;
                const experience = editContact.querySelector('.inpt-experience').value;
                

                const newEdit = new contact(pronouns, archetype, description, name, history, charm, cool, sharp, tough, weird, luck, harm, experience)
                Contacts.splice(index, 1, newEdit)
                localStorage.setItem('Contacts', JSON.stringify(Contacts));

                btnCancel.click()
                document.querySelectorAll('.singal-person').forEach(div => div.remove());
                UI.displayContacts()
            }
        }
    }

}

// Store class: handles contacts from Store
class Store {
    static getcontact() {
        let Contacts;
        if (localStorage.getItem('Contacts') === null) {
            Contacts = [];
        } else {
            Contacts = JSON.parse(localStorage.getItem('Contacts'));
        }
        return Contacts;
    }
    static addcontact(contact) {
        const Contacts = Store.getcontact();
        Contacts.push(contact);
        localStorage.setItem('Contacts', JSON.stringify(Contacts));
    }
}

// Events: -------------------------------------
document.addEventListener('DOMContentLoaded', UI.displayContacts());

fromInputs.addEventListener('submit', (e) => {
    e.preventDefault()

    // Get form values

    const pronouns = document.querySelector('#pronouns').value;
    const archetype = document.querySelector('#archetype').value;
    const description = document.querySelector('#description').value;
    const name = document.querySelector('#Name').value;
    const history = document.querySelector('#history').value;
    const charm = document.querySelector('#charm').value;
    const cool = document.querySelector('#cool').value;
    const sharp = document.querySelector('#sharp').value;
    const tough = document.querySelector('#tough').value;
    const weird = document.querySelector('#weird').value;
    const luck = document.querySelector('#luck').value;
    const harm = document.querySelector('#harm').value;
    const experience = document.querySelector('#experience').value;

    // Push Inputs Value to new object
    const newContact = new contact(pronouns, archetype, description, name, history, charm, cool, sharp, tough, weird, luck, harm, experience);

    // If the input values true
    if (newContact.pronouns !== "" && newContact.name !== "") {

        // Addtrue()
        const Contacts = Store.getcontact();
        let T = 0;

        // Verify if the phone number exists
        if (Contacts.length === 0) {
            Addtrue()
        } else {
            Contacts.forEach(item => { if (item.name === newContact.name) T += 1 })
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