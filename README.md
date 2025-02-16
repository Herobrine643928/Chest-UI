# Chest-UI

A Minecraft: Bedrock Script API pack that alters the Action Form UI to look & function like a chest does.

![image_1](https://github.com/Herobrine643928/Chest-UI/assets/94234093/e8959623-7806-430d-b35c-184f4818e914)

![image_2](https://github.com/Herobrine643928/Chest-UI/assets/94234093/2ae6b3d8-535e-4164-8073-cabd92ac3d11)

![image_3](https://github.com/Herobrine643928/Chest-UI/assets/94234093/474ad660-d4f8-4280-9403-d1920efada77)

# Benefits

- As fast as vanilla forms
- Java-Servers styled UIs
- Cursor-following hover text
- Easy to read
- Good for large numbers of buttons
- Supports enchanted items and isometric blocks
- Supports durability

# Usage
- Import into file- this example will work for any top-level file. Changes will be needed for nested files.
```js
import { ChestFormData } from './extensions/forms.js';
```

- Create a new chest form, like you would for any other form UI. The size can be left out, and will default to `'small'`.
```js
const form = new ChestFormData()
```

- Add a name to the UI, to display at the top.
```js
form.title('Form Title')
```
- Add buttons!
```js
form.button(0, 'Button Name', ['Button Lore'], 'minecraft:diamond', 10)
form.button(2, 'Button Name', ['Button Lore'], 'textures/items/my_custom_item', 6, 60)
```
- The parameters for the button are as follows:
1. **Location**: The slot that the item will display in, starting from zero. Max of 26 for a small chest, or 53 for a large.
2. **Name**: The text of the button.
3. **Lore**: An array of strings which will display below the item's name.
4. **Texture**: Item/block type id or path to the texture. Can be used like `minecraft:cake` or `minecraft:acacia_log` (A namespace of `minecraft:` will be assumed if not specified). For custom textures, specify the path of the texture (Must include `textures/` at the start of the path). ⚠️ If you don't know the amount of custom items your other add-ons have, it is recommended to use `textures/path_to_texture` and avoid using type id!
5. **Stack size**: This is an optional parameter, and will default to 1. Displays a small number in the lower right-hand corner- useful for shops selling multiple of an item at once!
6. **Durability**: This is an optional parameter, and will default to 0. Supports value between 0 and 99. Displays the durability that can set using the form interface- useful for tools and in general for looks.
7. **Enchanted**: This is an optional parameter, and will default to false. Displays the enchant glint effect on the item/block rendered if using the type id. This parameter will not work if using a custom textures path (`textures/...`)

- Pattern function can also be used for creating quick slot filler buttons. See the example `index.js`!

- Show it to the player & get a response.
```js
form.show(player).then(response)
```

# Inventory Section
The inventory section of the UI can be toggled by a boolean value in `RP/ui/_global_variables.json`.
Set it to true/false depending on what you want the UI to show as!

# Examples
Example pack usage: [`index.js`](https://github.com/Herobrine643928/Chest-UI/blob/main/BP/scripts/index.js).

Find a list of item/block type ids [here](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/addonsreference/examples/addonitems).

# Custom Items and Blocks
If your other enabled packs contain custom items and blocks, and you want type ids to work, list them as follows:
1. Navigate to `BP/script/extensions/forms.js`
2. Add the relevant item information into the `custom_content` constant at the top of the file!

# Dynamic Sizing/Custom Number of Slots?

If you want custom chest slots sizes, you have to add controls to `"chest_panel"` in `chest_server_form.json` in the format like the ones that already exist. Then you have to edit `forms.js`, and add your condition and identifier to `sizes` map/array following the format using which how pre-defined sizes are added.

# Edit Background Texture

Open `chest_server_form.json` and search and change `$border_and_background_texture` (ninesliced) variable.

# Future Ideas

- ~~Functioning inventory section (it’s just for looks at the moment) (feels impossible to do)~~ Done.
- ~~Dynamic sizing based on number of buttons, in rows of 9 at a time (complex and probably have to rewrite everything)~~ Done.
- ~~Rawtext component support for form text (useful for translations to other languages)~~ Done.

# Credits

Original pack created by [LeGend077](https://github.com/LeGend077).

Maintained by [Herobrine64](https://discord.com/users/330740982117302283) & [LeGend077](https://discord.com/users/695712100072292482).

Pattern function created by [Aex66](https://github.com/Aex66).
