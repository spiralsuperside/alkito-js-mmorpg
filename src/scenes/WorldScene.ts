import 'phaser';
import Player from '../models/Player';
import Item from '../models/Resource';
import Entity from '../models/Entity';
import EventDispatcher from '../managers/EventDispatcher';
import EntityActionManager from '../managers/EntityActionManager';
import EntityActionProcessor from '../managers/EntityActionProcessor';
import { getTilePosition } from '../utils/tileUtils';

type ArcadeSprite = Phaser.Physics.Arcade.Sprite;
type MapLayer = Phaser.Tilemaps.StaticTilemapLayer | Phaser.Tilemaps.DynamicTilemapLayer;

export default class WorldScene extends Phaser.Scene {
  TILE_SIZE: number = 32;

  emitter: EventDispatcher = EventDispatcher.getInstance();;
  entityActions: EntityActionManager;

  navMeshPlugin: any;
  navMesh: any;
  marker: Phaser.GameObjects.Graphics;
  map: Phaser.Tilemaps.Tilemap;
  mapLayers: { [key: string]: MapLayer } = {};

  player: Player;
  currentSelection: Entity | null;

  constructor() {
    super('WorldScene');
  }

  create() {
    this.entityActions = EntityActionManager.init(this);

    this._createMap();
    this._createAnims();

    // Player
    this.player = new Player(this, 21, 16, this.navMesh);

    // Camera follow player
    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    this.cameras.main.startFollow(this.player);
    this.cameras.main.roundPixels = true;

    this._createEvents();

    this.scene.launch('UIScene', { player: this.player });
  }

  private _createMap() {
    this.map = this.make.tilemap({ key: 'map' });

    const tiles = this.map.addTilesetImage('tileset', 'tiles');

    this.mapLayers['grass'] = this.map.createStaticLayer('Grass', tiles, 0, 0);
    this.mapLayers['objects'] = this.map.createStaticLayer('Objects', tiles, 0, 0);
    this.mapLayers['objects'].setCollisionByExclusion([-1]);
    this.mapLayers['decorations'] = this.map.createStaticLayer('Decorations', tiles, 0, 0);
    this.mapLayers['ui'] = this.map.createBlankDynamicLayer('UI', tiles);

    // Objects from Map
    const objects = this.map.getObjectLayer("Items");
    // Create objects from data map
    objects.objects.forEach((object: any) => {
        const tile =  this.map.getTileAtWorldXY(object.x, object.y, false, this.cameras.main, this.mapLayers['grass']);
        new Item(this, tile.x, tile.y, this.navMesh, object.name, object.type);
    });

    const obstaclesLayer = this.map.getObjectLayer("Obstacles");
    this.navMesh = this.navMeshPlugin.buildMeshFromTiled(
      "mesh",
      obstaclesLayer,
    );

    this.physics.world.bounds.width = this.map.widthInPixels;
    this.physics.world.bounds.height = this.map.heightInPixels;

    // Tile marker
    // Create a simple graphic that can be used to show which tile the mouse is over
    const markerWidth = 4;
    this.marker = this.add.graphics();
    this.marker.lineStyle(markerWidth, 0xffffff, .3);
    this.marker.strokeRect(-markerWidth / 2, -markerWidth / 2, this.map.tileWidth + markerWidth, this.map.tileHeight + markerWidth);

    // DEBUG NAVMESH
    //
    // this.navMesh.enableDebug();
    // this.navMesh.debugDrawMesh({
    //   drawCentroid: true,
    //   drawBounds: false,
    //   drawNeighbors: true,
    //   drawPortals: true
    // });
  }

  private _createAnims() {
    // Player animation (used mainly in the Player class when moving)
    // Need refactoring
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('player', { frames: [4, 3, 4, 5] }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('player', { frames: [7, 6, 7, 8] }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers('player', { frames: [10, 9, 10, 11] }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers('player', { frames: [1, 0, 1, 2] }),
      frameRate: 10,
      repeat: -1
    });
  }

  private _createEvents() {
    // Process entity related actions
    const entityActionProcessor = new EntityActionProcessor();
    entityActionProcessor.listen();

    // On map click
    this.input.on('pointerdown', this.onMapClick);
   
    this.emitter.on('unit.select', (unit: Entity | null, flag: boolean = true) => {
      if (this.currentSelection) {
        this.currentSelection.select(false);
      }

      if (flag) 
        this.currentSelection = unit;
      else
        this.currentSelection = null;

      if (unit)
        unit.select(flag);
    });
  }

  onMapClick = (pointer: Phaser.Input.Pointer) => {
    // If something is selected, unselected
    if (this.currentSelection) {
      this.emitter.emit('unit.select', null);
      return;
    }

    const end = new Phaser.Math.Vector2(pointer.worldX, pointer.worldY);
    // Find corresponding tile from click
    const tile = this.map.getTileAtWorldXY(end.x, end.y, false, this.cameras.main, this.mapLayers['grass']);
      
    // Move Player to this position
    // Player will automatically find its path to the point and update its position accordingly
    this.entityActions.processNow(this.player, { type: 'go-to', args: [tile] });
  }

  update() {
    if (!this.currentSelection)
      this.updateMapMarker();
  }

  private updateMapMarker() {
    // Convert the mouse position to world position within the camera
    const worldPoint: any = this.input.activePointer.positionToCamera(this.cameras.main);

    // Move map marker over pointed tile
    const pointerTileXY = this.mapLayers['ui'].worldToTileXY(worldPoint.x, worldPoint.y);
    const snappedWorldPoint = this.mapLayers['ui'].tileToWorldXY(pointerTileXY.x, pointerTileXY.y);
    this.marker.setPosition(snappedWorldPoint.x, snappedWorldPoint.y);
  }
}