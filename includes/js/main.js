//duplicate colors
const templateNode = document.getElementById('templateNode');
const parentNode = document.getElementById('parentNode');

for(var i = 0; i < 8; i ++) {
    const newNode = templateNode.cloneNode(true);
    parentNode.appendChild(newNode);
}

// update colors
function updateColor(e) {
    const newVal = e.target.value;
    const inputGroup = e.target.parentElement;
    const textInput = inputGroup.querySelector('[type="text"]');
    const colorInput = inputGroup.querySelector('[type="color"]');

    if (!/^#([0-9A-F]{3}){1,2}$/i.test(newVal)) {
        textInput.classList.add('is-invalid');
    } else {
        textInput.classList.remove('is-invalid');
        textInput.value = newVal.toUpperCase();
        if (newVal.length == 7) {
            colorInput.value = newVal;
        } else {
            const newShortVal = newVal.substring(1);
            colorInput.value = '#' + newShortVal + newShortVal;
        }
    }
}