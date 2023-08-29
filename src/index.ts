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

enum FireSpellName {
  FireBolt= 'Fire Bolt',
  FireWall= 'Fire Wall',
  BigBang= 'Big Bang',
}

enum FrostSpellName {
  FrostBolt= 'Frost Bolt',
  Blizzard= 'Blizzard',
}