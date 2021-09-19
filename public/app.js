document.querySelectorAll('.name').forEach(node => {
    node.style.color = 'grey'
})

const $card = document.querySelector('#card')
if ($card) {
    $card.addEventListener('click', event => {
        if (event.target.classList.contains('js-remove')) {
            const id = event.target.dataset.id

            fetch('/card/remove/' + id, {
                    method: 'delete'
                }).then(resp => resp.json())
                .then(card => {
                    if (card.contacts.length) {
                        const html = card.contacts.map(c => {
                            return `<tr>
                            <td>${c.name}</td>
                            <td>${c.count}</td>
                            <td>
                                <button class="btn btn-primary js-remove" data-id="${c.id}">Delete</button>
                            </td>
                        </tr>`
                        }).join('')
                        $card.querySelector('tbody').innerHTML = html
                        $card.querySelector('.count-people-collection').textContent = `All people in collections: ${card.contacts.length}`
                    } else {
                        $card.innerHTML = '<p>No collections...</p>'
                    }
                })
        }
    })
}

M.Tabs.init(document.querySelectorAll('.tabs'));