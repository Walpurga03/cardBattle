import json
import os
from datetime import datetime

# Pfade zu den JSON-Dateien
cards_path = "./public/assets/data/cards.json"
card_text_path_en = "./public/locales/en/cardText.json"
card_text_path_de = "./public/locales/de/cardText.json"
backup_dir_data = "./public/assets/data/"
backup_dir_en = "./public/locales/en/"
backup_dir_de = "./public/locales/de/"

# Funktion zum Laden von JSON-Daten aus einer Datei
def load_json(file_path):
    if os.path.exists(file_path):
        with open(file_path, 'r', encoding='utf-8') as file:
            return json.load(file)
    else:
        return {}

# Funktion zum Speichern von JSON-Daten in eine Datei
def save_json(file_path, data):
    with open(file_path, 'w', encoding='utf-8') as file:
        json.dump(data, file, indent=2, ensure_ascii=False)

# Menüfunktion zur Verwaltung von Karten
def manage_cards():
    cards = load_json(cards_path)
    
    # Überprüfen, ob cards eine Liste ist und in ein Dictionary umwandeln
    if isinstance(cards, list):
        cards = {str(card['id']): card for card in cards}
    
    while True:
        print("\n--- Card Management ---")
        print("1. Add Card")
        print("2. Update Card")
        print("3. Delete Card")
        print("4. View Cards")
        print("5. Exit")

        choice = input("Choose an option: ")

        if choice == '1':
            add_card(cards)
        elif choice == '2':
            update_card(cards)
        elif choice == '3':
            delete_card(cards)
        elif choice == '4':
            view_cards(cards)
        elif choice == '5':
            break
        else:
            print("Invalid choice. Please try again.")

        # Änderungen in der Karten-Datei speichern
        save_json(cards_path, list(cards.values()))

# Hinzufügen einer neuen Karte
def add_card(cards):
    card_id = input("Enter card ID: ")
    name = input("Enter card name: ")
    image = f"{card_id}.png"  # Automatisch den Bildpfad auf id.png setzen
    eigenschaften = {
        "eigenschaft1": int(input("Enter eigenschaft1: ")),
        "eigenschaft2": int(input("Enter eigenschaft2: ")),
        "eigenschaft3": int(input("Enter eigenschaft3: ")),
        "eigenschaft4": int(input("Enter eigenschaft4: ")),
        "eigenschaft5": int(input("Enter eigenschaft5: "))
    }

    cards[card_id] = {
        "id": int(card_id),
        "name": name,
        "image": image,
        "eigenschaften": eigenschaften
    }
    print(f"Card {name} added successfully.")

    # Hinzufügen der Kartentexte
    add_card_text(card_id, name, "en")
    add_card_text(card_id, name, "de")

# Hinzufügen der Kartentexte in den JSON-Dateien
def add_card_text(card_id, name, lang):
    if lang == "en":
        card_text_path = card_text_path_en
    elif lang == "de":
        card_text_path = card_text_path_de
    else:
        return
    
    card_text = load_json(card_text_path)
    textinfo = input(f"Enter textinfo for {name} ({lang}): ")
    
    if "cards" not in card_text:
        card_text["cards"] = {}
    
    card_text["cards"][card_id] = {
        "name": name,
        "textinfo": textinfo
    }
    
    save_json(card_text_path, card_text)
    print(f"Card text for {name} ({lang}) added successfully.")
    
# Aktualisieren einer vorhandenen Karte und der zugehörigen Kartentexte
def update_card(cards):
    card_id = input("Enter card ID to update: ")
    if card_id in cards:
        print(f"Current data for card ID {card_id}:")
        for key, value in cards[card_id].items():
            if key != "id" and key != "image":
                print(f"{key}: {value}")
        
        new_name = None
        for key in cards[card_id]:
            if key == "eigenschaften":
                for eig_key, eig_value in cards[card_id][key].items():
                    new_eig_value = input(f"Enter new value for {eig_key} (leave empty to keep current): ")
                    if new_eig_value:
                        cards[card_id][key][eig_key] = int(new_eig_value)
            elif key != "id" and key != "image":
                new_value = input(f"Enter new value for {key} (leave empty to keep current): ")
                if new_value:
                    cards[card_id][key] = new_value
                    if key == "name":
                        new_name = new_value
        
        # Aktualisieren der zugehörigen Kartentexte
        update_card_text(card_id, "en", new_name)
        update_card_text(card_id, "de", new_name)
        
        print(f"Card {card_id} updated successfully.")
    else:
        print("Card not found.")

# Aktualisieren der Kartentexte in den JSON-Dateien
def update_card_text(card_id, lang, new_name):
    if lang == "en":
        card_text_path = card_text_path_en
    elif lang == "de":
        card_text_path = card_text_path_de
    else:
        return
    
    card_text = load_json(card_text_path)
    if card_id in card_text.get("cards", {}):
        print(f"Current text data for card ID {card_id} ({lang}):")
        for key, value in card_text["cards"][card_id].items():
            print(f"{key}: {value}")
        
        if new_name:
            card_text["cards"][card_id]["name"] = new_name
        
        new_textinfo = input(f"Enter new value for textinfo ({lang}) (leave empty to keep current): ")
        if new_textinfo:
            card_text["cards"][card_id]["textinfo"] = new_textinfo
        
        save_json(card_text_path, card_text)
        print(f"Card text for card {card_id} ({lang}) updated successfully.")
    else:
        print(f"No text data found for card ID {card_id} ({lang}).")

# Löschen einer vorhandenen Karte und der zugehörigen Kartentexte
def delete_card(cards):
    card_id = input("Enter card ID to delete: ")
    if card_id in cards:
        del cards[card_id]
        print(f"Card {card_id} deleted successfully.")
        
        # Löschen der zugehörigen Kartentexte
        card_text_en = load_json(card_text_path_en)
        if "cards" in card_text_en and card_id in card_text_en["cards"]:
            del card_text_en["cards"][card_id]
            save_json(card_text_path_en, card_text_en)
            print(f"Card text (EN) for card {card_id} deleted successfully.")
        
        card_text_de = load_json(card_text_path_de)
        if "cards" in card_text_de and card_id in card_text_de["cards"]:
            del card_text_de["cards"][card_id]
            save_json(card_text_path_de, card_text_de)
            print(f"Card text (DE) for card {card_id} deleted successfully.")
    else:
        print("Card not found.")

# Anzeigen aller Karten
def view_cards(cards):
    for card_id, card in cards.items():
        print(f"ID: {card_id}, Name: {card['name']}")

# Menüfunktion zur Verwaltung von globalen Eigenschaften
def manage_global_properties():
    while True:
        print("\n--- Global Properties Management ---")
        print("1. Update Global Properties (EN)")
        print("2. Update Global Properties (DE)")
        print("3. Exit")

        choice = input("Choose an option: ")

        if choice == '1':
            update_global_properties("en")
        elif choice == '2':
            update_global_properties("de")
        elif choice == '3':
            break
        else:
            print("Invalid choice. Please try again.")

# Aktualisieren der globalen Eigenschaften in den JSON-Dateien
def update_global_properties(lang):
    if lang == "en":
        card_text_path = card_text_path_en
    elif lang == "de":
        card_text_path = card_text_path_de
    else:
        return
    
    card_text = load_json(card_text_path)
    print(f"Current global properties ({lang}):")
    for key, value in card_text.items():
        if key != "cards":
            print(f"{key}: {value}")
    
    for key in card_text:
        if key != "cards":
            new_value = input(f"Enter new value for {key} ({lang}) (leave empty to keep current): ")
            if new_value:
                card_text[key] = new_value
    
    save_json(card_text_path, card_text)
    print(f"Global properties ({lang}) updated successfully.")

# Erstellen einer Sicherungskopie aller relevanten Dateien
def create_backup():
    timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
    
    cards_backup_path = f"{backup_dir_data}cardsBackup_{timestamp}.json"
    card_text_en_backup_path = f"{backup_dir_en}cardTextBackup_{timestamp}.json"
    card_text_de_backup_path = f"{backup_dir_de}cardTextBackup_{timestamp}.json"
    
    save_json(cards_backup_path, load_json(cards_path))
    save_json(card_text_en_backup_path, load_json(card_text_path_en))
    save_json(card_text_de_backup_path, load_json(card_text_path_de))
    
    print(f"Backups created successfully:\n- {cards_backup_path}\n- {card_text_en_backup_path}\n- {card_text_de_backup_path}")

# Hauptfunktion
def main():
    while True:
        print("\n--- Main Menu ---")
        print("1. Manage Cards")
        print("2. Manage Global Properties")
        print("3. Create Backup")
        print("4. Exit")

        choice = input("Choose an option: ")

        if choice == '1':
            manage_cards()
        elif choice == '2':
            manage_global_properties()
        elif choice == '3':
            create_backup()
        elif choice == '4':
            break
        else:
            print("Invalid choice. Please try again.")

if __name__ == "__main__":
    main()