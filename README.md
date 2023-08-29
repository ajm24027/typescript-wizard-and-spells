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
