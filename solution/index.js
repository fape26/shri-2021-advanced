module.exports = class MySet {
    constructor(array) {
        this.collection = [];
        for (let value of array) {
            this.add(value);
        }
    }

    add(value) {
        if (!this.has(value)) {
            this.collection.push(value);
        }
        return this;
    }

    has(value) {
        return this.collection.includes(value)
    }

    [Symbol.iterator]() {
        return this.collection.values()
    }

    get size() {
        return this.collection.length
    }

    * entries() {
        for (let item of this.collection) {
            yield [item, item]
        }
    }

    clear() {
        this.collection.splice(0, this.collection.length)
    }

    delete(value) {
        let index = this.collection.indexOf(value);
        if (index === -1) {
            return false
        } else {
            this.collection.splice(index, 1)
            return true
        }
    }

    get [Symbol.toStringTag]() {
        return '^_^';
    }

    forEach(callback, thisArg) {
        for (let item of this) {
            callback.bind(thisArg)(item)
        }
    }
}