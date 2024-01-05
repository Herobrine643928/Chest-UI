import { world } from '@minecraft/server';
import { ChestFormData } from './extensions/forms.js';

world.afterEvents.itemUse.subscribe(evd => {
	if (evd.itemStack.typeId !== 'minecraft:compass') return;
	primaryMenu(evd.source);
});
function primaryMenu(player) {
	new ChestFormData("small")
		.title('§l§aMain Menu')
		.pattern([
			"---------",
			"----o----",
			"---------",
		],
		{
			"-": {
				iconPath: "textures/blocks/glass_black",
				callback: () => primaryMenu(player)
			},
			"o": {
				iconPath: "textures/blocks/glass_white",
				itemName: "§l§6Secondary Menu",
				itemDesc: ["§r§7Click to open the secondary menu!"],
				callback: () => secondarymenu(player)
			}
		})
		.show(player);
};
function secondarymenu(player) {
	const items = [
		{ name: 'Test Item 1', texture: 'minecraft:acacia_log' },
		{ name: 'Test Item 2', texture: 'minecraft:gold_ore' },
		{ name: 'Test Item 3', texture: 'textures/items/diamond' }
	]
	const form = new ChestFormData('large')
		.title('§l§5Secondary Menu')
		.button(0, '§l§4Back', ['', '§r§cGo back a page!'], 'textures/blocks/barrier')
		.button(21, '§l§6Test Item 1', ['', '§r§7A testing item'], 'minecraft:magma_cream', 14, true, (r) => {
			player.sendMessage(`You clicked the first item!`)
		})
		.button(22, '§l§nTest Item 2', ['', '§r§7Another item'], 'textures/items/stick', 4, true, (r) => {
			player.sendMessage(`You clicked the second item!`)
		})
		.button(23, '§l§bTest Item 3', ['', '§r§7A third item'], 'minecraft:grass', 1, true, (r) => {
			player.sendMessage(`You clicked the third item!`)
		})
		.range([1, 0], [1, 8], (index, slot) => {
			if (!items[index]) return;
			const { name, texture } = items[index];
			form.button(slot, name, [], texture, 1, true, () => {
				player.sendMessage(`You clicked item ${index + 1}!`)
			})
		})
		.show(player);
};
