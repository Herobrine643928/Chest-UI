import { system, world } from '@minecraft/server';
import { ChestFormData } from './extensions/forms.js';
import { ActionFormData } from '@minecraft/server-ui';

world.afterEvents.itemUse.subscribe(evd => {
	if (evd.itemStack.typeId !== 'minecraft:compass') return;
	primaryMenu(evd.source);

});
function primaryMenu(player) {
	new ChestFormData('9')
		.title('Main Menu')
		.button(1, '§l§3Test Item 1', ['', '§r§7A testing item', 'Click any item!'], 'minecraft:filled_end_portal_frame', 2)
		.button(4, '§l§bIron Pick', ['', '§r§7Another item', 'Click any item!'], 'minecraft:iron_pickaxe', 1, 60, true)
		.button(7, '§l§dTest Item 3', ['', '§r§7A third item', 'Click any item!'], 'textures/items/diamond', 1)
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
		.button(22, '§l§nTest Item 2', ['', '§r§7Another item'], 'textures/items/netherite_axe', 1, 10)
		.button(23, '§l§bTest Item 3', ['', '§r§7A third item'], 'minecraft:gold_block', 64, 0, true)
		.pattern([
			'_________',
			'__xxxxx__',
			'__x___x__',
			'__x___x__',
			'__xxxxx__',
		], {
			x: { itemName: 'Pattern', itemDesc: ['§7This is a pattern!'], enchanted: false, stackAmount: 1, texture: 'minecraft:stained_glass_pane' },
		})
		.show(player).then(response => {
			if (response.canceled) return;
			if (response.selection === 0) return primaryMenu(player);
			world.sendMessage(`${player.name} has chosen item ${response.selection}`);
		})
};