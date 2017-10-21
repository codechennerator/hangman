var animals = [ 
                "Aardvark", "Albatross","Alligator","Alpaca","Ant",
                "Anteater", "Antelope", "Ape", "Armadillo", "Donkey",
                "Baboon","Badger","Barracuda","Bat","Bear",
                "Beaver","Bee","Bison","Boar","Buffalo",
                "Butterfly","Camel","Capybara","Caribou","Cassowary",
                "Cat","Caterpillar","Cattle","Chamois","Cheetah",
                "Chicken","Chimpanzee","Chinchilla","Chough","Clam",
                "Cobra","Cockroach","Cod","Cormorant","Coyote",
                "Crab","Crane","Crocodile","Crow","Curlew",
                "Deer","Dinosaur","Dog","Dogfish","Dolphin",
                "Dotterel","Dove","Dragonfly","Duck","Dugong",
                "Dunlin","Eagle","Echidna","Eel","Eland",
                "Elephant","Elk","Emu","Falcon","Ferret",
                "Finch","Fish","Flamingo","Fly","Fox",
                "Frog","Gaur","Gazelle","Gerbil","Giraffe",
                "Gnat","Gnu","Goat","Goldfinch","Goldfish",
                "Goose","Gorilla","Goshawk","Grasshopper","Grouse",
                "Guanaco","Gull","Hamster","Hare","Hawk",
                "Hedgehog","Heron","Herring","Hippopotamus","Hornet",
                "Horse","Human","Hummingbird","Hyena","Ibex",
                "Ibis","Jackal","Jaguar","Jay","Jellyfish",
                "Kangaroo","Kingfisher","Koala","Kookabura","Kouprey",
                "Kudu","Lapwing","Lark","Lemur","Leopard",
                "Lion","Llama","Lobster","Locust","Loris",
                "Louse","Lyrebird","Magpie","Mallard","Manatee",
                "Mandrill","Mantis","Marten","Meerkat","Mink",
                "Mole","Mongoose","Monkey","Moose","Mosquito",
                "Mouse","Mule","Narwhal","Newt","Nightingale",
                "Octopus","Okapi","Opossum","Oryx","Ostrich",
                "Otter","Owl","Oyster","Panther","Parrot",
                "Partridge","Peafowl","Pelican","Penguin","Pheasant",
                "Pig","Pigeon","Pony","Porcupine","Porpoise",
                "Quail","Quelea","Quetzal","Rabbit","Raccoon",
                "Rail","Ram","Rat","Raven","Red deer",
                "Red panda","Reindeer","Rhinoceros","Rook","Salamander",
                "Salmon","Sand Dollar","Sandpiper","Sardine","Scorpion",
                "Seahorse","Seal","Shark","Sheep","Shrew",
                "Skunk","Snail","Snake","Sparrow","Spider",
                "Spoonbill","Squid","Squirrel","Starling","Stingray",
                "Stinkbug","Stork","Swallow","Swan","Tapir",
                "Tarsier","Termite","Tiger","Toad","Trout",
                "Turkey","Turtle","Viper","Vulture","Wallaby",
                "Walrus","Wasp","Weasel","Whale","Wildcat",
                "Wolf","Wolverine","Wombat","Woodcock","Woodpecker",
                "Worm","Wren","Yak","Zebra"
            ];

var gameState = {
        // playing: true,
        secretWord: "",
        guessesLeft: 10,
        wordStatus: "",
        guessedLetters: []
};
var playerScore = {
        wins: 0,
        losses: 0
};

function pickWord(){
    var str = animals[Math.floor(Math.random()*animals.length)];
    gameState.secretWord = str.toLowerCase();
    console.log("chose a word: " + gameState.secretWord);
}

function resetWordStatus(){ //empties word status string and fills it with '_' according to the secretWord's length.
    gameState.wordStatus = "";
    for(let i = 0; i<gameState.secretWord.length; i++){
        gameState.wordStatus += '_'
    }
}


function initializeGame(){
    pickWord();
    resetWordStatus();
    gameState.guessesLeft = 10;
    gameState.guessedLetters = [];
    displayGame();
    //Play a soundtrack
    var audio = new Audio('assets/sound/westernWhistle.mp3');
    audio.play();
}

function checkLetter(letter){
    var theWord = gameState.secretWord;
    
    // First push the letter into guessed letters
    if (gameState.guessedLetters.indexOf(letter)== -1){ // checks that the letter is not included yet.
        gameState.guessedLetters.push(letter);
    }else{ //if the letter is included, we break out of the function. 
        document.getElementById("console").innerHTML= "You've already guessed that letter! Try again.";
        return;
    }

   if (theWord.indexOf(letter)!= -1){//If we detect a letter matches somewhere, update the wordStatus
        for (let i = 0; i<theWord.length; i++){
            if (letter == theWord.charAt(i)){
                if(i > 0){ 
                    gameState.wordStatus = gameState.wordStatus.substring(0,i) + letter + gameState.wordStatus.substring(i+1);
                }
                if(i==0){
                    gameState.wordStatus = letter + gameState.wordStatus.substring(1);
                }
            }  
        }
    }else{ //If letters don't match, we subtract a guess.
        gameState.guessesLeft--;
        if (gameState.guessesLeft == 1){ //If remaining guesses is 1, play some audio.
            let audio = new Audio('assets/sound/undertakerPlease.ogg');
            audio.play();
        }
    }
    
}

function checkGameCompletion(){

    if (gameState.wordStatus == gameState.secretWord || gameState.guessesLeft == 0){
        if (gameState.wordStatus == gameState.secretWord){ //if the player wins....
            playerScore.wins ++;
            //The following if statements are audios is for audios. 
            if(gameState.guessesLeft == 1){
                let audio = new Audio('assets/sound/aintMyTime.mp3');
                audio.play();
            }else if (playerScore.wins % 3 == 0 && playerScore.wins != 0){
                let audio = new Audio('assets/sound/onFire.mp3');
                audio.play();
            }
            
            document.getElementById('console').innerHTML = "You've survived!";
            
        }else if (gameState.guessesLeft == 0){ //if the player runs out of guesses...
            playerScore.losses ++;
            document.getElementById('console').innerHTML = "You've been hanged! The word was " + gameState.secretWord + ".";
            
            //plays audio if loss.
            if (playerScore.losses%3 == 0 && playerScore.losses != 0){
                let audio = new Audio('assets/sound/dontLikeLosin.mp3');
                audio.play();
            }
            
           
        }
        initializeGame();
    }
}

function displayGame(){
    //Left Column
    
    var hangNumber = "assets/img/hangman" + gameState.guessesLeft + ".png";
    document.getElementById("myHangman").setAttribute("src", hangNumber);
    
    var statusReadability = "";
    for (let i = 0; i< gameState.wordStatus.length; i++){
        if (i != gameState.wordStatus.length){
            statusReadability += gameState.wordStatus.charAt(i) + " ";
        }
    }
    document.getElementById("showWord").innerHTML = statusReadability;



    //Right Column
    var html =  "<p>Your Guesses so Far: " + gameState.guessedLetters + "</p>"+
                "<p>Guesses Left: " + gameState.guessesLeft + "</p>" +  
                "<p>Wins: " + playerScore.wins + "</p>" + 
                "<p>Losses: " + playerScore.losses  + "</p>" ;

    document.getElementById("right-column").innerHTML = html;

}


initializeGame();


document.onkeyup = function(event){
    document.getElementById("console").innerHTML = "";
    var currentGuess = event.key;
    if (currentGuess >= 'a' && currentGuess <= 'z' ){ //only allows alphabet keys!
        checkLetter(currentGuess);
        displayGame();
        checkGameCompletion();
    }    
}
