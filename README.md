# Insert HTML

Use a promise and requestAnimationFrame to insert HTML 

## Installation

1. npm install insert-html

## Usage

```javascript
    var InsertHTML = require('insert-html');
    new InsertHTML('#selector', '<div>html</div>', 'html')
        .then(
            function(){
                // html was inserted
            }
        );