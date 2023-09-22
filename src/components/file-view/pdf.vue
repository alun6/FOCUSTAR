<template>
   <iframe :src="src" frameborder="0" id="pdfID" width="100%" height="100%" scrolling="auto" style="position:absolute;left: 0px;z-index:1000"></iframe>
</template>

<script>
export default {
    props: ['src',],
    name:'pdfView',
}
</script>

<style>

</style>