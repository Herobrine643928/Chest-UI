import { Player } from "@minecraft/server";
import { ActionFormResponse } from "@minecraft/server-ui";

declare class ChestFormData {
	/**
	 * @param size The size of the chest. Can be 'small' or 'large'.
	 */
	constructor(size?: string);
	/**
	 * @remarks This builder method sets the title for the chest ui.
	 * @param text The title text for the chest ui.
	 */
	title(text: string): ChestFormData;
	/**
	 * @remarks Adds a button to this chest ui with an icon from a resource pack.
	 * @param slot The slot to display the item in.
	 * @param itemName The name of the item to display.
	 * @param itemDesc The item's lore to display.
	 * @param texture The type id or the path to the texture of the item or block.
	 * @param stackAmount The stack size for the item.
	 * @param enchanted If the item is enchanted or not.
	 */
	button(slot: number, itemName?: string, itemDesc?: string[], texture?: string, stackAmount?: number, enchanted?: boolean): ChestFormData;
	/**
	* @remarks Fills slots based off of strings and a key, with the first slot being the cordinate that the pattern starts at.
	* @param from The starting coordinates of the pattern, in [row, column] format, starting from [0, 0] in the top left corner.
	* @param pattern The pattern to use, with characters not defined in key being left empty.
	* @param key The data to display for each character in the pattern.
	* @example
	* gui.pattern([2, 1], [
				'xxxxxxxxx',
				'x_______x',
				'x___a___x',
				'x_______x',
				'x_______x',
				'xxxxxxxxx'
		], {
			x:  { data: { itemName: '', itemDesc: [], enchanted: false, stackAmount: 1 }, iconPath: 'minecraft:stained_glass_pane' },
			a:  { data: { itemName: 'Anvil', itemDesc: [], enchanted: true, stackAmount: 1 }, iconPath: 'minecraft:anvil'},
		})
	*/
	pattern(from: [number, number], pattern: string[], key: { [key: string]: { data: { itemName?: string, itemDesc?: string[], stackSize?: number, enchanted?: boolean }, iconPath: string } }): ChestFormData;
	/**
	  * @remarks
	  * Creates and shows this modal popup form. Returns
	  * asynchronously when the player confirms or cancels the
	  * dialog.
	  *
	  * This function can't be called in read-only mode.
	  *
	  * @param player
	  * Player to show this dialog to.
	 */
	show(player: Player): Promise<ActionFormResponse>;
}
export { ChestFormData };
