/**
 * ============================================================
 *  sur lyng-a — Poetry Data File
 *  Author: [joa]
 * ============================================================
 *  HOW TO EDIT:
 *  • Add a new poem by copying an existing poem object and
 *    pasting it at the TOP of the POEMS array below.
 *  • Poems are listed newest → oldest (the page shows the first
 *    entry first). `id` and `catalogNumber` follow the order they
 *    were written: use the next number up, never reuse one.
 *  • Set `featured: true` on exactly ONE poem at a time.
 *  • `body` uses template literals — use blank lines between
 *    stanzas, and indent lines with spaces as desired.
 *  • `epigraph` and `marginNote` are optional — set to null
 *    or remove the key if not needed.
 *  • `epigraph` format: { text: "...", attribution: "— Author, Source" }
 *  • `theme` must be one of:
 *      'tdong duma' | 'kiad-so' | 'kyntien wym lait' | 'Mei Ram-ew'
 * ============================================================
 */

const POEMS = [
  {
    id: 25,
    catalogNumber: "No. 25",
    title: "the apathy of sins",
    date: "October 2026",
    theme: "tdong duma",
    featured: true,
    epigraph: null,
    body: `Comfort in this house
was bought with someone else's loss.
Admiring my reflection in the glass,
blinded by who stands shivering in the cold.

The mind is a captive
of its own oligarchy.
A saint i may be in one room,
and a devil incarnate in the next.

Perspectives and empathy drawn
like a border line across dirt.
On and on, i tend my own fence.
learnt what resides
and belongs only mine,
overlooking the rest.

Is it sin
to feed your own mouth first
or a question only hunger can answer?
Is availing your own
would be considered selfishness?

A repeated sin stops carrying venom.
They become the usual mist
settling over the pine trees,
where nothing screams or bleeds,
no longer born from malice,
but from numbness.`,
    marginNote: "On envying others, and the complexities of existence",
    readingTime: "2 min"
  },
  {
    id: 24,
    catalogNumber: "No. 24",
    title: "Places",
    date: "August 2026",
    theme: "kiad-so",
    featured: false,
    epigraph: null,
    body: `Welcomed by a cat,
Felt soft fur as a greeting. 
Entered the flat.
Mesmerized by the sighting,
a tear dropped,
unintentionally, incontrollably.
How can something, 
such simple magic truly exist? 
She exists...
In my head, the place is her. 
It breathes her, it speaks of her,
It cries of her and dreams of her. 
The people, the houses,
the animals and the hustle
the traffic and the quiet corners
they all breathe her name.`,
    marginNote: null,
    readingTime: "2 min"
  },

  {
    id: 23,
    catalogNumber: "No. 23",
    title: "dait dor",
    date: "July 2026",
    theme: "kyntien wym lait",
    featured: false,
    epigraph: null,
    body: `Da kot u ap iei ktien iei thylliej
wa mih na u nud. Ong oa boi da biej
da leh ka bih ka sma iong ka. Him oa da u siej
te sieh oa ha u nud.`,
    marginNote: null,
    readingTime: "2 min"
  },

  {
    id: 22,
    catalogNumber: "No. 22",
    title: "bynta wa so",
    date: "July 2026",
    theme: "kyntien wym lait",
    featured: false,
    epigraph: null,
    body: `Waroh da dep.
i rukom, i lehniam , i jingsngewsih, da mylliñ.
i jingkynmo da sdang ki u wiar syndon.
i por da sdang lai i chakhmat sak ne
da sdang pteiñ i ha ka dustur kamwa juh man.
Ki jingkylla.
U bru tlep eit miaw u hei jingsmat wa phylla.
boi da man i bhah i jingim oa.
i thong leh da kylla.
ym ye oa u ae sniawngooh ia me, ymchah ki bor jingim oa heini sla pyrthai.
Ki jinghikai, ki jingchitom, ki jingsniawbha, ki jingiah luti, ki por wa da lai wa neh du ha yimpho.
Waroh kiwa da lum da thup oa ha ka por wa ioh oa, iwa ym ye oa u buhrieh lane thung deiwi.
Wan oa heini u pyndep ia i jingthmu iong U, te man i ite u wow pynio oa ia U.
A wa na jrong, lynter u man oa u bru wym hun hei ni i thuh ia i jingtip.
Chihajar ngooh.`,
    marginNote: "Continuing the Pnar series.",
    readingTime: "2 min"
  },

  {
    id: 21,
    catalogNumber: "No. 21",
    title: "bynta wa lē",
    date: "July 2026",
    theme: "kyntien wym lait",
    featured: false,
    epigraph: null,
    body: `da toh i por, i por wa pynbor;
u dait dor leh ym sniaw kordor.
chong i samen, peit lyngoh i cha ki khlur
Wa ileh ym man i kam ki?
ki rukom che kam wa em sur.
da toh i por, i por ka iahba.
dap ko u snem rupa.
toh lah wei man i por wa sniawbha,
nga leh kwah oa u lai pynsawa.`,
    marginNote: "Continuing the Pnar series.",
    readingTime: "2 min"
  },

  {
    id: 20,
    catalogNumber: "No. 20",
    title: "bynta wa-ar",
    date: "July 2026",
    theme: "kyntien wym lait",
    featured: false,
    epigraph: null,
    body: `wa-ar
ha i jingim, ha i lai i cha bri,
thuh i ki soh wa thiang na pyrdi,
chem i ki bru wa ae kti.
ong ki wan i wow pynïo lad pynïo luti.
wei man ki kam wa chbeh ka sngi.
Da sumar da iah chwa ki da kylla ka riti.
Ka riti ka juk oa wa da mut oa toh ki bru thylli.
Da khlan i sniaw pap wei sniaw bichni,
dang mut oa toh ki bru khujli.

kyrwoh na dien i khlieh

Ioh jingsneiñ oa na lai surok,
heini ha purthai wa thok
wym em ka syngkeiñ wa hok.
Dang em wa khut kani sla ka dujok.

kyrwoh na tongbeiñ

Hanpaia ioh kylla cheiwon io i rata.
ka rta pu thngad ko u thngan ko u dawa
iei kam iei kamai u ioh ja.

kyrwoh na dohnud.`,
    marginNote: "Continuing the Pnar series.",
    readingTime: "2 min"
  },

  {
    id: 19,
    catalogNumber: "No. 19",
    title: "bynta 1",
    date: "July 2026",
    theme: "kyntien wym lait",
    featured: false,
    epigraph: null,
    body: `i wa sih moa u kyrmen pathar?
hei jingsniawthuh wei chong samen iong nga,
ym ye oa u iada ialade.
Ym ye oa u pynlut yei sngi oa waroh
u yimpa hei yimpho lyoh.
tang ha phi? i jingjet wa maia duh
ha waroh ki jingkwah wei jingthrang wa bha iong nga
heini kbai joor oa kat wa ye ki bor
ryngkat wei jingkmen wa thaba wa phyrnai`,
    marginNote: "The first part of a series written in Pnar.",
    readingTime: "2 min"
  },

  {
    id: 18,
    catalogNumber: "No. 18",
    title: "her, and my consistent effort to make believe",
    date: "March 2026",
    theme: "kiad-so",
    featured: false,
    epigraph: null,
    body: `i love my dawgs.
thank u, the end.`,
    marginNote: "Love as routine, not fireworks.",
    readingTime: "2 min"
  },

  {
    id: 17,
    catalogNumber: "No. 17",
    title: "props",
    date: "March 2026",
    theme: "kiad-so",
    featured: false,
    epigraph: null,
    body: `I dreamt waking up next to you,

I rubbed my eyes, twice
thrice and still doesnt feel suffice..

that warm breeze of your breath,
and the maze of your ear.

Ran my finger through your face,
trying to feel the divine structure and glaze.

I reach the lips and gently embrace
of what look like the sweetest nectar ever grace.

kiss of life.

feels surreal i can still feel the touch of your hair.`,
    marginNote: "What if I told you I loved you?",
    readingTime: "1 min"
  },

  {
    id: 16,
    catalogNumber: "No. 16",
    title: "Untitled-2",
    date: "September 2025",
    theme: "Mei Ram-ew",
    featured: false,
    epigraph: null,
    body: `That beam of light, a single source
came through like an isekai truck.
Reflected through him, diverged
into colorful, jolly combinations.
One would think it resemble life.
Too bright to be comprehended,
yet too dark to be mispronounce.
It was like Noah's subjective rainbow.
What more can we think about that flow?
So his appearance was the same.
it wasnt a complaint rather a disturbance
to this monotonous, guilty pleaded free,
well groomed, suit and a tie, 9-5 spree.
We move along. Just to prolong, of what can be born, in this unfaithful dorm, the beautiful storm of whom we might encounter.`,
    marginNote: "I think its time i found a new hobby other than smoking, any suggestions?",
    readingTime: "2 min"
  },

  {
    id: 15,
    catalogNumber: "No. 15",
    title: "Tour",
    date: "September 2025",
    theme: "tdong duma",
    featured: false,
    epigraph: {
      text: "We're all mad here.",
      attribution: "— Lewis Carroll, Alice's Adventures in Wonderland"
    },
    body: `Its like Im a mad uncle,
going left, right, up and down
through this infinite cycle.
I shall disappear before dawn
and head straight to this town
where they sell vodka flavoured popsicle.

Embarked and excitements flown,
I arrived exactly at this corner
where the streetlights flicker and moan,
and the night feels a little thinner.

I stumbled upon a man named John,
who swore the moon ladning was fake,
we argued till the dawn of break,
then cheers with strangers in the breeze.

I lost my shoes, my hat, my phone,
and somehow gained a traffic cone.
By sunrise, broke and overthrown,
I hailed a cab and called it home.`,
    marginNote: "Dedicated to my friend who is a conspiracy theorist lol.",
    readingTime: "2 min"
  },

  {
    id: 14,
    catalogNumber: "No. 14",
    title: "demise",
    date: "March 2025",
    theme: "kiad-so",
    featured: false,
    epigraph: {
      text: "The desire of the moth for the star",
      attribution: "— Percy Bysshe Shelley, One Word Is Too Often Profaned"
    },
    body: `my sweet desolate destruction,
i am a moth, mesmerised by your ignition.
Therefore the closer i get into your realm,
the deeper my insanity overwhelms.
Mine own curiosity led me to my demise.
Perchance, likely, a single glance im suffice.
lately, my desire proves futile,
the longing never fulfils this gentile;
a non believer of your love.`,
    marginNote: "I want to believe you.",
    readingTime: "1 min"
  },

  {
    id: 13,
    catalogNumber: "No. 13",
    title: "Untitled-1",
    date: "February 2025",
    theme: "tdong duma",
    featured: false,
    epigraph: null,
    body: `Who are you when no one is looking?

What remains when nobody's looking?`,
    marginNote: "Two questions, no answers.",
    readingTime: "1 min"
  },

  {
    id: 12,
    catalogNumber: "No. 12",
    title: "Fiery, Starry, January",
    date: "January 2025",
    theme: "tdong duma",
    featured: false,
    epigraph: {
      text: "We are all in the gutter, but some of us are looking at the stars.",
      attribution: "— Oscar Wilde, Lady Windermere's Fan"
    },
    body: `I sit by the fire,
ponder if my yearn seems dire.
I lit my cigarette of desires.
It burned beautifully.
Through my lungs it passed slowly.
The weather seems gloomy.
I put my life on a bet.
Burdens after burdens.
The never ending battle.
I wish I was in her garden.

Dreams;
tastes like sweet cream.

Smoked another. Just a little,
I said.
I lied.
Pondered again: why is the sky high?
i lost sight for it is too bright,
with such lights to be called night.
I shut my eyes tight
ready for marvellous heights.

Dreams;
taste like sweet cream`,
    marginNote: "Jupiter is prominently visible tonight, a dim light tho.",
    readingTime: "2 min"
  },

  {
    id: 11,
    catalogNumber: "No. 11",
    title: "Winter's Warmth",
    date: "January 2025",
    theme: "Mei Ram-ew",
    featured: false,
    epigraph: {
      text: "If Winter comes, can Spring be far behind?",
      attribution: "— Percy Bysshe Shelley, Ode to the West Wind"
    },
    body: `The contradictory weather,
in violent breeze it carries,
but all the season long for is warmth.
Winter is forever teacher.
Taught many to have a break,
taught many to hold loved one hands,
Taught many that warmth is necessary.
it is a gentle teacher behind the violent cry.`,
    marginNote: "Y'all winter's my dawg",
    readingTime: "1 min"
  },

  {
    id: 10,
    catalogNumber: "No. 10",
    title: "Absence",
    date: "January 2025",
    theme: "tdong duma",
    featured: false,
    epigraph: null,
    body: `Lost, but never wanting to be found.
Amidst the chaos, perhaps I'm bound
to wander this mysterious, unending path,
so vulnerable to fate's cold wrath.
Longing to feel the warmth of your hands,
why does it unfold as per His plans?
Lost once more, searching for purpose,
craving your voice, an insatiable surplus.
Your talks echo, profound and intense,
yet all dissolve into distant evanescence.
I strive to recall each detail intently,
but remember everything and nothing, gently.`,
    marginNote: "Remembering everything and nothing at the same time.",
    readingTime: "1 min"
  },

  {
    id: 9,
    catalogNumber: "No. 09",
    title: "Ordinary",
    date: "December 2024",
    theme: "kiad-so",
    featured: false,
    epigraph: null,
    body: `Hand quivers when I try to flow my pen these days.
Distinguish on paper, dumb in soul. But I pray,
hoping she atleast heed the sound of my chord.
It has always been mightier than the sword.
Many died by words rather than metals meant to slay.
But now everything, if nothing, is more than a mere play.`,
    marginNote: "The hand shakes, but the pen keeps moving.",
    readingTime: "1 min"
  },

  {
    id: 8,
    catalogNumber: "No. 08",
    title: "Always never there",
    date: "December 2023",
    theme: "tdong duma",
    featured: false,
    epigraph: null,
    body: `How blessed am I.

Am I a presence or just a whisper?

I was never here,

A soft shadow in the realm of now,

Yet I am always never there,

Drifting between the echoes of existence.


I was nowhere,

Lost in the quiet void of possibilities

But tell me, when all seems suspended,

Is the purest inquiry not what is,

But simply where....?`,
    marginNote: "Can you be missed and still never have been there?",
    readingTime: "1 min"
  },

  {
    id: 7,
    catalogNumber: "No. 07",
    title: "Ordinary",
    date: "August 2023",
    theme: "tdong duma",
    featured: false,
    epigraph: null,
    body: `Find joy in the commons,
Perhaps everything will color,
Be the one who summons
The light, worthy of grandeur,
As magnificent as you.

   Minute things, the blink of your eye,
   A fleeting moment, gone too.. goodness why?
   Anyways, often, we think life consists
   Of embarking on an unknown journey,
   In search of our own goal to score.
   But what if I’m not planning to score?
   What if the path is more than a chase,
   More than a race to some distant place?

What if the joy is in the wandering,
In the quiet moments, in the wondering?
Not in the triumph, not in the win,
But in the space where the journey begins.

To find joy in the commons,
To light up the ordinary,
To be as magnificent as you,
Is that not enough?
To live without the pressure of the score,
To embrace life, wanting nothing more?`,
    marginNote: "Semester's eating me alive, so I stopped.",
    readingTime: "3 min"
  },

  {
    id: 6,
    catalogNumber: "No. 06",
    title: "INTERVIEW",
    date: "August 2023",
    theme: "tdong duma",
    featured: false,
    epigraph: null,
    body: `When you act from pity, is it a debt I must repay?

When you act from love, is there any debt to begin with?

Give me truth, and I’ll wonder "Is it a lie?".

Give me comfort, and I’ll ask "What pain you hide behind?".

Hold me close: am I cherished or caged?

Let me go: am I free or simply forgotten?

If you speak, do your words shape me, or do I lose myself in them?

If you're silent, is it peace or absence that echoes?

Is kindness the weight of guilt wrapped in a softer name?

Is indifference the truest form of freedom, or the deepest wound?

Where does love end and pride begin?

Where does selflessness bloom, and when does it rot into emptiness?

Tell me... Is meaning found, or do we carve it from the void with trembling hands`,
    marginNote: "Ironic, isn't it?",
    readingTime: "3 min"
  },

  {
    id: 5,
    catalogNumber: "No. 05",
    title: "organs dysfunction",
    date: "December 2021",
    theme: "kiad-so",
    featured: false,
    epigraph: null,
    body: `This bloody organ,
continuously beating,
when he thinks of her,
for the 11,102,023rd time.

This bloody organ,
with a million neurons,
yet not once, even half,
can steer him to the right decision.

This bloody organ,
Holding a cauldron of acid,
Dubbed gluttony,
Yet still can't digest those butterflies.

This bloody organ,
Eloquent in useless talks,
master of chatter,
but muted in her presence .

This bloody organ,
inflating and deflating endlessly,
struggling for air,
upon encountering her aura.`,
    marginNote: "I'm not sure if it's organs dysfunction or not, I'm not a doctor.",
    readingTime: "2 min"
  },

  {
    id: 4,
    catalogNumber: "No. 04",
    title: "Memoirs",
    date: "December 2021",
    theme: "kiad-so",
    featured: false,
    epigraph: null,
    body: `A woman, with two jugs of ale,
came to me, per chance with a tale?
No, she said here's a beautiful pint
or would rather prefer a gin?

I stumbled and laughed
in awe of her presence.
Yet memories flooded and slapped
With a relentless embrace....

I ran off. A daily usuals. Avoiding reality.
But it resonates like a chaotic wave.
A need to face it now....what a pity.
Embrace truth's call, i shall put it to the grave.`,
    marginNote: "I ran off, and until now i still wonder what would have happened if i hadn't.",
    readingTime: "2 min"
  },

  {
    id: 3,
    catalogNumber: "No. 03",
    title: "Distant star",
    date: "September 2021",
    theme: "tdong duma",
    featured: false,
    epigraph: null,
    body: `The wind was howling,
Carried away all the meaning.
Plenty of questions,
despite impatient, stubborn, an ick,
But on contact in her dominion,
jellied away, and melted in a click.

It's not a weakness,
Rather a liability
As I watch her in awe of greatness.
Yes, she is indeed,
the higher, the epitome, of tranquility.

Always a palm reach,
but never can I breach.
How long is the wait?
Time and space is all but a bait,
to this uncalculated mystery.`,
    marginNote: "Some people feel close enough to touch and still completely out of reach.",
    readingTime: "2 min"
  },

  {
    id: 2,
    catalogNumber: "No. 02",
    title: "UNIVERSE",
    date: "January 2021",
    theme: "kiad-so",
    featured: false,
    epigraph: {
      text: "The Love which moves the sun and the other stars.",
      attribution: "— Dante, Paradiso"
    },
    body: `A million stars glittering across
yet u shine the brightest.
Comparing u with the moon,
is a load of understatement.
The milky way envy the beauty of your eyes.
Black holes is a peck compared to the force
I'm being pulled by you.
I wish,
the earth would make haste rotating,
For i am
positively looking forward to the next day
when I can see you again`,
    marginNote: "Written in 2021, less do we know about Covid.",
    readingTime: "2 min"
  },

  {
    id: 1,
    catalogNumber: "No. 01",
    title: "Yin & Yang",
    date: "August 2020",
    theme: "Mei Ram-ew",
    featured: false,
    epigraph: null,
    body: `*thunderstorm noise*

The savior (whose?), so disastrous,
you left us with nowhere to wonder.
So often, I find this gracious.
To be left with just a pen and note under.

The noise you make,
Us unruffled, but tremble the small.
Perhaps too much to take
For they still yearn, in thrall.

You grace the floral,
Almost like a replenishing beat.
They will forever be loyal
To be graced by your kind deeds indeed.

The globe is blessed;
Your presence is magical.
You may be violent
But you are inevitably essential.`,
    marginNote: "Written in the spring of 2020, after my classes were cancelled.",
    readingTime: "2 min"
  },
];

// Export for use in app.js
// (If using ES modules, replace with: export default POEMS;)