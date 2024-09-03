export interface Card {
  id: number; // Beibehalten als number
  name: string; // Fügen Sie den Namen hinzu, um die Übersetzungen zu identifizieren
  image: string;
  eigenschaften: {
    eigenschaft1: number;
    eigenschaft2: number;
    eigenschaft3: number;
    eigenschaft4: number;
    eigenschaft5: number;
  };
}

export type PropertyKey = 'eigenschaft1' | 'eigenschaft2' | 'eigenschaft3' | 'eigenschaft4' | 'eigenschaft5';
