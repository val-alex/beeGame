(function(global) {
'use strict';

let model = {
  beesArray : [
    {
      'id' : 1,
      'name' : 'Queen Bee',
      'type' : 'queen',
      'health' : 100
    },
    {
      'id' : 2,
      'name' : 'Queen Bee',
      'type' : 'queen',
      'health' : 100
    },
    {
      'id' : 3,
      'name' : 'Queen Bee',
      'type' : 'queen',
      'health' : 100
    },
    {
      'id' : 4,
      'name' : 'Worker Bee',
      'type' : 'worker',
      'health' : 75
    },
    {
      'id' : 5,
      'name' : 'Worker Bee',
      'type' : 'worker',
      'health' : 75
    },
    {
      'id' : 6,
      'name' : 'Worker Bee',
      'type' : 'worker',
      'health' : 75
    },
    {
      'id' : 7,
      'name' : 'Worker Bee',
      'type' : 'worker',
      'health' : 75
    },
    {
      'id' : 8,
      'name' : 'Worker Bee',
      'type' : 'worker',
      'health' : 75
    },
    {
      'id' : 9,
      'name' : 'Drone Bees',
      'type' : 'drone',
      'health' : 50
    },
    {
      'id' : 10,
      'name' : 'Drone Bees',
      'type' : 'drone',
      'health' : 50
    },
    {
      'id' : 11,
      'name' : 'Drone Bees',
      'type' : 'drone',
      'health' : 50
    },
    {
      'id' : 12,
      'name' : 'Drone Bees',
      'type' : 'drone',
      'health' : 50
    },
    {
      'id' : 13,
      'name' : 'Drone Bees',
      'type' : 'drone',
      'health' : 50
    },
    {
      'id' : 14,
      'name' : 'Drone Bees',
      'type' : 'drone',
      'health' : 50
    },
    {
      'id' : 15,
      'name' : 'Drone Bees',
      'type' : 'drone',
      'health' : 50
    }
  ],

  hitPoint : {
    queen: 7,
    worker: 12,
    drone: 18
  },

  staticHealthPoints : {
    queen: 100,
    worker: 75,
    drone: 50
  },

  deadBees: [

  ]
};


let controller = {
  getBees: function() {
    return model.beesArray; 
  },

  getStaticHealth: function(type) {
    return model.staticHealthPoints[type];
  },

  hitValue: function(type){
    return model.hitPoint[type];
  },

  hit: function(index) {
    let health = model.beesArray[index].health;
    if (health > 0) {
      model.beesArray[index].health -= model.hitPoint[model.beesArray[index].type];
    }
    if (model.beesArray[index].health <= 0) {
      model.deadBees.push(index);
    } 
  },

  getDeadBees: function() {
    return model.deadBees;
  },

  allQueenDead: function() {
    return model.beesArray.filter( (bee) => bee.type == 'queen' && bee.health > 0).length == 0;
  },

  getBee: function(index) {
    return model.beesArray[index];
  },

  clearDeadBees: function() {
    return model.deadBees = [];
  },

  resetBees: function(i) {
    if (model.beesArray[i].type == 'queen') {
      model.beesArray[i].health = 100;
    }
    if (model.beesArray[i].type == 'worker') {
      model.beesArray[i].health = 75;
    }
    if (model.beesArray[i].type == 'drone') {
      model.beesArray[i].health = 50;
    }
  },

  init: function() {
    view.init();
  }
};


let view = {
  init: function() {
    this.bees = controller.getBees();
    this.mainDiv = document.getElementById('bees');
    this.messageDiv = document.getElementById('message');

    let button = document.getElementById('hitButton');
    let resetButton = document.getElementById('resetButton');

    let randomNumber = (min,max) => {
      return Math.floor(Math.random()*(max-min+1)+min);
    };

    let hitFunction = function(){
      let beeIndex = randomNumber(0, 14);
      while (controller.getDeadBees().filter(bee => bee === beeIndex).length > 0 && controller.getDeadBees().length != 15) {
        beeIndex = randomNumber(0, 14);
      } 
      controller.hit(beeIndex);
      view.renderBees();
      view.renderMessage(beeIndex);
    }

    let resetFunction = function() {
      let beesArr = controller.getBees();
      // loop thought beesArray, form controller and model
      // assign health according to type
      // clear dead bees

      for (let i=0; i<beesArr.length; i++) {
        controller.resetBees(i);
      }
      
      controller.clearDeadBees();
      view.renderBees();
      view.resetMessage();
    }

    button.addEventListener('click', hitFunction);
    resetButton.addEventListener('click', resetFunction);
    view.renderBees();
  },

  resetMessage: function() {
    this.messageDiv.innerHTML = "press hit to start the game";
  },

  renderMessage: function(beeIndex) {
    let queensDead = controller.allQueenDead();
    let selectedBee = controller.getBee(beeIndex);
    let hitPoint = controller.hitValue(selectedBee.type);
    if (queensDead) {
      this.messageDiv.innerHTML = "All queen bees have died";
      return;
    }
    this.messageDiv.innerHTML = selectedBee.type + " bee with id of " + selectedBee.id + " was hit, " + hitPoint + " points was deducted from bees health";
  },

  renderBees: function() {
    this.mainDiv.innerHTML = '';
    let bees = this.bees;
    for(let i=0; i<bees.length; i++) {
      let status = bees[i].health <= 0 ? 'dead' : 'alive';
      let width = (bees[i].health / controller.getStaticHealth(bees[i].type)) * 100;

      if (width < 0) {
        width = 0;
      }

      this.mainDiv.innerHTML += `<div class='beeDiv' id='bee${bees[i].id}'>
        <div class='beeName'>${bees[i].type} (${status + " id:" + bees[i].id})</div>
        <div>
          <div class="healthBar">
            <div class="bar green" style="width: ${width}%">${parseInt(width)}%</div>
            <div class="bar red" style="width: ${100 - width}%">${width != 100 ? '&nbsp;' : '' }</div>
          </div>
          <div class="label">&nbsp;${bees[i].health > 0 ? bees[i].health : 0}/${controller.getStaticHealth(bees[i].type)}</div>
        </div>
        <div class="clear"></div>
      </div>`;
    }
  }
};

controller.init();

}(this));