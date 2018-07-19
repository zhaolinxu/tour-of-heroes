import {    SuperZoneData,
            multiplicativeOverride as MULT,
            additiveOverride as PLUS
        } from './zones.data.defns';
import { SkillType as S } from '../skills/index';
import { NamedUnlock } from '../stats/index';
import { OneShotAction as OS } from './action-oneshots.enum';

let CHEAT_POINTS = 5000;
let FLOWERS = ["poppies", "daisies", "roses", "orchids", "violets", "begonias"];

export const SUPERZONEDATA: SuperZoneData[] = [
{
name: 'Fields',
minLevel: 0,
zones:
[
    {
        name: 'Turnip Farm',
        description: `这是一个让学徒们学习土地的好地方——萝卜是一种相当宽容的作物。`,
        actions: [
            {vb: "pull", obj:"a turnip", skills: S.Farming},
            {vb: "pull", obj:"a HUGE turnip", skills: S.Farming, bonusLevel: 1},
        ],
        difficulty: 0,
    },
    {
        name: 'Woody Woods',
        description: `A small forest where locals go to collect firewood.
        Watch out for critters.`,
        actions: [
            {vb: "chop", obj:"__X", opts:["an oak", "a spruce", "a pine"],
                skills: S.Survival, weight: .8},
            {vb: "ax", obj:"a __X", opts:["rat", "rabid deer", "badger", "spider"],
                skills: S.Combat, weight: .2},
            {vb: "free", obj:"the woodsman from a trap", oneShot:OS.WoodsmanFreed,
                bonusLevel:2, skills:S.Survival}
        ],
        difficulty: 1,
    },
    {
        name: 'Stables',
        description: `If Hercules wasn't too good to clean stables, then neither
        are you`,
        actions: [
            {vb: "ride", obj: "a steed", skills: S.Riding, weight: 1, difficulty:PLUS(-1)},
            {vb: "drive", obj: "a plough", skills: [S.Riding, S.Farming],
                weight: 1, difficulty:PLUS(-1)},
            {vb: "bale", obj: "some hay", skills: S.Farming, weight: 1}
        ],
        difficulty: 3,
    },
    {
        name: 'Flower Fields',
        description: 'Row upon row of pretty, pretty flowers',
        actions: [
            {vb: 'plant', obj: 'some __X', opts:FLOWERS, skills: S.Farming,
            difficulty:PLUS(9)},
            {vb: 'pick', obj: 'a bouquet of __X', opts:FLOWERS, skills: [S.Farming, S.Charm]},
            {vb: 'tiptoe', obj: 'through the tulips', skills: S.Stealth,
                bonusLevel:.5, difficulty: PLUS(-1)},
        ],
        difficulty: 4,
    },

]},

{
name: 'Village',
minLevel: 5,
zones:
[
    {
        name: 'Chapel',
        description: 'A place of worship',
        actions: [
            {vb: "pray", obj:"", skills: S.Piety},
        ],
        difficulty: 4,
    },
    {
        name: 'General Store',
        description: 'A generally good place to steal',
        actions: [
            {vb: "nick", obj: "a knicknack", skills: S.Stealth},
            {vb: "nick", obj: "an antique", skills: S.Stealth, bonusLevel: 1},
            {vb: "nick", obj: "a priceless artifact", skills: S.Stealth, bonusLevel: 2},
        ],
        difficulty: 7
    },
    {
        name: 'Tavern',
        description: 'A place of merriment. And occasional brawls.',
        actions: [
            {vb: "dance", obj: "a jig", skills: S.Charm, weight: 1},
            {vb: "play", obj: "darts", skills: S.Charm, weight: 1},
            {vb: "sing", obj: "some epic karaoke", skills: S.Charm, bonusLevel:1},
            {vb: "fight", obj: "a drunken patron", skills: S.Combat, weight: 1},
        ],
        difficulty: 10,
    },
    {
        name: 'Tournament',
        description: 'A local jousting competition',
        actions: [
            {vb: "joust", obj: "in an exhibition match",
            skills: [S.Riding, S.Charm], weight: 3.0},
            {vb: "joust", obj:"in a qualifying match",
            skills: [S.Riding, S.Charm], bonusLevel:.3},
            {vb: "joust", obj:"in a quarterfinal match",
            skills: [S.Riding, S.Charm], bonusLevel:1},
            {vb: "joust", obj:"in a semifinal match",
            skills: [S.Riding, S.Charm], bonusLevel:2},
            {vb: "joust", obj:"in the *grand final* match",
            skills: [S.Riding, S.Charm], bonusLevel:3,
            unlocks: NamedUnlock.JoustingChampion, oneShot: OS.TournamentFinals},
        ],
        difficulty: 12,
    }


]
},

{
name: 'Cave Complex',
minLevel: 12,
zones: [
    {
        name: 'Mushroom Cave',
        description: 'A grotto where mycologists cultivate mushrooms with curative, poisonous, or psychedelic properties',
        actions: [
            {vb: 'collect', obj: 'a mushroom', skills: [S.Farming, S.Intellect]},
            {vb: 'concoct', obj: 'a draught of __X',
            opts:["sleep", "dizziness", "wart removal", "blindness", "cheer"],
            skills: [S.Intellect]}
        ],
        difficulty: 14,
    },
    {
        name: 'Deep Cave',
        description: 'This place is dangerous',
        actions: [
            {vb: 'crawl', obj: 'through a narrow passage', skills: [S.Survival]},
            {vb: 'dodge', obj: 'a falling stalctite', skills: [S.Survival],
                bonusLevel:.5},
            {vb: 'dodge', obj: "a falling stalagmite. Wait, that's not right, is it?",
                skills: [S.Survival], bonusLevel:.5, weight: 0.001},
            {vb: 'swim', obj: 'through a sump', skills: [S.Survival], bonusLevel: 1},
        ],
        difficulty: 16,
    },
    {
        name: 'Bat Cave',
        description: `These bats haven't been doing anyone harm, but I guess you
        could slaughter them anyways for practice`,
        actions: [
            {vb: 'slay', obj: 'a fruit bat', skills: [S.Combat]},
            {vb: 'slay', obj: 'a vampire bat', skills: [S.Combat], bonusLevel:.5},
            {vb: 'slay', obj: 'the Bat King', skills: [S.Combat],
                bonusLevel:2, weight: .05, oneShot: OS.BatKing}
        ],
        difficulty: 18,
    },
    {
        name: 'Haunted Cave',
        description: "Townsfolk steer clear of this cave. Local legend says that it's spooky.",
        actions: [
            {vb: 'light', obj: 'some incense', skills: S.Piety},
            {vb: 'exorcise', obj: 'a restless spirit', skills: [S.Piety, S.Combat],
                bonusLevel:.5},
            {vb: 'exorcise', obj: 'an ancient, unspeakable horror',
                skills: [S.Piety, S.Combat], bonusLevel:1.5},
        ],
        difficulty: 19,
    }

]
},

{
name: 'City',
minLevel: 20,
zones: [
    {
        /** This could be interesting as a 'rainbow' zone. Read a book about
            plants/martial strategy/religion/whatever, and gain SP in the
            corresponding skill + intellect.
        **/
        name: 'Library',
        description: 'A good place to get smarter and practice being quiet',
        actions: [
            {vb: "ponder", obj: "a quaint and curious volume of forgotten lore",
                skills: [S.Intellect, S.Stealth], bonusLevel: 1,
                skillRatios: {'Intellect': .8, 'Stealth': .2}},
            {vb: "read", obj:"a __X", opts: ["tome", "book", "encyclopedia", "magazine"],
                skills: [S.Intellect, S.Stealth],
                skillRatios: {'Intellect': .8, 'Stealth': .2} },
        ],
        difficulty: 22,
    },
    {
        name: 'Botanical Garden',
        description: `A showcase of rare and exotic plants`,
        actions: [
            {vb: "bask", obj:"in the sun", skills:S.Charm, weight:.2},
            {vb: "inspect", obj:"an unusual cultivar of __X",
            opts:["radish", "turnip", "parsley", "carrot", "pumpkin"],
            skills:S.Farming},
            {vb: "pluck", obj:"a weed", skills:S.Farming},
            {vb: "chat", obj:"with the head gardener", skills:[S.Farming, S.Charm],
            bonusLevel: 1.5}
        ],
        difficulty: 25,
    },
    {
        name: 'Colloseum',
        description: `A violent but popular local spectacle. Successful gladiators
        are handy with a sword and know how to razzle-dazzle the crowd.`,
        actions: [
            {vb: "fight", obj:"a gladiator", skills: [S.Combat]},
            {vb: "ham", obj:"it up for the crowd", skills: [S.Charm]},
            {vb: "fight", obj:"a __X", opts: ["tiger", "lion", "wolf", "boar"],
                skills: [S.Combat], bonusLevel: .5},
            {vb: "bask", obj:"in the crowd's adoration", skills:S.Charm,
                bonusLevel:1}
        ],
        difficulty: 28,
    },
    {
        name: 'Cathedral',
        description: 'Nice stained glass',
        actions: [
            {vb: "sermonize", obj:"", skills:[S.Piety, S.Charm]},
            {vb: "proselytize", obj:"", skills:[S.Piety, S.Charm]},
            {vb: "harmonize", obj:"", skills:[S.Charm]},
            {vb: "eulogize", obj:"", skills: [S.Piety, S.Charm], bonusLevel:1.5},
        ],
        difficulty: 31,
    }
]
},

// {
// name: 'Coast',
// minLevel: 40,
// zones: [
//
// ]
// },

{
name: 'Hinterlands',
minLevel: 50,
zones: [
    {
        name: 'Bandit Camp',
        description: `These bandits have been accosting travelers and generally
        acting like jerks`,
        actions: [
            {vb: 'apprehend', obj:"a bandit", skills:[S.Combat]},
            {vb: 'steal', obj:"stolen goods", skills:[S.Stealth]},
            {vb: 'assassinate', obj:"the Chief Bandit",
            skills:[S.Stealth, S.Combat], bonusLevel:3, oneShot:OS.BanditChief},
        ],
        difficulty: 50,
    },
    {
        name: 'Gryphon Nest',
        description: 'Scouts spotted the nest of a great gryphon on a mountain top',
        actions: [
            {vb: "climb", obj:"", skills: S.Survival, weight:1.0},
            {vb: "sneak", obj: "an egg out of the nest", skills: S.Stealth, weight: .2},
            {vb: "ride", obj: "a great gryphon", skills: S.Riding, bonusLevel:2},
            {vb: "sneak", obj: "a golden egg", skills: S.Stealth, bonusLevel:3,
            oneShot:OS.GoldenEgg},
        ],
        difficulty: 55,
    },
    {
        name: 'Ancient Ruins',
        description: 'Ruins left by an ancient civilization',
        actions: [
            {vb: "disarm", obj: "a booby trap", skills: S.Survival},
            {vb: "decode", obj: "some ancient glyphs", skills: S.Intellect},
            {vb: "deface", obj: "an altar to a pagan god", skills: S.Piety,
                bonusLevel:1},
            {vb: "unlock", obj: "the secrets of the Jade McGuffin", skills: S.Intellect,
            bonusLevel:3, oneShot:OS.McMuffin},
        ],
        difficulty: 60,
    },
    {
        name: 'Goblin Outpost',
        description: 'Smells awful',
        actions: [
            {vb: "slay", obj: "a goblin", skills: S.Combat},
            {vb: "slay", obj: "a goblin lieutenant", skills: S.Combat, bonusLevel:1},
            {vb: "slay", obj: "the Goblin King", skills: S.Combat, bonusLevel:3,
            oneShot: OS.GoblinKing},
        ],
        difficulty: 65,
    }

]
},

{
name: 'Beyond',
minLevel: 99,
zones: [
    {
        name: 'Crack in Spacetime',
        description: `Some chronomancers had a teensy accident and may have` +
        ` created a bit of a singularity-type situation. It'll take a very ` +
        `seasoned hero to get through this.`,
        actions: [
            {vb: 'beat', obj: 'the game', skills:[
                S.Farming, S.Combat, S.Survival, S.Charm, S.Stealth, S.Riding,
                S.Intellect, S.Piety],
                unlocks: NamedUnlock.SpaceTimeConquered
            }
        ],
        difficulty: 100
    }
]
},

{
name: 'Cheatz',
minLevel: 1,
cheat: true,
zones: [
    {
        name: 'Cheat 1',
        description: 'zz',
        actions: [
            {vb: "zz", obj:"",skills:[
                S.Farming, S.Combat, S.Survival, S.Charm, S.Stealth, S.Riding,
                S.Intellect, S.Piety
            ], bonusLevel:2}
        ],
        difficulty: -5,
    },
    {
        name: 'Cheat 2',
        description: 'zz',
        actions: [
            {vb: "zz", obj:"",skills:[
                S.Farming, S.Combat, S.Survival, S.Charm, S.Stealth, S.Riding,
                S.Intellect, S.Piety
            ], bonusLevel:3}
        ],
        difficulty: -5,
    },
    {
        name: 'Cheat 4',
        description: 'zz',
        actions: [
            {vb: "zz", obj:"",skills:[
                S.Farming, S.Combat, S.Survival, S.Charm, S.Stealth, S.Riding,
                S.Intellect, S.Piety
            ], bonusLevel:4}
        ],
        difficulty: -5,
    }
]
}

];
