# StackBasic
StackBasic is a general-purpose high level stack based programming language
with non-strict syntax.

## Syntax
These are the basic syntax rules

### Instructions
```
:<name> <value>
```
Where value is a string, number or boolean value.

### Variables
```
@<name>
```
Where name is a string.

### Forth like expressions
```
[<value> <value> <value>]
```
Where value is a string, number, boolean or instruction.

### String
```
'<value>'
```
Where value is a character blob.

## Introduction
StackBasic Hello, World:
```
:opush 'Hello, World
```

## Stacks
StackBasic is a stack-based programming language, these are the stacks:
 - User stack (general purpose and function paramaters);
 - master stack (complex instructions);
 - private stack (function private stack);
 - I/O stack (input output management).

All the stacks are LiFo, Last in First out, if you don't know what a stack is
read this [page](https://en.wikipedia.org/wiki/Stack_(abstract_data_type)).

### Stack instructions
We can do 2 operations with the stack, push something and pop something:
```
;; USER STACK ;;
:upush <value> ; Push to user stack
:upop  <value> ; Pop to user stack

;; MASTER STACK ;;
:mpush <value> ; Push to master stack
:mpop  <value> ; Pop to master stack

;; PRIVATE STACK ;;
:push  <value> ; Push to private stack
:pop   <value> ; Pop to private stack

;; I/O STACK ;;
:opush <value> ; PutS
:opop  <value> ; GetS
```

### Stack advanced operations
With some stacks like the master stack we can call special instructions to
execute a task, for example if we want to get the array length we do:
```
:mpush @my_arr @GETARRLEN ; C++ equivalent: ARRUTILS->GETARRLEN(my_arr)
:mexec @ARRUTILS
```
The `mexec` instruction takes as parameters the values on stack, for example if
the `mexec` instruction is expecting 3 params but there are only 2 params a
"Stack underflow" exception is going to be thrown.

## Functions
In StackBasic there are functions like any other programming language, but
parameters are stack values, for example:
```c
int c_function(int a, int b, int c) {
    return a + b +c - 2 * a / b;
}
```
```
:begin @c_function

:upop  @a @b @c                     ; Getting parameters
:upush [@a @b + @c + 2 - @a * / @b] ; See expressions

:end   @c_function
```
Return values are pushed to the user stack.

## If statements
Again let's use an example
```c
if (a == b && a == c || a == b) {
    printf("Hello, World\n");
}
```
```
; See expressions
:if [@a @b = @a @c = & @a @b = |]
    :opush "Hello, World"
:end
```

## Expressions
In the examples above we used expressions, an expression is a forth-like
expression, an expression is based on a stack, so we can still push/pop and
execute functions

### Basic functions
These are basic functions
Stack = Stack value<BR>

| Stack    | C Equivalent | Description           |
| -------- | ------------ | --------------------- |
| `A B +`  | `A + B`      | Add                   |
| `A B -`  | `A - B`      | Subtract              |
| `A B *`  | `A * B`      | Multiply              |
| `A B /`  | `A / B`      | Divide                |
| `A B =`  | `A == B`     | Equal                 |
| `A B >`  | `A > B`      | More than             |
| `A B <`  | `A < B`      | Less than             |
| `A B >=` | `A >= B`     | More or equal than    |
| `A B <=` |  `A <= B`    | Less or equal than    |
| `A !`    | `!A`         | Logical not           |
| `A ~`    | `~A`         | Bitwise 2s complement |
| `A B &`  | `A & B`      | Bitwise and           |
| `A B |`  |`A | B`       | Bitwise or            |
| `A B >>` | `A >> B`     | Bitwise right shift   |
| `A B <<` | `A << B`     | Bitwise left shift    |
| `A B ^`  | `pow(A, B)`  | Power                 |
| `A B %`  | `A % B`      | Modulus               |
