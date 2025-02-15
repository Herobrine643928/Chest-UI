import { world } from '@minecraft/server';
import { ChestFormData } from './extensions/forms.js';

world.afterEvents.itemUse.subscribe(evd => {
	if (evd.itemStack.typeId !== 'minecraft:compass') return;
	primaryMenu(evd.source);
});

function primaryMenu(player) {
	new ChestFormData('9')
		.title({ rawtext: [{ text: 'Primary Menu' }] })
		.button(1, { rawtext: [{ translate: "accessibility.screen.tts.title", with: ["Next"] }] }, ['', '§r§7A testing item', 'Click any item!'], 'minecraft:filled_end_portal_frame', 2)
		.button(4, '§l§bIron Pick', [], 'minecraft:iron_pickaxe', 1, 60, true)
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
		.button(23, '§l§bTest Item 3', ['', '§r§7A third item'], 'minecraft:tnt', 64, 0, true)
		.button(30, '§l§2Test Item 4', ['', '§r§7A fourth item'], 'custom:item', 64, 0, true)
		.pattern([
			'_________',
			'__xxxxx__',
			'__x___x__',
			'__x___x__',
			'__xxxxx__',
		], {
			x: { itemName: { rawtext: [{ text: "Pattern" }] }, itemDesc: ['§7This is a pattern!'], enchanted: false, stackAmount: 1, texture: 'minecraft:stained_glass_pane' },
		})
		.show(player).then(response => {
			if (response.canceled) return;
			if (response.selection === 0) return primaryMenu(player);
			world.sendMessage(`${player.name} has chosen item ${response.selection}`);
		})
};