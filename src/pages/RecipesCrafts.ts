export const recipes: { [key: number]: { first: number; second: number }[] } = {
  // --- Acid row
  55:      [{ first: 66, second: 57 }],
  222:        [
    { first: 66, second: 56 },
    { first: 66, second: 60 } // duplicate unified via array
  ],
  223:         [
    { first: 66, second: 61 },
    { first: 66, second: 62 }
  ],
  224:     [{ first: 66, second: 65 }],

  // --- Booze row
  66:             [{ first: 54, second: 57 }],
  57:        [{ first: 54, second: 56 }],
  225:         [{ first: 54, second: 61 }],
  67:        [
    { first: 54, second: 65 }, // from Booze row
    { first: 63, second: 57 } // from Invisibility row
  ],
  61:        [{ first: 54, second: 62 }, { first: 63, second: 56 }],
  65:            [{ first: 54, second: 60 }],

  // --- Fruit Juice row
  54:            [
    { first: 55, second: 57 },
    { first: 55, second: 56 }
  ],
  60:     [{ first: 55, second: 61 }],
  63:     [{ first: 55, second: 65 }],
  59:          [{ first: 55, second: 62 }],
  62:    [
    { first: 55, second: 60 },
    { first: 63, second: 65 } // from row below
  ],

  // --- Invisibility row
  218:        [{ first: 63, second: 61 }],
  58:    [{ first: 63, second: 62 }],
  64:       [{ first: 63, second: 60 }]
};
