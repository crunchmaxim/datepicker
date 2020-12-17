<template lang="pug">
  .modal-wrapper
    .modal-content
        slot
</template>

<script>
export default {
    name: "ModalComponent"
}
</script>

<style lang="stylus">
.modal-wrapper {
    position: fixed;
    z-index: 7;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.4);
    display: flex;
    align-items: center;
    justify-content: center;        
}

.modal-content {
    background-color: #fff;
    border-radius: 5px; 
}
</style>