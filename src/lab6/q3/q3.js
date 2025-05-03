// Constructor function for Animal
function Animal(name, speed) {
    this.name = name;
    this.speed = speed;
  }
  
  // Instance method on Animal prototype
  Animal.prototype.run = function(speed) {
    this.speed += speed;
    console.log(`${this.name} is running. Speed is now ${this.speed}`);
  };

  // Static method on Animal constructor
  Animal.compareBySpeed = function(a1, a2) {
    if (!(a1 instanceof Animal) || !(a2 instanceof Animal)) {
      throw new Error("Both arguments must be instances of Animal");
    }
    if (a1.speed > a2.speed) return 1;
    if (a1.speed < a2.speed) return -1;
    return 0;
  };

  // Constructor function for Rabbit
  function Rabbit(name, speed) {
    Animal.call(this, name, speed); // Inherit properties
  }
  
  // Inherit from Animal
  Rabbit.prototype = Object.create(Animal.prototype);
  Rabbit.prototype.constructor = Rabbit;
  
  // Method specific to Rabbit
  Rabbit.prototype.hide = function() {
    console.log(`${this.name} hides`);
  };
  
  // --- Test Code ---
  const rabbit1 = new Rabbit("Bunny", 15);
  const rabbit2 = new Rabbit("Fluffy", 20);
  
  rabbit1.run(5);   // Bunny is running. Speed is now 20
  rabbit1.hide();  // Bunny hides
  
  // Compare speeds
  const result = Animal.compareBySpeed(rabbit1, rabbit2);
  console.log("Compare result:", result); // -1, 0, or 1 depending on speed
  