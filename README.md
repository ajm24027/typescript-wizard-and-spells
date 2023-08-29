# typescript-wizard-and-spells

## Breaking down the code

### Spell Class

#### Create a Spell Class

This class will be used to build out other classes in our case - we're going to use this abstract spell class to build out our Frost and Fire Spell Classes.

```Typescript
abstract class Spell {
  private _name: string

  constructor(name:string){
    this._name = name
  }

  get name(){
    return this._name
  }

  abstract cast(): void
}
```

- `_name` - is used to store the name of the spell (unreachable by anything not of this class).
- `get name` - a getter function that returns the name of the spell.
- `cast()` - an abstract method that will be used (differently) for the Frost and Fire Spell Classes.

Abstract method():

> Abstract methods are used to define the behavior of a class without specifying the details of how the behavior is implemented. This allows subclasses to provide different implementations of the behavior, depending on the specific needs of the subclass.

#### Enums

An enum in TypeScript is a type that represents a set of named constants. Enums are useful for representing a fixed set of values, such as the suits in a deck of cards or the days of the week. They can be used to:

- Define the possible values for a property or a parameter.
- Create a switch statement that branches on the value of an enum constant.
- Check if a value is a member of an enum.

In our example we use them to define the possible names of our Frost and Fire Spells that will be used later on as paramters in our spellbooks.

```Typescript
enum FireSpellName {
  FireBolt= 'Fire Bolt',
  FireWall= 'Fire Wall',
  BigBang= 'Big Bang',
}

enum FrostSpellName {
  FrostBolt= 'Frost Bolt',
  Blizzard= 'Blizzard',
}
```

#### The Spell Subclasses

The following code is used to create subclasses of the abstract Spell Class which seeds them with common properties and methods.

```Typescript
class FireSpell extends Spell {
  readonly burningDamage = 20
  constructor(name: FireSpellName){
    super(name)
  }
  cast(): void {
    console.log(this.name, `Boom you are burning the enemy! It takes ${this.burningDamage} damage`)
  }
}

class FrostSpell extends Spell {
  readonly slowRate = 0.5
  constructor(name: FrostSpellName){
    super(name)
  }
  cast(): void {
    console.log(this.name, `Brrr, the enemy is freezing. It is slowed by ${this.slowRate}`)
  }
}
```

- They both have `readonly` properties, which just assigns property once during the construction of the thing. Readonly properties are immutable. One assigns a burning damage interger, and the other assigns a floating interger for a 'slow rate'.
- The `Super` keyword in the code is used to access the constructor of the parent abstract Spell Class - in our case, from within the FrostSpell and FireSpell Classes respectively. I'm not sure of any other contextual use other than later on in the code, it's used to ensure that we only construct and pass in FireSpells and FrostSpells later on in the code.
- Finally, they each access that abstract method `cast()` and console log out their respective messages.

#### Wizard Class

#### The Setup - Conditional Typing

Before we move on, because the code is used later on inside the Wizard Class. We define a type alias called 'SpellName' that takes a generic parameter of `<S>` and extend the Spell Class. The alias uses conditional rendering to return either a FireSpellName or FrostSpellName based on whether or not a FireSPell or FrostSpell object is passed into the `castFromSpellBook()` method.

```typescript
type SpellName<S> = S extends FireSpell ? FireSpellName : FrostSpellName
```

Type Alias:

> A type alias is a way to give a new name to an existing type. This can be useful for making code more concise or for making code more reusable.

For example, the following code defines a type alias called MyNumber that is equivalent to the number type, the type alias can then be used in place of the `number` type anywhere in the code:

```typescript
type MyNumber = number
let myNumber: MyNumber = 10
```

Generic Type:

> A Generic Type is a type that can be used with different types that can be useful for writing code that can work with a variety of different data types.

For example, the following code defines a generic function called `sum()` that takes two parameters of any type and returns the sum of the two parameters. Next because of the generic type the function can be used to sum numbers, strings, or objects:

```typescript
function sum<T>(a: T, b: T): T {
  return a + b
}
let sumOfNumbers = sum(10, 20) // 30
let sumOfStrings = sum('Hello', 'World') // "HelloWorld"
```

#### Creating the Wizard Class

First we define the Wizard Class and then we say that the Wizard class takes in a generic type parameter of `<S>`. In the next line, we see that we create a private spellbook property that accepts an array of Spell objects - `spellBook: S[] = []`

```typescript
class Wizard<S extends Spell> {
  private spellBook: S[] = []

  constructor(spellBook: S[]) {
    this.spellBook = spellBook
  }
}
```

The Wizard class has two methods that we code inside of it:

- `castAllAtOnce()` - which goes through the array of Spell objects using the `forEach()` and uses the `cast()` method on each spell in the spellbook array.
- `castFromSpellBook()` - this method takes in a name that is of the type `SpellName<S>` (the condtional alias type we setup from before - which ensures that the name is either a Frost or Fire Spell name.). Then the method attempts to find the spell name passed into it in the Wizard's Spellbook. If it's found, the spell's `cast()` method is used on the spell. Otherwise, an error is thrown to alert the user that the Wizard doesn't have the spell in their spellbook.

```typescript
  castAllAtOnce(){
    this.spellBook.forEach((spell: S) => {
      spell.cast()
    })
  }

  castFromSpellBook(name: SpellName<S>){
    const spell = this.spellBook.find((spell) => spell.name == name)
    if (spell) {
      spell.cast()
    } else {
      throw new Error(
        'You do not have this spell in your spellbook!'
      )
    }
  }
```

The code is using generics and type aliases to make the code more flexible and reusable. The SpellName type alias allows the Wizard class to work with both FireSpell objects and FrostSpell objects. The castFromSpellBook() method uses the SpellName type alias to ensure that the name parameter is of the correct type.
