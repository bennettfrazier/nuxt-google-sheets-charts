<template>
  <button :class="`uiButton ${hasIcon}`" @click="onClick">
    <slot>{{ text }}</slot>
    <img
      v-if="icon"
      class="uiButton__icon"
      :src="require(`assets/svg/${icon}-icon.svg`)"
      :alt="`${icon} icon`"
    />
  </button>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: '',
    },
    href: {
      type: String,
      default: '',
    },
    target: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: '',
    },
  },
  computed: {
    hasIcon() {
      return this.icon !== '' ? 'uiButton--hasIcon' : ''
    },
  },
  methods: {
    onClick() {
      this.trackEvent({
        action: 'button|click',
        label: this.text,
      })

      // open href using target
      if (this.href !== '') {
        window.open(this.href, this.target)
      }
    },
    trackEvent() {
      // Not complete, but shown for demo purposes
      // This would extend to a JS module that pushes config to GTM data layer
    },
  },
}
</script>

<style lang="scss">
.uiButton {
  position: relative;
  cursor: pointer;
  border-radius: 3px;
  color: $black;
  line-height: 1;
  outline: 0;
  margin-top: 0.5rem;
  transform: translateY(-0.2rem);
  font-size: 0.8rem;
  padding: 0.5rem 0.8rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  display: inline-block;
  background-color: transparent;
  border: 1px solid $black;
  transition: color 0.3s ease-in-out, background-color 0.3s ease-in-out;
  will-change: color, background-color;

  &:hover,
  &:focus {
    background-color: $black;
    color: $white;
  }

  &:disabled {
    opacity: 0.4;
    cursor: default;

    &:hover,
    &:focus {
      color: $black;
      background-color: transparent;
      border: 1px solid $black;
    }
  }

  @media print {
    display: none;
  }
}

.uiButton__icon {
  max-width: 15px;
  position: absolute;
  right: 1rem;
  top: 0.3rem;
  display: inline-block;
}

// modifiers
.uiButton--hasIcon {
  padding-right: 2.5rem;
}
</style>
