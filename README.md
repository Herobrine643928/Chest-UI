# Chest-UI

A Minecraft: Bedrock Script API pack that alters the Action Form UI to look & function like a chest does.

![image](https://media.discordapp.net/attachments/987989038508159046/1138744566300823582/image.png)

![image](https://github.com/Herobrine643928/Chest-UI/assets/98607285/68a5cc4b-66c7-458d-a99b-acb7e67e9267)

![image](https://user-images.githubusercontent.com/98607285/252969106-5662673a-2cda-40c1-b768-ef5111ef2525.png)

# Benefits

- As fast as vanilla forms
- Java-style UIs
- Cursor-following hover text
- Easy to read
- Good for large numbers of buttons
- Supports enchanted items and isometric blocks

**For Pack's additional features/add-ons, visit the `additional-features` branch.**

Note that the inventory section of the form is simply for display, and does not reflect the actual player's inventory. Hopefully coming soon!

Also note that custom UI retextures will not affect these UIs, as they are controlled by `RP/textures/ui/generic_27.png` & `RP/textures/ui/generic_54.png`.

# Usage
Import into file- this example will work for any top-level file. Changes will be needed for nested files.
```js
import { ChestFormData } from './extensions/forms.js';
```

Create a new chest form, like you would for any other form UI. The size can be left out, and will default to `'small'`.
```js
const form = new ChestFormData()
```

Add a name to the UI, to display at the top.
```js
form.title('Form Title')
```
Add buttons!
```js
form.button(0, 'Button Name', ['Button Lore'], 'minecraft:diamond', 10)
form.button(2, 'Button Name', ['Button Lore'], 'textures/items/my_custom_item', 6)
```
The parameters for the button are as follows:
1. Location. The slot that the item will display in, starting from zero. Max of 26 for a small chest, or 53 for a large.
2. Name. The name of the button.
3. Lore. An array of strings which will display below the item's name.
4. Texture. Item/block type id or path to the texture. Can be used like `minecraft:cake` or `minecraft:acacia_log` (A namespace of `minecraft:` will be assumed if not specified). For custom textures, specify the path of the texture (Must include `textures/` at the start of the path)
5. Stack size. This is an optional parameter, and will default to 1. Displays a small number in the lower right-hand corner- useful for shops selling multiple of an item at once!
6. Enchanted. This is an optional parameter, and will default to false. Displays the enchant glint effect on the item/block rendered if using the type id. This parameter will not work if using a custom textures path (`textures/...`)

Show it to the player & get a response
```js
form.show(player).then(response)
```

Example usage: [`index.js`](https://github.com/Herobrine643928/Chest-UI/blob/main/BP/scripts/index.js).

Find all item/block type ids [here](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/addonsreference/examples/addonitems).

# Future Ideas

- Functioning inventory section (it’s just for looks at the moment)
- Customizable background (Using the vanilla ui nineslice, as right now it’s just a static texture)
- Dynamic sizing based on number of buttons, in rows of 9 at a time.

# Credits

Maintained by [Herobrine64](https://discord.com/users/330740982117302283) & [LeGend077](https://discord.com/users/695712100072292482).
