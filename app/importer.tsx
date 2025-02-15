const images = {
    scene0: "https://github.com/whyuhookmetrash/kprNovelData/blob/main/images/scene0.jpg?raw=true",
    scene1: "https://github.com/whyuhookmetrash/kprNovelData/blob/main/images/scene1.jpg?raw=true",
    scene2: "https://github.com/whyuhookmetrash/kprNovelData/blob/main/images/scene2.jpg?raw=true"
  } as const;
  export type ImageKeys = keyof typeof images;
  export default images;