export const s3 = new Bun.S3Client({
	endpoint: process.env.S3_ENDPOINT!,
	accessKeyId: process.env.S3_ACCESS_KEY_ID!,
	secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
	bucket: process.env.S3_BUCKET!
});

export const s3PublicUrl = (key: string) =>
	`${process.env.S3_ENDPOINT}/${process.env.S3_BUCKET}/${key}`;
