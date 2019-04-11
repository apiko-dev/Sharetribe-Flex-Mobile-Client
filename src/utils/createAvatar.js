const createAvatar = ({
  firstName,
  lastName,
  abbreviatedName,
  colorsArray,
}) => {
  // all credits goes to https://codepen.io/leecrossley/pen/CBHca?editors=1010
  if (!abbreviatedName) {
    // eslint-disable-next-line no-param-reassign
    abbreviatedName =
      firstName.charAt(0).toUpperCase() +
      lastName.charAt(0).toUpperCase();
  }

  const charIndex = abbreviatedName.charCodeAt(0) - 65;
  const colorIndex = charIndex % colorsArray.length;

  console.log('colors array: ', colorsArray);
  console.log('colors index: ', colorIndex);

  return {
    abbreviatedName,
    color: colorsArray[colorIndex],
  };
};

export default createAvatar;
