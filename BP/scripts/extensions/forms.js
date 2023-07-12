import { ActionFormData } from '@minecraft/server-ui';

const sizes = new Map([
	['single', [`§c§h§e§s§t§s§m§a§l§l§r`, 27]], ['double', [`§c§h§e§s§t§l§a§r§g§e§r`, 54]],
	['small', [`§c§h§e§s§t§s§m§a§l§l§r`, 27]], ['large', [`§c§h§e§s§t§l§a§r§g§e§r`, 54]]
]);
class ChestFormData {
	#titleText; #buttonArray;
	constructor(size = 'small') {
		const sizing = sizes.get(size) ?? [`§c§h§e§s§t§s§m§a§l§l§r`, 27];
		/** @internal */
		this.#titleText = sizing[0];
		/** @internal */
		this.#buttonArray = [];
		for (let i = 0; i < sizing[1]; i++)
			this.#buttonArray.push(['', undefined]);
	}
	title(text) {
		this.#titleText += text;
		return this;
	}
	button(slot, itemName, itemDesc, iconPath, stackSize = 1) {
		this.#buttonArray.splice(slot, 1, [`${'stack#' + (Math.max(stackSize, 1) < 11 ? '0' : '') + Math.min(Math.max(stackSize, 1), 99).toString()}§r${itemName ?? ''}§r${itemDesc?.length ? `\n§o§5${itemDesc.join('\n§o§5')}` : ''}`, iconPath]);
		return this;
	}
	show(player) {
		const form = new ActionFormData()
			.title(this.#titleText);
		this.#buttonArray.forEach(button => {
			form.button(button[0], button[1]);
		})
		return form.show(player)
	}
}

export { ChestFormData };