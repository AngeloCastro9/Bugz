<template>
    <md-content class="content">
      <b-jumbotron>
        <router-view></router-view>
      </b-jumbotron>
    </md-content>
</template>

<script>
export default {
    name: 'Content'
}
</script>

<style>
    .content {
        grid-area: content;
        background-color: rgb(102, 99, 99);
        padding: 20px;
    }

    div.jumbotron {
        padding-top: 34px;
        margin-bottom: 0;
        background-color: #00000057;
        height: 100%;
    }
</style>
