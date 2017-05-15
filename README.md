Shelter Developer Test

Bee Slap Game

Intro

This test must be written in JavaScript, and work in a browser. You should provide a link to a git repository containing all of your working code (and reference to any dependencies along with a task runner (e.g. Grunt or Gulp).

You may use any other technologies for display purposes but the base code must be in JavaScript.

Initial Rules

You have 15 bees.

3 of these bees are Queen bees, 5 are Worker bees and 7 are Drone bees.

Queen Bees:

  Each Queen bee starts with 100 health
  When they are hit, 7 health is deducted
  A bee dies when it has 0 or fewer health remaining
  When all the queens are dead, all other bees left (workers, drones) automatically die.

Worker Bees:

  Each worker Bee initially has 75 health
  When they are hit 12 health are deducted

Drone Bees:

  Each Drone Bee initially has 50 health
  When they are hit 18 health are deducted

Actions

Selecting “hit” should randomly pick a bee and “hit it”, deducting the hit value from their current amount of health, following the rules above for each type of bee.

When a bee has run out of health, it should no longer be available to pick when the user presses/selects hit (i.e. that bee is dead).

When the last queen dies – all remaining bees should die.

Display

Each time “hit” has been pressed you must display in the browser each individual bee with their details (queen, worker etc), how much health it has, whether they are alive or dead, and the result of the hit status (i.e. what bee was hit and how many health were deducted from it).

You should be able to reset the bees at any time to start again.