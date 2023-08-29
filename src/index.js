var Spell = /** @class */ (function () {
    function Spell(name) {
        this._name = name;
    }
    Object.defineProperty(Spell.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: false,
        configurable: true
    });
    return Spell;
}());
var FireSpellName;
(function (FireSpellName) {
    FireSpellName["FireBolt"] = "Fire Bolt";
    FireSpellName["FireWall"] = "Fire Wall";
    FireSpellName["BigBang"] = "Big Bang";
})(FireSpellName || (FireSpellName = {}));
var FrostSpellName;
(function (FrostSpellName) {
    FrostSpellName["FrostBolt"] = "Frost Bolt";
    FrostSpellName["Blizzard"] = "Blizzard";
})(FrostSpellName || (FrostSpellName = {}));
