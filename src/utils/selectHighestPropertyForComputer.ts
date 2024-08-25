interface Card {
  eigenschaften: {
    eigenschaft1: number;
    eigenschaft2: number;
    eigenschaft3: number;
    eigenschaft4: number;
    eigenschaft5: number;
  };
}

export const selectHighestPropertyForComputer = (computerCard: Card) => {
  let highestValue = -Infinity;
  let selectedProperty: keyof Card['eigenschaften'] = 'eigenschaft1';

  // Überprüfen, ob alle Eigenschaften außer "eigenschaft1" kleiner als 4 sind
  const areAllPropertiesLessThan4 = ['eigenschaft2', 'eigenschaft3', 'eigenschaft4', 'eigenschaft5'].every(
    (prop) => computerCard.eigenschaften[prop as keyof Card['eigenschaften']] < 4
  );

  if (areAllPropertiesLessThan4) {
    return 'eigenschaft1';
  } else {
    ['eigenschaft2', 'eigenschaft3', 'eigenschaft4', 'eigenschaft5'].forEach((prop) => {
      if (computerCard.eigenschaften[prop as keyof Card['eigenschaften']] > highestValue) {
        highestValue = computerCard.eigenschaften[prop as keyof Card['eigenschaften']];
        selectedProperty = prop as keyof Card['eigenschaften'];
      }
    });
  }

  return selectedProperty;
};
