<script>
    import { EditMajorMonotone, FeaturedCollectionMajorMonotone } from "svelte-polaris-icons";
</script>

<article class="flex bg-ocitanda-beige text-ocitanda-green mt-4 mb-6 mx-auto max-w-xs">
    <button class="flex flex-col justify-center items-center w-1/2 p-2 border-r-2 border-gray-200">
        <EditMajorMonotone class="w-5 fill-current opacity-75" />
        <p>Editar</p>
    </button>
    <button class="flex flex-col justify-center items-center w-1/2 p-2 ">
        <FeaturedCollectionMajorMonotone class="w-5 fill-current opacity-75" />
        <p>Favoritos</p>
    </button>
</article>