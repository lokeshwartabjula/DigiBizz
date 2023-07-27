package net.javaguides.springboot.Springboothellworldapplication.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.auth.credentials.DefaultCredentialsProvider;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.CreateBucketRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

@Service
public class s3Service {

    @Value("mytibucket1")
    private String bucketName;

    @Value("us-east-1")
    private String region;

    public String uploadImage(String fileName, byte[] imageData) {
        try {
            S3Client s3Client = S3Client.builder()
                    .region(Region.of(region))
                    .credentialsProvider(DefaultCredentialsProvider.create())
                    .build();

            // Check if the bucket exists
            if (!s3Client.listBuckets().buckets().stream().anyMatch(b -> b.name().equals(bucketName))) {
                // Create the bucket if it does not exist
                s3Client.createBucket(CreateBucketRequest.builder().bucket(bucketName).build());
            }

            PutObjectRequest objectRequest = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(fileName)
                    .build();

            s3Client.putObject(objectRequest, RequestBody.fromBytes(imageData));

            return "https://" + bucketName + ".s3." + region + ".amazonaws.com/" + fileName;
        } catch (Exception e) {
            // Handle any exceptions that may occur during the upload
            e.printStackTrace();
            return null;
        }
    }
}
