import '../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';

// DOM
const submit = document.querySelector('#submitBtn');
const field = document.querySelector('#defaultText');

async function post(data) {
    await fetch('/api/v1/print', {
        method: 'POST',
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        mode: "cors",
        body: JSON.stringify(data)
    })

    .then(res => {
        res.json().then(json => {
            console.log(`Response to front:: ${JSON.stringify(json)}`);
            if (json.status !== 'OK') {
                const toastElement = document.querySelector('#errorToast');
                const toast = new bootstrap.Toast(toastElement, {
                    animation: true,
                    autohide: true,
                    delay: 5000
                });
                toast.show();
            };
        });
    })

    .catch(err => {
        console.log(`Error llamando API::: ${err}`);
    });
};

async function printTicket() {
    const text = document.querySelector('#defaultText').value;
    const data = {
        data: text,
    };

    if (text) {
        const call = post(data);
        console.log(`Call:: ${JSON.stringify(call)}`);
    } else {
        const toastElement = document.querySelector('#alertToast');
        const toast = new bootstrap.Toast(toastElement, {
            animation: true,
            autohide: true,
            delay: 3000
        });
        toast.show();
    }
};

// Events
submit.addEventListener('click', printTicket);
field.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' || e.which === 13) {
        e.preventDefault();
        return false;
    };
});
