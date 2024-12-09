declare namespace API {
 

  interface GenratedImage {
    "id": number,
    "user": number,
    "input_image": string,
    "prompt": string,
    "status": ImageStatus,
    "image": string
  }

  interface GenratedImageResponse {
    "status": ImageStatus,
    "message": string ,
    "photo_id": number,
    "image_url": string
  }

  type GenratedImageForm = Omit<GenratedImage, "id" | "user"|"status"| "image">;
  type ImageStatus = 'QUEUED' |'PROCESSING' |'GENERATING' |'SUCCESS' |'FAILED'
}
