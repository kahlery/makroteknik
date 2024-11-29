package service

import (
	"bytes"
	"context"
	"fmt"
	"io"
	"log"
	"os"

	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/s3"
)

type S3Service struct {
	s3Client *s3.Client
	bucket   string
}

func NewS3Service() *S3Service {
	return &S3Service{
		s3Client: InitS3Client(),
		bucket:   os.Getenv("S3_BUCKET_NAME"),
	}
}

func InitS3Client() *s3.Client {
	cfg, err := config.LoadDefaultConfig(context.TODO())
	if err != nil {
		log.Fatalf("unable to load AWS-SDK config, %v", err)

	}

	return s3.NewFromConfig(cfg)
}

// functions --------------------------------------------------------------------

func (s *S3Service) GetFile(path *string, fileName *string) ([]byte, error) {
	// define full key
	key := *path + *fileName

	// set up the GetObject input
	input := &s3.GetObjectInput{
		Bucket: &s.bucket,
		Key:    &key,
	}

	// call s3 GetObject
	res, err := s.s3Client.GetObject(context.TODO(), input)
	if err != nil {
		return nil, fmt.Errorf("failed to get file from S3: %w", err)
	}
	defer res.Body.Close()

	// read content from the result body
	data, err := io.ReadAll(res.Body)
	if err != nil {
		return nil, fmt.Errorf("failed to read data from S3 object: %w", err)
	}

	return data, nil
}

func (s *S3Service) PostFile(path *string, fileName *string, data []byte) error {
	// define full key
	key := *path + *fileName

	// set up PutObject input
	input := &s3.PutObjectInput{
		Bucket: &s.bucket,
		Key:    &key,
		Body:   bytes.NewReader(data),
	}

	// Call S3 PutObject
	_, err := s.s3Client.PutObject(context.TODO(), input)
	if err != nil {
		return fmt.Errorf("failed to upload file to S3: %w", err)
	}

	return nil
}

func (s *S3Service) DeleteFile(path string, fileName string) error {
	// Define the full key for S3
	key := path + fileName

	// Set up the DeleteObject input
	input := &s3.DeleteObjectInput{
		Bucket: &s.bucket, // Replace with your bucket name variable
		Key:    &key,
	}

	// Call S3 DeleteObject
	_, err := s.s3Client.DeleteObject(context.TODO(), input)
	if err != nil {
		return fmt.Errorf("failed to delete file from S3: %w", err)
	}

	return nil
}

func (s *S3Service) IsFileExist(path string, fileName string) (bool, error) {
	// Define the full key for S3
	key := path + fileName

	// Set up the HeadObject input
	input := &s3.HeadObjectInput{
		Bucket: &s.bucket,
		Key:    &key,
	}

	// Call S3 HeadObject
	_, err := s.s3Client.HeadObject(context.TODO(), input)
	if err != nil {
		// Check if the error is because the object was not found
		return false, fmt.Errorf("error checking if file exists in S3: %w", err)
	}

	return true, nil
}
