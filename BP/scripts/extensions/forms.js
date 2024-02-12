import { ActionFormData } from '@minecraft/server-ui';
import { typeIdToID } from "./typeIds.js";

const number_of_1_16_100_items = 1;
const sizes = new Map([
	['single', [`§c§h§e§s§t§s§m§a§l§l§r`, 27]], ['double', [`§c§h§e§s§t§l§a§r§g§e§r`, 54]],
	['small', [`§c§h§e§s§t§s§m§a§l§l§r`, 27]], ['large', [`§c§h§e§s§t§l§a§r§g§e§r`, 54]]
]);
class ChestFormData {
	#titleText; #buttonArray;
	constructor(size = 'small') {
		const sizing = sizes.get(size) ?? [`§c§h§e§s§t§s§m§a§l§l§r`, 27];
		this.callbacks = new Map();
		/** @internal */
		this.#titleText = sizing[0];
		/** @internal */
		this.#buttonArray = [];
		for (let i = 0; i < sizing[1]; i++) this.#buttonArray.push(['', undefined]);
	}
	title(text) {
		this.#titleText += text;
		return this;
	}
	button(slot, itemName, itemDesc, iconPath, stackSize = 1, enchanted = false, callback = null) {
		const ID = typeIdToID.get(iconPath.includes(':') ? iconPath : 'minecraft:' + iconPath)
		this.#buttonArray.splice(slot, 1, [`stack#${Math.min(Math.max(stackSize, 1) || 1, 99).toString().padStart(2, '0')}§r${itemName ?? ''}§r${itemDesc?.length ? `\n§r${itemDesc.join('\n§r')}` : ''}`,
		(((ID + (ID < 256 ? 0 : number_of_1_16_100_items)) * 65536) + (!!enchanted * 32768)) || iconPath]); 
                callback ? this.callbacks.set(slot, callback) : null;
		return this;
	}
	pattern(from, pattern, key) {
		for (let i = 0; i < pattern.length; i++) {
			const row = pattern[i];
			for (let j = 0; j < row.length; j++) {
				const letter = row.charAt(j);
				if (key[letter]) {
					const slot = from[1] + j + (from[0] + i) * 9; 
					const data = key[letter];
					const icon = key[letter].iconPath;
					const ID = typeIdToID.get(icon.includes(':') ? icon : 'minecraft:' + icon);
					this.#buttonArray.splice(slot, 1, [`stack#${Math.min(Math.max(data?.stackAmount ?? 1, 1) || 1, 99).toString().padStart(2, '0')}§r${data?.itemName ?? ''}§r${data?.itemDesc?.length ? `\n§r${data?.itemDesc.join('\n§r')}` : ''}`,
					(((ID + (ID < 256 ? 0 : number_of_1_16_100_items)) * 65536) + (!!data?.enchanted * 32768)) || icon, data?.callback ? this.callbacks.set(slot, data?.callback) : null
					])
				}
			}
		}
		return this;
	}
	show(player, wait) {
		const form = new ActionFormData()
			.title(this.#titleText);
		this.#buttonArray.forEach(button => {
			form.button(button[0], button[1]?.toString());
		})
		if (wait) return form.show(player).then(({cancelationReason, selection}) => {
                if (cancelationReason === 'UserBusy') return this.show(player, true);
		this.callbacks.get(selection)?.(selection);
		}); else return form.show(player)
	}
}

export { ChestFormData };
