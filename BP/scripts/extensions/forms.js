import { ActionFormData } from '@minecraft/server-ui';
import { typeIdToDataId, typeIdToID } from './typeIds.js';
import { BlockTypes, Container, EntityInventoryComponent, ItemDurabilityComponent } from '@minecraft/server';

/**
 * Defines the custom block & item IDs for the form.
 * You can reference either a vanilla texture icon, which functions identically to other items...
 * ...or reference a texture path, which removes enchant glint and 3d block render capability.
 */
const custom_content = {
	/*
	'custom:block': {
		texture: 'minecraft:gold_block',
		type: 'block'
	},
	'custom:item': {
		texture: 'textures/items/paper',
		type: 'item'
	},
	*/
};
//Blocks are excluded from the count, as they do not shift vanilla IDs.
const number_of_custom_items = Object.values(custom_content).filter(v => v.type === 'item').length;
const custom_content_keys = new Set(Object.keys(custom_content));
//Add custom sizes defined in UI
const sizes = new Map([
	['single', ['§c§h§e§s§t§2§7§r', 27]], ['small', ['§c§h§e§s§t§2§7§r', 27]],
	['double', ['§c§h§e§s§t§5§4§r', 54]], ['large', ['§c§h§e§s§t§5§4§r', 54]],
	['1', ['§c§h§e§s§t§0§1§r', 1]],
	['5', ['§c§h§e§s§t§0§5§r', 5]],
	['9', ['§c§h§e§s§t§0§9§r', 9]],
	['18', ['§c§h§e§s§t§1§8§r', 18]],
	['27', ['§c§h§e§s§t§2§7§r', 27]],
	['36', ['§c§h§e§s§t§3§6§r', 36]],
	['45', ['§c§h§e§s§t§4§5§r', 45]],
	['54', ['§c§h§e§s§t§5§4§r', 54]],
	[1, ['§c§h§e§s§t§0§1§r', 1]],
	[5, ['§c§h§e§s§t§0§5§r', 5]],
	[9, ['§c§h§e§s§t§0§9§r', 9]],
	[18, ['§c§h§e§s§t§1§8§r', 18]],
	[27, ['§c§h§e§s§t§2§7§r', 27]],
	[36, ['§c§h§e§s§t§3§6§r', 36]],
	[45, ['§c§h§e§s§t§4§5§r', 45]],
	[54, ['§c§h§e§s§t§5§4§r', 54]]
]);
class ChestFormData {
	#titleText; #buttonArray;
	constructor(size = 'small') {
		const sizing = sizes.get(size) ?? ['§c§h§e§s§t§2§7§r', 27];
		/** @internal */
		this.#titleText = { rawtext: [{ text: `${sizing[0]}` }] };
		/** @internal */
		this.#buttonArray = [];
		for (let i = 0; i < sizing[1]; i++) {
			this.#buttonArray.push(['', undefined])
		};
		this.slotCount = sizing[1];
	}
	title(text) {
		if (typeof (text) === 'string') {
			this.#titleText.rawtext.push({
				text: `${text}`
			})
		} else if (typeof (text) === 'object') {
			if (!text.rawtext) {
				this.#titleText.rawtext.push({
					text: ''
				})
			}
			else {
				text.rawtext.forEach((obj) => {
					this.#titleText.rawtext.push(obj)
				})
			}
		}
		else {
			this.#titleText.rawtext.push({
				text: ''
			})
		}
		return this;
	}
	button(slot, itemName, itemDesc, texture, stackSize = 1, durability = 0, enchanted = false) {
		const targetTexture = custom_content_keys.has(texture) ? custom_content[texture]?.texture : texture;
		const ID = typeIdToDataId.get(targetTexture) ?? typeIdToID.get(targetTexture);
		let buttonRawtext = {
			rawtext: [
				{
					text: `stack#${Math.min(Math.max(stackSize, 1) || 1, 99).toString().padStart(2, '0')}dur#${Math.min(Math.max(durability, 0) || 0, 99).toString().padStart(2, '0')}§r`
				}
			]
		}
		if (typeof (itemName) === 'string') {
			buttonRawtext.rawtext.push({ text: itemName ? itemName + '§r' : '§r' })
		} else if (typeof (itemName) === 'object') {
			if (!itemName.rawtext) { buttonRawtext.rawtext.push({ text: '§r' }) }
			else {
				itemName.rawtext.forEach((obj) => {
					buttonRawtext.rawtext.push(obj)
				})
				buttonRawtext.rawtext.push({ text: '§r' })
			}
		} else { return }

		if (itemDesc?.length) {
			itemDesc.forEach((obj) => {
				if (typeof (obj) === 'string') {
					buttonRawtext.rawtext.push({ text: `\n${obj}` })
				} else if (typeof (obj) === "object") {
					if (!obj.rawtext) { buttonRawtext.rawtext.push({ text: `\n` }) }
					else {
						obj.rawtext.forEach((desc) => {
							buttonRawtext.rawtext.push({ text: `\n` })
							buttonRawtext.rawtext.push(desc)
						})
					}
				}
			})
		}
		this.#buttonArray.splice(slot, 1, [
			buttonRawtext,
			(((ID + (ID < 256 ? 0 : number_of_custom_items)) * 65536) + (!!enchanted * 32768)) || targetTexture
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
					const targetTexture = custom_content_keys.has(data.texture) ? custom_content[data.texture]?.texture : data.texture;
					const ID = typeIdToDataId.get(targetTexture) ?? typeIdToID.get(targetTexture);
					let buttonRawtext = {
						rawtext: [
							{
								text: `stack#${Math.min(Math.max(data?.stackAmount ?? 1, 1) || 1, 99).toString().padStart(2, '0')}dur#${Math.min(Math.max(data?.durability, 0) || 0, 99).toString().padStart(2, '0')}§r`
							}
						]
					}
					if (typeof (data?.itemName) === 'string') {
						buttonRawtext.rawtext.push({ text: data?.itemName ? data?.itemName + '§r' : '§r' })
					} else if (typeof (data?.itemName) === 'object') {
						if (!data?.itemName.rawtext) { buttonRawtext.rawtext.push({ text: '§r' }) }
						else {
							data?.itemName.rawtext.forEach((obj) => {
								buttonRawtext.rawtext.push(obj)
							})
							buttonRawtext.rawtext.push({ text: '§r' })
						}
					} else { return }

					if (data?.itemDesc?.length) {
						data?.itemDesc?.forEach((obj) => {
							if (typeof (obj) === 'string') {
								buttonRawtext.rawtext.push({ text: `\n${obj}` })
							} else if (typeof (obj) === "object") {
								if (!obj.rawtext) { buttonRawtext.rawtext.push({ text: `\n` }) }
								else {
									obj.rawtext.forEach((desc) => {
										buttonRawtext.rawtext.push({ text: `\n` })
										buttonRawtext.rawtext.push(desc)
									})
								}
							}
						})
					}
					this.#buttonArray.splice(slot, 1, [buttonRawtext,
						(((ID + (ID < 256 ? 0 : number_of_custom_items)) * 65536) + (!!data?.enchanted * 32768)) || targetTexture
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

		/**
		 * @type {Container} inventory
		 */
		const container = player.getComponent('minecraft:inventory').container;

		for (let i = 0; i < container.size; i++) {
			if (container.getItem(i)) {
				const item = container.getItem(i);
				const targetTexture = custom_content_keys.has(item.typeId) ? custom_content[texture]?.texture : item.typeId;
				const ID = typeIdToDataId.get(targetTexture) ?? typeIdToID.get(targetTexture);
				const durability = item.getComponent('minecraft:durability');
				const durDamage = durability ? Math.round((durability.maxDurability - durability.damage) / durability.maxDurability * 99) : 0;

				const amount = item.amount;
				const itemName = () => {
					return item.typeId.split(":")
						.pop()
						.replace(/_/g, " ")
						.replace(/\b\w/g, char => char.toUpperCase());
				}

				let buttonRawtext = {
					rawtext: [
						{
							text: `stack#${amount.toString().padStart(2, '0')}dur#${Math.min(Math.max(durDamage, 0) || 0, 99).toString().padStart(2, '0')}§r${itemName()}`
						}
					]
				}
				item.getLore().forEach((obj) => {
					buttonRawtext.rawtext.push({ text: `\n${obj}` })
				})

				form.button(buttonRawtext, `${((ID + (ID < 256 ? 0 : number_of_custom_items)) * 65536) || targetTexture}`)
			} else {
				form.button('')
			}
		}
		return form.show(player)
	}
}

export { ChestFormData };