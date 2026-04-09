import cloudinary from "./cloudinary";

export const UploadToCloudinary = async (file: File, folder: string) => {
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const uploadResult = await new Promise<{ secure_url: string, public_url: string }>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder,
                resource_type: "auto"
            },
            (error, result) => {
                if (error) return reject(error)
                resolve({
                    secure_url: result!.secure_url,
                    public_url: result!.public_id
                })
            }
        )
        stream.end(buffer)
    })

    return uploadResult
}