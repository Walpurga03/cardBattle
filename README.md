# Card Data Manager

A Python script for managing card data and texts stored in JSON files, with support for multilingual options (English and German). It also provides options for backing up data and managing global properties.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [1. Start the Program](#1-start-the-program)
  - [2. Create a Backup for Safety](#2-create-a-backup-for-safety)
  - [3. Card Management](#3-card-management)
  - [4. Manage Global Properties](#4-manage-global-properties)
- [Directory Structure](#directory-structure)
- [Media File Guidelines](#media-file-guidelines)
- [Support](#support)
- [Authors](#authors)

## Installation

1. **Install Python**: Ensure Python 3.x is installed.
2. **Clone or Download the Repository**: Clone this repository or download the files:
   ```bash
   git clone git@github.com:Walpurga03/cardBattle.git
   cd cardBattle
   ```
3. **Install Dependencies**: The script does not require any additional Python packages beyond standard libraries (`json`, `os`, `datetime`).

## Usage

### 1. Start the Program

Run the script in the command line using Python 3:

```bash
python3 card_data_manager.py
```

After starting, the main menu appears with various options for managing cards and global properties.

### 2. Create a Backup for Safety

Select the `Create Backup` option from the main menu to create a backup of the current card data and card texts. Backups are saved with a timestamp in the predefined directories:

- Card Data: `./public/assets/data/`
- Card Texts (English): `./public/locales/en/`
- Card Texts (German): `./public/locales/de/`

### 3. Card Management

Select the `Manage Cards` option from the main menu to access card management. You have the following options:

- **Add Card**: Add a new card by entering an ID, name, and properties. Card texts can be added in both English and German.
- **Update Card**: Update an existing card and its properties.
- **Delete Card**: Delete an existing card and its associated texts.
- **View Cards**: View all cards and their basic information (ID and name).

### 4. Manage Global Properties

Choose `Manage Global Properties` from the main menu to update the global properties of card texts. These properties include the title and the names of the properties (`eigenschaft1` to `eigenschaft5`). Changes can be made in both English and German.

## Directory Structure

The script works with several JSON files:

- `./public/assets/data/cards.json`: Contains card data.
- `./public/locales/en/cardText.json`: Contains card texts in English.
- `./public/locales/de/cardText.json`: Contains card texts in German.
- Backups are created in the directories `./public/assets/data/`, `./public/locales/en/`, and `./public/locales/de/`.

## Media File Guidelines

- **Images**: For each card, an image must be saved in the `./public/assets/images/` directory. The filename must match the card ID followed by `.png` (e.g., `1.png` for a card with ID `1`). The recommended size is 297 pixels in width and 222 pixels in height in a 4:3 format.
- **Audio File**: You can add a custom song by saving a file named `clip.mp3` in the `./public/assets/audio/` folder.

## Support

If you have any questions or need assistance, feel free to contact me on Nostr. My Nostr public key is:

- **Nostr PubKey**: `npub1hht9umpeet75w55uzs9lq6ksayfpcvl9lk64hye75j0yj4husq5ss8xsry`

I look forward to hearing from you and helping you with your issue!
