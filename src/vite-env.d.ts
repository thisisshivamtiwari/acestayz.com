/// <reference types="vite/client" />

declare module '*.png' {
  const src: string
  export default src
}

declare module '*.PNG' {
  const src: string
  export default src
}

declare module '*.jpg' {
  const src: string
  export default src
}

declare module '*.JPG' {
  const src: string
  export default src
}

declare module '*.jpeg' {
  const src: string
  export default src
}

declare module '*.JPEG' {
  const src: string
  export default src
}

declare module '*.gif' {
  const src: string
  export default src
}

declare module '*.GIF' {
  const src: string
  export default src
}

declare module '*.svg' {
  const src: string
  export default src
}

declare module '*.SVG' {
  const src: string
  export default src
}

declare module '*.webp' {
  const src: string
  export default src
}

declare module '*.WEBP' {
  const src: string
  export default src
}

// Wildcard declarations for image folders
declare module '**/assets/images/**/*.jpg' {
  const src: string
  export default src
}

declare module '**/assets/images/**/*.JPG' {
  const src: string
  export default src
}

declare module '**/assets/images/**/*.jpeg' {
  const src: string
  export default src
}

declare module '**/assets/images/**/*.JPEG' {
  const src: string
  export default src
}

declare module '**/assets/images/**/*.png' {
  const src: string
  export default src
}

declare module '**/assets/images/**/*.PNG' {
  const src: string
  export default src
}

