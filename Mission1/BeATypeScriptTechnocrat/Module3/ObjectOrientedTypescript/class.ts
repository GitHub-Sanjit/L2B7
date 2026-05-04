//* OOP -> class -> Object

// class Animal {
//   name: string;
//   species: string;
//   sound: string;

//   constructor(name: string, species: string, sound: string) {
//     this.name = name;
//     this.species = species;
//     this.sound = sound;
//   }

//   makeSound() {
//     console.log(`${this.name} is making sound ${this.sound}`);
//   }
// }

// Parameter Properties......

class Animal {
  //   public name: string;
  //   public species: string;
  //   public sound: string;

  constructor(
    public name: string,
    public species: string,
    public sound: string,
  ) {
    // this.name = name;
    // this.species = species;
    // this.sound = sound;
  }

  makeSound() {
    console.log(`${this.name} is making sound ${this.sound}`);
  }
}

const dog = new Animal("Max", "dog", "Bark");
const cat = new Animal("Alen", "Cat", "Meowing");

// console.log(dog.name);
// console.log(dog.species);
// console.log(dog.sound);

// console.log(cat.name);
// console.log(cat.species);
// console.log(cat.sound);

// console.log(cat.makeSound());
cat.makeSound();
