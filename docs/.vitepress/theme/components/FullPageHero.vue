<template>
  <div class="full-page-hero-wrapper">
    <div
      class="full-page-hero-background"
      :style="heroStyle"
    >
      <div class="full-page-hero-content-wrapper">
        <div class="hero-content">
          <slot name="header">
            <h1 v-if="title" class="hero-title">{{ title }}</h1>
          </slot>
          <slot name="subheader">
            <p v-if="subtitle" class="hero-subtitle">{{ subtitle }}</p>
          </slot>
          <slot></slot> <!-- Default slot for any other content -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  imageUrl: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    default: '',
  },
  subtitle: {
    type: String,
    default: '',
  },
  overlayColor: {
    type: String,
    default: 'rgba(0, 0, 0, 0.3)',
  },
  textColor: {
    type: String,
    default: '#FFFFFF',
  },
  minHeight: {
    type: String,
    default: '50vh', // Adjust default height as needed, e.g., '400px'
  },
  contentAlignment: { // For the content block within the constrained width
    type: String,
    default: 'center', // 'flex-start', 'center', 'flex-end' (vertical alignment)
  },
  textAlignment: { // For the text itself
    type: String,
    default: 'center', // 'left', 'center', 'right'
  }
});

const heroStyle = computed(() => ({
  backgroundImage: `url(${props.imageUrl})`,
  '--hero-text-color': props.textColor,
  '--hero-content-align': props.contentAlignment,
  '--hero-text-align': props.textAlignment,
  minHeight: props.minHeight,
}));
</script>

<style scoped>
.full-page-hero-wrapper {
  /* This wrapper will break out of the parent's width constraints */
  width: 100vw; /* Full viewport width */
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  overflow: hidden; /* Optional: if content inside background somehow overflows */
}

.full-page-hero-background {
  width: 100%; /* Takes full width of the 100vw wrapper */
  min-height: v-bind(minHeight); /* Use minHeight from props */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative; /* For positioning the overlay and content wrapper */
  color: var(--hero-text-color);

  /* Flexbox to center the .full-page-hero-content-wrapper vertically and horizontally */
  display: flex;
  /* justify-content: center; /* Center horizontally (content-wrapper will have max-width) */
  align-items: var(--hero-content-align); /* Vertical alignment for content-wrapper */
}

.full-page-hero-background::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: v-bind(overlayColor);
  z-index: 1;
}

.full-page-hero-content-wrapper {
  /* This wrapper constrains the content back to the layout's max-width */
  width: 100%;
  max-width: var(--vp-layout-max-width, 1152px); /* VitePress default content width variable or a fallback */
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--vp-layout-gutter-width, 24px); /* Match theme's gutter or a fallback */
  padding-right: var(--vp-layout-gutter-width, 24px);
  position: relative;
  z-index: 2; /* Content above overlay */
  box-sizing: border-box;
}

.hero-content {
  width: 100%; /* Takes full width of the constrained wrapper */
  text-align: var(--hero-text-align);
  padding-top: 2rem; /* Add some padding so content is not at the very edge */
  padding-bottom: 2rem;
}

.hero-title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 700;
  margin-bottom: 0.5rem;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: clamp(1rem, 2.5vw, 1.5rem);
  font-weight: 400;
  margin-bottom: 1.5rem;
  line-height: 1.4;
  opacity: 0.9;
}
</style>