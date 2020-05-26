<script>
    import UserAvatar from "../../components/UserAvatar.svelte";
    import ActionBox from "../../components/user/ActionBox.svelte";
    import ProductSection from "../../components/ProductSection.svelte";
    import { products } from "../../data/products";
</script>
<section>
    <UserAvatar loggedIn />
    <ActionBox />
    <ProductSection title="Histórico de Compra" products={products.slice(1, 6)} />
</section>