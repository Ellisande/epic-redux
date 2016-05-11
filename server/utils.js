import _ from 'lodash';
var allNames = [
  'Mayor McCheese', 'Hamburgler', 'Strawberry Shortcake', 'Xena, Warrior Princess', 'Kruul the Warrior King', 'Hippie', 'Mr. Drippy',
  'Master Shake', 'Grimmace', 'Sailor Moon', 'Blue', 'A Fish Called Wonda', 'Mr. Pink', 'Marsellus Wallus', 'Tony Stark', 'Justin Beiber',
  'Bubble Puppy', 'Dora the Explorer', 'Spongebob Squarepants', 'Moonpie', 'Smores', 'Onyx', 'Uncle Bob', 'Godzilla',
  'McLovin', 'Sparky, the Fire Breathing Chameleon', 'The Tin Man', 'Magic Mike', 'Squared', 'MD', 'Darth Helemet', 'President Scroob',
  'Glass Popcorn', 'Kobe', 'Pierre the Pelican', 'The Dunstan', 'Secret Squirrel', 'Luigi', 'Yoda', 'Jar Jar Binks',
  'Nemo', 'Dory', 'Toothless', 'Hiccup', 'Professor X', 'Dark Phoenix', 'Not a Bug', 'A Feature', 'Troll', 'Vincent Vega',
  'Yardbird', 'Velvet Fog', 'Tom Servo', 'Blast ThickNeck', 'Uncle Enzo', 'Neuruomancer', 'Empress Zawditu', 'Quatro Quatro', 'X-Wing',
  'Steve the Pirate', 'Cotton McKnight', 'White Goodman', 'Professor Farnsworth', 'Princess Bubblegum', 'Finn the Human', 'Bender',
  'Captain Napalm', 'Jarvis', 'Dastardly', 'Space Ghost', 'To Wong Foo', 'Mothra', 'Hank Scorpio', 'Belgarath', 'Eriond', 'Lord Macintosh',
  'Cindy Lou Who', 'The Dread Pirate Roberts', 'Falcore', 'Atreyu', 'The Childlike Empress', 'Mogwai', 'Data', 'Liberty Belle',
  'Peter Venkman', 'Buck Rogers', 'Bliss', 'Mistress Quickly', 'Pacman', 'Ness', 'Pepper Pots', 'Merkin Muffly', 'Foghorn Leghorn',
  'Wile E. Coyote', 'Mugato', 'Hansel', 'Derek Zoolander', 'Count Chocula', 'Buffolo Bill', 'Disco Stu', 'Sideshow Bob'
];

const determineName = (assignedNames, defaultName) => {
  const remainingNames = _.difference(allNames, assignedNames);
  if (remainingNames.length === 0) {
    return defaultName;
  }
  const randomName = Math.floor(Math.random() * remainingNames.length);
  return remainingNames[randomName];
};

module.exports = determineName;
