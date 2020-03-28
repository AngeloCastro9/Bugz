<template>
    <div class="content">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'Content'
}
</script>

<style>
    .content {

        grid-area: content;
        background-color: rgb(83, 80, 80);
        padding: 20px;
    }
</style>
