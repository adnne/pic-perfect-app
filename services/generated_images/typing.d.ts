declare namespace API {
 

  interface GenratedImage {
    "id": number,
    "user": number,
    "input_image": string,
    "prompt": string,
    "status": string,
    "image": string
  }

  type GenratedImageForm = Omit<GenratedImage, "id" | "user"|"status"| "image">;
  type ImageStatus = 'QUEUED' |'PROCESSING' |'GENERATING' |'SUCCESS' |'FAILED'
}
