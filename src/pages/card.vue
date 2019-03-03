<template>
    <f7-page name="catalog">
        <f7-navbar>
            <f7-nav-left>
                <f7-link icon-md="material:menu" panel-open="left"></f7-link>
            </f7-nav-left>
            <f7-nav-title>Card</f7-nav-title>
        </f7-navbar>
        <f7-list>
            <f7-list-item
                    v-for="(product) in products"
                    :key="product.id"
                    :title="product.title"
                    :link="`/product/${product.id}/`"
            ></f7-list-item>
        </f7-list>
    </f7-page>
</template>
<script>
    export default {
        data: function () {
            return {
                products: this.$f7.data.products,
            };
        }
    };
</script>
