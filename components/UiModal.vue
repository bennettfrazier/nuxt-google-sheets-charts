<template>
  <transition name="modalTransition" @after-enter="enableModal">
    <div v-if="showModal" class="uiModal" @click="close">
      <transition name="modalTransition" @after-leave="$emit('close')">
        <div
          v-if="showModal"
          class="uiModal__content"
          role="dialog"
          @click.stop
        >
          <button
            type="button"
            class="uiModal__closeButton"
            aria-label="Close modal"
            @click="close"
          >
            ×
          </button>
          <h3 class="uiModal__title">{{ title }}</h3>
          <slot></slot>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    showModal: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
  },
  methods: {
    close() {
      this.$emit('close')
      document.documentElement.style.overflow = 'auto'
    },
    enableModal() {
      document.documentElement.style.overflow = 'hidden'
    },
  },
}
</script>

<style lang="scss">
.uiModal {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100vw;
  height: 100vh;
  background: rgba($black, 0.6);
}
.uiModal__content {
  padding: 1.75rem 3.75rem 2.5rem 2.5rem;
  position: absolute;
  max-width: 1200px;
  background-color: $white;
  box-shadow: 0 3px 6px rgba($black, 0.16), 0 3px 6px rgba($black, 0.23);
  line-height: 1;
  border-radius: 0.5rem;
  top: 2%;
  left: 2%;
  width: 96%;
  max-height: 95vh;
  height: 98%;

  @include tablet {
    top: 50%;
    left: 50%;
    width: calc(100% - 1.25rem);
    transform: translate(-50%, -50%);
    max-height: 90vh;
    height: auto;
  }

  img {
    max-width: 100%;
    display: block;
    margin-top: 1rem;
  }
}

.uiModal__title {
  margin-bottom: 1rem;
  text-transform: uppercase;
}

.uiModal__closeButton {
  cursor: pointer;
  outline: none;
  position: absolute;
  z-index: 15;
  top: 0;
  right: 0;
  display: inline-block;
  font-size: 3rem;
  font-weight: 300;
  padding: 0.25rem 1rem;
  transition: 0.3s color ease-in-out;
  margin-top: 0;
  border: none;
  background: none;
}

.modalTransition-enter,
.modalTransition-leave-to {
  opacity: 0;
}

.modalTransition-enter-active,
.modalTransition-leave-active {
  transition: 0.2s opacity ease-out;
}
</style>
