import type { ParamsType } from '@/types';
import { prisma } from '@/utils/use-prisma';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import type { User } from '@prisma/client';
import S3 from 'aws-sdk/clients/s3';
import axios from 'axios';
import { v4 } from 'uuid';

const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  signatureVersion: 'v4',
});

module.exports = withApiAuthRequired(async (req, res) => {
  try {
    const { user, params, images } = req.body as {
      user: User;
      params: ParamsType;
      images: string[];
    };

    await Promise.all(
      images.map(async (image) => {
        const imageName = v4();

        const imageResponse = await axios.get(image, {
          responseType: 'arraybuffer',
        });

        const s3UploadResponse = await s3
          .upload({
            Bucket: process.env.AWS_BUCKET_NAME ?? '',
            Key: `generations/${user.id}/${imageName}.png`,
            Body: imageResponse.data,
            ACL: 'public-read',
          })
          .promise();

        const imageUrl = s3UploadResponse.Location;

        images.push(imageUrl);

        const generationObj = {
          prompt: params.prompt,
          style: params.tattooStyle,
          imageName: imageName,
          imageUrl,
          is_private: params.isPrivate || false,
        };

        if (!user.freeTrial) {
          await prisma.generation.create({
            data: {
              ...generationObj,
              authorName: user.name as string,
              author: {
                connect: {
                  id: user.id,
                },
              },
            },
          });
        } else {
          await prisma.generation.create({
            data: {
              ...generationObj,
              authorName: user.name as string,
              authorId: '',
            },
          });
        }
      })
    ).catch((err) => {
      throw err;
    });

    if (
      user.generationCount == 20 ||
      user.generationCount == 50 ||
      user.generationCount == 100
    ) {
      const userMessage = `ALERT\n\nUser ${user.name} (${user.id}) has generated ${user.generationCount} generations.`;
      await axios.post(
        process.env.SLACK_ALARM_WEBHOOK_URL ?? '',
        {
          text: userMessage,
        },
        {
          headers: {
            'Content-type': 'application/json',
          },
        }
      );
    }

    const updateAchievements = {} as Record<string, boolean>;

    if (user.generationCount == 1) {
      updateAchievements['hasBronzeCoin'] = true;
    } else if (user.generationCount == 5) {
      updateAchievements['hasSilverCoin'] = true;
    } else if (user.generationCount == 10) {
      updateAchievements['hasGoldCoin'] = true;
    } else if (user.generationCount == 50) {
      updateAchievements['hasPlatinumCoin'] = true;
    } else if (user.generationCount == 100) {
      updateAchievements['hasDiamondCoin'] = true;
    }

    await prisma.user.update({
      where: {
        email: user.email ?? '',
      },
      data: {
        credits: user.credits,
        generationCount: user.generationCount,
        ...updateAchievements,
      },
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).send('Error updating user information');
  }
});
