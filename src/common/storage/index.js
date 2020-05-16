/**
 * Manage your storage.
 *
 * Current implementation stores to localStorage. Local Storage should always be
 * accessed through this instace.
 *
 * Import this instace and then call it // storage.get('name').key or  // storage.set('name', {'key':'value', etc...})
 **/

export default {
    get: name =>
        localStorage.getItem(name)
            ? JSON.parse(localStorage.getItem(name))
            : false,

    set: (name, object) =>
        localStorage.getItem(name)
            ? localStorage.setItem(
                  name,
                  JSON.stringify(
                      Object.assign(
                          JSON.parse(localStorage.getItem(name)),
                          object
                      )
                  )
              )
            : localStorage.setItem(name, JSON.stringify(object)),

    remove: name => localStorage.removeItem(name),

    // нового товара не было в списке - добавляем https://ru.stackoverflow.com/questions/700087/%D0%94%D0%BE%D0%B1%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5-%D0%B8-%D0%BE%D0%B1%D0%BD%D0%BE%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5-%D1%8D%D0%BB%D0%B5%D0%BC%D0%B5%D0%BD%D1%82%D0%B0-%D0%B2-localstorage

    update(name, object) {
        var oldItems = JSON.parse(localStorage.getItem(name)) || []
        var newItem = object
        var isReplaced = false

        var newItemKey = Object.keys(newItem)[0] // id нового товара
        for (var i = 0; i < oldItems.length; i++) {
            var oldItemKey = Object.keys(oldItems[i])[0]
            if (oldItemKey == newItemKey) {
                // новый товар уже есть в списке товаров - заменяем
                oldItems[i] = newItem
                isReplaced = true
                break
            }
        }
        if (!isReplaced) {
            // нового товара не было в списке - добавляем
            oldItems.push(newItem)
        }
        localStorage.setItem(name, JSON.stringify(oldItems))
    },
}
