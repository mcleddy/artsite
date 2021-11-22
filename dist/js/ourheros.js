// list color
const listcolor = ["#E1341E", "#F6DA09", "#02FD77", "#FC7D03", "#0382FC", "#FC0306", "#4C7157", "#029F90"];

// variables
const windowHeros = document.querySelector('.list-contact');
const listHeros = document.querySelector('.group-items');
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
    constructor(name, description, archetype, charm, cool, sharp, tough, weird, luck1) {
       
        this.name = name;
        this.description = description;
        this.archetype = archetype;
        this.charm = charm;
        this.cool = cool;
        this.sharp = sharp;
        this.tough = tough;
        this.weird = weird;
        this.luck1 = luck1;
    }
}

// UI Class: Handle UI Tasks
class UI {
    static displayHeros() {
        const Heros = Store.getcontact();
        Heros.forEach((contact) => UI.Createcontact(contact));
    }
    static Createcontact(contact) {
        const person = document.createElement('div');

        person.classList = 'col-12 justify-content-between align-items-center singal-person';
        person.innerHTML = `
            <div class="d-flex align-items-center name-person" id ="about-b" style="margin-bottom:40px">

            <h2 class="section-title" style="width:33%">${contact.name}</h2>
              <h5 class="about-info"style="font-weight:bold; margin:10px; text-aligh:center;">${contact.archetype}</h5>
            <div class="position-relative">
                <i  style="float: left" class="bi bi-three-dots-vertical" data_click="close"></i>
                <ul class="dots other-actions">               
                    <li class="btn-edit"><i class="bi bi-pencil"></i>Edit</li>
                    <li class="btn-remove"><i class="bi bi-trash"></i>Remove</li>
                </ul> 
              
            </div>
            <div class="bio bg-light">
              <h5 class="about-info" style="margin-bottom:15px">${contact.description}</h5>
              <h5 class="about-info" style="display:block; float:left; width:80px;">Charm: ${contact.charm}</h5>
              <h5 class="about-info" style="display:block; float:left; width:80px;" >Cool: ${contact.cool}</h5>
              <h5 class="about-info" style="display:block; float:left; width:80px;">Sharp: ${contact.sharp}</h5>
              <h5 class="about-info" style="display:block; float:left; width:80px;">Tough: ${contact.tough}</h5>
              <h5 class="about-info" style="display:block; float:left; width:80px;">Weird: ${contact.weird}</h5>
            </div>
            `;
        listHeros.appendChild(person);

        // Style first letter from full bame
        const indexColor = Math.floor(Math.random() * listcolor.length);
        const first_L = person.querySelector('div div span');

        // Setting
        const btnDots = person.querySelector('.bi-three-dots-vertical');
        btnDots.addEventListener('click', (e) => settingContact(e))

       

        // Remove contact
        const btn_remove = person.querySelector('.btn-remove');
        btn_remove.addEventListener('click', (e) => UI.removeItem(e))

        // Edit contact
        const btn_edit = person.querySelector('.btn-edit'); // editItem
        btn_edit.addEventListener('click', (e) => UI.editItem(e))

        // Heros length
        contactsLength()
    }
    static clearFields() {
        const inputsForm = document.querySelectorAll('.input-form');
        for (let i = 0; i < inputsForm.length; i++) {
            inputsForm[i].value = '';
        }
    }
   
    static removeItem(e) {
        const Heros = Store.getcontact();
        const btn_remove = e.target;
        const nem_tel = btn_remove.parentElement.parentElement.previousElementSibling.textContent;

        btn_remove.parentElement.parentElement.parentElement.remove();
        Heros.forEach((contact, index) => {
            if (contact.name === nem_tel) {
                Heros.splice(index, 1)
            }
        });
        localStorage.setItem('Heros', JSON.stringify(Heros));

        Alert("alert-success", "Deleted successfully");

        contactsLength()
    }
    static editItem(e) {
        const edit = e.target;
        const num_tel = edit.parentElement.parentElement.previousElementSibling.textContent;

        const Heros = Store.getcontact();
        Heros.forEach((item, index) => {
            if (item.name === num_tel) {
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
                        <input class="inpt-numtel" type="text" value="${item.name}">
                        <label for="">Hmm new look?...</label>
                        <textarea class="inpt-description" rows="4" style="width:100%">${item.description}</textarea>
                        <label for="">On second thought...</label>
                        <textarea class="inpt-archetype" rows="1"  style="width:100%" >${item.archetype}</textarea>
                <div class="row">
                        <div class="col-6">
                        <label style="display:block; text-align:center; margin-right: 30%" for="charm">Charm</label>
                        <input class="inpt-charm" type="number" style="display:block; float:left" value="${item.charm}">
                    </div>
                    <div class="col-6">
                        <label style="display:block; text-align:center; margin-left: 20%" for="cool">Cool</label>
                        <input class="inpt-cool" type="number" style="display:block; float:right" value="${item.cool}">
                    </div>
                </div>

                <div class="row">
                      <div class="col-6">
                        <label style="display:block; text-align:center; margin-right: 30%" for="sharp">Sharp</label>
                        <input class="inpt-sharp" type="number" style="display:block; float:left" value="${item.sharp}">
                    </div>
                    <div class="col-6">
                        <label style="display:block; text-align:center; margin-left: 20%" for="tough">Tough</label>
                        <input class="inpt-tough" type="number" style="display:block; float:right"  value="${item.tough}">
                    </div>
                </div>
                <div class="row">
                    <div class="col-6">
                        <label style="display:block; text-align:center; margin-right: 30%" for="weird">Weird</label>
                        <input class="inpt-weird" type="number" style="display:block; float:left" value="${item.weird}">
                    </div>

                    <div class="col-6">
                        <button style="display:block; float:right; margin-right:15%" class="btn-save">Save</button>
                        <button style="display:block; float:right; margin-left: 15%" class="btn-cancel">cancel</button>
                    </div>
                    </div>
                </div>
                </div>
            `
            hero_body.appendChild(editContact);

            const btnCancel = editContact.querySelector('.btn-cancel');
            btnCancel.onclick = () => editContact.remove()

            const btnSave = editContact.querySelector('.btn-save');
            btnSave.onclick = () => {
               
                const name = editContact.querySelector('.inpt-numtel').value;
                const description = editContact.querySelector('.inpt-description').value;
                const archetype = editContact.querySelector('.inpt-archetype').value;
                const charm = editContact.querySelector('.inpt-charm').value;
                const cool = editContact.querySelector('.inpt-cool').value;
                const sharp = editContact.querySelector('.inpt-sharp').value;
                const weird = editContact.querySelector('.inpt-weird').value;
                const luck1 = editContact.querySelector('.inpt-luck1').value;

                const newEdit = new contact(name, description, archetype, charm, cool, sharp, tough, weird, luck1)
                Heros.splice(index, 1, newEdit)
                localStorage.setItem('Heros', JSON.stringify(Heros));

                btnCancel.click()
                document.querySelectorAll('.singal-person').forEach(div => div.remove());
                UI.displayHeros()
            }
        }
    }
   
}

// Store class: handles contacts from Store
class Store {
    static getcontact() {
        let Heros;
        if (localStorage.getItem('Heros') === null) {
            Heros = [];
        } else {
            Heros = JSON.parse(localStorage.getItem('Heros'));
        }
        return Heros;
    }
    static addcontact(contact) {
        const Heros = Store.getcontact();
        Heros.push(contact);
        localStorage.setItem('Heros', JSON.stringify(Heros));
    }
}

// Events: -------------------------------------
document.addEventListener('DOMContentLoaded', UI.displayHeros());

fromInputs.addEventListener('submit', (e) => {
    e.preventDefault()

    // Get form values
    const name = document.querySelector('#num_phone').value;
    const description = document.querySelector('#description').value;
    const archetype = document.querySelector('#archetype').value;
    const charm = document.querySelector('#charm').value;
    const cool = document.querySelector('#cool').value;
    const sharp = document.querySelector('#sharp').value;
    const tough = document.querySelector('#tough').value;
    const weird = document.querySelector('#weird').value;
    const luck1 = document.querySelector('#luck1').value;


    // Push Inputs Value to new object
    const newContact = new contact(name, description, archetype, charm, cool, sharp, tough, weird, luck1);

    // If the input values true
    if (newContact.name !== "") {

        // Addtrue()
        const Heros = Store.getcontact();
        let T = 0;

        // Verify if the phone number exists
        if (Heros.length === 0) {
            Addtrue()
        } else {
            Heros.forEach(item => { if (item.name === newContact.name) T += 1 })
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
    const Heros = Store.getcontact();
    const numHeros = document.querySelector('.btn-list span');
    numHeros.innerHTML = Heros.length;
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