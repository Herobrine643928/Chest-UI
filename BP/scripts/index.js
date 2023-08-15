import { system, world } from '@minecraft/server';
import { ChestFormData } from './extensions/forms.js';

world.afterEvents.itemUse.subscribe(evd => {
	if (evd.itemStack.typeId !== 'minecraft:compass') return;
	primaryMenu(evd.source);
});
function primaryMenu(player) {
	new ChestFormData()
		.title('§l§aMain Menu')
		.button(12, '§l§6Test Item 1', ['', '§r§7A testing item', 'Click any item!'], "minecraft:acacia_log")
		.button(13, '§l§bTest Item 2', ['', '§r§7Another item', 'Click any item!'], "minecraft:gold_ore", 64, true)
		.button(14, '§l§dTest Item 3', ['', '§r§7A third item', 'Click any item!'], "textures/items/diamond", 5)
		.show(player).then(response => {
			if (response.canceled) return;
			world.sendMessage(`${player.name} has chosen item ${response.selection}`);
			secondarymenu(player);
		})
};
function secondarymenu(player) {
	new ChestFormData('large')
		.title('§l§5Secondary Menu')
		.button(0, '§l§4Back', ['', '§r§cGo back a page!'], 'textures/blocks/barrier')
		.button(21, '§l§6Test Item 1', ['', '§r§7A testing item'], 'minecraft:magma_cream', 14)
		.button(22, '§l§nTest Item 2', ['', '§r§7Another item'], 'textures/items/stick', 4)
		.button(23, '§l§bTest Item 3', ['', '§r§7A third item'], 'minecraft:grass', 1, true)
		.pattern([1, 2], [
			'xxxxx',
			'x___x',
			'x___x',
			'xxxxx',
		], {
			x: { data: { itemName: 'Pattern', itemDesc: ['§7This is a pattern!'], enchanted: false, stackAmount: 1 }, iconPath: 'minecraft:stained_glass_pane' },
		})
		.show(player).then(response => {
			if (response.canceled) return;
			if (response.selection === 0) return primaryMenu(player);
			world.sendMessage(`${player.name} has chosen item ${response.selection}`);
		})
};