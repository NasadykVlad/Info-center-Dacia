const path = require('path');
const fs = require('fs');
const { rejects } = require('assert');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'card.json'
)

class Card {
    static async add(contact) {
        const card = await Card.fetch()

        const idx = card.contacts.findIndex(c => c.id === contact.id)
        const candidate = card.contacts[idx]

        if (candidate) {
            // contact
            candidate.count++
                card.contacts[idx] = candidate
        } else {
            // need add 
            contact.count = 1
            card.contacts.push(contact)
        }


        return new Promise((resolve, reject) => {
            fs.writeFile(p, JSON.stringify(card), err => {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            })
        })
    }

    static async remove(id) {
        const card = await Card.fetch()
        const idx = card.contacts.findIndex(c => c.id === id)

        const contact = card.contacts[idx]

        if (contact.count === 1) {
            // delete
            card.contacts = card.contacts.filter(c => c.id !== id)
        } else {
            // change count
            card.contacts[idx].count--
        }

        return new Promise((resolve, reject) => {
            fs.writeFile(p, JSON.stringify(card), err => {
                if (err) {
                    reject(err)
                } else {
                    resolve(card)
                }
            })
        })
    }

    static async fetch() {
        return new Promise((resolve, rejecet) => {
            fs.readFile(p, 'utf-8', (err, content) => {
                if (err) {
                    rejects(err)
                } else {
                    resolve(JSON.parse(content))
                }
            })
        })
    }
}

module.exports = Card;