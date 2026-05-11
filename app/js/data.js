/* All exercise data for the B2i app */
const THEMES = [
  {
    id: 'composants',
    icon: '🖥️',
    name: 'Composants du PC',
    color: '#4361ee',
    desc: 'Matériel, périphériques et interfaces',
    exercises: [
      {
        id: 'composants-quiz',
        type: 'quiz',
        icon: '❓',
        title: 'Quiz : Composants et périphériques',
        data: {
          questions: [
            {
              q: 'Quel composant est le "cerveau" de l\'ordinateur, chargé d\'effectuer les calculs ?',
              answers: ['Le processeur (CPU)', 'La RAM', 'Le disque dur', 'La carte graphique'],
              correct: 0,
              explanation: 'Le processeur (CPU) exécute les instructions des programmes. C\'est lui qui réalise tous les calculs.'
            },
            {
              q: 'Que signifie l\'abréviation IPM ?',
              answers: ['Interface Personne-Machine', 'Internet Pour Mobiles', 'Icônes et Pixels Multimédias', 'Instruction Programme Mémoire'],
              correct: 0,
              explanation: 'IPM signifie Interface Personne-Machine : ce sont tous les outils qui permettent à un humain de communiquer avec un ordinateur (clavier, souris, écran tactile...).'
            },
            {
              q: 'Parmi ces appareils, lequel est un périphérique d\'ENTRÉE ?',
              answers: ['Le microphone', 'L\'imprimante', 'Les haut-parleurs', 'L\'écran'],
              correct: 0,
              explanation: 'Le microphone capte le son et l\'envoie à l\'ordinateur : c\'est bien un périphérique d\'entrée. L\'imprimante, les haut-parleurs et l\'écran sont des périphériques de sortie.'
            },
            {
              q: 'Quel est le rôle principal de la RAM ?',
              answers: ['Stocker temporairement les données en cours d\'utilisation', 'Stocker définitivement les fichiers', 'Afficher les images à l\'écran', 'Connecter l\'ordinateur à Internet'],
              correct: 0,
              explanation: 'La RAM (mémoire vive) stocke temporairement les données utilisées par les programmes en cours d\'exécution. Elle se vide quand on éteint l\'ordinateur.'
            },
            {
              q: 'Une clé USB est un périphérique de quel type ?',
              answers: ['Entrée et sortie', 'Entrée uniquement', 'Sortie uniquement', 'Traitement'],
              correct: 0,
              explanation: 'Une clé USB est entrée/sortie car on peut à la fois y lire des données (entrée vers l\'ordinateur) et y écrire des données (sortie depuis l\'ordinateur).'
            },
            {
              q: 'Quelle touche du clavier permet de passer à la ligne ou de valider ?',
              answers: ['Entrée (Enter)', 'Tabulation', 'Majuscule (Shift)', 'Retour arrière (Backspace)'],
              correct: 0,
              explanation: 'La touche Entrée (Enter) permet de valider une commande ou de passer à la ligne dans un traitement de texte.'
            },
            {
              q: 'Qu\'est-ce qu\'un écran tactile ?',
              answers: ['Un périphérique d\'entrée ET de sortie', 'Un périphérique d\'entrée uniquement', 'Un périphérique de sortie uniquement', 'Un périphérique de traitement'],
              correct: 0,
              explanation: 'Un écran tactile affiche des informations (sortie) ET détecte les touchers du doigt (entrée) : c\'est donc un périphérique d\'entrée ET de sortie.'
            }
          ]
        }
      },
      {
        id: 'composants-sorter',
        type: 'sorter',
        icon: '🗂️',
        title: 'Classer les périphériques',
        data: {
          instruction: 'Clique sur un élément, puis sur la bonne catégorie pour le placer.',
          categories: ['Entrée', 'Sortie', 'Entrée / Sortie'],
          cols: 3,
          items: [
            { label: '⌨️ Clavier', cat: 'Entrée' },
            { label: '🖱️ Souris', cat: 'Entrée' },
            { label: '🎤 Microphone', cat: 'Entrée' },
            { label: '📷 Webcam', cat: 'Entrée' },
            { label: '🖨️ Imprimante', cat: 'Sortie' },
            { label: '🔊 Haut-parleurs', cat: 'Sortie' },
            { label: '🖥️ Écran', cat: 'Sortie' },
            { label: '💾 Clé USB', cat: 'Entrée / Sortie' },
            { label: '📡 Carte réseau', cat: 'Entrée / Sortie' },
            { label: '📱 Écran tactile', cat: 'Entrée / Sortie' }
          ]
        }
      }
    ]
  },

  {
    id: 'binaire',
    icon: '🔢',
    name: 'Code binaire',
    color: '#7c3aed',
    desc: 'Les 0 et les 1 au cœur de l\'informatique',
    exercises: [
      {
        id: 'binaire-game',
        type: 'binary',
        icon: '🎮',
        title: 'Défi binaire',
        data: {
          rounds: [4, 7, 10, 13, 21, 42, 66, 100, 128, 200, 255]
        }
      },
      {
        id: 'binaire-quiz',
        type: 'quiz',
        icon: '❓',
        title: 'Quiz : Représentation numérique',
        data: {
          questions: [
            {
              q: 'Combien de valeurs différentes peut-on coder avec 1 seul bit ?',
              answers: ['2 (0 ou 1)', '8', '10', '16'],
              correct: 0,
              explanation: 'Un bit ne peut valoir que 0 ou 1 : il y a donc seulement 2 valeurs possibles.'
            },
            {
              q: 'Combien de bits contient 1 octet ?',
              answers: ['8 bits', '4 bits', '16 bits', '1 bit'],
              correct: 0,
              explanation: '1 octet = 8 bits. C\'est l\'unité de base pour mesurer la taille des données.'
            },
            {
              q: 'Que vaut le nombre binaire 0000 1010 en décimal ?',
              answers: ['10', '8', '12', '20'],
              correct: 0,
              explanation: '0000 1010 = 0+0+0+0+8+0+2+0 = 8+2 = 10. Les puissances de 2 sont : 128, 64, 32, 16, 8, 4, 2, 1.'
            },
            {
              q: 'Que signifie "bit" en anglais ?',
              answers: ['Binary digit', 'Binary information technology', 'Byte information transfer', 'Basic internet type'],
              correct: 0,
              explanation: 'Bit est la contraction de "binary digit" (chiffre binaire). Un bit est donc un chiffre dans le système binaire (base 2).'
            },
            {
              q: 'Combien de couleurs différentes peut-on représenter avec 8 bits ?',
              answers: ['256', '128', '64', '512'],
              correct: 0,
              explanation: 'Avec 8 bits, on peut coder 2⁸ = 256 valeurs différentes (de 0 à 255).'
            },
            {
              q: 'Quelle est la valeur maximale d\'un octet (8 bits) en décimal ?',
              answers: ['255', '256', '128', '127'],
              correct: 0,
              explanation: 'La valeur maximale avec 8 bits est 1111 1111 = 128+64+32+16+8+4+2+1 = 255.'
            }
          ]
        }
      }
    ]
  },

  {
    id: 'couleurs',
    icon: '🌈',
    name: 'Couleurs RVB',
    color: '#e11d48',
    desc: 'Représentation numérique des images',
    exercises: [
      {
        id: 'couleurs-mixer',
        type: 'rgb',
        icon: '🎨',
        title: 'Mélangeur RVB',
        data: {
          targets: [
            { name: 'Rouge', r: 255, g: 0, b: 0 },
            { name: 'Vert', r: 0, g: 255, b: 0 },
            { name: 'Bleu', r: 0, g: 0, b: 255 },
            { name: 'Jaune', r: 255, g: 255, b: 0 },
            { name: 'Cyan', r: 0, g: 255, b: 255 },
            { name: 'Magenta', r: 255, g: 0, b: 255 },
            { name: 'Blanc', r: 255, g: 255, b: 255 },
            { name: 'Gris', r: 128, g: 128, b: 128 },
            { name: 'Orange', r: 255, g: 128, b: 0 },
            { name: 'Violet', r: 128, g: 0, b: 255 }
          ]
        }
      },
      {
        id: 'couleurs-quiz',
        type: 'quiz',
        icon: '❓',
        title: 'Quiz : Couleurs et pixels',
        data: {
          questions: [
            {
              q: 'Que signifie RVB ?',
              answers: ['Rouge Vert Bleu', 'Résolution Valeur Brillance', 'Rouge Violet Brillant', 'Réseau Vidéo Binaire'],
              correct: 0,
              explanation: 'RVB signifie Rouge Vert Bleu (RGB en anglais). Ces trois couleurs primaires de la lumière permettent de créer toutes les couleurs d\'un écran.'
            },
            {
              q: 'Quel est le code RVB du blanc ?',
              answers: ['(255, 255, 255)', '(0, 0, 0)', '(128, 128, 128)', '(255, 0, 0)'],
              correct: 0,
              explanation: 'Le blanc est la combinaison de toutes les couleurs lumineuses au maximum : Rouge=255, Vert=255, Bleu=255.'
            },
            {
              q: 'Quel est le code RVB du noir ?',
              answers: ['(0, 0, 0)', '(255, 255, 255)', '(128, 128, 128)', '(0, 0, 255)'],
              correct: 0,
              explanation: 'Le noir est l\'absence totale de lumière : Rouge=0, Vert=0, Bleu=0.'
            },
            {
              q: 'Que signifie "pixel" ?',
              answers: ['Picture element (élément d\'image)', 'Pixel Information X', 'Point d\'Image eXtra-Large', 'Photographie Intelligente'],
              correct: 0,
              explanation: 'Pixel est la contraction de "picture element". C\'est le plus petit point d\'une image numérique.'
            },
            {
              q: 'Combien de couleurs différentes peut-on créer avec le codage RVB 24 bits ?',
              answers: ['Environ 16 millions', '256', 'Environ 65 000', 'Exactement 1 000 000'],
              correct: 0,
              explanation: 'Avec 24 bits (8 bits × 3 canaux), on a 2²⁴ ≈ 16,7 millions de couleurs possibles.'
            },
            {
              q: 'Quelle couleur donne le mélange de Rouge(255) + Vert(255) + Bleu(0) ?',
              answers: ['Jaune', 'Orange', 'Blanc', 'Vert'],
              correct: 0,
              explanation: 'Rouge + Vert = Jaune en synthèse additive (mélange de lumières). C\'est différent des peintures !'
            }
          ]
        }
      }
    ]
  },

  {
    id: 'crypto',
    icon: '🔐',
    name: 'Cryptographie',
    color: '#0ea5e9',
    desc: 'Chiffrer et déchiffrer des messages',
    exercises: [
      {
        id: 'crypto-caesar',
        type: 'caesar',
        icon: '🔏',
        title: 'Chiffre de César',
        data: {
          challenges: [
            { encoded: 'ERQMRXU', shift: 3, decoded: 'BONJOUR' },
            { encoded: 'LQIRUPDWLTXH', shift: 3, decoded: 'INFORMATIQUE' },
            { encoded: 'HFVROL', shift: 9, decoded: 'YVCOLF' },
            { encoded: 'LKBSB', shift: 4, decoded: 'HAXAX' }
          ]
        }
      },
      {
        id: 'crypto-quiz',
        type: 'quiz',
        icon: '❓',
        title: 'Quiz : Sécurité et chiffrement',
        data: {
          questions: [
            {
              q: 'Que fait le chiffre de César ?',
              answers: ['Il décale chaque lettre d\'un certain nombre de rangs dans l\'alphabet', 'Il remplace chaque lettre par un symbole', 'Il mélange les lettres au hasard', 'Il supprime les voyelles'],
              correct: 0,
              explanation: 'Le chiffre de César décale chaque lettre dans l\'alphabet. Avec un décalage de 3 : A→D, B→E, C→F, etc.'
            },
            {
              q: 'Que signifie HTTPS dans une adresse web ?',
              answers: ['La connexion est sécurisée par chiffrement', 'Le site contient des images haute résolution', 'C\'est un site commercial', 'Le site est très rapide'],
              correct: 0,
              explanation: 'HTTPS (HyperText Transfer Protocol Secure) indique que les données échangées entre votre navigateur et le site sont chiffrées. Le cadenas dans la barre d\'adresse en témoigne.'
            },
            {
              q: 'Quel symbole dans la barre d\'adresse indique une connexion sécurisée ?',
              answers: ['Un cadenas fermé 🔒', 'Une étoile ⭐', 'Un bouclier 🛡️', 'Une maison 🏠'],
              correct: 0,
              explanation: 'Le cadenas fermé dans la barre d\'adresse indique que la connexion utilise HTTPS et que les données sont chiffrées.'
            },
            {
              q: 'Qu\'est-ce qu\'un "texte clair" en cryptographie ?',
              answers: ['Le message original avant chiffrement', 'Un message très simple à comprendre', 'Un message déjà déchiffré par erreur', 'Un message sans fautes d\'orthographe'],
              correct: 0,
              explanation: 'En cryptographie, le "texte clair" est le message original lisible, avant qu\'il soit chiffré. Après chiffrement, on obtient un "texte chiffré".'
            },
            {
              q: 'Pourquoi chiffre-t-on les données sur Internet ?',
              answers: ['Pour empêcher que des personnes malveillantes lisent les données échangées', 'Pour compresser les fichiers et gagner de la place', 'Pour rendre les pages web plus rapides', 'Pour identifier les utilisateurs'],
              correct: 0,
              explanation: 'Le chiffrement protège la confidentialité des données (mots de passe, informations bancaires...) en les rendant illisibles pour toute personne qui intercepterait la communication.'
            }
          ]
        }
      }
    ]
  },

  {
    id: 'web',
    icon: '🌐',
    name: 'Web & Internet',
    color: '#10b981',
    desc: 'Navigateurs, URL et moteurs de recherche',
    exercises: [
      {
        id: 'web-fillblank',
        type: 'fillblank',
        icon: '🔗',
        title: 'Anatomie d\'une URL',
        data: {
          instruction: 'Place les bons mots dans les cases pour compléter l\'explication de l\'URL.',
          sentences: [
            {
              parts: ['L\'adresse ', null, '://www.ge.ch/ecoles/info', ' utilise le protocole sécurisé ', null, '.'],
              answers: ['https', 'HTTPS'],
              blanks: [0, 1]
            },
            {
              parts: ['Le ', null, ' de ce site est ', null, '.'],
              answers: ['nom de domaine', 'www.ge.ch'],
              blanks: [0, 1]
            },
            {
              parts: ['Le ', null, ' indique où se trouve la page dans la structure du site.'],
              answers: ['chemin d\'accès'],
              blanks: [0]
            },
            {
              parts: ['Si une page n\'existe plus, le navigateur affiche l\'erreur ', null, '.'],
              answers: ['404'],
              blanks: [0]
            }
          ],
          bank: ['https', 'HTTPS', 'nom de domaine', 'www.ge.ch', 'chemin d\'accès', '404', 'HTTP', 'adresse IP', 'www.ch', '200']
        }
      },
      {
        id: 'web-quiz',
        type: 'quiz',
        icon: '❓',
        title: 'Quiz : Web et Internet',
        data: {
          questions: [
            {
              q: 'Qui a inventé le World Wide Web (WWW) ?',
              answers: ['Tim Berners-Lee au CERN en 1989', 'Bill Gates chez Microsoft en 1985', 'Steve Jobs chez Apple en 1984', 'Mark Zuckerberg à Harvard en 2004'],
              correct: 0,
              explanation: 'Tim Berners-Lee, un ingénieur britannique travaillant au CERN à Genève, a inventé le World Wide Web en 1989. Robert Cailliau, un Belge, a co-développé le projet.'
            },
            {
              q: 'Quelle est la différence entre Internet et le World Wide Web ?',
              answers: ['Internet est le réseau physique, le Web est un service qui tourne dessus', 'Ce sont deux noms pour la même chose', 'Le Web est plus rapide qu\'Internet', 'Internet n\'existe que sur ordinateur, le Web sur smartphone'],
              correct: 0,
              explanation: 'Internet est l\'infrastructure (câbles, routeurs, protocoles) qui relie les ordinateurs du monde entier. Le Web (WWW) est l\'un des services qui utilise Internet pour relier des pages HTML par des hyperliens.'
            },
            {
              q: 'Que signifie URL ?',
              answers: ['Uniform Resource Locator', 'Universal Research Link', 'Unique Route Location', 'United Resource Language'],
              correct: 0,
              explanation: 'URL signifie Uniform Resource Locator : c\'est l\'adresse unique d\'une ressource sur le Web (une page, une image, un fichier...).'
            },
            {
              q: 'Quel moteur de recherche ne suit pas les habitudes des utilisateurs ?',
              answers: ['DuckDuckGo', 'Google', 'Bing', 'Yahoo'],
              correct: 0,
              explanation: 'DuckDuckGo (créé en 2008) est un moteur de recherche qui ne collecte pas ni ne revend les données personnelles de ses utilisateurs. Qwant (français) fait de même.'
            },
            {
              q: 'Qu\'est-ce qu\'un métamoteur de recherche ?',
              answers: ['Un moteur qui puise ses résultats dans plusieurs autres moteurs', 'Le plus puissant moteur de recherche du monde', 'Un moteur qui traduit automatiquement les résultats', 'Un moteur spécialisé dans les images'],
              correct: 0,
              explanation: 'Un métamoteur (comme Ecosia ou StartPage) ne possède pas son propre index : il envoie la requête à plusieurs moteurs et compile les résultats.'
            },
            {
              q: 'Que permet l\'opérateur de recherche site: (ex: "informatique site:ge.ch") ?',
              answers: ['Limiter la recherche à un seul site web', 'Rechercher le nom d\'un site', 'Exclure un site des résultats', 'Trouver des sites similaires'],
              correct: 0,
              explanation: 'L\'opérateur "site:" limite la recherche aux pages d\'un domaine précis. Par exemple, "python site:wikipedia.org" cherche "python" uniquement dans Wikipedia.'
            }
          ]
        }
      }
    ]
  },

  {
    id: 'reseaux',
    icon: '📡',
    name: 'Les réseaux',
    color: '#f59e0b',
    desc: 'PAN, LAN, MAN, WAN et connexions',
    exercises: [
      {
        id: 'reseaux-sorter',
        type: 'sorter',
        icon: '🗂️',
        title: 'Classer les réseaux',
        data: {
          instruction: 'Clique sur un appareil/situation, puis sur le bon type de réseau.',
          categories: ['PAN', 'LAN', 'MAN', 'WAN'],
          cols: 4,
          items: [
            { label: '⌚ Montre connectée ↔ smartphone', cat: 'PAN' },
            { label: '🎧 Écouteurs Bluetooth', cat: 'PAN' },
            { label: '🏫 Réseau d\'une école', cat: 'LAN' },
            { label: '🏠 Box Internet d\'une maison', cat: 'LAN' },
            { label: '🖥️ Salle informatique', cat: 'LAN' },
            { label: '🏙️ Réseau d\'une ville entière', cat: 'MAN' },
            { label: '🌍 Connexion entre pays', cat: 'WAN' },
            { label: '🌐 Internet', cat: 'WAN' }
          ]
        }
      },
      {
        id: 'reseaux-quiz',
        type: 'quiz',
        icon: '❓',
        title: 'Quiz : Les réseaux informatiques',
        data: {
          questions: [
            {
              q: 'Que signifie LAN ?',
              answers: ['Local Area Network (réseau local)', 'Large Area Network (grand réseau)', 'Linux Advanced Network', 'Light Area Nodes'],
              correct: 0,
              explanation: 'LAN signifie Local Area Network. C\'est un réseau qui couvre une zone géographique limitée : une maison, une école, une entreprise. Le Wi-Fi de votre domicile est un LAN.'
            },
            {
              q: 'Quelle technologie est utilisée pour les réseaux PAN (personnels) ?',
              answers: ['Bluetooth', 'Fibre optique', 'Wi-Fi', 'Ethernet'],
              correct: 0,
              explanation: 'Les réseaux PAN (Personal Area Network) utilisent généralement Bluetooth pour connecter des appareils proches : montre connectée, écouteurs, souris sans fil...'
            },
            {
              q: 'Quelle est la portée typique d\'un réseau LAN ?',
              answers: ['Dizaines à centaines de mètres', 'Quelques centimètres', 'Des milliers de kilomètres', 'Toute une ville'],
              correct: 0,
              explanation: 'Un réseau LAN couvre généralement une distance de quelques dizaines à quelques centaines de mètres : un bâtiment, un étage, une école...'
            },
            {
              q: 'Qu\'est-ce que le débit d\'un réseau ?',
              answers: ['La quantité de données transmises par seconde (vitesse)', 'Le nombre d\'ordinateurs connectés', 'La distance maximale du réseau', 'Le coût mensuel de la connexion'],
              correct: 0,
              explanation: 'Le débit (ou bande passante) mesure la quantité de données échangées par seconde. Il s\'exprime en bits/s, Mbit/s, Gbit/s... Plus le débit est élevé, plus la connexion est rapide.'
            },
            {
              q: 'Qu\'est-ce que l\'architecture client-serveur ?',
              answers: ['Des clients (PC) envoient des requêtes à un serveur central qui répond', 'Tous les ordinateurs sont connectés entre eux directement', 'Un seul ordinateur centralise tout le travail', 'Les clients et serveurs sont des personnes'],
              correct: 0,
              explanation: 'Dans l\'architecture client-serveur, les clients (vos appareils) envoient des requêtes au serveur (ordinateur puissant), qui traite et renvoie la réponse. C\'est ainsi que fonctionne le Web.'
            }
          ]
        }
      }
    ]
  },

  {
    id: 'courriel',
    icon: '📧',
    name: 'Le courriel',
    color: '#8b5cf6',
    desc: 'E-mails, adresses et communication',
    exercises: [
      {
        id: 'courriel-sorter',
        type: 'sorter',
        icon: '🗂️',
        title: 'Anatomie d\'un e-mail',
        data: {
          instruction: 'Classe chaque élément dans la bonne catégorie du courriel.',
          categories: ['Champ "À"', 'Champ "Cc"', 'Champ "Cci"', 'Autres'],
          cols: 4,
          items: [
            { label: '📨 Destinataire principal', cat: 'Champ "À"' },
            { label: '✉️ marie@ecole.ch', cat: 'Champ "À"' },
            { label: '👁️ Copie visible à un collègue', cat: 'Champ "Cc"' },
            { label: '🙈 Copie cachée (invisible)', cat: 'Champ "Cci"' },
            { label: '📎 Pièce jointe (fichier)', cat: 'Autres' },
            { label: '📝 Objet du message', cat: 'Autres' }
          ]
        }
      },
      {
        id: 'courriel-truefal',
        type: 'truefal',
        icon: '✅',
        title: 'Vrai ou Faux : Le courriel',
        data: {
          chrono: true,
          seconds: 12,
          items: [
            { statement: '"Cc" signifie Copie Carbone : tous les destinataires voient qui est en copie.', answer: true, explanation: 'Exact ! Avec Cc, tous les destinataires du mail voient les adresses des personnes en copie.' },
            { statement: '"Cci" signifie Copie Carbone Invisible : les destinataires principaux ne voient pas les adresses en Cci.', answer: true, explanation: 'Exact ! Cci (ou Bcc en anglais) permet d\'envoyer une copie discrète sans que les autres destinataires le sachent.' },
            { statement: 'Il est obligatoire de remplir le champ "Objet" pour envoyer un e-mail.', answer: false, explanation: 'Faux. L\'objet n\'est pas techniquement obligatoire, mais il est fortement recommandé. Un mail sans objet risque d\'être classé comme spam.' },
            { statement: 'Une adresse e-mail contient toujours le symbole "@" (arobase).', answer: true, explanation: 'Vrai ! Le "@" sépare la partie locale (ex: lea) du serveur (ex: gmail.com). Exemple : lea@gmail.com.' },
            { statement: 'Envoyer des pièces jointes très volumineuses est bon pour la planète.', answer: false, explanation: 'Faux. Les e-mails volumineux consomment de l\'énergie pour être stockés sur les serveurs. Il vaut mieux réduire la taille des fichiers joints.' },
            { statement: '"Répondre à tous" envoie la réponse uniquement à l\'expéditeur.', answer: false, explanation: 'Faux ! "Répondre" envoie la réponse uniquement à l\'expéditeur. "Répondre à tous" envoie la réponse à TOUS les destinataires du mail original.' },
            { statement: 'On peut envoyer le même e-mail à plusieurs personnes simultanément.', answer: true, explanation: 'Vrai ! Il suffit d\'ajouter plusieurs adresses dans le champ "À", séparées par des virgules ou des points-virgules.' }
          ]
        }
      }
    ]
  },

  {
    id: 'droits',
    icon: '⚖️',
    name: 'Droits & citoyenneté',
    color: '#ef4444',
    desc: 'Droits, traces numériques et données',
    exercises: [
      {
        id: 'droits-truefal',
        type: 'truefal',
        icon: '⚡',
        title: 'Vrai ou Faux : Chrono !',
        data: {
          chrono: true,
          seconds: 10,
          items: [
            { statement: 'On peut copier un logiciel payant pour l\'installer sur plusieurs ordinateurs.', answer: false, explanation: 'Faux ! Copier un logiciel payant sans payer de licence supplémentaire est illégal. C\'est du piratage.' },
            { statement: 'Un texte ou une image trouvé(e) sur Internet est automatiquement libre de droits.', answer: false, explanation: 'Faux ! Presque tout ce qui est publié sur Internet est protégé par le droit d\'auteur, même sans mention explicite.' },
            { statement: 'Les logiciels libres peuvent être utilisés, modifiés et redistribués gratuitement.', answer: true, explanation: 'Vrai ! Les logiciels libres (open source) accordent à l\'utilisateur des droits d\'utilisation, de modification et de redistribution. Ex : LibreOffice, Firefox.' },
            { statement: 'Partager la photo d\'une personne sur Internet sans son accord est toujours autorisé.', answer: false, explanation: 'Faux ! Toute personne a un droit à l\'image. Publier une photo de quelqu\'un sans son consentement peut être illégal.' },
            { statement: 'Les cookies sont des fichiers que les sites web stockent sur votre ordinateur pour vous reconnaître.', answer: true, explanation: 'Vrai ! Les cookies mémorisent des informations sur vos visites (préférences, connexion, comportement...) pour personnaliser votre expérience.' },
            { statement: 'Le mode "navigation privée" rend votre navigation totalement anonyme sur Internet.', answer: false, explanation: 'Faux ! Le mode privé empêche votre navigateur de sauvegarder votre historique localement, mais votre fournisseur d\'accès Internet et les sites visités voient quand même vos activités.' },
            { statement: 'Les traces numériques que vous laissez sur Internet peuvent construire votre "identité numérique".', answer: true, explanation: 'Vrai ! Vos recherches, publications, like et géolocalisations constituent des traces qui dessinent votre profil numérique, exploitable par des entreprises ou consultable par des employeurs.' }
          ]
        }
      },
      {
        id: 'droits-quiz',
        type: 'quiz',
        icon: '❓',
        title: 'Quiz : Droits et données personnelles',
        data: {
          questions: [
            {
              q: 'Qu\'est-ce que le "droit à l\'image" ?',
              answers: ['Le droit de contrôler l\'utilisation de sa propre image', 'Le droit de prendre des photos partout', 'Le droit d\'utiliser les images d\'Internet', 'Le droit de supprimer les images floues'],
              correct: 0,
              explanation: 'Le droit à l\'image protège toute personne contre l\'utilisation de son image sans son consentement. Prendre et publier une photo de quelqu\'un sans sa permission peut être sanctionné.'
            },
            {
              q: 'Qu\'est-ce qu\'une trace numérique "involontaire" ?',
              answers: ['L\'historique de navigation, les données GPS, les cookies', 'Une photo postée délibérément sur Instagram', 'Un commentaire laissé sur un forum', 'Un like sur une publication'],
              correct: 0,
              explanation: 'Les traces involontaires sont celles que vous laissez sans le savoir : historique de recherche, cookies, géolocalisation, adresse IP... Contrairement aux traces volontaires (posts, likes) que vous choisissez.'
            },
            {
              q: 'Qu\'est-ce que le "Big Data" ?',
              answers: ['L\'ensemble des technologies qui collectent, stockent et analysent d\'immenses volumes de données', 'Un très grand disque dur', 'Un fichier très lourd', 'Un réseau social pour adultes'],
              correct: 0,
              explanation: 'Le Big Data désigne les technologies capables de traiter des volumes de données gigantesques (milliards d\'entrées). Moteurs de recherche et réseaux sociaux l\'utilisent pour analyser les comportements des utilisateurs.'
            },
            {
              q: 'Pourquoi les entreprises collectent-elles vos données personnelles ?',
              answers: ['Pour vous proposer des publicités ciblées et revendre des profils d\'utilisateurs', 'Uniquement pour améliorer leurs services', 'Pour protéger votre vie privée', 'C\'est obligatoire par la loi'],
              correct: 0,
              explanation: 'Les données personnelles sont une ressource commerciale précieuse. Elles servent à construire des profils d\'utilisateurs, personnaliser des publicités et sont parfois revendues à des tiers.'
            },
            {
              q: 'Qu\'est-ce qu\'un logiciel "open source" (libre) ?',
              answers: ['Un logiciel dont le code source est accessible et modifiable par tous', 'Un logiciel gratuit sans aucune restriction', 'Un logiciel fonctionnant uniquement en ligne', 'Un logiciel fabriqué par une école'],
              correct: 0,
              explanation: 'Un logiciel open source (libre) publie son code source : n\'importe qui peut le lire, le modifier et le redistribuer selon les conditions de sa licence. Ex : Linux, Firefox, LibreOffice.'
            }
          ]
        }
      }
    ]
  },

  {
    id: 'ia',
    icon: '🤖',
    name: 'Intelligence artificielle',
    color: '#06b6d4',
    desc: 'IA générative, apprentissage et bonnes pratiques',
    exercises: [
      {
        id: 'ia-truefal',
        type: 'truefal',
        icon: '⚡',
        title: 'Vrai ou Faux : Intelligence artificielle',
        data: {
          chrono: false,
          items: [
            { statement: 'ChatGPT est un exemple d\'Intelligence Artificielle Générative capable de créer du texte.', answer: true, explanation: 'Vrai ! ChatGPT (OpenAI) est une IA générative. Elle génère du texte en réponse à des questions ou instructions ("prompts").' },
            { statement: 'Une IA ne peut jamais se tromper ou inventer des informations fausses.', answer: false, explanation: 'Faux ! Les IA génératives peuvent produire des "hallucinations" : des informations inventées mais présentées comme vraies. Il faut toujours vérifier les réponses.' },
            { statement: 'DALL-E et Midjourney sont des IA qui génèrent des images à partir d\'une description textuelle.', answer: true, explanation: 'Vrai ! Ces IA de génération d\'images créent des visuels originaux à partir d\'une description texte (prompt). Ex : "un chat orange sur la lune en style aquarelle".' },
            { statement: 'Il est conseillé de partager ses données personnelles (nom, adresse, photos) avec une IA.', answer: false, explanation: 'Faux ! Il ne faut jamais partager de données personnelles avec une IA (prénom, adresse, données de santé, photos...). Ces données alimentent les modèles et peuvent être mal utilisées.' },
            { statement: 'Les algorithmes d\'IA sont programmés et entraînés par des êtres humains.', answer: true, explanation: 'Vrai ! Les IA apprennent à partir de données choisies et étiquetées par des humains. Les choix des concepteurs influencent les résultats et peuvent introduire des biais.' },
            { statement: 'On peut utiliser le texte généré par une IA tel quel pour un travail scolaire.', answer: false, explanation: 'Faux ! Utiliser du contenu généré par IA sans le citer et sans le vérifier peut être considéré comme du plagiat. De plus, l\'IA peut faire des erreurs. Il faut toujours lire, vérifier et reformuler.' }
          ]
        }
      },
      {
        id: 'ia-quiz',
        type: 'quiz',
        icon: '❓',
        title: 'Quiz : Comprendre l\'IA',
        data: {
          questions: [
            {
              q: 'Qu\'est-ce que l\'apprentissage supervisé en IA ?',
              answers: ['L\'IA apprend à partir d\'exemples étiquetés par des humains', 'L\'IA est surveillée en permanence par un enseignant', 'L\'IA apprend uniquement par récompenses et pénalités', 'L\'IA crée de nouveaux contenus à partir de données existantes'],
              correct: 0,
              explanation: 'Dans l\'apprentissage supervisé, on fournit à l\'IA des milliers d\'exemples déjà classifiés (étiquetés). Ex : des photos de chats et de chiens étiquetées, pour que l\'IA apprenne à les distinguer.'
            },
            {
              q: 'Qu\'est-ce qu\'un "prompt" en IA générative ?',
              answers: ['L\'instruction ou la question que l\'on donne à l\'IA', 'La vitesse de réponse de l\'IA', 'Un type de mémoire artificielle', 'Un algorithme de vérification'],
              correct: 0,
              explanation: 'Un prompt est l\'instruction (texte) que vous donnez à une IA générative pour obtenir un résultat. Plus le prompt est précis et structuré, meilleure sera la réponse.'
            },
            {
              q: 'Quelle IA générative est spécialisée dans la création d\'images ?',
              answers: ['DALL-E / Midjourney', 'ChatGPT', 'AlphaGo', 'Siri'],
              correct: 0,
              explanation: 'DALL-E (OpenAI) et Midjourney génèrent des images à partir de descriptions textuelles. ChatGPT génère du texte, AlphaGo joue au jeu de Go, Siri est un assistant vocal.'
            },
            {
              q: 'Qu\'est-ce qu\'une "hallucination" d\'une IA ?',
              answers: ['Une information inventée par l\'IA mais présentée avec confiance', 'Une erreur de connexion Internet', 'Un bug visuel dans l\'interface', 'Une réponse trop longue'],
              correct: 0,
              explanation: 'On appelle "hallucination" le phénomène où une IA génère des informations fausses, inventées, mais les présente comme si elles étaient vraies. C\'est pourquoi il faut toujours vérifier les réponses.'
            },
            {
              q: 'Quelle année a été lancé ChatGPT au grand public ?',
              answers: ['2022', '2020', '2019', '2024'],
              correct: 0,
              explanation: 'ChatGPT a été lancé par OpenAI en novembre 2022. Il a rapidement atteint 100 millions d\'utilisateurs, devenant le service à la croissance la plus rapide de l\'histoire.'
            }
          ]
        }
      }
    ]
  },

  {
    id: 'fichiers',
    icon: '📁',
    name: 'Fichiers & stockage',
    color: '#84cc16',
    desc: 'Arborescence, extensions et unités',
    exercises: [
      {
        id: 'fichiers-explorer',
        type: 'filemanager',
        icon: '🗂️',
        title: 'L\'explorateur de fichiers',
        data: {
          folders: [
            { name: 'Documents',  icon: '📄', color: '#4361ee' },
            { name: 'Images',     icon: '🖼️', color: '#e11d48' },
            { name: 'Musique',    icon: '🎵', color: '#8b5cf6' },
            { name: 'Tableurs',   icon: '📊', color: '#10b981' },
            { name: 'Vidéos',     icon: '🎬', color: '#f59e0b' }
          ],
          files: [
            { name: 'rapport_vacances',  ext: '.docx', folder: 'Documents' },
            { name: 'notes_cours',       ext: '.odt',  folder: 'Documents' },
            { name: 'cours_maths',       ext: '.pdf',  folder: 'Documents' },
            { name: 'photo_famille',     ext: '.jpg',  folder: 'Images'    },
            { name: 'logo_ecole',        ext: '.png',  folder: 'Images'    },
            { name: 'animation',         ext: '.gif',  folder: 'Images'    },
            { name: 'ma_chanson',        ext: '.mp3',  folder: 'Musique'   },
            { name: 'podcast_science',   ext: '.ogg',  folder: 'Musique'   },
            { name: 'budget_mensuel',    ext: '.xlsx', folder: 'Tableurs'  },
            { name: 'comptes_classe',    ext: '.ods',  folder: 'Tableurs'  },
            { name: 'film_classe',       ext: '.mp4',  folder: 'Vidéos'    }
          ]
        }
      },
      {
        id: 'fichiers-quiz',
        type: 'quiz',
        icon: '❓',
        title: 'Quiz : Stockage et organisation',
        data: {
          questions: [
            {
              q: 'Qu\'est-ce qu\'une arborescence de fichiers ?',
              answers: ['Une organisation hiérarchique en dossiers et sous-dossiers', 'Un type de logiciel pour classer des photos', 'Un programme qui supprime les doublons', 'Une liste de fichiers triés alphabétiquement'],
              correct: 0,
              explanation: 'Une arborescence est une structure en forme d\'arbre inversé : à la racine (la base), puis des dossiers, des sous-dossiers, et finalement les fichiers. C\'est ainsi que sont organisés vos données sur un ordinateur.'
            },
            {
              q: 'Qu\'est-ce qu\'une extension de fichier ?',
              answers: ['Les lettres après le point dans le nom du fichier (ex: .jpg, .docx)', 'La taille du fichier en octets', 'Le nom du dossier qui contient le fichier', 'La date de création du fichier'],
              correct: 0,
              explanation: 'L\'extension (ex: .jpg, .mp3, .xlsx) indique le format et le type du fichier. Elle permet à l\'ordinateur de savoir quel logiciel utiliser pour ouvrir le fichier.'
            },
            {
              q: 'Combien vaut 1 gigaoctet (Go) ?',
              answers: ['1 milliard d\'octets', '1 million d\'octets', '1 000 octets', '1 billion d\'octets'],
              correct: 0,
              explanation: '1 Go = 1 000 Mo = 1 000 000 Ko = 1 000 000 000 octets (1 milliard). La hiérarchie est : Ko → Mo → Go → To (chaque étape multiplie par 1 000).'
            },
            {
              q: 'Qu\'est-ce qu\'une sauvegarde (backup) ?',
              answers: ['Une copie de données sur un support différent pour éviter de les perdre', 'Un nettoyage des fichiers inutiles', 'Le transfert d\'un fichier vers Internet', 'La compression d\'un dossier'],
              correct: 0,
              explanation: 'Une sauvegarde est une copie de sécurité de vos données, stockée sur un support ou emplacement différent. Si votre disque tombe en panne, vous pouvez récupérer vos données depuis la sauvegarde.'
            },
            {
              q: 'Qu\'est-ce que le "cloud computing" (nuage informatique) ?',
              answers: ['Le stockage et traitement de données sur des serveurs distants accessibles via Internet', 'Un logiciel météorologique', 'Un type de connexion sans fil', 'Un format de compression de fichiers'],
              correct: 0,
              explanation: 'Le cloud computing permet de stocker des fichiers et d\'exécuter des programmes sur des serveurs distants (data centers), accessibles depuis n\'importe où avec une connexion Internet. Ex : Google Drive, iCloud.'
            },
            {
              q: 'Que représente l\'icône de disquette souvent présente dans les logiciels ?',
              answers: ['La fonction "Enregistrer"', 'La fonction "Imprimer"', 'La fonction "Partager"', 'La fonction "Télécharger"'],
              correct: 0,
              explanation: 'L\'icône de disquette symbolise "Enregistrer" dans de nombreux logiciels, en hommage aux disquettes qui étaient le principal support de stockage dans les années 80-90.'
            }
          ]
        }
      }
    ]
  },

  {
    id: 'histoire',
    icon: '📜',
    name: 'Histoire de l\'info',
    color: '#f97316',
    desc: 'Grandes dates et pionniers de l\'informatique',
    exercises: [
      {
        id: 'histoire-quiz',
        type: 'quiz',
        icon: '❓',
        title: 'Quiz : Grandes dates',
        data: {
          questions: [
            {
              q: 'Qui a inventé le World Wide Web en 1989 ?',
              answers: ['Tim Berners-Lee (CERN, Genève)', 'Bill Gates (Microsoft)', 'Steve Jobs (Apple)', 'Mark Zuckerberg (Facebook)'],
              correct: 0,
              explanation: 'Tim Berners-Lee, ingénieur britannique au CERN à Genève, a proposé et développé le Web en 1989 avec son collègue belge Robert Cailliau. Le CERN a rendu le Web libre d\'accès en 1993.'
            },
            {
              q: 'Quelle est la particularité historique d\'Ada Lovelace (1815-1852) ?',
              answers: ['Elle a écrit le premier algorithme de l\'histoire', 'Elle a inventé Internet', 'Elle a fondé Microsoft', 'Elle a créé le langage Python'],
              correct: 0,
              explanation: 'Ada Lovelace est considérée comme la première programmeuse de l\'histoire. Elle a écrit un algorithme destiné à la machine analytique de Charles Babbage, bien avant l\'existence des ordinateurs modernes.'
            },
            {
              q: 'En quelle année Apple a-t-elle été fondée ?',
              answers: ['1976', '1984', '1980', '1969'],
              correct: 0,
              explanation: 'Apple a été fondée en 1976 par Steve Jobs, Steve Wozniak et Ronald Wayne. Le premier produit fut l\'Apple I, construit dans le garage de la famille Jobs.'
            },
            {
              q: 'Quel est l\'ancêtre d\'Internet, créé par l\'armée américaine dans les années 1960 ?',
              answers: ['Arpanet', 'WWW', 'Minitel', 'Ethernet'],
              correct: 0,
              explanation: 'Arpanet (Advanced Research Projects Agency Network) a été créé à la fin des années 1960 par le département de la Défense américain. Il reliait des universités et a évolué pour devenir Internet.'
            },
            {
              q: 'Quelle entreprise suisse, fondée en 1981 dans le canton de Vaud, est célèbre pour ses souris informatiques ?',
              answers: ['Logitech', 'Nestlé', 'Rolex', 'Swatch'],
              correct: 0,
              explanation: 'Logitech a été fondée en 1981 par Daniel Borel, Luigi Zappacosta et Giacomo Marini dans le canton de Vaud. L\'entreprise est mondialement connue pour ses souris, claviers et autres périphériques.'
            },
            {
              q: 'Où se trouve le CERN, qui a vu naître le Web en 1989 ?',
              answers: ['À Genève, en Suisse', 'À Paris, en France', 'À Cambridge, en Angleterre', 'À Silicon Valley, aux États-Unis'],
              correct: 0,
              explanation: 'Le CERN (Conseil Européen pour la Recherche Nucléaire) est situé à cheval sur la frontière franco-genevoise, près de Genève. C\'est là que Tim Berners-Lee a inventé le Web.'
            },
            {
              q: 'En quelle année ChatGPT a-t-il été lancé, marquant le début de l\'IA générative grand public ?',
              answers: ['2022', '2020', '2018', '2024'],
              correct: 0,
              explanation: 'ChatGPT a été lancé par OpenAI en novembre 2022. En 2 mois, il a atteint 100 millions d\'utilisateurs, record de croissance de l\'histoire d\'Internet à ce moment-là.'
            }
          ]
        }
      },
      {
        id: 'histoire-truefal',
        type: 'truefal',
        icon: '✅',
        title: 'Vrai ou Faux : L\'histoire de l\'info',
        data: {
          chrono: false,
          items: [
            { statement: 'Microsoft a été fondée par Bill Gates et Paul Allen en 1975.', answer: true, explanation: 'Vrai ! Microsoft a été fondée en 1975. Elle a popularisé le système d\'exploitation Windows à partir de 1985.' },
            { statement: 'Le mot "informatique" vient de la combinaison de "information" et "automatique".', answer: true, explanation: 'Vrai ! Le mot "informatique" a été créé par Philippe Dreyfus en 1962 en fusionnant "information" et "automatique".' },
            { statement: 'Le premier iPhone d\'Apple est sorti en 2010.', answer: false, explanation: 'Faux ! Le premier iPhone a été présenté par Steve Jobs en janvier 2007 et mis en vente en juin 2007. Il a révolutionné l\'industrie des téléphones mobiles.' },
            { statement: 'Linux est un système d\'exploitation libre créé en 1991.', answer: true, explanation: 'Vrai ! Linus Torvalds, étudiant finlandais, a créé Linux en 1991. C\'est aujourd\'hui le système d\'exploitation le plus utilisé sur les serveurs et smartphones Android.' },
            { statement: 'Grace Hopper est connue pour avoir popularisé le terme "bug" informatique.', answer: true, explanation: 'Vrai ! Grace Hopper (1906-1992) a trouvé un vrai insecte (bug en anglais) coincé dans un relais de l\'ordinateur Mark II en 1947, donnant naissance au terme "bug" pour désigner une erreur informatique.' }
          ]
        }
      }
    ]
  }
];
