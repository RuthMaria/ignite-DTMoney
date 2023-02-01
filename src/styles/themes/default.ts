export const defaultTheme = {
  white: '#fff',

  'gray-100': '#E1E1E6',
  'gray-300': '#C4C4CC',
  'gray-400': '#8D8D99',
  'gray-500': '#7C7C8A',
  'gray-600': '#323238',
  'gray-700': '#29292E',
  'gray-800': '#202024',
  'gray-900': '#121214',

  'green-300': '#00B37E',
  'green-500': '#00875F',
  'green-700': '#015F43',

  'red-300': '#F75A68',
  'red-500': '#AB222E',
  'red-700': '#7A1921',
} as const;

/*
Colocando o "as const" faz com que o objeto se transforme em uma constante. 
Desse modo, ao selecionarmos uma cor aparecerá o nome dela e o seu respectivo hexadecimal.
Assim : 'red-300': '#F75A68'
Se não colocarmos o "as const" aparecerá assim: 'red-300': 'string'

Dificultando quando formos comparar a cor selecionada com a do layout do figma, sendo necessário olhar este arquivo para comparação
do hexadecimal. Do primeiro modo não tem essa necessidade, pois o hexadecimal da respectiva cor já aparecerá.
*/
