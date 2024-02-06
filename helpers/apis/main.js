exports.extractUUIDFromS3URL = (s3URL) => {
  // Define a regular expression to match the UUID pattern
  const regex = /next-s3-uploads\/([a-f0-9-]+)\/.*/;

  // Use the regex to extract the UUID from the S3 URL
  const match = s3URL.match(regex);

  // Check if there is a match and return the UUID, or null if not found
  return match ? match[1] : null;
}