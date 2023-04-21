import '../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';

// DOM
const submit = document.querySelector('#submitBtn');
const field = document.querySelector('#defaultText');

const post = (data) => {
    fetch('http://localhost:1337/api/v1/print', {
        method: 'POST',
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        mode: "cors",
        body: JSON.stringify(data)
    })

    .then(data => {
        console.log(`Response:: ${JSON.stringify(data)}`);
    })

    .catch(err => console.log(`Error llamando API:: ${err}`));
};

const printTicket = () => {
    const text = document.querySelector('#defaultText').value;
    const data = {
        data: text
    }
    console.log(data)
    
    if (text) {
        post(data);
    } else {
        console.log('Input no puede estar vacío');
    };
};

// Events
submit.addEventListener('click', printTicket);
field.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' || e.which === 13) {
        e.preventDefault();
        return false;
    };
});
