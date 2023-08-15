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
	* Creates a slots based off of a strings and a key with the first slot being the cordinate that it starts
	* @param {Array} from
	* @param {string} pattern
	* @param {{ [key: string]: { data: { itemName: string, itemDesc: string[], stackSize: number, enchanted: boolean }, iconPath: string } }} key
	* @example
	* gui.pattern([2, 1], [
		    'xxxxxxxxx',
            'x_______x',
            'x___a___x',
            'x_______x',
            'x_______x',
            'xxxxxxxxx'
	   ], {
		   x:  { data: { name: '', 'lore': [], 'enchanted': false, 'stackSize': 1, enchants: [] }, icon: 'minecraft:stained_glass_pane' },
           a:  { data: { name: 'Anvil', 'lore': [], 'enchanted': true, 'stackSize': 1, enchants: [] }, icon: 'minecraft:anvil'},
	   })
	*/
	pattern(from: [number, number], pattern: string[], key: { [key: string]: { data: { itemName: string, itemDesc: string[], stackSize: number, enchanted: boolean }, iconPath: string } }): ChestFormData;
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