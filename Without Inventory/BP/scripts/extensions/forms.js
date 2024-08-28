import { ActionFormData } from '@minecraft/server-ui';
import { typeIdToDataId, typeIdToID } from './typeIds.js';

const number_of_1_16_100_items = 0;
const sizes = new Map([
	['single', ['§c§h§e§s§t§2§7§r', 27]], ['small', ['§c§h§e§s§t§2§7§r', 27]],
	['double', ['§c§h§e§s§t§5§4§r', 54]], ['large', ['§c§h§e§s§t§5§4§r', 54]],
	['5', ['§c§h§e§s§t§0§5§r', 5]],
	['9', ['§c§h§e§s§t§0§9§r', 9]],
	['18', ['§c§h§e§s§t§1§8§r', 18]],
	['27', ['§c§h§e§s§t§2§7§r', 27]],
	['36', ['§c§h§e§s§t§3§6§r', 36]],
	['45', ['§c§h§e§s§t§4§5§r', 45]],
	['54', ['§c§h§e§s§t§5§4§r', 54]]
]);
class ChestFormData {
	#titleText; #buttonArray;
	constructor(size = 'small') {
		const sizing = sizes.get(size) ?? ['§c§h§e§s§t§2§7§r', 27];
		/** @internal */
		this.#titleText = sizing[0];
		/** @internal */
		this.#buttonArray = [];
		for (let i = 0; i < sizing[1]; i++)
			this.#buttonArray.push(['', undefined]);
		this.slotCount = sizing[1];
	}
	title(text) {
		this.#titleText += text;
		return this;
	}
	button(slot, itemName, itemDesc, texture, stackSize = 1, enchanted = false) {
		const ID = typeIdToDataId.get(texture) ?? typeIdToID.get(texture);
		this.#buttonArray.splice(slot, 1, [`stack#${Math.min(Math.max(stackSize, 1) || 1, 99).toString().padStart(2, '0')}§r${itemName ?? ''}§r${itemDesc?.length ? `\n§r${itemDesc.join('\n§r')}` : ''}`,
		(((ID + (ID < 262 ? 0 : number_of_1_16_100_items)) * 65536) + (!!enchanted * 32768)) || texture
		]);
		return this;
	}
	pattern(pattern, key) {
		for (let i = 0; i < pattern.length; i++) {
			const row = pattern[i];
			for (let j = 0; j < row.length; j++) {
				const letter = row.charAt(j);
				if (key[letter]) {
					const slot = j + i * 9;
					const data = key[letter];
					const ID = typeIdToDataId.get(data.texture) ?? typeIdToID.get(data.texture);
					this.#buttonArray.splice(slot, 1, [`stack#${Math.min(Math.max(data?.stackAmount ?? 1, 1) || 1, 99).toString().padStart(2, '0')}§r${data?.itemName ?? ''}§r${data?.itemDesc?.length ? `\n§r${data?.itemDesc.join('\n§r')}` : ''}`,
					(((ID + (ID < 262 ? 0 : number_of_1_16_100_items)) * 65536) + (!!data?.enchanted * 32768)) || data.texture
					])
				}
			}
		}
		return this;
	}
	show(player) {
		const form = new ActionFormData()
			.title(this.#titleText);
		this.#buttonArray.forEach(button => {
			form.button(button[0], button[1]?.toString());
		})
		return form.show(player)
	}
}

export { ChestFormData };