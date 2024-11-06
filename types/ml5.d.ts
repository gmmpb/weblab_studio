declare module "ml5" {
  export function facemesh(video: HTMLVideoElement, callback?: () => void): any;
  // Add other ml5 functions you're using
  export const version: string;

  export function faceMesh(
    options: { maxFaces: number; refineLandmarks: boolean; flipped: boolean },
    arg1: (model: any) => void
  ) {
    throw new Error("Function not implemented.");
  }
}
