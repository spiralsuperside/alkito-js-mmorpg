# Alkito: 2D Web-Based MMORPG

## Table of Contents

1.  Introduction
2.  File Structure
3.  Core Concepts
4.  Detailed File Explanations
5.  Expansion Possibilities

## 1. Introduction

Alkito is a 2D web-based MMORPG built using Phaser.js for the client-side game engine and Node.js for the server. The game aims to provide a basic, functional online RPG experience with features like player movement, chat, resource gathering, and skill development.

## 2. File Structure

The project is organized into the following main directories:

* `src/`: Contains the source code for both the client and server.
    * `src/game.ts`: Main client-side entry point.
    * `src/scenes/`: Phaser.js scenes.
    * `src/models/`: Game data models.
    * `src/systems/`: Game systems.
    * `src/ui-components/`: React UI components.
    * `src/services/`: Services for managing game logic and communication.
    * `src/types/`: TypeScript type definitions.
    * `src/utils/`: Utility functions.
    * `src/server/`: Server-side code.
* `public/`: Contains static assets like images, sounds, and the game's HTML file.
* `assets/`: (within public) Contains game assets.
* `tileset/`: (within public/assets/map) Contains tilesets for the map.

## 3. Core Concepts

* **Client-Server Architecture:** The game uses a client-server architecture. The client (browser) renders the game and handles user input, while the server manages the game world state and communication between players.
* **Real-time Communication:** Socket.IO is used for real-time communication between the client and server, enabling features like chat and synchronized player movement.
* **Phaser.js:** A JavaScript game framework used for creating the game's visuals and handling game logic on the client-side.
* **React:** A JavaScript library used for building dynamic and interactive UI components.
* **Tile-Based Map:** The game world is built using a tile-based map, where the environment is composed of individual tiles.

## 4. Detailed File Explanations

### Client-Side Files (src)

* **`src/game.ts`:**
    * This is the main entry point for the client-side game.
    * It imports the necessary Phaser.js library and sets up the game configuration.
    * It creates a new Phaser.Game instance, specifying the game's dimensions, rendering context, physics engine, and the scenes to be used.
    * It's responsible for starting the game loop and initializing the core game systems.

* **`src/scenes/BootScene.ts`:**
    * This Phaser.js scene is responsible for preloading all the assets required by the game.
    * It loads images, spritesheets, tilemaps, sounds, and other resources.
    * Once all assets are loaded, it starts the `WorldScene`.

* **`src/scenes/WorldScene.ts`:**
    * This is the main game scene where the gameplay takes place.
    * It creates and manages the game map using tilemaps.
    * It handles the creation and management of game entities (players, NPCs, resources).
    * It sets up the game's physics engine.
    * It manages player input and interactions.
    * It implements game logic, such as collision detection, movement, and interactions with objects.
    * It uses a navigation mesh (provided by a plugin) for pathfinding.

* **`src/scenes/UIScene.ts`:**
    * This Phaser.js scene is responsible for rendering and managing the user interface.
    * It creates UI elements like the HUD, minimap, inventory display, and menus.
    * It uses React to build dynamic and interactive UI components.
    * It handles user input and events related to the UI.

* **`src/scenes/ReactScene.ts`:**
    * This Phaser.js scene is specifically used to render React components within the Phaser game.
    * This allows for seamless integration of React's component-based architecture for more complex UI elements or interactions.

* **`src/models/Entity.ts`:**
    * This file defines the base `Entity` class, which serves as a blueprint for all objects in the game world.
    * It includes properties like `id`, `unitType`, `unitName`, `hp`, `damage`, and `isMoving`.
    * It manages the entity's sprite, animation, and movement.
    * It provides methods for actions like moving, attacking, and taking damage.

* **`src/models/OtherPlayer.ts`:**
    * This class extends the `Entity` class and represents other players in the game world.
    * It includes properties and behaviors specific to other players, such as displaying their names.

* **`src/models/Player.ts`:**
    * This class extends the `Entity` class and represents the player-controlled character.
    * It includes properties and behaviors specific to the player, such as inventory management and skill progression.

* **`src/models/ResourceEntity.ts`:**
    * This class extends the `Entity` class and represents resources in the game world (e.g., trees, plants, ores).
    * It includes properties and behaviors specific to resources, such as item drops and regeneration.

* **`src/models/InventoryItem.ts`:**
    * This class represents an item within the player's inventory, including its type and quantity.

* **`src/models/Item.ts`:**
    * This class defines the properties of a general item in the game world (e.g., name, price, texture).

* **`src/models/skills/Skill.ts`:**
    * This is an abstract base class for all skills in the game.
    * It defines common properties and methods for skills, such as name, description, level, and experience points (XP).

* **`src/models/skills/WoodCuttingSkill.ts`, `src/models/skills/FarmingSkill.ts`, `src/models/skills/MiningSkill.ts`:**
    * These files define specific skill classes that inherit from the `Skill` class, providing details unique to each skill.

* **`src/systems/InventorySystem.ts`:**
    * This class manages the player's inventory, handling the addition, removal, and tracking of items.

* **`src/systems/SkillsSystem.ts`:**
    * This class manages the player's skills, including skill levels and XP.

* **`src/systems/Mover.ts`:**
    * This class handles the movement of entities, including pathfinding using the navigation mesh.

* **`src/services/EventDispatcher.ts`:**
    * This class implements a global event system that allows different parts of the game to communicate with each other by emitting and listening for events.

* **`src/services/EntityActionManager.ts`:**
    * This class manages a queue of actions that entities perform. It ensures that actions are executed in the correct order and handles action completion.

* **`src/services/EntityActionProcessor.ts`:**
    * This class processes the actions queued by the `EntityActionManager`, triggering the appropriate game logic.

* **`src/services/ServerConnectorService.ts`:**
    * This class handles communication between the client and the server using Socket.IO.
    * It sends player input to the server and receives updates from the server.

* **`src/services/NotificationManager.ts`:**
    * This class manages and displays in-game notifications to the player.

* **`src/services/GameState.ts`:**
    * This class manages the overall state of the game on the client-side.

* **`src/ui-components/common/Button.tsx`:**
    * A reusable React component for creating buttons in the UI.

* **`src/ui-components/common/Popup.tsx`:**
    * A reusable React component for creating pop-up windows in the UI.

* **`src/ui-components/ChatPopup.tsx`:**
    * A React component for displaying and interacting with the chat interface.

* **`src/ui-components/ProfessionPopup.tsx`:**
    * A React component for displaying information about the player's skills and progress.

* **`src/ui-components/BlogPopup.tsx`:**
    * A React component for displaying in-game blog posts or news.

* **`src/ui-components/NotificationsContainer.tsx`:**
    * A React component for displaying a container for notifications.

* **`src/ui/UIActions.ts`:**
    * This class handles the display and interaction of custom actions that entities can perform.

* **`src/ui/ProgressBar.ts`:**
    * This class defines a reusable UI component for displaying progress.

* **`src/types/Actions.ts`:**
    * This file defines the action types used throughout the game.

* **`src/types/Chat.ts`:**
    * This file defines the structure of chat messages.

* **`src/types/Icons.ts`:**
    * This file defines the available icons for UI elements.

* **`src/types/Objects.ts`:**
    * This file defines the types of objects that can exist in the game world.

* **`src/types/Positions.ts`:**
    * This file defines the different positions that entities can face or move towards.

* **`src/utils/cursorUtils.ts`:**
    * This file provides utility functions for handling custom cursors.

* **`src/utils/positionUtils.ts`:**
    * This file provides utility functions for calculating positions and directions.

* **`src/utils/tileUtils.ts`:**
    * This file provides utility functions for working with tiles.

### Server-Side File (src/server)

* **`src/server/index.js`:**
    * This is the main file for the Node.js server.
    * It uses Express to create a web server.
    * It uses Socket.IO to handle real-time communication with connected clients.
    * It manages the game state, including player data, resource data, and chat messages.
    * It handles player connections and disconnections.
    * It processes player actions received from the client.
    * It updates the game world and sends updates to the clients.
    * It implements game logic, such as resource regeneration.

### Configuration and Build Files

* **`package.json`:**
    * This file defines the project's metadata, dependencies, and build scripts.
    * It is used by npm or yarn to manage the project's packages and run commands.

* **`webpack.common.js`, `webpack.dev.js`, `webpack.prod.js`:**
    * These are Webpack configuration files used for bundling the client-side code.
    * They specify how to process and combine JavaScript, TypeScript, CSS, and other assets.
    * `webpack.common.js` contains configuration shared between development and production builds.
    * `webpack.dev.js` contains configuration specific to development, such as enabling source maps and hot reloading.
    * `webpack.prod.js` contains configuration for production, such as minifying and optimizing the code.

* **`vite.config.js`:**
    * Configuration file for Vite, another build tool.

* **`postcss.config.js`:**
    * Configuration file for PostCSS, a tool for transforming CSS with JavaScript.

* **`tailwind.config.js`:**
    * Configuration file for Tailwind CSS, a utility-first CSS framework.

* **`.gitignore`:**
    * This file specifies files and directories that Git should ignore (e.g., `node_modules`, build output).

* **`node_modules.bun`:**
    * File related to the Bun package manager.

### Assets

* `public/assets/map/`: Contains the map tilesets and the Tiled map file.
* `public/assets/player-sprite.png`, `public/assets/other-player-sprite.png`: Spritesheets for player animations.
* `public/assets/ui/`: UI assets (images).
* `public/assets/items/`: Images for items.
* `public/assets/icons.png`: Spritesheet for icons.

## 5. Expansion Possibilities

Here are some ideas for expanding the game, categorized by the files they would most likely involve:

**`src/game.ts` (Game Initialization)**

* **Multiple Scenes:** Implement different game areas as separate scenes (e.g., towns, dungeons, different regions).
* **Game Modes:** Add different game modes (e.g., PvP, PvE, story mode).
* **Game Settings:** Add settings for controlling volume, graphics, keybindings.

**`src/scenes/WorldScene.ts` (World Logic)**

* **Dynamic World Events:** Implement events that occur in the game world, such as weather changes, monster spawns, or resource depletion.
* **Combat System:** Add a more robust combat system with different attack types, abilities, and enemy AI.
* **Quests:** Implement a quest system with NPCs that give players tasks and rewards.
* **World Persistence:** Implement saving and loading of the game world state.

**`src/scenes/UIScene.ts` (User Interface)**

* **Character Customization UI:** Add a UI for customizing player appearance.
* **Trading UI:** Implement a UI for trading items with other players.
* **Crafting UI:** Create a UI for crafting items from resources.
* **Chat Enhancements:** Add features like chat channels, private messages, and message filtering.

**`src/models/` (Data Models)**

* **Character Classes:** Add different character classes with unique attributes and abilities.
* **Equipment System:** Implement equipment that players can wear to improve their stats.
* **Character Stats:** Expand character stats (e.g., strength, dexterity, intelligence).
* **Item Properties:** Add more properties to items (e.g., durability, weight, effects).

**`src/systems/` (Game Systems)**

* **Pathfinding Improvements:** Enhance pathfinding algorithms for more efficient movement.
* **AI System:** Develop a more sophisticated AI system for NPCs and enemies.
* **Physics Enhancements:** Add more realistic physics interactions.
* **Combat System:** Implement a more complex combat system.

**`src/server/index.js` (Server Logic)**

* **Database Integration:** Implement a database to store player data, world state, and other persistent information.
* **User Authentication:** Add user accounts and login functionality.
* **Server-Side Logic:** Implement more complex game logic on the server to prevent cheating and ensure fair gameplay.
* **Scalability:** Optimize the server to handle a large number of concurrent players.
* **Security:** Implement security measures to protect against attacks and exploits.

**General Improvements:**

* **Sound and Music:** Add sound effects and background music.
* **Graphics Enhancements:** Improve the visual quality of the game with better graphics and effects.
* **Story and Lore:** Develop a compelling story and lore for the game world.
* **Multiplayer Features:** Add more features to enhance the multiplayer experience, such as guilds, parties, and social interactions.

This breakdown provides a roadmap for expanding the Alkito game, addressing various aspects of its design and implementation.
