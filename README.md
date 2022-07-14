# reactable
Makes JS Objects reactive

# Example Usage
```js
    var dynamicObject = Object.watch({
        title: "Reactable Title",
        version: 1.0,
        author: {
            name: "Jochen Hintringer"
        }
    }, function(property, oldValue, newValue, field, oldFieldValue, newFieldValue) {

        // property: The base property, that has changed (not the nested property)
        // oldValue: The old value of the base property (not the actual changed value)
        // newValue: The new value of the base property (not the actual changed value)

        // field: The actual changed property
        // oldFieldValue: The old value of the actual property
        // newFieldValue: The new value of the actual property

    });

    dynamicObject.title = "New Title";
    // Will trigger the function with these arguments: 
    // fn("title", "Reactable Title", "New Title", "title", "Reactable Title", "New Title")

    dynamicObject.author.name = "Anonymous";
    // Will trigger the function with these arguments:
    // fn("author", { name: "Jochen Hintringer" }, { name: "Anonymous" }, "name", "Jochen Hintringer", "Anonymous");
```
# Property only
```js
    var dynamicObject = {
        title: "Reactable Title",
        version: 1.0,
        author: {
            name: "Jochen Hintringer"
        }
    };
    
    dynamicObject.watch("author", function(property, oldValue, newValue, field, oldFieldValue, newFieldValue) {

        // property: The base property, that has changed (not the nested property)
        // oldValue: The old value of the base property (not the actual changed value)
        // newValue: The new value of the base property (not the actual changed value)

        // field: The actual changed property
        // oldFieldValue: The old value of the actual property
        // newFieldValue: The new value of the actual property
    });

    dynamicObject.author.name = "Anonymous";
    // Will trigger the function with these arguments:
    // fn("author", { name: "Jochen Hintringer" }, { name: "Anonymous" }, "name", "Jochen Hintringer", "Anonymous");

```