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

type SpellName<S> = S extends FireSpell ? FireSpellName : FrostSpellName

class Wizard <S extends Spell>{
  private spellBook: S[] = []

  constructor(spellBook: S[]) {
    this.spellBook = spellBook
  }

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
}

const fireSpells: FireSpell[] = [new FireSpell(FireSpellName.FireBolt), new FireSpell(FireSpellName.FireWall)]
const frostSpells: FrostSpell[] = [new FrostSpell(FrostSpellName.FrostBolt), new FrostSpell(FrostSpellName.Blizzard) ]

const fireWizard = new Wizard<FireSpell>(fireSpells)
const frostWizard = new Wizard<FrostSpell>(frostSpells)

fireWizard.castAllAtOnce()
fireWizard.castFromSpellBook(FireSpellName.BigBang)

try {
  fireWizard.castFromSpellBook(FireSpellName.BigBang)
} catch (err: unknown) {
  console.log('Error:', (err as Error).message)
}

frostWizard.castAllAtOnce()
frostWizard.castFromSpellBook(FrostSpellName.Blizzard)