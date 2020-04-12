import 'phaser';
import EventDispatcher from '../managers/EventDispatcher';
import Player from '../models/Player';
import InventoryItem from '../models/InventoryItem';

export default class UIScene extends Phaser.Scene {
  NB_INVENTORY_SLOT: number = 8;

  emitter: EventDispatcher = EventDispatcher.getInstance();
  player: Player;
  slots: Phaser.GameObjects.Image[] = [];
  slotsQuantity: Phaser.GameObjects.Text[] = [];
  items: Phaser.GameObjects.Sprite[] = [];

  constructor() {
    super('UIScene');
  }

  init(data: { player: Player }) {
    this.player = data.player;
  }

  create() {
    const x = this.scale.width / 2 - (this.NB_INVENTORY_SLOT * 40 / 2);
    const y = this.scale.height - 30;

    for (let i=0; i < this.NB_INVENTORY_SLOT; i++) {
      const slotX = x + (i*40);

      // Create inventory slot
      const slot = this.add.image(slotX, y, 'ui.slot');
      slot.setInteractive({ useHandCursor: true });
    
      slot.on('pointerover', () => {
        slot.setTint(0x999999);
      });
      slot.on('pointerout', () => {
        slot.clearTint();
      });
      slot.on('pointerdown', () => {
        this.emitter.emit('ui.slot.select', slot, i);
      });

      this.slots.push(slot);

      // Create slot quantity
      const slotQuantity = this.add.text(slotX + 3, y + 5, 'x0', { fontSize: '10px' });
      slotQuantity.setVisible(false);
      this.slotsQuantity.push(slotQuantity);
    }

    // Listen for inventory update and update its render in UI
    this.player.inventory.onUpdate(() => {
      this.drawInventory();
    });
  }

  drawInventory() {
    const inventory = this.player.inventory;
    const x = this.scale.width / 2 - (this.NB_INVENTORY_SLOT * 40 / 2);
    const y = this.scale.height - 30;

    inventory.items.forEach((inventoryItem: InventoryItem, index: number) => {
      const slotItemSprite = this.items[index];
      const slotQuantity = this.slotsQuantity[index];

      // Create item slot
      if (!slotItemSprite) {
        const itemSprite = this.add.sprite(x + (index*40), y, inventoryItem.item.texture, inventoryItem.item.frame);
        this.items[index] = itemSprite;
      }
      // Update item slot
      else {
        slotItemSprite.setTexture(inventoryItem.item.texture, inventoryItem.item.frame);

        // Update slot quantity
        if (inventoryItem.quantity > 1) {
          slotQuantity.setText(`x${inventoryItem.quantity}`);
          slotQuantity.setDepth(10);
          slotQuantity.setVisible(true);
        } else {
          slotQuantity.setVisible(false);
        }
      }
    });
  }

}