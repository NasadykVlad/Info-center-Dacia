const uuid = require('uuid').v4;
const fs = require('fs');
const path = require('path');

class Contacts {
    constructor(name, photo, email) {
        this.name = name;
        this.photo = photo;
        this.email = email;
        this.id = uuid() // Generator different id
    }

    toJSON() { // Parse to data in JSON
        return {
            name: this.name,
            photo: this.photo,
            email: this.email,
            id: this.id
        }
    }

    async save() { // Method for save contacts data at form in JSON format
        const contacts = await Contacts.getAll() // Getting promie
        contacts.push(this.toJSON());

        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'contacts.json'),
                JSON.stringify(contacts),
                (err) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve()
                    }
                }
            )
        })
    }

    static getAll() { // Parsing data for forms
        return new Promise((resolve, reject) => {
            fs.readFile(path.join(__dirname, '..', 'data', 'contacts.json'),
                'utf-8',
                (err, content) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(JSON.parse(content))
                    }
                })
        })
    }

    static async getById(id) {
        const contacts = await Contacts.getAll()
        return contacts.find(foo => foo.id === id)
    }
}

module.exports = Contacts