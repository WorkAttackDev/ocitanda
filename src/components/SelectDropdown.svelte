<script>
  import { createEventDispatcher } from "svelte";
  import { SelectMinor } from "svelte-polaris-icons";
  import { slide } from "svelte/transition";

  const item = { text: "" };
  export let items = [item],
    empty = false,
    label = "Lorem",
    className = "",
    labelClassName = "",
    anchor = false,
    selected = empty ? "selecione" : items[0].text || items[0];

  const dispatch = createEventDispatcher();

  let showlist = false;

  const toogleShowList = () => (showlist = !showlist);
  const onSelectItem = (item = { text: "" }) => {
    if (selected === item.text || selected === item) return;
    selected = item.text || item;
    dispatch("selectitem", item);
  };
</script>

<style>
  .active {
    @apply bg-ocitanda-khaki;
  }

  ul {
    top: 100%;
  }
</style>

<div class={'flex items-center mx-4 my-2 ' + className} role="combobox">
  <p
    class={`uppercase text-xs font-medium mr-4 whitespace-no-wrap ${labelClassName}`}>
    {label}
  </p>
  <div
    on:click={toogleShowList}
    class="relative flex py-1 px-2 bg-ocitanda-beige"
    tabindex="0"
    role="select">
    <span class="w-full flex justify-between item-center cursor-pointer">
      <p class="mr-4 whitespace-no-wrap text-ocitanda-green">{selected}</p>
      <SelectMinor class="w-5 h-5" />
    </span>
    {#if showlist}
      <ul
        tabindex="0"
        on:blur={() => (showlist = false)}
        transition:slide
        class="absolute z-30 left-0 flex flex-col w-full max-h-40 overflow-y-auto bg-ocitanda-beige">
        {#if !anchor}
          {#each items as item}
            <li
              on:click|preventDefault={() => onSelectItem(item)}
              class="p-2 border-b-2 border-gray-200 cursor-pointer"
              class:active={item.text === selected || item === selected}>
              {item.text || item}
            </li>
          {/each}
        {:else}
          {#each items as item}
            <li
              class="border-b-2 border-gray-200 cursor-pointer p-0 w-full"
              class:active={item === selected}>
              <a class="p-2 w-full block" href={item.href}>{item.text}</a>
            </li>
          {/each}
        {/if}
      </ul>
    {/if}
  </div>
</div>
