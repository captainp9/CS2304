# Style Guidelines

The following style guidelines should be followed to ensure readability and reduce the probability of bugs.

## Use === and !== instead of == and !=
> It is considered good practice to use the type-safe equality operators `===` and `!==` instead of their regular counterparts `==` and `!=`.
>
> The reason for this is that `==` and `!=` do type coercion which follows the rather obscure [Abstract Equality Comparison Algorithm](http://www.ecma-international.org/ecma-262/5.1/#sec-11.9.3). For instance, the following statements are all considered true:
  ```javascript
  [] == false
  [] == ![]
  3 == "03"
  ```

http://eslint.org/docs/rules/eqeqeq

## Two space indentation

Google, Facebook, Node.js and more use 2 spaces, no tabs, as the recommended best practice for indenting code blocks.

```javascript
// Good
if(a === b) {
  return true;
}

// Bad
if(a === b) {
return true;
}

// Also Bad
if(a === b) {
    return true;
}
```

http://eslint.org/docs/rules/indent

## Declare your variables.

Always declare variables using the `var` syntax. _This rule can help you locate potential ReferenceErrors resulting from misspellings of variable and parameter names, or accidental implicit globals (for example, from forgetting the var keyword in a for loop initializer)._[<sup>1</sup>][1]

```javascript
var a = 1;  // Good
b = 2;      // Bad
```

http://eslint.org/docs/rules/no-undef

[1]: http://eslint.org/docs/rules/no-undef

## Always use curly braces for block statements

> JavaScript allows the omission of curly braces when a block contains only one statement. However, it is considered by many to be best practice to never omit curly braces around blocks, even when they are optional, because it can lead to bugs and reduces code clarity. So the following:
  ```javascript
  if (foo) foo++;
  ```
> Can be rewritten as:
  ```javascript
  if (foo) {
    foo++;
  }
  ```
> There are, however, some who prefer to only use braces when there is more than one statement to be executed.

http://eslint.org/docs/rules/curly

## Disallow variable redeclaration

> In JavaScript, it’s possible to redeclare the same variable name using var. This can lead to confusion as to where the variable is actually declared and initialized.

> Examples of **incorrect** code for this rule:
  ```javascript
  var a = 3;
  // ...
  var a = 10;
  ```
> Examples of **correct** code for this rule:
  ```javascript
  var a = 3;
  //...
  a = 10;
  ```

http://eslint.org/docs/rules/no-redeclare
