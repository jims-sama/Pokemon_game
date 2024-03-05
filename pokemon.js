// Trainer class
class Trainer {
    constructor(name, age, hometown) {
        this.name = name;
        this.age = age;
        this.hometown = hometown;
        this.pokemonParty = [];
    }

    addPokemon(pokemon) {
        if (this.pokemonParty.length < 6) {
            this.pokemonParty.push(pokemon);
            console.log(`${pokemon.name} joined ${this.name}'s party!`);
        } else {
            console.log("Your party is full! You cannot add more Pokémon.");
        }
    }

    displayParty() {
        console.log("\nTrainer's Pokémon Party:");
        this.pokemonParty.forEach((pokemon, index) => {
            console.log(`${index + 1}. ${pokemon.name} - Level ${pokemon.level} - Health ${pokemon.health}/${pokemon.maxHealth}`);
        });
    }
}

// Pokemon class
class Pokemon {
    constructor(name, type, level, health, power) {
        this.name = name;
        this.type = type;
        this.level = level;
        this.health = health;
        this.maxHealth = health;
        this.power = power;
        this.fainted = false;
    }

    attack(target) {
        console.log(`${this.name} attacks ${target.name}!`);
        const damage = Math.floor(Math.random() * this.power) + 1;
        console.log(`${target.name} receives ${damage} damage!`);
        target.health -= damage;
        if (target.health <= 0) {
            target.health = 0;
            target.fainted = true;
            console.log(`${target.name} fainted!`);
        }
    }
}

// Function to start the battle
function startBattle(trainer, wildPokemon) {
    console.log(`A wild ${wildPokemon.name} appeared!`);

    trainer.displayParty();

   
    let index = prompt("Choose a Pokémon to send out (enter index): ");
    let playerIndex = parseInt(index) - 1;
    const playerPokemon = trainer.pokemonParty[playerIndex];

    console.log(`Trainer ${trainer.name} sends out ${playerPokemon.name}!`);

    battleRound(playerPokemon, wildPokemon, trainer);
}

// Function for each round of battle
function battleRound(playerPokemon, wildPokemon, trainer) {
    console.log(`\n${playerPokemon.name}'s health: ${playerPokemon.health}/${playerPokemon.maxHealth}`);
    console.log(`Wild ${wildPokemon.name}'s health: ${wildPokemon.health}/${wildPokemon.maxHealth}`);

    
    let action = prompt("Choose your action (1. Attack, 2. Switch Pokémon, 3. Maybe next time): ");
    if (action === '1') {
        playerPokemon.attack(wildPokemon);
        if (wildPokemon.health > 0) {
            wildPokemon.attack(playerPokemon);
        }
    } else if (action === '2') {
        console.log("You cannot switch Pokémon in this version of the game.");
    } else if (action === '3') {
        console.log("Maybe next time!");
        return;
    } else {
        console.log("Invalid action. Please choose again.");
    }

    // Check for battle end conditions
    if (playerPokemon.health > 0 && wildPokemon.health > 0) {
        battleRound(playerPokemon, wildPokemon, trainer);
    } else {
        if (playerPokemon.health <= 0) {
            console.log(`Your ${playerPokemon.name} fainted. You lose!`);
        } else {
            console.log(`You defeated the wild ${wildPokemon.name}. You win!`);
        }
    }
}

// Creating a trainer
const ash = new Trainer("Ash", 10, "Pallet Town");

// Adding Pokémon to the trainer's party
const pikachu = new Pokemon("Pikachu", "Electric", 5, 50, 15);
const charmander = new Pokemon("Charmander", "Fire", 5, 50, 10);
ash.addPokemon(pikachu);
ash.addPokemon(charmander);

// Creating a wild Pokémon
const wildPokemon = new Pokemon("Rattata", "Normal", 3, 30, 5);

// Starting the battle
startBattle(ash, wildPokemon);
