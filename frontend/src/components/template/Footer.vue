<template>
    <footer class="footer">
        <span>Copyright <strong>Bugz</strong> © 2020</span>
    </footer>
</template>

<script>
export default {
    name: "Footer"
}
</script>

<style>
    .footer {
        grid-area: footer;
        background-color:  rgb(83, 80, 80);
        color: black;

        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding-right: 10px;
    }
</style>
