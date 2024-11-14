
const leoProfanity = require('leo-profanity');

// Cargar el diccionario de malas palabras en inglés al iniciar el módulo
leoProfanity.loadDictionary();

// Arreglo de malas palabras en español
const spanishBadWords = [
    "pendejo", "cabron", "chinga", "chingar", "chingado", "coño", "mierda", "cabrón",
    "puto", "puta", "putear", "joder", "jodido", "culero", "chingada", "huevón", "pendeja",
    "marica", "maricón", "perra", "perro", "zorra", "zorro", "verga", "coger", "gilipollas", 
    "imbécil", "estúpido", "idiota", "tonto", "tonta", "mierdoso", "pajero", "malparido",
    "bastardo", "carajo", "pinga", "maldito", "hostia", "cojones", "puta madre",
    "culiao", "forro", "cagón", "chupapijas", "tragasables", "retardado", "mongólico",
    "culera", "culero", "gil", "pelotudo", "boludo", "maldito", "gilipollas", "malnacido", 
    "culiado", "hijo de puta", "sudaca", "maricona", "cabrona", "chingona", "ojete",
    "mamada", "pinche", "chingadera", "chingón", "pichar", "culear", "pirobo", 
    "gonorrea", "mamon", "chingatumadre", "culiao", "pelotudazo", "boludazo", "pendejo"
    // Agrega aquí más palabras según sea necesario
];

// Función para verificar malas palabras en inglés y español
function containsProfanity(text) {
    // Normalización del texto
    const normalizedText = text.toLowerCase().replace(/\s+/g, '');

    // Expresiones regulares para encontrar variaciones de malas palabras
    const badWordsRegex = new RegExp(spanishBadWords.join('|'), 'i');
    
    // Verificar si el texto contiene malas palabras en inglés
    const containsEnglishProfanity = leoProfanity.check(text);

    // Verificar si el texto contiene malas palabras en español
    const containsSpanishProfanity = badWordsRegex.test(normalizedText);

    // Retornar verdadero si se encuentra alguna mala palabra en inglés o en español
    return containsEnglishProfanity || containsSpanishProfanity;
}

module.exports = containsProfanity;
