import { ease } from "./ease";

export const anim = (variants) => {
  return {
    initial: "initial",
    animate: "animate",
    exit: "exit",
    variants,
  };
};

export const MenuAnim = {
  wrapper: {
    initial: {
      opacity: 0,
      filter: "blur(0.3vw)",
    },
    animate: {
      opacity: 1,
      filter: "blur(0vw)",
      transition: {
        duration: 0.5,
        ease: ease.inOutExpo
      },
    },
    exit: {
      opacity: 0,
      filter: "blur(0.3vw)",
      transition: {
        duration: 0.3,
        ease: ease.inOutExpo
      },
    },
  },
  links: {
    initial: {
      opacity: 0,
    },
    animate: (index) => ({
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: (index * 0.08) + 0.1,
      },
    }),
    exit: {
      opacity: 1,
    },
  },
  button: {
    initial: {
      opacity: 0,
      scale: 1.2,
    },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: ease.inOutExpo
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.5,
        ease: ease.inOutExpo
      },
    },
  },
} 
