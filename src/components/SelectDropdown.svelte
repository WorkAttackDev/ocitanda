<script>
  import { createEventDispatcher } from "svelte";
  import { SelectMinor } from "svelte-polaris-icons";
  import { slide } from "svelte/transition";

  export let items = [""],
    label = "Lorem",
    className = "",
    labelClassName = "",
  anchor = false, selected = items[0];

  const dispatch = createEventDispatcher();

  let showlist = false;

  const toogleShowList = () => (showlist = !showlist);
  const onSelectItem = (item = "") => {
    if (selected === item) return;
    selected = item;
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
  <p class={`uppercase text-sm mr-4 whitespace-no-wrap ${labelClassName}`}>
    {label}
  </p>
  <div
    class="relative flex py-1 px-2 bg-ocitanda-beige"
    tabindex="0"
    role="select">
    <span class="w-full flex justify-between item-center cursor-pointer">
      <p
        on:click={toogleShowList}
        class="mr-4 whitespace-no-wrap text-ocitanda-green">
        {selected}
      </p>
      <SelectMinor on:click={toogleShowList} class="w-5" />
    </span>
    {#if showlist}
      <ul
        tabindex="0"
        autofocus
        on:blur={() => (showlist = false)}
        transition:slide
        class="absolute z-30 left-0 flex flex-col w-full bg-ocitanda-beige">
        {#if !anchor}
          {#each items as item}
            <li
              on:click|preventDefault={() => onSelectItem(item)}
              class="p-2 border-b-2 border-gray-200 cursor-pointer"
              class:active={item === selected}>
              {item}
            </li>
          {/each}
        {:else}
          {#each items as item}
            <li
              class="border-b-2 border-gray-200 cursor-pointer p-0"
              class:active={item === selected}>
              <a class="p-2" href={item.href}>{item.text}</a>
            </li>
          {/each}
        {/if}
      </ul>
    {/if}
  </div>
</div>
