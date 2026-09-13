import type { Unit } from '../types'

export const units: Unit[] = [
  {
    id: 'greetings',
    title: 'Greetings',
    description: 'Say hello and farewell',
    levels: 2,
    words: [
      {
        word: 'mae govannen',
        meaning: 'well met',
        unit: 'greetings',
        pronunciation: 'MAI go-VAN-nen',
        example_sentence: null,
      },
      {
        word: 'mellon',
        meaning: 'friend',
        unit: 'greetings',
        pronunciation: 'MEL-lon',
        example_sentence: null,
      },
      {
        word: 'suilad',
        meaning: 'hello / greetings',
        unit: 'greetings',
        pronunciation: 'SUI-lad',
        example_sentence: null,
      },
      {
        word: 'novaer',
        meaning: 'farewell',
        unit: 'greetings',
        pronunciation: 'no-VAI-er',
        example_sentence: null,
      },
    ],
  },
  {
    id: 'nature-1',
    title: 'Nature I',
    description: 'Sun, moon, and light',
    levels: 2,
    words: [
      {
        word: 'anor',
        meaning: 'sun',
        unit: 'nature-1',
        pronunciation: 'AH-nor',
        example_sentence: null,
      },
      {
        word: 'ithil',
        meaning: 'moon',
        unit: 'nature-1',
        pronunciation: 'ITH-il',
        example_sentence: null,
      },
      {
        word: 'galad',
        meaning: 'light',
        unit: 'nature-1',
        pronunciation: 'GAH-lad',
        example_sentence: null,
      },
      {
        word: 'aur',
        meaning: 'day',
        unit: 'nature-1',
        pronunciation: 'OWR',
        example_sentence: null,
      },
      {
        word: 'fuin',
        meaning: 'night',
        unit: 'nature-1',
        pronunciation: 'FOO-in',
        example_sentence: null,
      },
    ],
  },
  {
    id: 'numbers',
    title: 'Numbers 1-10',
    description: 'Count from one to ten',
    levels: 3,
    words: [
      { word: 'min', meaning: 'one', unit: 'numbers', pronunciation: 'MEEN', example_sentence: null },
      { word: 'tad', meaning: 'two', unit: 'numbers', pronunciation: 'TAD', example_sentence: null },
      { word: 'neledh', meaning: 'three', unit: 'numbers', pronunciation: 'NEL-eth', example_sentence: null },
      { word: 'canad', meaning: 'four', unit: 'numbers', pronunciation: 'KAH-nad', example_sentence: null },
      { word: 'leben', meaning: 'five', unit: 'numbers', pronunciation: 'LEB-en', example_sentence: null },
      { word: 'eneg', meaning: 'six', unit: 'numbers', pronunciation: 'EN-eg', example_sentence: null },
      { word: 'odog', meaning: 'seven', unit: 'numbers', pronunciation: 'OH-dog', example_sentence: null },
      { word: 'toloth', meaning: 'eight', unit: 'numbers', pronunciation: 'TOH-loth', example_sentence: null },
      { word: 'neder', meaning: 'nine', unit: 'numbers', pronunciation: 'NED-er', example_sentence: null },
      { word: 'caer', meaning: 'ten', unit: 'numbers', pronunciation: 'KAI-er', example_sentence: null },
    ],
  },
  {
    id: 'family',
    title: 'People & Family',
    description: 'Talk about your family',
    levels: 2,
    words: [
      {
        word: 'adar',
        meaning: 'father',
        unit: 'family',
        pronunciation: 'AH-dar',
        example_sentence: null,
      },
      {
        word: 'naneth',
        meaning: 'mother',
        unit: 'family',
        pronunciation: 'NAH-neth',
        example_sentence: null,
      },
      {
        word: 'ion',
        meaning: 'son',
        unit: 'family',
        pronunciation: 'EE-on',
        example_sentence: null,
      },
      {
        word: 'iell',
        meaning: 'daughter',
        unit: 'family',
        pronunciation: 'EE-ell',
        example_sentence: null,
      },
      {
        word: 'gwador',
        meaning: 'brother',
        unit: 'family',
        pronunciation: 'GWAH-dor',
        example_sentence: null,
      },
    ],
  },
  {
    id: 'nature-2',
    title: 'Nature II',
    description: 'Trees, water, and hills',
    levels: 2,
    words: [
      {
        word: 'galadh',
        meaning: 'tree',
        unit: 'nature-2',
        pronunciation: 'GAH-ladh',
        example_sentence: null,
      },
      {
        word: 'loth',
        meaning: 'flower',
        unit: 'nature-2',
        pronunciation: 'LOTH',
        example_sentence: null,
      },
      {
        word: 'nen',
        meaning: 'water',
        unit: 'nature-2',
        pronunciation: 'NEN',
        example_sentence: null,
      },
      {
        word: 'amon',
        meaning: 'hill',
        unit: 'nature-2',
        pronunciation: 'AH-mon',
        example_sentence: null,
      },
      {
        word: 'taur',
        meaning: 'forest',
        unit: 'nature-2',
        pronunciation: 'TOWR',
        example_sentence: null,
      },
    ],
  },
  {
    id: 'phrases',
    title: 'Simple Phrases',
    description: 'Combine words into greetings',
    levels: 2,
    words: [
      {
        word: 'mae govannen, mellon',
        meaning: 'well met, friend',
        unit: 'phrases',
        pronunciation: 'MAI go-VAN-nen, MEL-lon',
        example_sentence: null,
      },
      {
        word: 'suilad, adar',
        meaning: 'hello, father',
        unit: 'phrases',
        pronunciation: 'SUI-lad, AH-dar',
        example_sentence: null,
      },
      {
        word: 'novaer, naneth',
        meaning: 'farewell, mother',
        unit: 'phrases',
        pronunciation: 'no-VAI-er, NAH-neth',
        example_sentence: null,
      },
      {
        word: 'mae govannen, gwador',
        meaning: 'well met, brother',
        unit: 'phrases',
        pronunciation: 'MAI go-VAN-nen, GWAH-dor',
        example_sentence: null,
      },
      {
        word: 'suilad, ion',
        meaning: 'hello, son',
        unit: 'phrases',
        pronunciation: 'SUI-lad, EE-on',
        example_sentence: null,
      },
    ],
  },
  {
    id: 'verbs-1',
    title: 'Verbs I (Basics)',
    description: 'To be, and words from the Doors of Durin',
    levels: 2,
    words: [
      {
        word: 'im',
        meaning: 'I am',
        unit: 'verbs-1',
        pronunciation: 'IM',
        example_sentence: 'Im Narvi hain echant. (I, Narvi, made them.)',
      },
      {
        word: 'pedo',
        meaning: 'speak!',
        unit: 'verbs-1',
        pronunciation: 'PED-oh',
        example_sentence: 'Pedo mellon a minno. (Speak, friend, and enter.)',
      },
      {
        word: 'minno',
        meaning: 'enter!',
        unit: 'verbs-1',
        pronunciation: 'MIN-noh',
        example_sentence: 'Pedo mellon a minno. (Speak, friend, and enter.)',
      },
      {
        word: 'echant',
        meaning: 'made (he/she made)',
        unit: 'verbs-1',
        pronunciation: 'EH-khant',
        example_sentence: 'Im Narvi hain echant. (I, Narvi, made them.)',
      },
      {
        word: 'teithant',
        meaning: 'drew / wrote (he/she drew)',
        unit: 'verbs-1',
        pronunciation: 'TAY-thant',
        example_sentence: 'Celebrimbor o Eregion teithant i thiw hin. (Celebrimbor of Hollin drew these signs.)',
      },
    ],
  },
  {
    id: 'colors',
    title: 'Colors',
    description: 'Describe the world in color',
    levels: 2,
    words: [
      {
        word: 'luin',
        meaning: 'blue',
        unit: 'colors',
        pronunciation: 'LOO-in',
        example_sentence: null,
      },
      {
        word: 'calen',
        meaning: 'green',
        unit: 'colors',
        pronunciation: 'KAH-len',
        example_sentence: null,
      },
      {
        word: 'maur',
        meaning: 'dark / great (used loosely)',
        unit: 'colors',
        pronunciation: 'MOWR',
        example_sentence: null,
      },
      {
        word: 'ninglor',
        meaning: 'white-gold (poetic)',
        unit: 'colors',
        pronunciation: 'NIN-glor',
        example_sentence: null,
      },
    ],
  },
  {
    id: 'sentences',
    title: 'Simple Sentences',
    description: 'Build noun and color phrases',
    levels: 2,
    words: [
      {
        word: 'nen luin',
        meaning: 'blue water',
        unit: 'sentences',
        pronunciation: 'NEN LOO-in',
        example_sentence: null,
      },
      {
        word: 'galadh calen',
        meaning: 'green tree',
        unit: 'sentences',
        pronunciation: 'GAH-ladh KAH-len',
        example_sentence: null,
      },
      {
        word: 'amon ninglor',
        meaning: 'white-gold hill',
        unit: 'sentences',
        pronunciation: 'AH-mon NIN-glor',
        example_sentence: null,
      },
      {
        word: 'loth luin',
        meaning: 'blue flower',
        unit: 'sentences',
        pronunciation: 'LOTH LOO-in',
        example_sentence: null,
      },
      {
        word: 'taur calen',
        meaning: 'green forest',
        unit: 'sentences',
        pronunciation: 'TOWR KAH-len',
        example_sentence: null,
      },
    ],
  },
]

export function getUnit(id: string): Unit | undefined {
  return units.find((u) => u.id === id)
}

export function getUnitIndex(id: string): number {
  return units.findIndex((u) => u.id === id)
}

export function allWords(): import('../types').Word[] {
  return units.flatMap((u) => u.words)
}
