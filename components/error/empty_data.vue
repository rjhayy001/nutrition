<template>
    <div class="no-data">
        <img src="/images/Frame.png" alt="">
        <p>aucun données disponible</p>
    </div>
</template>
<script>
export default {
    data() {
        return {


        }
    }
}
</script>
<style scoped>
    p {
        color: #C1C1C1;
        font-size: 30px;
        text-transform: uppercase;
        width: 87%;
        margin: 0 auto;
        opacity:0.5;
        font-weight:600;
    }

    .no-data {
        text-align: center;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
    }
</style>
