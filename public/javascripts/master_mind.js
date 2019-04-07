// MASTER MIND GAME
// La seguente  è la soluzione al test inviatomi tramite l'utilizzo di solo JavaScript e jQuery per la manipolazione del DOM
// Nella mia soluzione ho adottato alcune funzionalità dello standard ES6, in particolare le keyword let e const e le cosiddette "arrow function"
// Ho deciso di creare diverse funzioni da implementare in seguito nella scrittura del gioco, al fine di migliore la leggibilità del codice ed evitare la ripetizioni di codici.

// DICHIARAZIONE DELLE FUNZIONI =========================================================================
// Genera una combinazione di tre numeri casuali da 1 a 9 incluso, ritornando un vettore coi tre numeri
const codeGenerator = (numsOfDigits) => {
  let code = []; // Creo un vettore vuoto dove inserire i tre numeri
  for(let i = 0; i < numsOfDigits; i++){ // Tramite un for loop inserisco i tre numeri nel vettore
    code.push(Math.floor(Math.random() * (9 - 0) + 1)); // Genera numeri casuali da 1 a 9
  }
  return code; // Ritorna il vettore coi tre numeri all'interno
};

// Controlla se i tre numeri proposti dall'utente combaciano con quelli generati automaticamente
// La funzione accetta due parametri: i numeri dell'user e quelli generati dal programma
const checkResult = (playerGuess, solution, numsOfDigits) => {
  for(let i = 0; i < numsOfDigits; i++){ // tramite un loop controllo ogni numbero della serie
    if(playerGuess[i] !== solution[i]){ //se anche un solo numero è diverso la funzione ritorna falso
      return false;
    }
  }
  // altrimenti se tutti i numeri sono corretti la funzione ritornerà vero
  return true;
};

// Controlla quanti numeri il giocatore ha indovinato e se questi erano nella posizione giusta (aka. "Numero giusto posizione giusta")
// La funzione accetta due parametri: i numeri dell'user e quelli generati dal programma
const numsAndPosition = (playerGuess, solution, numsOfDigits) => {
  let numsCount = 0; // Crea un contatore
  for(let i = 0; i < numsOfDigits; i++){ // Tramite for loop accedo ad ogni numero nella serie
    if(playerGuess[i] === solution[i]){ // Se l' i-esimo numero della serie del giocatore combacia con quella del computer
      numsCount++; // Allora incrementa il contatore
    }
  }
  return numsCount; // Ritorna il numero del contatore
};

// Controlla quanti numeri il giocatore ha indovinato e se questi erano nella posizione sbagliata (aka. "Numero giusto posizione sbagliata")
// La funzione accetta due parametri: i numeri dell'user e quelli generati dal programma
const wrongPosition = (playerGuess, solution, numsOfDigits) => {
  let numsCount = 0;
  //Controlla quanti numeri sono nella posizione giusta
  let rightPlaceCount = numsAndPosition(playerGuess, solution, numsOfDigits);
  //Controlla quanti numeri il giocatore ha indovinato (independetemente dalla posizione);
  let rightNumsCount = 0;
  for(let i = 0; i < numsOfDigits; i++){
    for(let j = 0; j < numsOfDigits; j++){
      if(playerGuess[i] === solution[j]){
        rightNumsCount++;
      }
    }
  }
  // I numeri giusti/posizione sbagliata saranno dati dalla differenza fra i numeri indovinati in totale meno i numeri indovinati nella giusta posizione
  return numsCount = rightNumsCount - rightPlaceCount;
};

// 5) Prendere e controllare l'input del giocatore
const getInput = (numsOfDigits) => {
  // Utilizzo un while loop per ottenere l'input del giocatore e verificare che sia corretto
  // Prova ad ottenere l'input dal giocatore
  let userGuess = $('#userCode').val();
  // Se il giocatore inserisce un numero più piccolo o più grande di tre numeri il loop ricomincia
  if(userGuess.length !== numsOfDigits){
    alert('Errore! Devi inserire ' + numsOfDigits + ' numeri!'); //E un errore viene mostrato
    return false;
  }
  // Se il giocatore non inserisce dei numeri il loop ricomincia
  if(isNaN(userGuess)){
    alert('Errore! Puoi inserire solo numeri!'); //E un altro errore viene mostrato
    return false;
  }
  userGuess = userGuess.split(''); // Divido il numero (che viene inizialmente passato come una "string") all'interno di un vettore
  let userSolution = []; // Dichiaro un vettore vuoto per poterci inserire i numeri all'interno
  userGuess.forEach(function(guess){  //tramite un forEach spingo ogni singolo numero all'interno del vettore vuoto
    userSolution.push(Number(guess)); //trasformando ciascuna stringa in numero
  });
  return userSolution; //E la funzione ritorna la proposta del giocatore sotto forma di vettore
}

// Funzione di setup che viene invocata ogni volta che il giocatore clicca il pulsante per giocare
const gameSetup = () => {
  // Il div che contiene le funzionalità del gioco viene mostrato
  $('#gameFace').css('display', 'block');
  // La funzione genere il codice casuale di tre cifre
  computerChoice = codeGenerator(numsOfDigits);
  // Ogni possibile messaggio o gruppo di input relativi alla partita precedente viene eliminato
  successMessage.css("display", "none");
  errorMessage.css("display", "none");
  $('.btn-group').css('display', 'none');
  // L'input viene mostrato e il giocatore può inserire la sua soluzione
  $('.gameInput').css('display', 'flex');
}

// INIZIO DEL GIOCO ============================================================
// Variabili dichiarate esternamente per avere uno "scope" globale
let computerChoice;
let errorMessage = $('.errorMessage');
let successMessage = $('.successMessage');
let numsOfDigits;

$('#easy').click( () => {
  numsOfDigits = 3;
  gameSetup();
});

$('#hard').click( () => {
  numsOfDigits = 6;
  gameSetup();
});

// Un funzione inizia se il giocatore invia un input
$('#gameButton').click( () => {
  // La funzione prende in input il codice del giocatore e ne verifica la correttezza
  let userChoice = getInput(numsOfDigits);
  // Se c'è un errore nell'input un alert viene mostrato e la funzione si arresta qui
  if(userChoice === false)
    return;
  // Altrimenti la scelta del giocatore viene comparata con il codice del programma
  let result = checkResult(userChoice, computerChoice, numsOfDigits);

  // Se il giocatore indovina
  if(result){
    $('.displaySolution').css('color', 'green');
    $('.displaySolution').text('Grande!! Hai indovinato il codice segreto!!');
    // L'interfaccia del gioco viene nascosta e il giocatore dovrà ricliccare il pulsante play per rigiocare e ricominciare tutto il processo
    $('#gameFace').css('display', 'none');
  } else {
    //Altrimenti se non indovina un messaggio di errore viene mostrato e gli viene chiesto se vuole riprovare
    successMessage.css("display", "none");
    errorMessage.text('Mi dispiace non hai indovinato il mio codice segreto!!\nVuoi provare di nuovo?');
    errorMessage.css("display", "block");
    // I pulsanti vengono mostrati
    $('.btn-group').css('display', 'block');
    // L'input viene nascosto
    $('.gameInput').css('display', 'none');

    // Un evento viene legato alla risposta positiva
    $('.btn-success').click(() => {
      // I numeri e le posizioni corrette vengono valutate tramite le due funzioni
      let rightPlaceNums = numsAndPosition(userChoice, computerChoice, numsOfDigits);
      let wrongPlaceNums = wrongPosition(userChoice, computerChoice, numsOfDigits);
      // Ogni possibile messaggio precedente viene nascosto
      errorMessage.css("display", "none");
      // E al giocatore vengono forniti i due indizi
      successMessage.text('Ti concedo due indizi: Il numero di cife che hai indovinato e che erano nella posizione giusta e\': ' + rightPlaceNums + '; Il numero di cifre che hai indovinato e che erano nella posizione sbagliata e\': ' + wrongPlaceNums);
      successMessage.css("display", "block");
      // I pulsanti vengono nascosti
      $('.btn-group').css('display', 'none');
      // L'input viene mostrato di nuovo così il giocatore può riprovare
      $('.gameInput').css('display', 'flex');
    });
    // Un evento viene legato alla risposta negativa
    $('.btn-danger').click(() => {
      // L'interfaccia del gioco viene nascosta
      // E il giocatore dovrà ricliccare il pulsante play per rigiocare e ricominciare tutto il processo
      $('#gameFace').css('display', 'none');
      //Il codice segreto viene mostrato nella pagina iniziale
      $('.displaySolution').css('color', 'red');
      $('.displaySolution').text(`Hai perso!! Il codice segreto era ${computerChoice}`);
    });
  };
});
