document.getElementById('contact-form').addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const message = document.getElementById('contact-message').value.trim();

    if (!name || !email || !message) {
        alert('Please fill all the fields!');
        return;
    }

    alert('Thank you for contacting ÉLORA!');

    document.getElementById('contact-form').reset();
});