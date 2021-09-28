//duplicate colors
const templateNode = document.getElementById('templateNode');
const parentNode = document.getElementById('parentNode');
let version = 5;
templateNode.remove();


var items = [];

function updateBsColors() {
    $.getJSON("/includes/json/defaults.json", function(data) {
        $.each(data['bs-' + version], function(key, val) {
            items.push({key, val});
    
            const newNode = templateNode.cloneNode(true);
            newNode.id = 'bs-color-' + key;
            newNode.querySelector('label').innerText = key.charAt(0).toUpperCase() + key.slice(1);
            newNode.querySelector('label').htmlFor = 'color-' + key;
            newNode.querySelector('[type="color"]').value = val.toUpperCase();
            newNode.querySelector('[type="color"]').name = 'color-' + key;
            newNode.querySelector('[type="text"]').value = val.toUpperCase();
            newNode.querySelector('[type="color"]').name = 'color-' + key + '-chip';
    
            parentNode.appendChild(newNode);
        });
    });
}

window.addEventListener('load', updateBsColors);

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

let bsVersionDropdown = document.getElementById('bs-version');

bsVersionDropdown.addEventListener('change', function(e) {
    version = e.target.value;
    for(const elem of document.querySelectorAll('.bs-color')) {
        elem.remove();
    }
    updateBsColors();
})