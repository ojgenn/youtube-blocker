setTimeout(() => {

    const input = document.querySelector('#contentInput');
    const listContainer = document.querySelector('#list');
    let list = [];
    chrome.storage.local.get('list', (data) => {
        if (data.list) {
            list = data.list;
            list.forEach(item => {
                addListItem(item, listContainer);
            })
        } else {
            chrome.storage.local.set({list});
        }
    });

    document.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const parent = e.target.closest('li');
            const span = parent.querySelector('span');

            const content = span.textContent.trim();
            const index = list.findIndex(item => item === content);
            if (index >= 0) {
                list.splice(index, 1);
                chrome.storage.local.set({list});
                parent.remove();
            }
        }
    })

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            list.push(e.target.value);
            chrome.storage.local.set({list});
            addListItem(e.target.value, listContainer);
            input.value = '';
        }
    });
}, 100)

function addListItem(item, container) {
    const el = document.createElement('li');
    el.classList.add('list-group-item');
    el.classList.add('d-flex');
    el.classList.add('justify-content-between');
    el.innerHTML = `
                    <span>${item}</span>
                    <button type="button" class="btn btn-danger btn-sm">Удалить</button>
                `
    container.appendChild(el);
}
