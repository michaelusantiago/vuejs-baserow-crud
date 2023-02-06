<script setup lang="ts">
    import { onUnmounted } from 'vue';
    const props = defineProps({
        width: String,
        height: String
    })

    const emit = defineEmits(['close'])

    const onClose = (e: Event) => {
        const element = e.target as HTMLElement
        if (['bg-window', 'close-btn', 'i-btn'].includes(element.id)) emit('close')
    }

    // Handle Tab key press
    let modal: HTMLDivElement

	const handle_keydown = (e: any) => {
        if (!modal) return
		if (e.key === 'Escape') emit('close')

		if (e.key === 'Tab') {
			// trap focus
			const nodes = modal.querySelectorAll('*');
			const tabbable = Array.from(nodes).filter((n: any) => {
                // If element is button and disabled, skip that specifict element (button)
                // This is to resolve freezing issue when the element is reached by tab but the element is disabled
                const disabled_element = (n as HTMLButtonElement)
                disabled_element.disabled
                return (n.tabIndex >= 0 && (!disabled_element.disabled))
            });

			let index = tabbable.indexOf(document.activeElement as HTMLElement);
			if (index === -1 && e.shiftKey) index = 0;

			index += tabbable.length + (e.shiftKey ? -1 : 1);
			index %= tabbable.length;

			(tabbable[index] as HTMLElement).focus();
			e.preventDefault();
		}
	}

    const previously_focused = typeof document !== 'undefined' && document.activeElement;

	if (previously_focused) {
		onUnmounted(() => {
			(previously_focused as HTMLElement).focus();
		});
	}

    window.addEventListener("keydown", handle_keydown)
</script>


<template>
    <div id="bg-window" @click="onClose" class="background-window">
        <div ref="modal" :style="{height, width}" class="front-window">
            <header>
                <button id="close-btn" @click="onClose">
                    <i id="i-btn" class="ri-close-line"></i>
                </button>
            </header>
            <slot/>
        </div>
    </div>
</template>

<style scoped lang="postcss">
    .background-window {
        position: fixed;
        left: 0;
        top: 0;
        display: flex;
        place-content: center;
        height: 100vh;
        width: 100vw;
        background-color: rgba(2, 2, 2, 0.5);
        z-index: 1;
        padding: 10px;
    }
    .front-window {
        background-color: white;
        border-radius: 7px;
        margin: auto;
    }

    header {
        display: flex;
        justify-content: flex-end;
        padding: 7px;
        border-bottom: solid 0.5px darkgray;

        #close-btn {
            border: none;
            display: flex;
            place-content: center;
            align-items: center;
            background-color: transparent;
            border-radius: 50px;
            height: 30px;
            width: 30px;
            font-size: 1rem;
        }
        #close-btn:hover {
            background-color: rgba(22, 22, 22, 0.3);
        }
    }
</style>
