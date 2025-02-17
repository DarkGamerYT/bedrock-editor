import * as editor from "@minecraft/server-editor";
import * as server from "@minecraft/server";

console.log("Hello, world!");
editor.registerEditorExtension("king:test", (uiSession) => {
    uiSession.extensionContext;
    const action = uiSession.actionManager.createAction({
        actionType: editor.ActionTypes.NoArgsAction,
        onExecute: () => {
            
        },
    });

    uiSession.actionBar.registerItem("king:actionbar", action, {
        icon: "pack://textures/editor/blocks_counter.png",
        label: "Action"
    });
    return [];
}, (uiSession) => {

    return [];
}, {
    description: "Hello, world!",
    notes: "I don't really know."
});