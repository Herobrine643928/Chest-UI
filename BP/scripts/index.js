import { world } from '@minecraft/server';
import { ChestFormData, FurnaceFormData } from './extensions/forms.js';

world.afterEvents.itemUse.subscribe(evd => {
	if (evd.itemStack.typeId !== 'minecraft:compass') return;
	primaryMenu(evd.source);
});

function primaryMenu(player) {
	new ChestFormData('large')
		.title('§l§5Primary Menu')
		.button(21, '§l§6Test Item 1', ['', '§r§7A testing item'], 'minecraft:magma_cream', 14)
		.button(22, '§l§nTest Item 2', ['', '§r§7Another item'], 'textures/items/netherite_axe', 1, 10)
		.button(23, '§l§bTest Item 3', ['', '§r§7A third item'], 'minecraft:tnt', 64, 0, true)
		.button(30, '§l§2Test Item 4', ['', '§r§7A fourth item'], 'custom:item', 64, 0, true)
		.button(45, '§l§6OPEN FURNACE MENU!', ['', '§r§7Check out the furnace UI!'], 'minecraft:furnace', 1, 0, true)
		.pattern([
			'_________',
			'__xxxxx__',
			'__x___x__',
			'__x___x__',
			'__xxxxx__',
		], {
			x: { itemName: { rawtext: [{ text: "Pattern" }] }, itemDesc: ['§7This is a pattern!'], enchanted: false, stackAmount: 1, texture: 'minecraft:black_stained_glass_pane' },
		})
		.show(player).then(response => {
			if (response.canceled) return;
			world.sendMessage(`${player.name} has chosen item ${response.selection}`);
			if (response.selection === 45) return furnaceMenu(player);
		})
};

function furnaceMenu(player) {
	new FurnaceFormData(false) // true if furnace is lit or false if not
		.title('§l§6Furnace Menu')

		// 0 is input item, 1 is fuel and 2 is output item.
		.button(0, 'Cod', ['', '§7This is a fish'], 'minecraft:cod')
		.button(1, 'Coal', ['', '§7This is fuel'], 'minecraft:coal')
		.button(2, 'Stick', ['', '§7...which makes a stick!?'], 'textures/items/stick', 64)
		.show(player).then(response => {
			if (response.canceled) return;
			world.sendMessage(`${player.name} has chosen item ${response.selection}`);
			return primaryMenu(player);
		})
};