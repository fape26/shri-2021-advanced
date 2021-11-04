class MySet {
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

// тесты
const set = new MySet([4, 8, 15, 15, 16, 23, 42]);

// хранит только уникальные значения
console.log([...set]); // [ 4, 8, 15, 16, 23, 42 ]

// есть свойство size
console.log(set.size); // 6

// работает в цикле for-of
for (const item of set) {
    console.log(item); // 4 8 15 16 23 42
}

// есть методы keys, values, entries
for (const item of set.entries()) {
    console.log(item); // [ 4, 4 ] [ 8, 8 ] ...
}

// есть метод clear
set.clear();
console.log(set.size); // 0

const object = {
    getValue () { return this.value }
}

const data = {
    value: 42
}

// есть метод add
set.add(object);
set.add(data);

// который может работать в цепочке вызовов
set.add(object).add(object).add(object);

// есть метод delete
set.delete(data);

// есть метод has
console.log(set.has({})); // false
console.log(set.has(object)); // true
console.log(set.has(data)); // false


// и кое-что еще
console.log(set === set.valueOf()) // true
console.log(String(set)) // [object ^_^]
console.log(Object.prototype.toString.call(set)) // [object ^_^]

// есть forEach, который делает какие-то странные вещи...
set.forEach(function (item) {
    console.log(item.getValue.call(this)); // 42
}, data)