import json
import os
from datetime import datetime

# Pfade zu den JSON-Dateien
CARDS_PATH = "./public/assets/data/cards.json"
CARD_TEXT_PATH_EN = "./public/locales/en/cardText.json"
CARD_TEXT_PATH_DE = "./public/locales/de/cardText.json"
BACKUP_DIR_DATA = "./public/assets/data/"
BACKUP_DIR_EN = "./public/locales/en/"
BACKUP_DIR_DE = "./public/locales/de/"

def load_json(file_path):
    if os.path.exists(file_path):
        with open(file_path, 'r', encoding='utf-8') as file:
            return json.load(file)
    return {}

def save_json(file_path, data):
    with open(file_path, 'w', encoding='utf-8') as file:
        json.dump(data, file, indent=2, ensure_ascii=False)

def get_card_text_path(lang):
    return CARD_TEXT_PATH_EN if lang == "en" else CARD_TEXT_PATH_DE

def manage_cards():
    cards = load_json(CARDS_PATH)
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

        save_json(CARDS_PATH, list(cards.values()))

def add_card(cards):
    card_id = input("Enter card ID: ")
    name = input("Enter card name: ")
    image = f"{card_id}.png"
    eigenschaften = {f"eigenschaft{i}": int(input(f"Enter eigenschaft{i}: ")) for i in range(1, 6)}

    cards[card_id] = {"id": int(card_id), "name": name, "image": image, "eigenschaften": eigenschaften}
    print(f"Card {name} added successfully.")

    for lang in ["en", "de"]:
        add_card_text(card_id, name, lang)

def add_card_text(card_id, name, lang):
    card_text_path = get_card_text_path(lang)
    card_text = load_json(card_text_path)
    textinfo = input(f"Enter textinfo for {name} ({lang}): ")

    if "cards" not in card_text:
        card_text["cards"] = {}
    
    card_text["cards"][card_id] = {"name": name, "textinfo": textinfo}
    save_json(card_text_path, card_text)
    print(f"Card text for {name} ({lang}) added successfully.")

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
        
        for lang in ["en", "de"]:
            update_card_text(card_id, lang, new_name)
        
        print(f"Card {card_id} updated successfully.")
    else:
        print("Card not found.")

def update_card_text(card_id, lang, new_name):
    card_text_path = get_card_text_path(lang)
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

def delete_card(cards):
    card_id = input("Enter card ID to delete: ")
    if card_id in cards:
        del cards[card_id]
        print(f"Card {card_id} deleted successfully.")
        
        for lang in ["en", "de"]:
            card_text_path = get_card_text_path(lang)
            card_text = load_json(card_text_path)
            if "cards" in card_text and card_id in card_text["cards"]:
                del card_text["cards"][card_id]
                save_json(card_text_path, card_text)
                print(f"Card text ({lang}) for card {card_id} deleted successfully.")
    else:
        print("Card not found.")

def view_cards(cards):
    for card_id, card in cards.items():
        print(f"ID: {card_id}, Name: {card['name']}")

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

def update_global_properties(lang):
    card_text_path = get_card_text_path(lang)
    card_text = load_json(card_text_path)
    
    # Nur die gewünschten Eigenschaften anzeigen und bearbeiten
    properties_to_update = ["title", "eigenschaften.eigenschaft1", "eigenschaften.eigenschaft2", "eigenschaften.eigenschaft3", "eigenschaften.eigenschaft4", "eigenschaften.eigenschaft5"]
    
    print(f"Current global properties ({lang}):")
    for prop in properties_to_update:
        keys = prop.split('.')
        value = card_text
        for key in keys:
            value = value.get(key, "")
        print(f"{prop}: {value}")
    
    for prop in properties_to_update:
        keys = prop.split('.')
        value = card_text
        for key in keys[:-1]:
            value = value.get(key, {})
        new_value = input(f"Enter new value for {prop} ({lang}) (leave empty to keep current): ")
        if new_value:
            value[keys[-1]] = new_value
    
    save_json(card_text_path, card_text)
    print(f"Global properties ({lang}) updated successfully.")

def create_backup():
    timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
    
    cards_backup_path = f"{BACKUP_DIR_DATA}cardsBackup_{timestamp}.json"
    card_text_en_backup_path = f"{BACKUP_DIR_EN}cardTextBackup_{timestamp}.json"
    card_text_de_backup_path = f"{BACKUP_DIR_DE}cardTextBackup_{timestamp}.json"
    
    save_json(cards_backup_path, load_json(CARDS_PATH))
    save_json(card_text_en_backup_path, load_json(CARD_TEXT_PATH_EN))
    save_json(card_text_de_backup_path, load_json(CARD_TEXT_PATH_DE))
    
    print(f"Backups created successfully:\n- {cards_backup_path}\n- {card_text_en_backup_path}\n- {card_text_de_backup_path}")

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