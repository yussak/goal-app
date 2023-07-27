package utils

import (
	"mime/multipart"
	"net/url"
	"strings"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"
)

func UploadToS3(file multipart.File, header *multipart.FileHeader) (string, error) {
	sess := session.Must(session.NewSessionWithOptions(session.Options{
		SharedConfigState: session.SharedConfigEnable,
		Config: aws.Config{
			Region: aws.String("ap-northeast-1"),
		},
	}))

	// IAMユーザー goal-app-s3を使用する
	// AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEYを環境変数に書けば~/.aws/configなど作らなくても自動で読み込んでくれる（はず）
	// ローカルでは/configなど作る必要があるがdokcerなら環境変数として設定すればOK
	uploader := s3manager.NewUploader(sess)
	result, err := uploader.Upload(&s3manager.UploadInput{
		Bucket: aws.String("goal-app-bucket"),
		Key:    aws.String(header.Filename),
		Body:   file,
	})
	if err != nil {
		return "", err
	}

	return result.Location, nil
}

func DeleteFromS3(imageUrl string) error {
	// Setup AWS session
	sess := session.Must(session.NewSessionWithOptions(session.Options{
		SharedConfigState: session.SharedConfigEnable,
		Config: aws.Config{
			Region: aws.String("ap-northeast-1"),
		},
	}))

	// Create a new S3 service client
	svc := s3.New(sess)

	// Parse the image URL to get the key
	u, err := url.Parse(imageUrl)
	if err != nil {
		return err
	}
	key := strings.TrimPrefix(u.Path, "/")

	// Delete the image from S3
	_, err = svc.DeleteObject(&s3.DeleteObjectInput{
		Bucket: aws.String("goal-app-bucket"),
		Key:    aws.String(key),
	})

	if err != nil {
		return err
	}

	return nil
}
