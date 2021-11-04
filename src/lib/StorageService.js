export default class LocalStorage {
    constructor(storage) {
        this.storage = storage;
    }
    add(name, data) {
        this.storage[name] = JSON.stringify(data);
        return this.storage;
    }
    isStorage() {
        return this.storage ? true : false;
    }
    hasField(name) {
        return this.storage[name] ? true : false;
    }
    find(name) {
        try {
            if (!this.hasField(name)) return false;
            return JSON.parse(this.storage[name]);
        } catch (error) {
            console.error(error);
            return false;
        }
    }
    remove(name) {
        try {
            if (!this.hasField(name)) {
                throw new Error("Attempting to remove an unexistent field");
            }
            delete this.storage[name];
            return this.storage;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
    update(name, data) {
        try {
            if (!this.hasField(name)) {
                throw new Error("Attempting to update an unexistent field");
            }
            this.storage[name] = JSON.stringify(data);
            return this.storage;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
}
