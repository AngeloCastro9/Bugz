<template>
    <footer class="footer">
        <span class="copyright">Copyright <strong>Bugz</strong> © 2020</span>
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
        background: linear-gradient(to right, #303c55, #306c7d);

        color: rgb(233, 232, 232);

        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding-right: 10px;
    }

    .copyright {
        margin-right: 25px;
    }
</style>
